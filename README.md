# Peg-Bio Website Proposal Presentation

An elegant, interactive three.js themed presentation showcasing the website development proposal for Peg-Bio Biopharm Co., Ltd.

## 🧬 Overview

This presentation uses cutting-edge three.js 3D animations to create an immersive experience that reflects the company's focus on gene engineering and molecular therapeutics. The theme combines scientific precision with modern web design.

## ✨ Features

- **3D DNA Helix Animations** - Rotating molecular structures using three.js
- **Interactive Navigation** - Smooth scrolling with active section tracking
- **Biotech-Themed Design** - Deep blue, white, and neon green color palette
- **Responsive Layout** - Optimized for desktop, tablet, and mobile
- **Particle Effects** - Dynamic molecular particle field
- **Card Interactions** - 3D tilt effects and hover animations
- **Progress Indicator** - Visual scroll progress bar
- **Parallax Scrolling** - Depth and motion effects

## 📁 File Structure

```
/workspace/
├── index.html      # Main presentation file
├── styles.css      # Complete styling and animations
├── app.js          # Three.js scene and interactions
└── README.md       # This file
```

## 🚀 Deployment to Plesk

### Quick Start

1. **Download Files**
   - Download all files: `index.html`, `styles.css`, and `app.js`

2. **Upload to Plesk**
   - Log into your Plesk control panel
   - Navigate to: **Websites & Domains** → Your Domain → **File Manager**
   - Navigate to your `httpdocs` or `public_html` directory
   - Click **Upload** and select all three files
   - Alternatively, use **FTP** client to upload files

3. **Access Your Presentation**
   - Visit: `https://yourdomain.com/`
   - Or if uploaded to subfolder: `https://yourdomain.com/proposal/`

### Detailed Plesk Steps

1. **Login to Plesk**
   ```
   https://your-server-ip:8443
   ```

2. **Select Your Domain**
   - From the Plesk dashboard, click on your domain name

3. **File Manager**
   - Click on **"File Manager"** in the left sidebar
   - Navigate to the root directory (usually `httpdocs` or `public_html`)

4. **Upload Files**
   - Click the **"+"** button or **"Upload"** button
   - Drag and drop all three files:
     - index.html
     - styles.css
     - app.js
   - Wait for upload to complete

5. **Set Permissions** (if needed)
   - Select all files
   - Click **"Change Permissions"**
   - Set to `644` (read/write for owner, read for others)

6. **Test**
   - Open your browser
   - Visit your domain
   - The presentation should load with animated 3D DNA helices

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Colors
Edit `styles.css` to change the color scheme:
```css
:root {
    --deep-blue: #0A2463;      /* Primary dark blue */
    --neon-green: #00FFB3;     /* Accent neon green */
    --pure-white: #FFFFFF;     /* Text and backgrounds */
}
```

### Content
Edit `index.html` to modify:
- Section text and descriptions
- Company information
- Feature lists
- Call-to-action buttons

### Animations
Edit `app.js` to adjust:
- DNA helix rotation speed
- Particle count and behavior
- Camera movement sensitivity
- Lighting and colors

## 📱 Mobile Optimization

The presentation is fully responsive:
- Navigation collapses on mobile
- Touch-friendly interactions
- Optimized performance for mobile devices
- Reduced particle count on smaller screens

## 🔒 Security Notes

- All dependencies are loaded via CDN (three.js)
- No server-side processing required
- Static files only - safe for any hosting
- HTTPS recommended but not required

## 🌍 Additional Deployment Options

### Alternative Hosting Methods

**Via FTP:**
```
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your server
3. Navigate to public directory
4. Upload all three files
```

**Via SSH/Terminal:**
```bash
scp index.html styles.css app.js user@server:/var/www/html/
```

**Via Plesk Git:**
```
1. Initialize Git repository in Plesk
2. Push files to repository
3. Auto-deploy through Plesk Git integration
```

## 🎯 Performance Tips

1. **Enable Gzip Compression** in Plesk
   - Go to Apache & nginx Settings
   - Enable gzip for CSS and JS files

2. **Enable Browser Caching**
   - Set cache headers for static assets
   - Recommended: 7 days for CSS/JS

3. **Use HTTPS**
   - Enable SSL certificate through Plesk
   - Forces secure connection

4. **CDN (Optional)**
   - Consider Cloudflare for global distribution
   - Can be integrated through Plesk

## 📊 Sections Included

1. **Core Concept & Brand Identity**
2. **Visual & UI/UX Design Language**
3. **Site Architecture & Content Strategy**
4. **Functional Features**
5. **Optional Enhancements**
6. **SEO, Campaigns & Lead Flows**

## 💡 Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Three.js r128** - 3D graphics and animations
- **No frameworks** - Pure vanilla JS for maximum compatibility

## 🐛 Troubleshooting

**Blank Page?**
- Check browser console for errors (F12)
- Ensure all three files are uploaded
- Verify file paths are correct
- Check file permissions (should be readable)

**No 3D Effects?**
- Clear browser cache
- Check WebGL support: visit `get.webgl.org`
- Try different browser
- Check if hardware acceleration is enabled

**Slow Performance?**
- Reduce particle count in `app.js` (line ~153)
- Disable some animations
- Test on different device

## 📞 Support

For questions about the presentation or deployment:
- Check browser console for errors
- Verify all files are uploaded correctly
- Ensure Plesk file permissions are correct (644)

## 📄 License

This presentation was created specifically for Peg-Bio Biopharm website proposal.

---

**Created with** ❤️ **using Three.js and modern web technologies**

*Engineering Molecules for a Healthier Future* 🧬
