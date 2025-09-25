# NutriCalc Deployment Guide

## Quick Start - Firebase Hosting (Recommended)

### Prerequisites
- Node.js installed on your computer
- Google account

### Steps

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project**
   ```bash
   cd D:\nutri-calc-website
   firebase init hosting
   ```
   
   When prompted:
   - Select "Use an existing project" or create a new one
   - Set public directory to "." (current directory)
   - Configure as single-page app: No
   - Set up automatic builds: No

4. **Deploy your website**
   ```bash
   firebase deploy
   ```

5. **Your website will be live at:**
   `https://your-project-id.web.app`

## Alternative: Google Cloud Storage

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Cloud Storage API
4. Create a bucket with public access
5. Upload your files (index.html, styles.css, script.js)
6. Configure bucket for web hosting

## Custom Domain (Optional)

After deployment, you can add a custom domain:
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the verification steps
4. Update DNS records with your domain provider

## Features Added for SEO

- Meta descriptions and keywords
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URL
- Favicon
- Proper semantic HTML structure

## File Structure
```
nutri-calc-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── DEPLOYMENT.md       # This guide
└── README.md           # Project documentation
```

## Support

If you encounter any issues:
1. Check Firebase Console for error logs
2. Ensure all files are uploaded correctly
3. Verify your Firebase project settings
4. Check browser console for JavaScript errors

## Next Steps

- Consider adding Google Analytics for traffic insights
- Set up Google Search Console for SEO monitoring
- Add a sitemap.xml for better search engine indexing
- Consider implementing a service worker for offline functionality
