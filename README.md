# Russell Lancaster - Portfolio Website

Professional portfolio website showcasing data science expertise, quantitative analysis experience, and comprehensive certifications.

## 🚀 Features

- **Comprehensive Profile**: 5+ years of data science and quantitative analysis experience
- **Featured Projects**: 5 major projects including Faith-Based Survey Dashboard, Credit Default Prediction, and Trading Strategies
- **Certifications Showcase**: 16 data-focused certifications from 130+ total certifications
- **Technical Skills**: Organized by category (Programming, ML, Data Engineering, Visualization, Finance)
- **Responsive Design**: Professional dark theme optimized for all devices
- **Smooth Navigation**: Single-page application with smooth scrolling

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Routing**: Wouter
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import this GitHub repository: `rlancaster243/russell-portfolio`
4. Vercel will auto-detect the configuration
5. Click "Deploy"

The `vercel.json` file is already configured for optimal deployment.

### Manual Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
russell-portfolio/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx          # Main portfolio page
│   │   ├── components/           # Reusable UI components
│   │   ├── App.tsx              # App configuration
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   └── index.html               # HTML template
├── vercel.json                  # Vercel configuration
└── package.json                 # Dependencies
```

## 🎨 Customization

### Update Profile Information

Edit `/client/src/pages/Home.tsx` to update:
- Personal information
- Experience details
- Projects
- Certifications
- Skills

### Change Theme Colors

Edit `/client/src/index.css` to customize the color palette in the `:root` and `.dark` sections.

## 📄 License

© 2025 Russell Lancaster. All rights reserved.

## 🔗 Links

- **GitHub**: [rlancaster243](https://github.com/rlancaster243)
- **LinkedIn**: [russell-lancaster-72b230214](https://www.linkedin.com/in/russell-lancaster-72b230214/)
- **Live Site**: [Deploy to see your live URL]

---

Built with ❤️ using React, Vite, and Tailwind CSS
