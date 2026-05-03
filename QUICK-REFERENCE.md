# 🚀 Quick Reference Guide - Code Snippets & Customizations

## Adding GSAP Animations to New Elements

### Basic Fade-In on Scroll
```javascript
const myElementRef = useRef(null);

// In useEffect:
gsap.from(myElementRef.current, {
  opacity: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: myElementRef.current,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  ease: 'power2.out',
});

// In JSX:
<div ref={myElementRef}>Content</div>
```

### Staggered Animation
```javascript
const elementsRef = useRef<HTMLDivElement[]>([]);

// In useEffect:
elementsRef.current.forEach((element, index) => {
  gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: index * 0.1, // Stagger by 0.1s
    ease: 'power2.out',
  });
});

// In JSX:
<div ref={(el) => { if (el) elementsRef.current[0] = el; }}>Item 1</div>
```

### Scroll Trigger with Advanced Controls
```javascript
gsap.from('.my-element', {
  opacity: 0,
  x: -50,
  duration: 1,
  scrollTrigger: {
    trigger: '.my-element',
    start: 'top center',        // When trigger top hits viewport center
    end: 'bottom center',       // When trigger bottom hits viewport center
    scrub: true,               // Link animation to scrollbar (1 = smooth)
    markers: true,             // Debug markers (remove in production)
    toggleActions: 'play pause resume reset',
  },
});
```

## Changing Colors

### Update Accent Color
```css
/* In app/globals.css */
:root {
  --accent: #10b981;           /* Change from #0066cc to emerald */
  --accent-hover: #059669;     /* Corresponding hover state */
}
```

### Update Card Background
```css
/* In app/page.module.css */
.featureCard {
  background-color: #f0f9ff;  /* Light blue instead of #f9f9f9 */
}
```

## Common Customizations

### 1. Change Navbar Height
```css
.navbar {
  /* Default padding creates ~60-70px height */
  padding: 1.5rem;  /* Increase to 1.5rem for taller navbar */
}

.navContainer {
  /* Gap between navbar items */
  gap: 3rem;  /* Increase from 2rem */
}
```

### 2. Modify Button Style
```css
.primaryButton {
  background-color: #0066cc;  /* Change color */
  padding: 1.25rem 2.5rem;    /* Increase padding */
  border-radius: 1rem;        /* Increase roundness */
  font-weight: 700;           /* Make bolder */
}
```

### 3. Adjust Animation Speed
```javascript
// In page.tsx useEffect:

// Make animations faster
gsap.from(heroTitleRef.current, {
  opacity: 0,
  y: 30,
  duration: 0.4,  // Changed from 0.8
  ease: 'power2.out',
});

// Or slower
gsap.from(heroTitleRef.current, {
  opacity: 0,
  y: 30,
  duration: 1.2,  // Changed from 0.8
  ease: 'power2.out',
});
```

### 4. Change Section Padding
```css
/* In page.module.css */
.features {
  padding: 8rem 1rem;  /* Increase from 6rem */
}

.hero {
  padding: 4rem 1rem;  /* Decrease from 5rem */
}
```

### 5. Modify Typography Sizes
```css
.sectionTitle {
  font-size: 3rem;    /* Increase from 2.5rem */
  line-height: 1.1;
}

.heroTitle {
  font-size: 4rem;    /* Increase from 3.5rem */
}
```

## Adding New Sections

### Template for New Section
```typescript
// 1. Add ref in component
const newSectionRef = useRef<HTMLDivElement[]>([]);

// 2. Add animation in useEffect
newSectionRef.current.forEach((item, index) => {
  gsap.from(item, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    delay: index * 0.1,
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    ease: 'power2.out',
  });
});

// 3. Add JSX markup
<section className={styles.newSection}>
  <div className={styles.container}>
    <h2 className={styles.sectionTitle}>Section Title</h2>
    <div className={styles.itemGrid}>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) newSectionRef.current[index] = el;
          }}
          className={styles.itemCard}
        >
          {/* Content */}
        </div>
      ))}
    </div>
  </div>
</section>

// 4. Add styles in page.module.css
.newSection {
  padding: 6rem 1rem;
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
}

.itemGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.itemCard {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e5e5;
}
```

## Layout Patterns

### Two Column with Image
```css
.twoColumnContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 768px) {
  .twoColumnContainer {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

### Centered Content
```css
.centeredContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
}

.centeredContent > * {
  max-width: 600px;
}
```

### Sticky Element
```css
.stickyElement {
  position: sticky;
  top: 80px;  /* Leave room for navbar */
  z-index: 50;
}
```

## GSAP Easing Functions

Popular easing functions for animations:

```javascript
// Smooth ease-outs (most common)
ease: 'power2.out'    // Smooth deceleration
ease: 'power3.out'    // Stronger deceleration
ease: 'power4.out'    // Very strong deceleration

// Bouncy effects
ease: 'back.out(1.2)' // Slight overshoot
ease: 'elastic.out'   // Springy effect

// Linear and polynomial
ease: 'linear'        // No easing
ease: 'sine.out'      // Smooth curve
ease: 'quad.out'      // Light curve
```

## Common Issues & Solutions

### Problem: Animations Not Triggering
```javascript
// Solution: Ensure refs are properly assigned
ref={(el) => {
  if (el) cardsRef.current[index] = el;  // Add null check
}}
```

### Problem: Styles Not Applying
```javascript
// Solution: Verify import path
import styles from './page.module.css';  // Correct
// import styles from './styles.css';     // Wrong - not a module

// Then use:
className={styles.featureCard}  // Correct
// className="featureCard"        // Wrong
```

### Problem: Scroll Animations Too Aggressive
```javascript
// Solution: Adjust trigger point
scrollTrigger: {
  trigger: element,
  start: 'top 60%',  // Trigger when element reaches 60% of viewport
  // top 80% = triggers later (more conservative)
  // top 50% = triggers earlier (more aggressive)
}
```

### Problem: Mobile Layout Breaking
```css
/* Solution: Always include mobile breakpoint */
@media (max-width: 768px) {
  .twoColumnLayout {
    grid-template-columns: 1fr;  /* Stack on mobile */
  }
}
```

## Performance Tips

### 1. Minimize GSAP Objects
```javascript
// Good - reuse timeline
const timeline = gsap.timeline();
timeline
  .from(el1, { opacity: 0 })
  .from(el2, { opacity: 0 });

// Avoid - creating multiple timelines
gsap.from(el1, { opacity: 0 });
gsap.from(el2, { opacity: 0 });
```

### 2. Use GPU Acceleration
```javascript
// Good - use transform for animations
gsap.to(element, {
  y: -20,      // Uses translateY (GPU)
  duration: 0.3
});

// Avoid - animating position
gsap.to(element, {
  top: -20,    // Triggers layout recalc
  duration: 0.3
});
```

### 3. Kill Animations on Cleanup
```javascript
useEffect(() => {
  // Create animations...
  
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

## Responsive Type Sizes

```css
/* Desktop */
h1 { font-size: 3.5rem; }
h2 { font-size: 2.5rem; }
h3 { font-size: 1.75rem; }
p  { font-size: 1rem; }

/* Tablet & Mobile */
@media (max-width: 768px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.25rem; }
  p  { font-size: 0.95rem; }
}
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

For more details, see [README-SETUP.md](./README-SETUP.md) and [LANDING-PAGE-GUIDE.md](./LANDING-PAGE-GUIDE.md)
