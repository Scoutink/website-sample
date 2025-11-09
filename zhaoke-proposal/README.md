# Zhaoke Ophthalmology Website Proposal

An elegant, interactive three.js themed presentation showcasing the website development proposal for Zhaoke Ophthalmology (SEHK: 6622).

## 👁️ Overview

This presentation uses cutting-edge three.js 3D animations to create an immersive experience that reflects the company's focus on vision, clarity, and ophthalmic therapeutics. The theme embodies "Clarity Through Innovation in Ophthalmology."

## ✨ Features

### 3D Visual Elements
- **Animated Iris Structure** - Rotating iris with radial patterns and pupil dilation
- **Light Rays** - Representing vision and clarity
- **Lens Rings** - Concentric rings symbolizing optical precision
- **Light Particles** - Dynamic particle field with sky blue, turquoise, and silver colors
- **Floating Eye Elements** - Spherical elements creating depth and movement

### Design Theme
- **Ophthalmology-Focused** - Visual metaphors for vision and eye health
- **Calm & Elegant** - Professional atmosphere suitable for medical/pharma
- **Focus/Blur Effects** - Smooth transitions mimicking vision clarity
- **Sky Blue & Turquoise Palette** - Evokes clarity, trust, and medical precision

### Interactive Features
- **Smooth Navigation** - Active section tracking and scroll effects
- **3D Card Interactions** - Tilt effects on hover
- **Progress Indicator** - Visual scroll progress
- **Responsive Design** - Optimized for all devices
- **Pipeline Tracker** - Interactive drug candidate showcase

## 📁 File Structure

```
/zhaoke-proposal/
├── index.html       # Main presentation file
├── styles.css       # Complete styling and animations
├── vision-app.js    # Three.js scene and interactions
└── README.md        # This file
```

## 🚀 Deployment to Plesk

### Quick Start

1. **Download Files**
   - Download: `index.html`, `styles.css`, and `vision-app.js`

2. **Upload to Plesk**
   - Log into Plesk control panel
   - Navigate to: **File Manager** → `httpdocs/`
   - Upload all three files

3. **Access Presentation**
   - Visit: `https://yourdomain.com/`

### Detailed Steps

1. **Login to Plesk**
   ```
   https://your-server-ip:8443
   ```

2. **File Manager**
   - Click "File Manager" in sidebar
   - Navigate to `httpdocs/` or `public_html/`

3. **Upload Files**
   - Click "Upload" button
   - Select all three files
   - Wait for completion

4. **Set Permissions**
   - Select files
   - Set to `644` (read/write for owner, read for others)

5. **Test**
   - Visit your domain
   - Verify animated iris and light effects appear

## 🎨 Design Language

### Color Palette
- **Sky Blue** `#4A90E2` - Professional, trust
- **Turquoise** `#40E0D0` - Innovation, clarity
- **Light Silver** `#C0D5E8` - Medical precision
- **Pure White** `#FFFFFF` - Clean, clear

### Typography
- **Inter** - Primary sans-serif
- **Source Sans Pro** - Secondary font
- Clean, legible, trustworthy

### Visual Style
- Eye close-ups and iris details
- Light beams and optical lenses
- Laboratory and clinical imagery
- Calm, intelligent tone

## 📊 Content Sections

### 1. Hero Section
- Animated lens flare effects
- Company stats (6 diseases, 7,600m² facility, Global reach)
- "Innovating Vision. Improving Lives."

### 2. Integrated Ophthalmic Excellence
- Four core values: Scientific Precision, Visionary Leadership, Transparent & Trusted, Human Impact
- Company background and GMP facility details

### 3. Design Language & UI/UX
- Color palette showcase
- Typography system
- Imagery & visual style guidelines
- Motion & interaction demonstrations

### 4. Platform Architecture
- **Homepage** - Hero, pipeline, manufacturing, partnerships
- **About Us** - History, timeline, mission, leadership
- **R&D / Technology** - Front/back-of-eye focus, 6 major indications
- **Pipeline** - CsA Gel (Phase III), NVK-002 (Phase III), PAN-90806 (Phase II)
- **Manufacturing** - 7,600m² Nansha facility, GMP compliance
- **Partners** - Visus, PanOptica, Vyluma, FAREVA

### 5. Functional Features
- Dual language (English/中文)
- Fully responsive design
- SEO optimized for ophthalmic keywords
- Secure HTTPS & ICP compliant
- CMS backend options
- Virtual facility tour
- Investor portal with HKEX data
- Download center

### 6. Investor Relations
- HKEX integration (SEHK: 6622)
- Financial highlights
- Regulatory disclosures
- Strategic milestones

## 🌍 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive functionality
- **Three.js r128** - 3D graphics and eye visualizations
- **No frameworks** - Pure vanilla JS for compatibility

## 📱 Responsive Breakpoints

- **Desktop** (1024px+) - Full 3D effects and animations
- **Tablet** (768px-1024px) - Optimized layouts
- **Mobile** (320px-767px) - Touch-friendly, reduced particles

## 🎯 Deployment Size

- `index.html` - ~19 KB
- `styles.css` - ~23 KB
- `vision-app.js` - ~19 KB
- **Total**: ~61 KB (excluding Three.js CDN)

## 🔧 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --sky-blue: #4A90E2;
    --turquoise: #40E0D0;
    --light-silver: #C0D5E8;
}
```

### Content
Edit text directly in `index.html`

### Animations
Adjust timing and effects in `vision-app.js`:
- Iris rotation speed
- Particle count and behavior
- Light ray animations
- Camera movement sensitivity

## 🐛 Troubleshooting

**Blank Page?**
- Check browser console (F12) for errors
- Verify all three files are uploaded
- Clear browser cache (Ctrl+Shift+R)

**No 3D Effects?**
- Visit `get.webgl.org` to check WebGL support
- Try different browser (Chrome recommended)
- Enable hardware acceleration

**Slow Performance?**
- Mobile devices automatically reduce particle count
- Consider reducing animations in `vision-app.js`

## 🎨 Design Inspiration

Blends:
- Corporate biotech elegance (Roche, Alcon)
- Modern vision-care innovation (J&J Vision, Aerie Pharmaceuticals)
- Medical precision and trust

## 📞 Company Background

**Zhaoke Ophthalmology**
- Founded: 2017
- Listed: SEHK 6622 (Hong Kong Stock Exchange)
- Location: Guangzhou, China (Nansha New District)
- Focus: Fully integrated ophthalmic platform
- Facility: 7,600 m² GMP-certified manufacturing
- Indications: DED, Myopia, Presbyopia, wAMD, DME, Glaucoma

## 📄 Taglines

1. "Science That Refocuses Sight"
2. "From Vision Research to Patient Reality"
3. "Precision Ophthalmology, Powered by Innovation"
4. "Shaping the Future of Eye Health"

---

**Created with** 💙 **using Three.js and modern web technologies**

*Clarity Through Innovation in Ophthalmology* 👁️
