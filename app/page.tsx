'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navbarRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonRef = useRef(null);
  const heroIllustrationRef = useRef(null);
  const featureCardsRef = useRef<HTMLDivElement[]>([]);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const benefitsRef = useRef<HTMLDivElement[]>([]);
  const ctaSectionRef = useRef(null);

  useEffect(() => {
    // Hero animations on page load
    const timeline = gsap.timeline();

    timeline
      .from(heroTitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      })
      .from(
        heroSubtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.6'
      )
      .from(
        heroButtonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .from(
        heroIllustrationRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out(1.2)',
        },
        '-=0.6'
      );

    // Feature cards stagger animation
    featureCardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        ease: 'power2.out',
      });
    });

    // Steps animation with stagger
    stepsRef.current.forEach((step, index) => {
      gsap.from(step, {
        opacity: 0,
        x: index % 2 === 0 ? -30 : 30,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        ease: 'power2.out',
      });
    });

    // Benefits animation
    benefitsRef.current.forEach((benefit, index) => {
      gsap.from(benefit, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: benefit,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        ease: 'power2.out',
      });
    });

    // CTA section animation
    gsap.from(ctaSectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: ctaSectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Button hover animation
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonHoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  // Card hover animation
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -8,
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleCardHoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div className={styles.root}>
      {/* Navbar */}
      <nav ref={navbarRef} className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>
            <div className={styles.logo}>🏙️</div>
            <span className={styles.brandName}>Awaz</span>
          </div>

          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
            <a href="#how-it-works" className={styles.navLink}>
              How It Works
            </a>
            <a href="#impact" className={styles.navLink}>
              Impact
            </a>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
          </div>

          <button
            className={styles.ctaButton}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonHoverOut}
          >
            Report Issue
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 ref={heroTitleRef} className={styles.heroTitle}>
              Report Issues.<br />
              Fix Your City.
            </h1>
            <p ref={heroSubtitleRef} className={styles.heroSubtitle}>
              A modern civic-tech platform that helps citizens report public
              issues with image uploads, get AI-recommended authorities, and send
              auto-generated emails—all in seconds.
            </p>
            <button
              ref={heroButtonRef}
              className={styles.primaryButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonHoverOut}
            >
              Start Reporting Now
            </button>
          </div>

          <div ref={heroIllustrationRef} className={styles.heroIllustration}>
            <div className={styles.illuBox1}></div>
            <div className={styles.illuBox2}></div>
            <div className={styles.illuBox3}></div>
            <div className={styles.illuCircle}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Powerful Features</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to report and resolve civic issues
          </p>

          <div className={styles.featureGrid}>
            {[
              {
                icon: '📸',
                title: 'Upload & Describe',
                description:
                  'Capture photos or describe the issue in detail. Our system accepts images and written reports.',
              },
              {
                icon: '🤖',
                title: 'AI Analysis',
                description:
                  'Advanced algorithms analyze your report and categorize the issue for better routing.',
              },
              {
                icon: '✉️',
                title: 'Auto-Generated Emails',
                description:
                  'Get ready-to-send draft emails with all necessary details for relevant authorities.',
              },
              {
                icon: '⚡',
                title: 'Fast & Easy',
                description:
                  'Report an issue in under 2 minutes. No complex forms, just simple steps.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) featureCardsRef.current[index] = el;
                }}
                className={styles.featureCard}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardHoverOut}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            A simple 4-step process to make civic change
          </p>

          <div className={styles.stepsContainer}>
            {[
              {
                number: '1',
                title: 'Capture or Describe',
                description: 'Take a photo of the issue or type a detailed description',
              },
              {
                number: '2',
                title: 'AI Analysis',
                description: 'Our system analyzes and categorizes your report',
              },
              {
                number: '3',
                title: 'Authority Match',
                description: 'Get the right department or authority to contact',
              },
              {
                number: '4',
                title: 'Send Email',
                description: 'Send the auto-generated email with one click',
              },
            ].map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className={styles.step}
              >
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className={styles.impact}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why It Matters</h2>
          <p className={styles.sectionSubtitle}>
            Empower citizens, improve cities, drive change
          </p>

          <div className={styles.benefitsGrid}>
            {[
              {
                title: 'Civic Engagement',
                description:
                  'Every citizen has a voice. Our platform makes reporting issues accessible to everyone, encouraging active participation in community improvement.',
              },
              {
                title: 'Faster Resolution',
                description:
                  'By connecting citizens directly with the right authorities and providing detailed information, issues get resolved faster.',
              },
              {
                title: 'Data-Driven Insights',
                description:
                  'Aggregate reports reveal patterns and priorities, helping cities allocate resources more effectively.',
              },
              {
                title: 'Transparency',
                description:
                  'Track the status of reported issues and see how municipalities are responding to citizen concerns.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) benefitsRef.current[index] = el;
                }}
                className={styles.benefitCard}
              >
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Make a Difference?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of citizens reporting issues and improving their cities.
              Start now—it only takes seconds.
            </p>
            <button
              className={styles.primaryButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonHoverOut}
            >
              Report Your First Issue
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.footerBrand}>
                <span className={styles.footerLogo}>🏙️</span>
                <span className={styles.footerBrandName}>Awaz</span>
              </div>
              <p className={styles.footerDescription}>
                Making cities smarter, one report at a time.
              </p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Product</h4>
                <a href="#features" className={styles.footerLink}>
                  Features
                </a>
                <a href="#how-it-works" className={styles.footerLink}>
                  How It Works
                </a>
                <a href="#" className={styles.footerLink}>
                  Pricing
                </a>
              </div>

              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Company</h4>
                <a href="#" className={styles.footerLink}>
                  About
                </a>
                <a href="#" className={styles.footerLink}>
                  Blog
                </a>
                <a href="#contact" className={styles.footerLink}>
                  Contact
                </a>
              </div>

              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Legal</h4>
                <a href="#" className={styles.footerLink}>
                  Privacy
                </a>
                <a href="#" className={styles.footerLink}>
                  Terms
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>
              &copy; 2026 Awaz. Making cities smarter. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
