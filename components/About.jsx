'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/About.module.css';

gsap.registerPlugin(ScrollTrigger);

const techBadges = [
  {
    name: 'React',
    id: 'react',
    class: styles.logoLarge,
    x: '-220px', y: '-110px',
    xMob: '-150px', yMob: '-75px',
    xXS: '-130px', yXS: '-65px',
    floatDuration: '4.5s', floatDelay: '0s',
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348">
        <circle r="2.05" fill="currentColor"/>
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Next.js',
    id: 'next',
    class: styles.logoLarge,
    x: '-230px', y: '0px',
    xMob: '-160px', yMob: '0px',
    xXS: '-140px', yXS: '0px',
    floatDuration: '5.2s', floatDelay: '-1.2s',
    svg: (
      <svg viewBox="0 0 128 128" fill="none">
        <path d="M64 0C28.656 0 0 28.656 0 64S28.656 128 64 128C99.314 128 128 99.314 128 64S99.314 0 64 0ZM103.543 97.433L79.166 64.912V98.114H71.503V53.253H79.136L103.559 85.83V53.253H111.23V97.433H103.543Z" fill="currentColor"/>
        <path d="M79.135 64.93L53.774 31.08C50.218 33.513 47.098 36.574 44.521 40.158L69.308 73.197L79.135 64.93Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Python',
    id: 'python',
    class: styles.logoLarge,
    x: '-220px', y: '110px',
    xMob: '-150px', yMob: '75px',
    xXS: '-130px', yXS: '65px',
    floatDuration: '5.8s', floatDelay: '-2.4s',
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2C6.5 2 6 2.5 6 8H12V9H4C2.5 9 2 9.5 2 15C2 20.5 2.5 21 8 21H10V18C10 16 11 15 13 15H17C18.5 15 19 14.5 19 9C19 3.5 18.5 2 12 2M8.5 5.5C9.3 5.5 10 6.2 10 7C10 7.8 9.3 8.5 8.5 8.5C7.7 8.5 7 7.8 7 7C7 6.2 7.7 5.5 8.5 5.5M12 22C17.5 22 18 21.5 18 16H12V15H20C21.5 15 22 14.5 22 9C22 3.5 21.5 3 16 3H14V6C14 8 13 9 11 9H7C5.5 9 5 9.5 5 15C5 20.5 5.5 22 12 22M15.5 18.5C14.7 18.5 14 17.8 14 17C14 16.2 14.7 15.5 15.5 15.5C16.3 15.5 17 16.2 17 17C17 17.8 16.3 18.5 15.5 18.5Z"/>
      </svg>
    )
  },
  {
    name: 'TensorFlow',
    id: 'tensorflow',
    class: styles.logoMedium,
    x: '-110px', y: '-260px',
    xMob: '-75px', yMob: '-180px',
    xXS: '-65px', yXS: '-155px',
    floatDuration: '6.4s', floatDelay: '-0.6s',
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2.69l5.62 3.24v6.49L12 15.66 6.38 12.42V5.93L12 2.69M12 1L4.5 5.33v9.33L12 19l7.5-4.33V5.33L12 1z"/>
        <path fill="currentColor" d="M12 6.5v6.5l5.5-3.17V6.66L12 6.5z"/>
      </svg>
    )
  },
  {
    name: 'MongoDB',
    id: 'mongodb',
    class: styles.logoMedium,
    x: '220px', y: '110px',
    xMob: '150px', yMob: '75px',
    xXS: '130px', yXS: '65px',
    floatDuration: '4.9s', floatDelay: '-3.1s',
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2C11.5 2 6 7.6 6 12C6 16.4 12 22 12 22S18 16.4 18 12C18 7.6 12.5 2 12 2M12 4.4C14.1 6.8 15.6 9.5 15.8 11.2H12V4.4M12 20V13.2H15.8C15.2 15.8 13.7 18.2 12 20M8.2 11.2C8.4 9.5 9.9 6.8 12 4.4V11.2H8.2M12 13.2V20C10.3 18.2 8.8 15.8 8.2 13.2H12Z"/>
      </svg>
    )
  },
  {
    name: 'SQL',
    id: 'sql',
    class: styles.logoMedium,
    x: '230px', y: '0px',
    xMob: '160px', yMob: '0px',
    xXS: '140px', yXS: '0px',
    floatDuration: '5.5s', floatDelay: '-1.8s',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    )
  },
  {
    name: 'Node.js',
    id: 'node',
    class: styles.logoLarge,
    x: '220px', y: '-110px',
    xMob: '150px', yMob: '-75px',
    xXS: '130px', yXS: '-65px',
    floatDuration: '6.1s', floatDelay: '-4.3s',
    svg: (
      <svg viewBox="0 0 256 292">
        <path fill="currentColor" d="M128 0L24.8 60v120l103.2 60 103.2-60V60L128 0zm-8 214.4l-71.2-41.2V92l71.2 41.2v81.2zm88-41.2l-71.2 41.2V133.2l71.2-41.2v81.2z"/>
      </svg>
    )
  },
  {
    name: 'Docker',
    id: 'docker',
    class: styles.logoMedium,
    x: '110px', y: '-260px',
    xMob: '75px', yMob: '-180px',
    xXS: '65px', yXS: '-155px',
    floatDuration: '6.7s', floatDelay: '-2.9s',
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.983 11.078h2.119v-2.006h-2.119v2.006zm-2.737 0h2.119v-2.006h-2.119v2.006zm-2.737 0h2.12v-2.006h-2.12v2.006zm-2.737 0h2.119v-2.006H5.772v2.006zm-2.737 0h2.119v-2.006H3.035v2.006zm2.737-2.61h2.119V6.462H5.772v2.006zm2.737 0h2.12V6.462h-2.12v2.006zm2.737 0h2.119V6.462h-2.119v2.006zm-2.737-2.61h2.12V3.852h-2.12v2.006zM23.762 13.43c-.45-.487-1.37-.887-2.516-.887h-.427c-.015-.052-.015-.09-.03-.142-.254-.853-.78-1.545-1.468-2.01L19.2 10.3c.36.262.63.637.765 1.087h-9.9v1.89h10.455c.42.008.855-.09 1.2-.285.345-.195.63-.51.78-.885l.135-.33a1.455 1.455 0 0 0 1.127.66h.12a1.86 1.86 0 0 0 1.86-1.86c0-.525-.21-.99-.54-1.32l-.54.21z"/>
        <path fill="currentColor" d="M19.08 13.79c-.015-.06-.03-.12-.045-.18H1.6c-.03.285-.045.57-.045.855C1.555 18 6.07 20.143 10.875 20.143c4.805 0 8.205-2.143 8.205-5.638v-.715z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    id: 'github',
    class: styles.logoMedium,
    x: '-110px', y: '260px',
    xMob: '-75px', yMob: '180px',
    xXS: '-65px', yXS: '155px',
    floatDuration: '4.2s', floatDelay: '-0.8s',
    svg: (
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
      </svg>
    )
  },
  {
    name: 'OpenCV',
    id: 'opencv',
    class: styles.logoMedium,
    x: '0px', y: '-290px',
    xMob: '0px', yMob: '-200px',
    xXS: '0px', yXS: '-175px',
    floatDuration: '5.0s', floatDelay: '-3.5s',
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="8"/>
        <circle cx="32" cy="65" r="20" fill="none" stroke="currentColor" strokeWidth="8"/>
        <circle cx="68" cy="65" r="20" fill="none" stroke="currentColor" strokeWidth="8"/>
      </svg>
    )
  },
  {
    name: 'Power BI',
    id: 'powerbi',
    class: styles.logoMedium,
    x: '0px', y: '280px',
    xMob: '0px', yMob: '200px',
    xXS: '0px', yXS: '175px',
    floatDuration: '5.6s', floatDelay: '-1.5s',
    svg: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="14" width="4" height="10" rx="1" fill="currentColor"/>
        <rect x="9" y="8" width="4" height="16" rx="1" fill="currentColor"/>
        <rect x="16" y="2" width="4" height="22" rx="1" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Tableau',
    id: 'tableau',
    class: styles.logoMedium,
    x: '110px', y: '260px',
    xMob: '75px', yMob: '180px',
    xXS: '65px', yXS: '155px',
    floatDuration: '6.2s', floatDelay: '-4.7s',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round">
        <path strokeWidth="8" d="M50 20v60M20 50h60"/>
        <path strokeWidth="5" d="M50 5v10M50 85v10M5 50h10M85 50h10"/>
        <path strokeWidth="4.5" d="M28 28v6M25 31h6"/>
        <path strokeWidth="4.5" d="M72 28v6M69 31h6"/>
        <path strokeWidth="4.5" d="M28 72v6M25 75h6"/>
        <path strokeWidth="4.5" d="M72 72v6M69 75h6"/>
      </svg>
    )
  }
];

const portraitBackgroundEmbers = [
  { id: 'pbg1', size: '3.5px', top: '15%', left: '20%', duration: '7s', delay: '0s', xEnd: '15px' },
  { id: 'pbg2', size: '2.0px', top: '45%', left: '15%', duration: '9s', delay: '-2s', xEnd: '-10px' },
  { id: 'pbg3', size: '4.0px', top: '35%', left: '75%', duration: '8s', delay: '-4s', xEnd: '20px' },
  { id: 'pbg4', size: '2.0px', top: '75%', left: '80%', duration: '10s', delay: '-1s', xEnd: '-15px' },
  { id: 'pbg5', size: '3.0px', top: '10%', left: '70%', duration: '6s', delay: '-3s', xEnd: '10px' },
  { id: 'pbg6', size: '2.5px', top: '65%', left: '25%', duration: '8.5s', delay: '-5s', xEnd: '12px' },
  { id: 'pbg7', size: '2.0px', top: '80%', left: '30%', duration: '9.5s', delay: '-7s', xEnd: '-12px' },
  { id: 'pbg8', size: '3.0px', top: '30%', left: '85%', duration: '7.5s', delay: '-3.5s', xEnd: '18px' }
];

const particles = [
  { id: 1, duration: '14s', delay: '0s', top: '15%', left: '20%', x1: '0px', y1: '0px', x2: '60px', y2: '30px', maxOpacity: 0.10 },
  { id: 2, duration: '17s', delay: '-3s', top: '45%', right: '20%', x1: '0px', y1: '0px', x2: '-50px', y2: '-25px', maxOpacity: 0.08 },
  { id: 3, duration: '13s', delay: '-6s', bottom: '20%', left: '25%', x1: '0px', y1: '0px', x2: '40px', y2: '-40px', maxOpacity: 0.12 },
  { id: 4, duration: '16s', delay: '-9s', top: '30%', right: '30%', x1: '0px', y1: '0px', x2: '-50px', y2: '40px', maxOpacity: 0.10 },
  { id: 5, duration: '19s', delay: '-2s', bottom: '25%', right: '28%', x1: '0px', y1: '0px', x2: '-45px', y2: '-35px', maxOpacity: 0.12 },
  { id: 6, duration: '14s', delay: '-11s', top: '28%', left: '35%', x1: '0px', y1: '0px', x2: '-30px', y2: '60px', maxOpacity: 0.08 }
];

const leftEmbers = [
  { id: 'l1', size: '3.5px', left: '3%', bottom: '-10%', xEnd: '60px', duration: '12s', delay: '0s' },
  { id: 'l2', size: '1.8px', left: '12%', bottom: '-10%', xEnd: '-40px', duration: '15s', delay: '-3s' },
  { id: 'l3', size: '2.5px', left: '22%', bottom: '-10%', xEnd: '50px', duration: '18s', delay: '-6s' },
  { id: 'l4', size: '4.5px', left: '6%', bottom: '-10%', xEnd: '30px', duration: '14s', delay: '-9s' },
  { id: 'l5', size: '1.8px', left: '18%', bottom: '-10%', xEnd: '-50px', duration: '16s', delay: '-12s' },
  { id: 'l6', size: '3.5px', left: '26%', bottom: '-10%', xEnd: '40px', duration: '13s', delay: '-4s' },
  { id: 'l7', size: '2.5px', left: '10%', bottom: '-10%', xEnd: '-30px', duration: '17s', delay: '-7s' },
  { id: 'l8', size: '1.8px', left: '20%', bottom: '-10%', xEnd: '60px', duration: '19s', delay: '-10s' },
  { id: 'l9', size: '3.0px', left: '14%', bottom: '-10%', xEnd: '25px', duration: '15s', delay: '-1s' },
  { id: 'l10', size: '1.8px', left: '25%', bottom: '-10%', xEnd: '-35px', duration: '13s', delay: '-5s' }
];

const centerEmbers = [
  { id: 'c1', size: '2.5px', left: '40%', bottom: '-10%', xEnd: '20px', duration: '11s', delay: '-1s' },
  { id: 'c2', size: '1.8px', left: '46%', bottom: '-10%', xEnd: '-20px', duration: '14s', delay: '-4s' },
  { id: 'c3', size: '3.5px', left: '52%', bottom: '-10%', xEnd: '15px', duration: '16s', delay: '-7s' },
  { id: 'c4', size: '1.8px', left: '36%', bottom: '-10%', xEnd: '-15px', duration: '13s', delay: '-10s' },
  { id: 'c5', size: '2.5px', left: '60%', bottom: '-10%', xEnd: '25px', duration: '15s', delay: '-13s' },
  { id: 'c6', size: '2.0px', left: '48%', bottom: '-10%', xEnd: '-10px', duration: '12s', delay: '-2s' },
  { id: 'c7', size: '1.8px', left: '44%', bottom: '-10%', xEnd: '18px', duration: '17s', delay: '-8s' },
  { id: 'c8', size: '3.0px', left: '56%', bottom: '-10%', xEnd: '-18px', duration: '14s', delay: '-11s' }
];

const rightEmbers = [
  { id: 'r1', size: '2.5px', right: '5%', bottom: '-10%', xEnd: '-45px', duration: '20s', delay: '-2s' },
  { id: 'r2', size: '1.8px', right: '15%', bottom: '-10%', xEnd: '30px', duration: '25s', delay: '-7s' },
  { id: 'r3', size: '3.5px', right: '25%', bottom: '-10%', xEnd: '-30px', duration: '22s', delay: '-12s' },
  { id: 'r4', size: '1.8px', right: '35%', bottom: '-10%', xEnd: '20px', duration: '24s', delay: '-17s' },
  { id: 'r5', size: '2.5px', right: '20%', bottom: '-10%', xEnd: '-25px', duration: '21s', delay: '-9s' },
  { id: 'r6', size: '2.0px', right: '10%', bottom: '-10%', xEnd: '15px', duration: '23s', delay: '-4s' }
];

const portraitSparks = [
  { id: 1, size: '2.5px', top: '10%', left: '-6px', duration: '5s', delay: '0s' },
  { id: 2, size: '1.8px', top: '80%', right: '-6px', duration: '6s', delay: '-1.5s' },
  { id: 3, size: '2.0px', bottom: '-6px', left: '20%', duration: '4s', delay: '-3s' },
  { id: 4, size: '2.5px', top: '-6px', right: '15%', duration: '7s', delay: '-4.5s' }
];

export default function About() {
  const sectionRef = useRef(null);
  const [activeBadge, setActiveBadge] = useState(null);
  const [spotlightBadgeId, setSpotlightBadgeId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * techBadges.length);
      setSpotlightBadgeId(techBadges[randomIndex].id);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headers reveal
      gsap.fromTo(`.${styles.sectionLabel}, .${styles.sectionHeading}, .${styles.sectionDivider}`, {
        opacity: 0, y: 30, filter: 'blur(8px)',
      }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.0, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.sectionLabel}`, start: 'top 82%' },
      });

      // Portrait and floating logos ecosystem slide-in
      gsap.fromTo(`.${styles.portraitCol}`, {
        opacity: 0, x: -50, filter: 'blur(10px)',
      }, {
        opacity: 1, x: 0, filter: 'blur(0px)',
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.portraitCol}`, start: 'top 80%' },
      });

      // Bio text lines stagger reveal
      gsap.fromTo(`.${styles.bioText} > *`, {
        opacity: 0, y: 24, filter: 'blur(6px)',
      }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.9, stagger: 0.10, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.bioText}`, start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      {/* Background ambient glows */}
      <div className={styles.ambientLeft} />
      <div className={styles.ambientRight} />

      {/* Left side fire workshop sparks */}
      {leftEmbers.map((e) => (
        <span key={e.id} className={`${styles.ember} ${styles.emberLeft}`} style={{
          left: e.left, bottom: e.bottom, width: e.size, height: e.size, '--duration': e.duration, '--delay': e.delay, '--x-end': e.xEnd
        }} />
      ))}
      
      {/* Center embers around portrait */}
      {centerEmbers.map((e) => (
        <span key={e.id} className={`${styles.ember} ${styles.emberCenter}`} style={{
          left: e.left, bottom: e.bottom, width: e.size, height: e.size, '--duration': e.duration, '--delay': e.delay, '--x-end': e.xEnd
        }} />
      ))}
      
      {/* Right embers (distant, low opacity) */}
      {rightEmbers.map((e) => (
        <span key={e.id} className={`${styles.ember} ${styles.emberRight}`} style={{
          right: e.right, bottom: e.bottom, width: e.size, height: e.size, '--duration': e.duration, '--delay': e.delay, '--x-end': e.xEnd
        }} />
      ))}

      <div className={styles.container}>
        <p className={styles.sectionLabel}>WHO I AM</p>
        <h2 className={styles.sectionHeading}>About Me</h2>
        <div className={styles.sectionDivider} />

        <div className={styles.grid}>
          {/* LEFT — Interactive Portrait & Concentric Technology Orbit */}
          <div className={styles.portraitCol}>
            {/* Ambient connecting dots particles */}
            {particles.map((p) => (
              <span
                key={p.id}
                className={styles.ambientParticle}
                style={{
                  top: p.top || 'auto',
                  bottom: p.bottom || 'auto',
                  left: p.left || 'auto',
                  right: p.right || 'auto',
                  '--duration': p.duration,
                  '--delay': p.delay,
                  '--x1': p.x1,
                  '--y1': p.y1,
                  '--x2': p.x2,
                  '--y2': p.y2,
                  '--max-opacity': p.maxOpacity
                }}
              />
            ))}

            {/* Background Energy Glows behind portrait */}
            <div className={styles.portraitBackgroundGlow} />
            <div className={styles.portraitHaze} />

            {/* Cinematic background embers behind portrait */}
            <div className={styles.pbgEmbersContainer}>
              {portraitBackgroundEmbers.map((e) => (
                <span
                  key={e.id}
                  className={styles.emberBehind}
                  style={{
                    top: e.top,
                    left: e.left,
                    width: e.size,
                    height: e.size,
                    '--duration': e.duration,
                    '--delay': e.delay,
                    '--x-end': e.xEnd
                  }}
                />
              ))}
            </div>

            {/* Cinematic subtle connection lines */}
            <svg className={styles.connectionLines} viewBox="-300 -300 600 600">
              <defs>
                {techBadges.map((badge) => {
                  const tx = parseInt(badge.x);
                  const ty = parseInt(badge.y);
                  const gradId = `grad-${badge.id}`;
                  return (
                    <React.Fragment key={`defs-grad-${badge.id}`}>
                      <linearGradient id={gradId} x1="0" y1="0" x2={tx} y2={ty} gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ff7828" stopOpacity="0" />
                        <stop offset="25%" stopColor="#ff7828" stopOpacity="0" />
                        <stop offset="55%" stopColor="#ff7828" stopOpacity="0.12" />
                        <stop offset="85%" stopColor="#ff7828" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#ff7828" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id={`${gradId}-glow`} x1="0" y1="0" x2={tx} y2={ty} gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ff7828" stopOpacity="0" />
                        <stop offset="25%" stopColor="#ff7828" stopOpacity="0" />
                        <stop offset="55%" stopColor="#ff7828" stopOpacity="0.08" />
                        <stop offset="85%" stopColor="#ff7828" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#ff7828" stopOpacity="0" />
                      </linearGradient>
                    </React.Fragment>
                  );
                })}
              </defs>
              {techBadges.map((badge) => {
                const tx = parseInt(badge.x);
                const ty = parseInt(badge.y);
                const gradId = `grad-${badge.id}`;
                return (
                  <g key={`line-${badge.id}`}>
                    <line
                      x1="0"
                      y1="0"
                      x2={tx}
                      y2={ty}
                      stroke={`url(#${gradId}-glow)`}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <line
                      x1="0"
                      y1="0"
                      x2={tx}
                      y2={ty}
                      stroke={`url(#${gradId})`}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            <div className={styles.portraitFrame}>
              <div className={styles.portraitGlowOuter} />
              <div className={styles.portraitGlowInner} />
              
              <div className={styles.portraitBorder}>
                <div className={styles.portraitImgWrap}>
                  <img
                    src="/images/portrait_fallback.png"
                    className={styles.portraitImg}
                    alt="Sanjai Ramanathan"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div className={styles.portraitFallback} style={{ display: 'none' }}>
                    <div className={styles.portraitInitials}>SR</div>
                    <p className={styles.portraitName}>Sanjai Ramanathan</p>
                  </div>
                </div>
              </div>

              {/* Corner accent brackets */}
              <div className={`${styles.corner} ${styles.cornerTL}`} />
              <div className={`${styles.corner} ${styles.cornerTR}`} />
              <div className={`${styles.corner} ${styles.cornerBL}`} />
              <div className={`${styles.corner} ${styles.cornerBR}`} />

              {/* Portrait micro sparks */}
              {portraitSparks.map((spark) => (
                <span
                  key={spark.id}
                  className={styles.portraitSpark}
                  style={{
                    top: spark.top || 'auto',
                    bottom: spark.bottom || 'auto',
                    left: spark.left || 'auto',
                    right: spark.right || 'auto',
                    width: spark.size,
                    height: spark.size,
                    '--duration': spark.duration,
                    '--delay': spark.delay
                  }}
                />
              ))}
            </div>

            {/* Floating Tech Logos badged around portrait */}
            {techBadges.map((badge) => (
              <div
                key={badge.id}
                className={`${styles.logoContainer} ${badge.class}`}
                style={{
                  '--x-offset': badge.x,
                  '--y-offset': badge.y,
                  '--x-offset-mob': badge.xMob,
                  '--y-offset-mob': badge.yMob,
                  '--x-offset-xs': badge.xXS,
                  '--y-offset-xs': badge.yXS,
                }}
              >
                <div
                  className={styles.logoFloat}
                  style={{
                    '--float-duration': badge.floatDuration,
                    '--float-delay': badge.floatDelay,
                  }}
                >
                  <div
                    className={`${styles.logoBadge} ${activeBadge === badge.id ? styles.activeLabel : ''} ${spotlightBadgeId === badge.id ? styles.spotlightActive : ''}`}
                    id={`tech-badge-${badge.id}`}
                    onClick={() => setActiveBadge(activeBadge === badge.id ? null : badge.id)}
                    onMouseLeave={() => setActiveBadge(null)}
                  >
                    <div className={styles.logoSvgWrapper}>
                      {badge.svg}
                    </div>
                    <span className={styles.tooltip}>{badge.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Bio */}
          <div className={styles.contentCol}>
            <div className={styles.bioText}>
              <span className={styles.bioRole}>AI &amp; Data Science Student · Full Stack Developer</span>

              <p className={styles.bioPara}>
                I&apos;m <strong>Sanjai Ramanathan</strong> — a B.Tech AI &amp; Data Science student at Nandha Engineering
                College with a CGPA of 8.5+, driven by a passion for building intelligent, data-powered digital experiences.
              </p>

              <p className={styles.bioPara}>
                I specialize in bridging the gap between <span className={styles.accent}>artificial intelligence</span> and
                modern web development — creating applications that don&apos;t just look premium but solve real-world problems
                through smart engineering.
              </p>

              <p className={styles.bioPara}>
                Beyond academics, I serve as <span className={styles.accent}>Secretary of the AI &amp; DS Department</span> and
                held the role of Joint Treasurer, reflecting my commitment to leadership and community growth. I also completed
                a <span className={styles.accent}>Data Science Internship</span> with Training Trains, gaining hands-on
                industry experience.
              </p>

              <div className={styles.pillRow}>
                <span className={styles.pill}>AI &amp; Machine Learning</span>
                <span className={styles.pill}>Full Stack</span>
                <span className={styles.pill}>Data Analytics</span>
                <span className={styles.pill}>Student Leader</span>
              </div>

              <p className={styles.closingStatement}>
                Building intelligent products that combine AI, data, and modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
