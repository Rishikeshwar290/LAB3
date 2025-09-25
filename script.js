// Food Database with Nutritional Information
const foodDatabase = {
    "apple": {
        name: "Apple",
        calories: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2,
        fiber: 2.4,
        sugar: 10.4,
        vitaminC: 4.6,
        potassium: 107
    },
    "banana": {
        name: "Banana",
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3,
        fiber: 2.6,
        sugar: 12.2,
        vitaminC: 8.7,
        potassium: 358
    },
    "chicken breast": {
        name: "Chicken Breast",
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        sugar: 0,
        vitaminC: 0,
        potassium: 256
    },
    "brown rice": {
        name: "Brown Rice",
        calories: 111,
        protein: 2.6,
        carbs: 23,
        fat: 0.9,
        fiber: 1.8,
        sugar: 0.4,
        vitaminC: 0,
        potassium: 43
    },
    "salmon": {
        name: "Salmon",
        calories: 208,
        protein: 25.4,
        carbs: 0,
        fat: 12.4,
        fiber: 0,
        sugar: 0,
        vitaminC: 0,
        potassium: 363
    },
    "broccoli": {
        name: "Broccoli",
        calories: 34,
        protein: 2.8,
        carbs: 6.6,
        fat: 0.4,
        fiber: 2.6,
        sugar: 1.5,
        vitaminC: 89.2,
        potassium: 316
    },
    "eggs": {
        name: "Eggs",
        calories: 155,
        protein: 13,
        carbs: 1.1,
        fat: 11,
        fiber: 0,
        sugar: 1.1,
        vitaminC: 0,
        potassium: 126
    },
    "avocado": {
        name: "Avocado",
        calories: 160,
        protein: 2,
        carbs: 8.5,
        fat: 14.7,
        fiber: 6.7,
        sugar: 0.7,
        vitaminC: 10,
        potassium: 485
    },
    "spinach": {
        name: "Spinach",
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4,
        fiber: 2.2,
        sugar: 0.4,
        vitaminC: 28.1,
        potassium: 558
    },
    "almonds": {
        name: "Almonds",
        calories: 579,
        protein: 21.2,
        carbs: 21.6,
        fat: 49.9,
        fiber: 12.5,
        sugar: 4.4,
        vitaminC: 0,
        potassium: 733
    },
    "sweet potato": {
        name: "Sweet Potato",
        calories: 86,
        protein: 1.6,
        carbs: 20.1,
        fat: 0.1,
        fiber: 3,
        sugar: 4.2,
        vitaminC: 2.4,
        potassium: 337
    },
    "greek yogurt": {
        name: "Greek Yogurt",
        calories: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.4,
        fiber: 0,
        sugar: 3.6,
        vitaminC: 0,
        potassium: 141
    },
    "quinoa": {
        name: "Quinoa",
        calories: 120,
        protein: 4.4,
        carbs: 22,
        fat: 1.9,
        fiber: 2.8,
        sugar: 0.9,
        vitaminC: 0,
        potassium: 172
    },
    "oats": {
        name: "Oats",
        calories: 68,
        protein: 2.4,
        carbs: 12,
        fat: 1.4,
        fiber: 1.7,
        sugar: 0.2,
        vitaminC: 0,
        potassium: 61
    },
    "blueberries": {
        name: "Blueberries",
        calories: 57,
        protein: 0.7,
        carbs: 14.5,
        fat: 0.3,
        fiber: 2.4,
        sugar: 10,
        vitaminC: 9.7,
        potassium: 77
    }
};

// Global variables
let selectedFood = null;
let dailyLog = [];
let nutritionChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Setup navigation
    setupNavigation();
    
    // Setup food search
    setupFoodSearch();
    
    // Populate tracker food dropdown
    populateTrackerDropdown();
    
    // Initialize chart
    initializeChart();
    
    // Load saved data
    loadSavedData();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Food search functionality
function setupFoodSearch() {
    const searchInput = document.getElementById('food-search');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const results = Object.keys(foodDatabase).filter(food => 
            food.includes(query) || foodDatabase[food].name.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            searchResults.innerHTML = results.map(food => 
                `<div class="search-result-item" onclick="selectFood('${food}')">${foodDatabase[food].name}</div>`
            ).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function selectFood(foodKey) {
    selectedFood = foodKey;
    document.getElementById('food-search').value = foodDatabase[foodKey].name;
    document.getElementById('search-results').style.display = 'none';
}

// Nutrient calculator
function calculateNutrients() {
    if (!selectedFood) {
        alert('Please select a food item first.');
        return;
    }

    const quantity = parseFloat(document.getElementById('quantity').value) || 100;
    const food = foodDatabase[selectedFood];
    
    const nutritionDisplay = document.getElementById('nutrition-display');
    
    const nutritionData = {
        calories: (food.calories * quantity / 100).toFixed(1),
        protein: (food.protein * quantity / 100).toFixed(1),
        carbs: (food.carbs * quantity / 100).toFixed(1),
        fat: (food.fat * quantity / 100).toFixed(1),
        fiber: (food.fiber * quantity / 100).toFixed(1),
        sugar: (food.sugar * quantity / 100).toFixed(1),
        vitaminC: (food.vitaminC * quantity / 100).toFixed(1),
        potassium: (food.potassium * quantity / 100).toFixed(1)
    };

    nutritionDisplay.innerHTML = `
        <div style="width: 100%;">
            <h4 style="margin-bottom: 1rem; color: #2c3e50;">${food.name} (${quantity}g)</h4>
            <div class="nutrition-item">
                <span class="nutrition-label">Calories</span>
                <span class="nutrition-value">${nutritionData.calories} kcal</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-label">Protein</span>
                <span class="nutrition-value">${nutritionData.protein}g</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-label">Carbohydrates</span>
                <span class="nutrition-value">${nutritionData.carbs}g</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-label">Fat</span>
                <span class="nutrition-value">${nutritionData.fat}g</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-label">Fiber</span>
                <span class="nutrition-value">${nutritionData.fiber}g</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-label">Sugar</span>
                <span class="nutrition-value">${nutritionData.sugar}g</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-label">Vitamin C</span>
                <span class="nutrition-value">${nutritionData.vitaminC}mg</span>
            </div>
            <div class="nutrition-item">
                <span class="nutrition-label">Potassium</span>
                <span class="nutrition-value">${nutritionData.potassium}mg</span>
            </div>
        </div>
    `;
}

// Populate tracker dropdown
function populateTrackerDropdown() {
    const select = document.getElementById('tracker-food');
    select.innerHTML = '<option value="">Select a food item</option>';
    
    Object.keys(foodDatabase).forEach(foodKey => {
        const option = document.createElement('option');
        option.value = foodKey;
        option.textContent = foodDatabase[foodKey].name;
        select.appendChild(option);
    });
}

// Add food to tracker
function addToTracker() {
    const foodSelect = document.getElementById('tracker-food');
    const quantity = parseFloat(document.getElementById('tracker-quantity').value);
    const mealType = document.getElementById('tracker-meal').value;

    if (!foodSelect.value) {
        alert('Please select a food item.');
        return;
    }

    if (!quantity || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    const food = foodDatabase[foodSelect.value];
    const logEntry = {
        id: Date.now(),
        food: food.name,
        foodKey: foodSelect.value,
        quantity: quantity,
        mealType: mealType,
        calories: (food.calories * quantity / 100).toFixed(1),
        protein: (food.protein * quantity / 100).toFixed(1),
        carbs: (food.carbs * quantity / 100).toFixed(1),
        fat: (food.fat * quantity / 100).toFixed(1)
    };

    dailyLog.push(logEntry);
    updateTrackerDisplay();
    updateSummaryCards();
    updateChart();
    saveData();

    // Reset form
    foodSelect.value = '';
    document.getElementById('tracker-quantity').value = '100';
}

// Update tracker display
function updateTrackerDisplay() {
    const logList = document.getElementById('food-log-list');
    
    if (dailyLog.length === 0) {
        logList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-utensils"></i>
                <p>No food items logged yet. Start by adding your first meal!</p>
            </div>
        `;
        return;
    }

    logList.innerHTML = dailyLog.map(entry => `
        <div class="food-log-item">
            <div class="food-info">
                <div class="food-name">${entry.food}</div>
                <div class="food-details">${entry.quantity}g • ${entry.mealType}</div>
            </div>
            <div class="food-calories">${entry.calories} kcal</div>
            <button class="remove-btn" onclick="removeFromTracker(${entry.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Remove food from tracker
function removeFromTracker(id) {
    dailyLog = dailyLog.filter(entry => entry.id !== id);
    updateTrackerDisplay();
    updateSummaryCards();
    updateChart();
    saveData();
}

// Update summary cards
function updateSummaryCards() {
    const totals = dailyLog.reduce((acc, entry) => {
        acc.calories += parseFloat(entry.calories);
        acc.protein += parseFloat(entry.protein);
        acc.carbs += parseFloat(entry.carbs);
        acc.fat += parseFloat(entry.fat);
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    document.getElementById('total-calories').textContent = totals.calories.toFixed(0);
    document.getElementById('total-protein').textContent = totals.protein.toFixed(1) + 'g';
    document.getElementById('total-carbs').textContent = totals.carbs.toFixed(1) + 'g';
    document.getElementById('total-fat').textContent = totals.fat.toFixed(1) + 'g';
}

// Initialize chart
function initializeChart() {
    const ctx = document.getElementById('nutrition-chart').getContext('2d');
    nutritionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fat'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#667eea', '#764ba2', '#ff6b6b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Update chart
function updateChart() {
    const totals = dailyLog.reduce((acc, entry) => {
        acc.protein += parseFloat(entry.protein);
        acc.carbs += parseFloat(entry.carbs);
        acc.fat += parseFloat(entry.fat);
        return acc;
    }, { protein: 0, carbs: 0, fat: 0 });

    const total = totals.protein + totals.carbs + totals.fat;
    
    if (total > 0) {
        nutritionChart.data.datasets[0].data = [
            totals.protein.toFixed(1),
            totals.carbs.toFixed(1),
            totals.fat.toFixed(1)
        ];
    } else {
        nutritionChart.data.datasets[0].data = [0, 0, 0];
    }
    
    nutritionChart.update();
}

// BMI Calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values.');
        return;
    }

    const bmi = weight / Math.pow(height / 100, 2);
    const bmiDisplay = document.getElementById('bmi-display');

    let category, description, color;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'You may need to gain weight. Consider consulting a healthcare provider for guidance.';
        color = '#3498db';
    } else if (bmi < 25) {
        category = 'Normal weight';
        description = 'Great! You have a healthy weight. Maintain your current lifestyle.';
        color = '#27ae60';
    } else if (bmi < 30) {
        category = 'Overweight';
        description = 'Consider making some lifestyle changes to reach a healthier weight.';
        color = '#f39c12';
    } else {
        category = 'Obese';
        description = 'It\'s recommended to consult a healthcare provider for weight management guidance.';
        color = '#e74c3c';
    }

    bmiDisplay.innerHTML = `
        <div style="text-align: center;">
            <div class="bmi-value" style="color: ${color};">${bmi.toFixed(1)}</div>
            <div class="bmi-category" style="color: ${color};">${category}</div>
            <div class="bmi-description">${description}</div>
        </div>
    `;
}

// Data persistence
function saveData() {
    localStorage.setItem('nutriCalcDailyLog', JSON.stringify(dailyLog));
}

function loadSavedData() {
    const savedData = localStorage.getItem('nutriCalcDailyLog');
    if (savedData) {
        dailyLog = JSON.parse(savedData);
        updateTrackerDisplay();
        updateSummaryCards();
        updateChart();
    }
}

// Utility functions
function formatNumber(num, decimals = 1) {
    return parseFloat(num).toFixed(decimals);
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.calculateNutrients = calculateNutrients;
window.addToTracker = addToTracker;
window.removeFromTracker = removeFromTracker;
window.calculateBMI = calculateBMI;
