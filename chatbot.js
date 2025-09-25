// Health Assistant Chatbot via OpenRouter
class HealthChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        // OpenRouter configuration (Note: exposing keys in frontend is not secure for production)
        this.openRouterKey = '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';
        this.openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.container = document.getElementById('chatbot-container');
        this.closeBtn = document.getElementById('chatbot-close');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.quickActionBtns = document.querySelectorAll('.quick-action-btn');
    }

    setupEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChatbot());
        this.closeBtn.addEventListener('click', () => this.closeChatbot());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.input.value = message;
                this.sendMessage();
            });
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.container.classList.add('active');
            this.input.focus();
        } else {
            this.container.classList.remove('active');
        }
    }

    closeChatbot() {
        this.isOpen = false;
        this.container.classList.remove('active');
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response
            const response = await this.getHealthResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.hideTypingIndicator();
            this.addMessage(`
                <p><strong>Sorry, I'm having trouble processing your request right now.</strong></p>
                <p>Please try again in a moment, or contact support if the issue persists.</p>
            `, 'bot');
        }
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Store in conversation history
        this.conversationHistory.push({ sender, content, timestamp: Date.now() });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';
        typingContent.innerHTML = `
            <span>Health Assistant is typing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingContent);
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async getHealthResponse(message) {
        try {
            const systemPrompt = 'You are a helpful health assistant for a nutrition calculator website. Provide concise, evidence-based guidance. Use simple, friendly tone. Include an appropriate disclaimer for medical concerns. Return HTML using <p>, <ul>, <li>, <strong>.';

            const response = await fetch(this.openRouterUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.openRouterKey}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'NutriCalc Health Assistant'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-20b:free',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: message }
                    ],
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const content = data?.choices?.[0]?.message?.content;
            if (content) {
                return content;
            } else {
                throw new Error('Invalid API response format');
            }

        } catch (error) {
            console.error('AI API Error:', error);
            console.error('Error details:', error.message);
            
            // More specific error messages
            let errorMessage = '';
            if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Network error - please check your internet connection.';
            } else if (error.message.includes('401')) {
                errorMessage = 'API key is invalid or expired.';
            } else if (error.message.includes('403')) {
                errorMessage = 'API access denied - check your permissions.';
            } else if (error.message.includes('429')) {
                errorMessage = 'API rate limit exceeded - please wait a moment.';
            } else {
                errorMessage = `API error: ${error.message}`;
            }
            
            return `
                <p><strong>⚠️ AI Service Error</strong></p>
                <p>${errorMessage}</p>
                <p><strong>Here are some general health tips:</strong></p>
                <ul>
                    <li>Focus on whole, unprocessed foods</li>
                    <li>Stay hydrated throughout the day</li>
                    <li>Get regular physical activity</li>
                    <li>Prioritize sleep and stress management</li>
                    <li>Use our nutrition calculator to track your intake</li>
                </ul>
                <p><em>Please try again in a moment, or consult a healthcare professional for specific health concerns.</em></p>
            `;
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new HealthChatbot();
});
