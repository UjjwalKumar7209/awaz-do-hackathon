# Awaz - Modern Civic-Tech Landing Page

## 🎯 Project Overview

**Awaz** is a modern, responsive landing page for a civic-tech web application that empowers citizens to report public issues (potholes, broken streetlights, garbage, etc.) with image uploads, receive AI-recommended authorities, and auto-generate draft emails.

## ✨ Key Features Implemented

### Design & UX
- ✅ **Modern Minimal Design**: Clean, flat design with solid colors only (no gradients)
- ✅ **Professional Color Palette**: Black, white, blue (#0066cc), and grays
- ✅ **Strong Typography**: Responsive, semantic HTML with proper hierarchy
- ✅ **Extensive Whitespace**: Clean layouts with breathable spacing
- ✅ **Fully Responsive**: Mobile-first design that works on all screen sizes

### GSAP Animations (Premium Quality)
- ✅ **Hero Section Entrance**: Staggered animations for title, subtitle, button, and illustration
- ✅ **Feature Cards**: Scroll-triggered fade-in with stagger effect
- ✅ **How It Works Steps**: Alternating slide animations on scroll
- ✅ **Benefits Section**: Staggered entrance animations
- ✅ **CTA Section**: Smooth fade-in on scroll
- ✅ **Button Hover Effects**: Scale animations for interactive feedback
- ✅ **Card Hover Effects**: Lift and shadow animations

### Sections Included
1. **Sticky Navbar**: Navigation with logo, links, and CTA button
2. **Hero Section**: Striking headline with illustration and CTA
3. **Features Section**: 4-card grid showcasing key features
4. **How It Works**: Step-by-step process flow
5. **Impact/Why It Matters**: Benefits and value proposition
6. **CTA Section**: Dark background with bold call-to-action
7. **Footer**: Comprehensive footer with links and branding

## 📁 Project Structure

```
awaz-do-hackathon/
├── app/
│   ├── globals.css          # Global styles and design system
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Landing page component (with GSAP)
│   └── page.module.css      # Component-specific styles
├── public/                  # Static assets
├── package.json             # Dependencies (includes GSAP)
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── README-SETUP.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A code editor (VS Code recommended)

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd awaz-do-hackathon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install:
   - `gsap` - Animation library with ScrollTrigger plugin
   - All other Next.js dependencies

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - You should see the landing page with all animations working

## 🎨 Color Palette

```css
--background: #ffffff          (White)
--foreground: #0f0f0f          (Dark Gray/Black)
--text-primary: #0f0f0f        (Dark text)
--text-secondary: #666666      (Medium gray)
--text-muted: #999999          (Light gray)
--border: #e5e5e5              (Light border)
--accent: #0066cc              (Blue accent)
--accent-hover: #0052a3        (Darker blue)
--card-bg: #f9f9f9             (Light background)
```

## 🎬 GSAP Animation Details

### Hero Section
- **Title**: Fades in from bottom (0.8s)
- **Subtitle**: Follows with slight delay (0.6s)
- **Button**: Appears after subtitle (0.6s)
- **Illustration**: Scales up with elastic ease (0.8s)

### Scroll-Triggered Animations
- **Feature Cards**: Staggered fade-in + slide-up (0.8s each)
- **Steps**: Alternating left/right slide-in (0.8s each)
- **Benefits**: Staggered fade-in (0.7s each)

### Interactive Animations
- **Button Hover**: Scale up to 1.05x
- **Card Hover**: Lift effect (-8px) with shadow
- All transitions use ease-out for smooth deceleration

## 📱 Responsive Breakpoints

- **Desktop**: Full 2-column layouts for hero and features
- **Tablet (768px)**: Single column layouts, adjusted font sizes
- **Mobile**: Stack all content vertically, simplified navigation

## 🔧 Customization Guide

### Changing Colors
Edit `app/globals.css` and update the CSS variables in the `:root` selector:
```css
:root {
  --accent: #your-color-here;
  --accent-hover: #your-hover-color;
}
```

### Modifying Animation Speed
In `app/page.tsx`, adjust the `duration` property of GSAP animations:
```javascript
gsap.from(element, {
  duration: 0.8,  // Change this value
  ease: 'power2.out'
})
```

### Adding New Sections
1. Add JSX markup in `page.tsx`
2. Create corresponding styles in `page.module.css`
3. Add GSAP animation refs and animations in `useEffect`

### Changing Navbar Links
Edit the `navLinks` array in the navbar section of `page.tsx`

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm run build
# Then push to GitHub and connect to Vercel
```

### Deploy to Other Platforms
```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 📋 Component API

### page.tsx Props
- No props - this is a page component
- Uses refs for GSAP animations
- Client component with 'use client' directive

### GSAP Usage
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Timeline animations
const timeline = gsap.timeline();

// Scroll-triggered animations
gsap.from(element, {
  opacity: 0,
  scrollTrigger: {
    trigger: element,
    start: 'top 80%'
  }
});
```

## 🔍 Performance Optimizations

- CSS modules for scoped styling
- Minimal GSAP animations (performant)
- No external fonts loaded (system fonts)
- Responsive images placeholders
- Hardware-accelerated transforms

## 🐛 Troubleshooting

### Animations not showing?
- Ensure GSAP is installed: `npm install gsap`
- Check browser console for errors
- Verify ScrollTrigger is registered

### Styles not applying?
- Make sure you're using CSS modules correctly
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`

### Navbar not sticky?
- Verify `position: sticky; top: 0; z-index: 100;` in `.navbar`
- Check browser DevTools for CSS conflicts

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Next.js Documentation](https://nextjs.org/docs)
- [CSS Modules Guide](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

## 📝 Future Enhancements

Potential additions:
- Dark mode toggle
- Additional feature sections
- Blog section
- Testimonials carousel
- Pricing page
- User authentication
- Report submission form integration
- Analytics integration

## 📄 License

This project is part of the Awaz civic-tech initiative.

---

**Created:** May 2026
**Framework:** Next.js 16 with React 19
**Styling:** CSS Modules + Tailwind CSS 4
**Animations:** GSAP 3.12 with ScrollTrigger
