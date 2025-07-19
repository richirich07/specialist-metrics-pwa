# PWA Deployment Guide - Specialist Metrics Calculator

This guide explains how to run the Specialist Metrics PWA on any laptop or computer.

## 🚀 Quick Start for New Laptops

### Prerequisites
- **Node.js** (version 18 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **Git** (optional, for cloning) - Download from [git-scm.com](https://git-scm.com/)

### Method 1: Copy Project Files
1. **Copy the entire project folder** to the new laptop
2. **Open terminal/command prompt** in the project directory
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Open browser** and go to: `http://localhost:3000`

### Method 2: Production Build (Recommended)
1. **Copy the project folder** to the new laptop
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build for production**:
   ```bash
   npm run build
   ```
4. **Start production server**:
   ```bash
   npm start
   ```
5. **Open browser** and go to: `http://localhost:3000`

## 📱 PWA Features Available

### Install as App
- **Chrome/Edge**: Click the install icon in the address bar
- **Mobile**: Use "Add to Home Screen" option
- **Desktop**: Install from browser menu

### Offline Support
- The app works offline after first visit
- Service worker caches essential files
- Calculations work without internet connection

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 is busy, use a different port:
```bash
PORT=8000 npm run dev
```

### Missing Dependencies
If you get errors, reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Ensure you have the correct Node.js version:
```bash
node --version  # Should be 18+
npm --version   # Should be 8+
```

## 📁 Project Structure
```
specialist-metrics-pwa/
├── public/
│   ├── manifest.json          # PWA configuration
│   └── service-worker.js      # Offline functionality
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── metrics/page.tsx   # Calculator page
│   └── components/
│       └── GlidePathCalculator.tsx  # Main calculator
├── package.json               # Dependencies
└── next.config.ts            # Next.js configuration
```

## 🌐 Sharing with Others

### Option 1: Local Network Access
1. Start the app: `npm run dev`
2. Find your IP address: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Share the URL: `http://YOUR_IP:3000`
4. Others on same network can access it

### Option 2: Deploy Online
Deploy to platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **Heroku**

## 💡 Usage Instructions

1. **Enter Current Metric**: Your starting performance value
2. **Set Target Metric**: Your goal performance value
3. **Specify Weeks**: Number of weeks to reach the goal
4. **Calculate**: View your week-by-week glide path
5. **Track Progress**: Use the visual progress bars

## 🔒 Data Privacy
- All calculations happen locally in the browser
- No data is sent to external servers
- Works completely offline after installation

## 📞 Support
If you encounter issues:
1. Check Node.js version compatibility
2. Ensure all dependencies are installed
3. Try clearing browser cache
4. Restart the development server

---

**Built with**: Next.js 15, TypeScript, Tailwind CSS, PWA features
**Compatible with**: Windows, macOS, Linux, Mobile browsers
