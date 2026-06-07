'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/SectionNav.module.css';

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('');
  const isClickedScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickedScrolling.current) return;

      const sections = ['about', 'journey', 'certificates', 'projects', 'contact'];
      const triggerLine = window.scrollY + window.innerHeight * 0.3; // 30% from the top of the viewport
      
      let activeId = '';
      let maxTop = -1;
      
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= triggerLine && top > maxTop) {
            maxTop = top;
            activeId = id;
          }
        }
      });

      if (window.scrollY < 150) {
        setActiveSection('');
      } else {
        setActiveSection(activeId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to set initial active section
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      setActiveSection(id);
      isClickedScrolling.current = true;
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      el.scrollIntoView({ behavior: 'smooth' });
      
      scrollTimeoutRef.current = setTimeout(() => {
        isClickedScrolling.current = false;
      }, 800);
    }
  };

  return (
    <nav className={styles.dockContainer} aria-label="Section Navigation">
      {/* 1. About Section Link */}
      <button
        onClick={() => scrollToSection('about')}
        className={`${styles.navItem} ${activeSection === 'about' ? styles.navItemActive : ''}`}
        aria-label="Scroll to About Me section"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className={styles.tooltip}>About Me</span>
      </button>

      {/* 2. Journey Section Link */}
      <button
        onClick={() => scrollToSection('journey')}
        className={`${styles.navItem} ${activeSection === 'journey' ? styles.navItemActive : ''}`}
        aria-label="Scroll to My Journey section"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        <span className={styles.tooltip}>My Journey</span>
      </button>

      {/* 3. Certificates Section Link */}
      <button
        onClick={() => scrollToSection('certificates')}
        className={`${styles.navItem} ${activeSection === 'certificates' ? styles.navItemActive : ''}`}
        aria-label="Scroll to Professional Credentials section"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
        <span className={styles.tooltip}>Credentials</span>
      </button>

      {/* 4. Projects Section Link */}
      <button
        onClick={() => scrollToSection('projects')}
        className={`${styles.navItem} ${activeSection === 'projects' ? styles.navItemActive : ''}`}
        aria-label="Scroll to Featured Projects section"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <span className={styles.tooltip}>Featured Projects</span>
      </button>

      {/* 5. Contact Section Link */}
      <button
        onClick={() => scrollToSection('contact')}
        className={`${styles.navItem} ${activeSection === 'contact' ? styles.navItemActive : ''}`}
        aria-label="Scroll to Contact section"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className={styles.tooltip}>Contact Me</span>
      </button>

      {/* Divider */}
      <div className={styles.divider} />

      {/* 6. GitHub External Link */}
      <a
        href="https://github.com/Sanjai07knightrider"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.navItem}
        aria-label="View Github profile in a new tab"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span className={styles.tooltip}>GitHub Profile</span>
      </a>

      {/* 7. LinkedIn External Link */}
      <a
        href="https://www.linkedin.com/in/sanjai-ramanathan-623414353/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.navItem}
        aria-label="View LinkedIn profile in a new tab"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
        <span className={styles.tooltip}>LinkedIn Connection</span>
      </a>
    </nav>
  );
}
