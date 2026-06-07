'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 'planora',
    title: 'PlanOra – Campus Event Management Ecosystem',
    tagline: 'Campus Event Management Ecosystem',
    description: 'A full-stack MERN platform designed to automate campus event registrations, approvals, certificates, notifications, and analytics in a centralized ecosystem.',
    details: [
      'Event creation and approval workflow',
      'Student registration management',
      'QR-based attendance tracking',
      'Digital certificate generation',
      'Event analytics dashboard',
      'Role-based access management'
    ],
    techTags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    githubUrl: 'https://github.com/Sanjai07knightrider/planora',
    demoUrl: 'https://planora-event.vercel.app',
    badge: 'MERN STACK',
    status: 'Completed',
    outcome: 'Successfully developed a complete event management system capable of handling campus-level programs and administrative workflows.',
    metrics: [
      '450+ Registrations',
      'Certificate Automation',
      'Multi-Role Access',
      'Analytics Dashboard'
    ],
    previewSlides: [
      { name: 'Event Management Dashboard', img: '/images/projects/planora-dashboard.png' },
      { name: 'Program Configuration', img: '/images/projects/planora-program-config.png' },
      { name: 'Certificate Editor', img: '/images/projects/planora-certificate-editor.png' },
      { name: 'Form & QR Management', img: '/images/projects/planora-form-qr.png' }
    ],
    renderGraphic: () => (
      <div className={styles.graphicPlanora}>
        <div className={styles.boardColumn}>
          <div className={styles.columnHeader}>To Do</div>
          <div className={styles.boardCard}>Venue Setup</div>
          <div className={styles.boardCard}>Catering RSVP</div>
        </div>
        <div className={styles.boardColumn}>
          <div className={styles.columnHeader}>In Progress</div>
          <div className={`${styles.boardCard} ${styles.cardActive}`}>
            Stage Lighting
            <div className={styles.pulseDot} />
          </div>
        </div>
        <div className={styles.calendarWidget}>
          <div className={styles.calHeader}>June 2026</div>
          <div className={styles.calGrid}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className={`${styles.calCell} ${i === 4 ? styles.calActive : ''}`} />
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ev-dashboard',
    title: 'Electric Vehicle Analytics Dashboard',
    tagline: 'Electric Vehicle Adoption Analytics Dashboard',
    description: 'A Tableau dashboard built using Kaggle EV datasets to analyze electric vehicle adoption trends, brand distribution, vehicle types, and state-wise market growth.',
    details: [
      'EV adoption trend analysis',
      'Brand-wise market share',
      'State-wise EV distribution',
      'BEV vs PHEV comparison',
      'Interactive Tableau visualizations',
      'Data cleaning and preparation'
    ],
    techTags: ['Tableau', 'Excel', 'Kaggle Dataset', 'Data Visualization'],
    githubUrl: 'https://github.com/Sanjai07knightrider/ev-fleet-telemetry',
    demoUrl: 'https://ev-telemetry-hud.vercel.app',
    badge: 'DATA ANALYTICS',
    status: 'Completed',
    outcome: 'Delivered actionable insights into EV adoption patterns and market behavior through interactive visual analytics.',
    metrics: [
      '130K+ Records Analyzed',
      '50 States Covered',
      'BEV vs PHEV Analysis',
      'Tableau Dashboard'
    ],
    previewSlides: [
      { name: 'EV Analytics Dashboard', img: '/images/projects/ev-dashboard-main.png' },
      { name: 'State-wise EV Distribution', img: '/images/projects/ev-state-map.png' },
      { name: 'Brand-wise Market Share', img: '/images/projects/ev-brand-analysis.png' },
      { name: 'Model-wise Vehicle Analysis', img: '/images/projects/ev-model-table.png' }
    ],
    renderGraphic: () => (
      <div className={styles.graphicEv}>
        {/* Glowing Speedometer Ring */}
        <div className={styles.speedRing}>
          <svg viewBox="0 0 100 100" className={styles.gaugeSvg}>
            <circle cx="50" cy="50" r="40" className={styles.gaugeTrack} />
            <circle cx="50" cy="50" r="40" className={styles.gaugeProgress} />
          </svg>
          <div className={styles.speedVal}>
            <span className={styles.speedNum}>88</span>
            <span className={styles.speedUnit}>% SO H</span>
          </div>
        </div>
        {/* Telemetry Chart Lines */}
        <div className={styles.chartWidget}>
          <svg className={styles.chartSvg} viewBox="0 0 140 60">
            <path d="M 0 50 Q 30 20 60 40 T 120 10 T 140 30" fill="none" stroke="rgba(255, 80, 0, 0.75)" strokeWidth="2" />
            <path d="M 0 50 Q 30 20 60 40 T 120 10 T 140 30 L 140 60 L 0 60 Z" fill="rgba(255, 80, 0, 0.08)" />
          </svg>
          <div className={styles.chartLabel}>Battery Drain Rate</div>
        </div>
      </div>
    )
  },
  {
    id: 'faculty-lms',
    title: 'Faculty Management & Academic Analytics System',
    tagline: 'Faculty Management & Academic Analytics System',
    description: 'A MERN-based academic administration platform for managing faculty records, attendance, reports, student performance, and departmental workflows.',
    details: [
      'Faculty dashboard',
      'Batch management',
      'Attendance tracking',
      'Academic record management',
      'Performance analytics',
      'Report generation'
    ],
    techTags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    githubUrl: 'https://github.com/Sanjai07knightrider/faculty-lms',
    demoUrl: 'https://faculty-lms-portal.vercel.app',
    badge: 'ACADEMIC MANAGEMENT',
    status: 'Completed',
    outcome: 'Simplified academic management and improved visibility into student performance analytics.',
    metrics: [
      'Batch Management',
      'Attendance Tracking',
      'Academic Analytics',
      'Report Generation'
    ],
    previewSlides: [
      { name: 'Faculty Analytics Dashboard', img: '/images/projects/faculty-dashboard.png' },
      { name: 'Course Management', img: '/images/projects/faculty-courses.png' },
      { name: 'Results & Analytics', img: '/images/projects/faculty-results.png' },
      { name: 'Timetable Management', img: '/images/projects/faculty-timetable.png' }
    ],
    renderGraphic: () => (
      <div className={styles.graphicLms}>
        <div className={styles.studentList}>
          <div className={styles.studentRow}>
            <span className={styles.avatar}>🧑‍💻</span>
            <div className={styles.studentInfo}>
              <div className={styles.studentName}>Adithya K.</div>
              <div className={styles.studentStatus}>Submitted</div>
            </div>
            <span className={`${styles.gradeBadge} ${styles.gradeA}`}>A+</span>
          </div>
          <div className={styles.studentRow}>
            <span className={styles.avatar}>👩‍💻</span>
            <div className={styles.studentInfo}>
              <div className={styles.studentName}>Shreya S.</div>
              <div className={styles.studentStatus}>Pending</div>
            </div>
            <span className={`${styles.gradeBadge} ${styles.gradePending}`}>--</span>
          </div>
        </div>
        <div className={styles.progressWidget}>
          <div className={styles.progressHeader}>
            <span>Grading progress</span>
            <span>76%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '76%' }} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'plant-disease',
    title: 'AI-Powered Plant Disease Detection System',
    tagline: 'AI-Based Plant Disease Detection System',
    description: 'An AI-powered crop disease detection system using Hugging Face pre-trained models and Torch-based inference to identify plant diseases from leaf images.',
    details: [
      'Leaf image upload',
      'AI disease prediction',
      'Confidence score generation',
      'Treatment recommendations',
      'Fast inference pipeline',
      'Agricultural assistance support'
    ],
    techTags: ['Python', 'Torch', 'Hugging Face', 'Machine Learning', 'Computer Vision'],
    githubUrl: 'https://github.com/Sanjai07knightrider/plant-disease-detection',
    demoUrl: 'https://plant-health-diagnostics.vercel.app',
    badge: 'AI / COMPUTER VISION',
    status: 'Active Development',
    outcome: 'Demonstrated practical AI application in agriculture through automated disease identification and prediction.',
    metrics: [
      'AI Prediction',
      'Hugging Face Model',
      'Torch Inference',
      'Disease Classification'
    ],
    previewSlides: [
      { name: 'AI Disease Prediction Interface', img: '/images/projects/plant-prediction.png' },
      { name: 'Result Analysis Screen', img: '/images/projects/plant-result-analysis.png' },
      { name: 'Treatment Recommendation Screen', img: '/images/projects/plant-treatment.png' },
      { name: 'Plant Health Monitoring Dashboard', img: '/images/projects/plant-dashboard.png' }
    ],
    renderGraphic: () => (
      <div className={styles.graphicPlant}>
        {/* Simulated Leaf Scanning Box */}
        <div className={styles.leafScanner}>
          <svg className={styles.leafSvg} viewBox="0 0 60 60">
            {/* Simple Leaf Vector Outline */}
            <path d="M 30 5 C 45 20, 55 40, 30 55 C 5 40, 15 20, 30 5" fill="none" stroke="rgba(255, 80, 0, 0.4)" strokeWidth="1.5" />
            <path d="M 30 5 L 30 55 M 30 20 Q 38 15 42 22 M 30 30 Q 40 25 45 35 M 30 20 Q 22 15 18 22 M 30 30 Q 20 25 15 35" fill="none" stroke="rgba(255, 80, 0, 0.4)" strokeWidth="1" />
          </svg>
          {/* Laser Scanner Sweep Line */}
          <div className={styles.scanLine} />
          {/* HUD Target Corners */}
          <div className={styles.scanTargetCornerTL} />
          <div className={styles.scanTargetCornerTR} />
          <div className={styles.scanTargetCornerBL} />
          <div className={styles.scanTargetCornerBR} />
        </div>
        <div className={styles.diagnosticsOverlay}>
          <div className={styles.diagTitle}>Early Blight</div>
          <div className={styles.diagConfidence}>98.4% Confidence</div>
        </div>
      </div>
    )
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setActiveSlideIdx(0);
    setImageError(false);
  }, [selectedProject]);

  useEffect(() => {
    setImageError(false);
  }, [activeSlideIdx]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.fromTo(
        `.${styles.sectionLabel}, .${styles.sectionHeading}, .${styles.sectionDivider}`,
        {
          opacity: 0,
          y: 35,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.sectionLabel}`,
            start: 'top 85%',
          },
        }
      );

      // 2. Stagger Reveal of Project Cards
      gsap.fromTo(
        `.${styles.projectCard}`,
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.18,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      {/* Ambient background glow elements */}
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowBottom} />

      <div className={styles.container}>
        <p className={styles.sectionLabel}>MY WORK</p>
        <h2 className={styles.sectionHeading}>Featured Projects</h2>
        <div className={styles.sectionDivider} />

        {/* Projects Grid */}
        <div className={styles.grid} ref={gridRef}>
          {projectsData.map((project) => (
            <div key={project.id} className={styles.projectCard} id={`project-card-${project.id}`}>
              {/* Dynamic Simulated Graphic Preview Panel */}
              <div className={styles.graphicPanel}>
                <div className={styles.graphicPanelOverlay} />
                <div className={styles.cardBadges}>
                  <span className={styles.projectBadge}>{project.badge}</span>
                  <span className={`${styles.statusBadge} ${project.status === 'Completed' ? styles.statusCompleted : styles.statusActive}`}>
                    {project.status}
                  </span>
                </div>
                {project.renderGraphic()}
              </div>

              {/* Text Information Panel */}
              <div className={styles.infoPanel}>
                <div className={styles.titleRow}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.cardCornerDecoration} />
                </div>

                <h4 className={styles.projectTagline}>{project.tagline}</h4>
                <p className={styles.projectDescription}>{project.description}</p>

                {/* Key Details List */}
                <ul className={styles.detailsList}>
                  {project.details.map((detail, index) => (
                    <li key={index} className={styles.detailItem}>
                      <span className={styles.bulletSymbol}>⚡</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges / Tags */}
                <div className={styles.tagsContainer}>
                  {project.techTags.map((tag) => (
                    <span key={tag} className={styles.techTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* GitHub & Project Preview Action Row */}
                <div className={styles.actionRow}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionBtn} ${styles.githubBtn}`}
                    id={`btn-github-${project.id}`}
                  >
                    <svg viewBox="0 0 24 24" className={styles.btnIcon}>
                      <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                    Code
                  </a>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                    }}
                    className={`${styles.actionBtn} ${styles.previewBtn}`}
                    id={`btn-preview-${project.id}`}
                  >
                    <svg viewBox="0 0 24 24" className={styles.btnIcon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Project Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Project Preview Modal ── */}
      {selectedProject && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}
          id="project-preview-modal-overlay"
        >
          <div className={styles.modal} id="project-preview-modal">
            {/* Close button */}
            <button
              className={styles.modalClose}
              onClick={() => setSelectedProject(null)}
              id="project-preview-close-btn"
            >
              ✕
            </button>

            <div className={styles.modalGrid}>
              {/* Left Column: Carousel & Tech */}
              <div className={styles.modalLeftCol}>
                <div className={styles.carouselContainer}>
                  <div className={styles.carouselViewport}>
                    {imageError ? (
                      <div className={styles.imageFallbackPlaceholder}>
                        <div className={styles.fallbackContent}>
                          <span className={styles.fallbackIcon}>📊</span>
                          <h4 className={styles.fallbackTitle}>{selectedProject.previewSlides[activeSlideIdx].name}</h4>
                          <p className={styles.fallbackMsg}>Image Coming Soon</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        key={activeSlideIdx}
                        src={selectedProject.previewSlides[activeSlideIdx].img}
                        alt={selectedProject.previewSlides[activeSlideIdx].name}
                        className={styles.carouselImg}
                        onError={() => setImageError(true)}
                      />
                    )}
                    {!imageError && (
                      <div className={styles.carouselOverlay}>
                        <span className={styles.slideName}>
                          {selectedProject.previewSlides[activeSlideIdx].name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Carousel Nav */}
                  {selectedProject.previewSlides.length > 1 && (
                    <div className={styles.carouselControls}>
                      <button
                        className={styles.carouselBtn}
                        onClick={() =>
                          setActiveSlideIdx(
                            (idx) => (idx - 1 + selectedProject.previewSlides.length) % selectedProject.previewSlides.length
                          )
                        }
                      >
                        ←
                      </button>
                      <div className={styles.carouselDots}>
                        {selectedProject.previewSlides.map((_, i) => (
                          <button
                            key={i}
                            className={`${styles.carouselDot} ${i === activeSlideIdx ? styles.carouselDotActive : ''}`}
                            onClick={() => setActiveSlideIdx(i)}
                          />
                        ))}
                      </div>
                      <button
                        className={styles.carouselBtn}
                        onClick={() =>
                          setActiveSlideIdx((idx) => (idx + 1) % selectedProject.previewSlides.length)
                        }
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>

                {/* Project metrics achievement badges */}
                <div className={styles.modalMetricsSection}>
                  <h4 className={styles.modalSectionTitle}>Project Highlights</h4>
                  <div className={styles.modalMetrics}>
                    {selectedProject.metrics.map((metric) => (
                      <span key={metric} className={styles.modalMetricBadge}>
                        • {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.modalTechSection}>
                  <h4 className={styles.modalSectionTitle}>Technologies Used</h4>
                  <div className={styles.modalTags}>
                    {selectedProject.techTags.map((tag) => (
                      <span key={tag} className={styles.modalTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Information & Outcomes */}
              <div className={styles.modalRightCol}>
                <div className={styles.modalHeader}>
                  <div className={styles.badgeRow}>
                    <span className={styles.modalBadge}>{selectedProject.badge}</span>
                    <span className={`${styles.statusBadge} ${selectedProject.status === 'Completed' ? styles.statusCompleted : styles.statusActive}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                  <p className={styles.modalSubtitle}>{selectedProject.tagline}</p>
                </div>

                <div className={styles.modalContentBody}>
                  <div className={styles.modalSection}>
                    <h4 className={styles.modalSectionTitle}>Overview</h4>
                    <p className={styles.modalText}>{selectedProject.description}</p>
                  </div>

                  <div className={styles.modalSection}>
                    <h4 className={styles.modalSectionTitle}>Key Features</h4>
                    <ul className={styles.featuresList}>
                      {selectedProject.details.map((feature, i) => (
                        <li key={i} className={styles.featureItem}>
                          <span className={styles.featureCheck}>✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.modalSection}>
                    <h4 className={styles.modalSectionTitle}>Impact &amp; Outcome</h4>
                    <p className={styles.modalText}>{selectedProject.outcome}</p>
                  </div>
                </div>

                {/* Footer action row */}
                <div className={styles.modalFooter}>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalGithubBtn}
                  >
                    <svg viewBox="0 0 24 24" className={styles.btnIcon}>
                      <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                    View Repository
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
