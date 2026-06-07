'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CinematicLayer from './CinematicLayer';
import styles from '../styles/VideoIntro.module.css';

export default function VideoIntro() {
  const containerRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Automatically hide sound badge after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSoundBadge(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Synchronized Autoplay & Entrance Animations
  useEffect(() => {
    const startVideos = async () => {
      try {
        if (fgVideoRef.current) {
          fgVideoRef.current.muted = isMuted;
          await fgVideoRef.current.play();
        }
        if (bgVideoRef.current) {
          bgVideoRef.current.muted = true;
          await bgVideoRef.current.play();
        }
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay was prevented. User click required.", err);
        setIsPlaying(false);
      }
    };
    
    startVideos();

    // ─── Premium Cinematic GSAP Entrance Timeline ────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Grab individual title spans for line-by-line reveal
      const titleSpans = containerRef.current.querySelectorAll(`.${styles.title} span`);
      const span0 = titleSpans[0] || null;
      const span1 = titleSpans[1] || null;

      // ── Initial hidden states — softer blur for smoother unblur transition
      const hide = (target, extra = {}) =>
        gsap.set(target, { opacity: 0, y: 24, filter: 'blur(6px)', ...extra });

      hide(`.${styles.statusBadge}`);
      hide(`.${styles.tagline}`);
      if (span0) gsap.set(span0, { opacity: 0, y: 32, filter: 'blur(5px)' });
      if (span1) gsap.set(span1, { opacity: 0, y: 32, filter: 'blur(5px)' });
      hide(`.${styles.subtitle}`);
      hide(`.${styles.buttonContainer}`);
      gsap.set(`.${styles.statCard}`, { opacity: 0, y: 28, scale: 0.94, filter: 'blur(5px)' });
      hide(`.${styles.socialSection}`);
      // Video card: starts at rest scale, mild tilt, cinematic blur
      gsap.set(`.${styles.videoFrameContainer}`, {
        opacity: 0, scale: 0.92, y: 36,
        rotateY: 7, filter: 'blur(12px)',
      });
      // Atmosphere layers start invisible
      gsap.set(`.${styles.glowOverlayOrange}`,  { opacity: 0 });
      gsap.set(`.${styles.glowOverlayFog}`,     { opacity: 0 });
      gsap.set(`.${styles.glowOverlayFlare}`,   { opacity: 0 });
      gsap.set(`.${styles.frameBloom}`,         { opacity: 0 });
      gsap.set(`.${styles.frameRadialGlow}`,    { opacity: 0 });
      gsap.set(`.${styles.scrollIndicator}`,    { opacity: 0, y: -10 });

      // ── Reveal shorthand — each step gets a generous breathing gap
      const show = (target, dur = 1.0, extra = {}) =>
        tl.to(target, { opacity: 1, y: 0, filter: 'blur(0px)', duration: dur, ...extra }, '+=0.07');

      // Step 1 — Availability badge
      show(`.${styles.statusBadge}`, 0.90);

      // Step 2 — Role label
      show(`.${styles.tagline}`, 0.90);

      // Step 3 — "Sanjai" — title line 1
      if (span0) tl.to(span0, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }, '+=0.06');

      // Step 4 — "Ramanathan" — title line 2
      if (span1) tl.to(span1, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }, '+=0.08');

      // Step 5 — Description paragraph
      show(`.${styles.subtitle}`, 0.95);

      // Step 6 — CTA buttons
      show(`.${styles.buttonContainer}`, 0.90);

      // Step 7 — Stat cards: staggered reveal with orange glow pulse
      tl.to(`.${styles.statCard}`, {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        duration: 0.90, stagger: 0.12, ease: 'power3.out',
      }, '+=0.07');

      // Post-appear orange glow micro-pulse (card feels alive after landing)
      tl.to(`.${styles.statCard}`, {
        boxShadow: '0 0 30px rgba(255,90,0,0.24), 0 10px 40px rgba(0,0,0,0.60)',
        duration: 0.45, stagger: 0.09, ease: 'power2.out',
        yoyo: true, repeat: 1,
      }, '-=0.3');

      // Step 8 — Social icons
      show(`.${styles.socialSection}`, 0.90);

      // Step 9 — Video card: slow, cinematic, full transform unwind
      tl.to(`.${styles.videoFrameContainer}`, {
        opacity: 1, scale: 1, y: 0,
        rotateY: 0, filter: 'blur(0px)',
        duration: 1.50, ease: 'power3.out',
      }, '+=0.14');

      // Step 10 — Fire atmosphere fades in as the video settles
      tl.to([
        `.${styles.glowOverlayOrange}`,
        `.${styles.glowOverlayFog}`,
        `.${styles.glowOverlayFlare}`,
        `.${styles.frameBloom}`,
        `.${styles.frameRadialGlow}`,
      ], {
        opacity: 1, duration: 2.0, ease: 'power2.inOut', stagger: 0.10,
      }, '-=1.0');

      // Step 11 — Scroll indicator fades in last, very gently
      tl.to(`.${styles.scrollIndicator}`, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      }, '-=0.6');

    }, containerRef);

    return () => ctx.revert();
  }, []);


  const handlePlayPause = (e) => {
    e.stopPropagation();
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    
    if (nextPlaying) {
      fgVideoRef.current?.play().catch(console.error);
      bgVideoRef.current?.play().catch(console.error);
    } else {
      fgVideoRef.current?.pause();
      bgVideoRef.current?.pause();
    }
  };

  const handleMuteUnmute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    
    if (fgVideoRef.current) {
      fgVideoRef.current.muted = nextMuted;
    }
    setShowSoundBadge(false);
  };

  const handleExploreProjectsClick = () => {
    const nextSection = document.getElementById('projects');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDownClick = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section ref={containerRef} className={styles.hero} id="home">
      {/* 
        RIGHT SIDE VIEWPORT ATMOSPHERE MASK (55%-100% viewport containment)
        Contains: background video, ambient glows, and Three.js canvas.
        Leaves left 55% completely dark, clean, and keynote-focused.
      */}
      <div className={styles.rightCinematicZone}>
        {/* Ambient Blurred Background Video Layer */}
        <div className={styles.bgVideoContainer}>
          <video
            ref={bgVideoRef}
            className={styles.bgVideo}
            src="/video/intro.mp4"
            loop
            muted
            playsInline
            autoPlay
          />
        </div>

        {/* Ambient Glows */}
        <div className={styles.ambientGlowOrange} />
        <div className={styles.ambientGlowBlue} />

        {/* Three.js Particle System (Rendered inside the Right Mask Container) */}
        <CinematicLayer />
      </div>

      {/* Main Hero Content Layout Grid */}
      <div className={styles.gridContainer}>
        {/* LEFT SIDE STRUCTURE: Apple Keynote Profile */}
        <div className={styles.textSection}>
          
          {/* 1. Availability Badge */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Available for Internships & Freelance
          </div>

          {/* 2. Role Label */}
          <p className={styles.tagline}>AI & Data Science Student</p>
          
          {/* 3. Main Heading */}
          <h1 className={styles.title}>
            <span>Sanjai</span>
            <span>Ramanathan</span>
          </h1>
          
          {/* 4. Personal Brand Statement (wraps exactly on 4 lines) */}
          <p className={styles.subtitle}>
            Building intelligent applications,<br />
            data-driven dashboards, and modern<br />
            digital experiences that create<br />
            real-world impact.
          </p>
          
          {/* 5. CTA Buttons */}
          <div className={styles.buttonContainer}>
            <button className={styles.btnPrimary} onClick={handleExploreProjectsClick}>
              {/* Rocket SVG */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}>
                <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
                <path d="M12 12l9-9-9 9Z" />
                <path d="M12 12a15 15 0 0 1 5.5-3.5L21 3l-5.5 3.5A15 15 0 0 1 12 12Z" />
                <path d="M12 12a15 15 0 0 0-3.5 5.5L3 21l3.5-5.5A15 15 0 0 0 12 12Z" />
                <circle cx="12" cy="12" r="1.5" />
              </svg>
              <span>Explore Projects</span>
            </button>
            <a
              href="/Sanjai_Ramanathan_Resume.pdf"
              download="Sanjai_Ramanathan_Resume.pdf"
              className={styles.btnSecondary}
            >
              {/* Download SVG */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>

          {/* 6. Statistics Section (4 columns horizontally) */}
          <div className={styles.statsGrid}>
            
            {/* Card 1: Projects Built */}
            <div className={styles.statCard}>
              <div className={styles.statIconWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <span className={styles.statNumber}>4+</span>
              <span className={styles.statLabel}>Projects Built</span>
            </div>

            {/* Card 2: CGPA */}
            <div className={styles.statCard}>
              <div className={styles.statIconWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <span className={styles.statNumber}>8.5</span>
              <span className={styles.statLabel}>CGPA</span>
            </div>

            {/* Card 3: Internship */}
            <div className={styles.statCard}>
              <div className={styles.statIconWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <span className={styles.statNumber}>1+</span>
              <span className={styles.statLabel}>Internship</span>
            </div>

            {/* Card 4: Leadership Roles */}
            <div className={styles.statCard}>
              <div className={styles.statIconWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className={styles.statNumber}>2+</span>
              <span className={styles.statLabel}>Leadership Roles</span>
            </div>

          </div>

          {/* 7. Social Section (Bullet separated) */}
          <div className={styles.socialSection}>
            <a href="https://github.com/Sanjai07knightrider" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <div className={styles.socialCircle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span>GitHub</span>
            </a>
            
            <span className={styles.socialSeparator}>•</span>

            <a href="https://www.linkedin.com/in/sanjai-ramanathan-623414353/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <div className={styles.socialCircle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <span>LinkedIn</span>
            </a>

            <span className={styles.socialSeparator}>•</span>

            <a href="mailto:sanjaiking4729@gmail.com" className={styles.socialLink}>
              <div className={styles.socialCircle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span>Email</span>
            </a>
          </div>

        </div>

        {/* RIGHT SIDE STRUCTURE: Large Cinematic Video Card */}
        <div className={styles.videoSection}>
          {/* Ambient Glow behind video frame */}
          <div className={styles.glowOverlayOrange} />
          <div className={styles.glowOverlayBlue} />
          {/* Orange fog warmth layer */}
          <div className={styles.glowOverlayFog} />
          {/* Bottom cinematic light flare */}
          <div className={styles.glowOverlayFlare} />

          {/* Multi-layer premium display container */}
          <div className={styles.videoFrameContainer}>
            {/* Layer 4: Soft atmospheric bloom */}
            <div className={styles.frameBloom} />

            {/* Layer 3: Large radial glow */}
            <div className={styles.frameRadialGlow} />

            {/* Layer 1 & 2: Sharp orange border & outer glow (the frame itself) */}
            <div className={styles.videoFrame}>
              {/* Tap for sound badge */}
              <div className={`${styles.soundBadge} ${!showSoundBadge ? styles.badgeHidden : ''}`}>
                <span className={styles.soundBadgePulse} />
                Tap for sound
              </div>

              {/* Video Wrapper for fallback transition */}
              <div className={styles.videoWrapper}>
                <video
                  ref={fgVideoRef}
                  onLoadedData={handleVideoLoad}
                  className={styles.fgVideo}
                  src="/video/intro.mp4"
                  poster="/images/portrait_fallback.png"
                  loop
                  muted={isMuted}
                  playsInline
                  autoPlay
                  onClick={handleMuteUnmute}
                />
                
                {/* Fallback Image */}
                <div className={`${styles.videoFallback} ${isVideoLoaded ? styles.fallbackFadeOut : ''}`}>
                  <img
                    src="/images/portrait_fallback.png"
                    alt="Sanjai Ramanathan Portrait"
                    className={styles.fallbackImg}
                  />
                </div>
              </div>

              {/* Custom Glassmorphism Video Controls */}
              <div className={styles.controlsOverlay}>
                <button 
                  className={styles.controlBtn} 
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="4" y="4" width="4" height="16" rx="1" />
                      <rect x="16" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <span className={styles.divider} />

                <button 
                  className={styles.controlBtn} 
                  onClick={handleMuteUnmute}
                  aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                >
                  {isMuted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center: Scroll Indicator */}
      <div className={styles.scrollIndicator} onClick={handleScrollDownClick}>
        <span className={styles.scrollText}>Scroll Down</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
