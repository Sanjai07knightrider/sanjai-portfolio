'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/Journey.module.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '2009 – 2023',
    icon: '🏫',
    title: 'School Education',
    category: 'Academic Foundation',
    subtitle: 'Primary & Secondary Education',
    desc: 'Completed primary and secondary education at Appu Arivaalayem CBSE Secondary School, building a strong foundation in math, logical thinking, and communication skills.',
    highlight: null,
    orgBadge: 'Appu Arivaalayem CBSE Secondary School',
    progress: 'School Education → B.Tech AI & DS',
    techSectionTitle: 'CORE SKILLS BUILT',
    tech: ['Mathematics', 'Science', 'Logical Reasoning', 'Communication'],
    highlights: [
      'Strong academic performance throughout schooling',
      'Built a solid foundation in Mathematics and Science',
      'Participated in school cultural and academic activities',
      'Developed discipline, leadership, and teamwork skills'
    ],
    slides: [
      { title: 'Appu Arivaalayem CBSE Secondary School', desc: 'The institution where my educational journey began and academic foundation was built.', img: '/images/journey/school_building.jpg' },
      { title: 'School Memories', desc: 'Graduating with strong academic values, friendships, and lifelong memories.', img: '/images/journey/school_memories.jpeg' }
    ]
  },
  {
    year: '2023',
    icon: '🎓',
    title: 'Joined Nandha Engineering College',
    category: 'Higher Education',
    subtitle: 'Erode, Tamil Nadu',
    desc: 'Joined Nandha Engineering College in 2023 and began my B.Tech journey in Artificial Intelligence & Data Science. This step introduced me to programming, AI concepts, data analytics, teamwork, and professional growth.',
    highlight: null,
    orgBadge: 'Nandha Engineering College',
    progress: 'School Education → B.Tech AI & DS',
    techSectionTitle: 'FOUNDATION BUILT',
    tech: ['Programming Basics', 'AI Fundamentals', 'Data Analytics', 'Team Collaboration'],
    highlights: [
      'Joined AI & Data Science department',
      'Adapted to engineering academics and college life',
      'Built interest in AI, data analytics, and full stack development',
      'Started developing teamwork, communication, and leadership skills'
    ],
    slides: [
      { title: 'Nandha Engineering College', desc: 'The place where my engineering journey officially began.', img: '/images/journey/college_entrance.jpeg' },
      { title: 'Campus Memories', desc: 'Exploring college life, building friendships, participating in events, and creating unforgettable memories.', img: '/images/campus.jpg' }
    ]
  },
  {
    year: '2023 – 2027',
    icon: '🏛️',
    title: 'B.Tech AI & Data Science',
    category: 'Degree Programme',
    subtitle: 'Undergraduate Degree',
    desc: 'Pursuing a Bachelor’s Degree in Artificial Intelligence & Data Science while actively participating in projects, internships, leadership activities, technical events, and continuous learning.',
    highlight: null,
    orgBadge: 'Nandha Engineering College',
    techSectionTitle: 'College Journey Highlights',
    tech: ['Academic Growth', 'Technical Exposure', 'Leadership Development', 'Industry Experience'],
    highlights: [
      'Artificial Intelligence & Data Science specialization',
      'Technical seminars and stage presentations',
      'Symposiums, workshops, and competitions',
      'Leadership roles and teamwork experience',
      'Project development and internship exposure'
    ],
    slides: [
      { title: 'Classroom Learning', desc: 'Building strong foundations in Artificial Intelligence, Data Science, and modern software development through academic learning and practical coursework.', img: '/images/journey/ai_learning.svg' },
      { title: 'Technical Presentations', desc: 'Presented seminars and technical topics, improving communication skills, confidence, and public speaking abilities.', img: '/images/journey/department_labs.jpeg' },
      { title: 'Symposium & Events', desc: 'Actively participated in technical symposiums, workshops, and competitions while expanding industry exposure and networking.', img: '/images/journey/technical_workshops.jpeg' },
      { title: 'College Memories', desc: 'Creating unforgettable memories with friends, faculty, events, achievements, and experiences throughout the engineering journey.', img: '/images/journey/campus12.jpeg' }
    ],
    progressSectionTitle: 'What This Journey Built',
    progressList: [
      'Technical Knowledge',
      'Communication Skills',
      'Leadership Confidence',
      'Professional Growth'
    ]
  },
  {
    year: 'Current',
    icon: '🏆',
    title: 'CGPA 8.5+ Achievement',
    category: 'Academic Excellence',
    subtitle: 'Academic Achievement',
    desc: 'Maintaining a CGPA of 8.5+ throughout the Artificial Intelligence & Data Science program while actively participating in projects, internships, leadership activities, and technical events.',
    highlight: 'strong',
    orgBadge: null,
    techSectionTitle: 'ACADEMIC STRENGTHS',
    tech: ['Academic Discipline', 'Continuous Learning', 'Problem Solving', 'Consistency'],
    highlights: [
      'Consistent CGPA above 8.5',
      'Balanced academics with projects and internships',
      'Strong performance across core AI & Data Science subjects',
      'Maintained academic discipline throughout college',
      'Demonstrated continuous learning and improvement'
    ],
    slides: [
      { title: 'Academic Excellence', desc: 'Maintaining a strong CGPA of 8.5+ while balancing academics, projects, internships, and leadership responsibilities.', img: '/images/journey/academic_certificates.png', isCertificate: true },
      { title: 'Consistent Performance', desc: 'Demonstrating steady academic growth across semesters through discipline, continuous learning, and dedication.', img: '/images/journey/merit_achievements.svg', isCertificate: true }
    ],
    progressSectionTitle: 'WHAT THIS ACHIEVEMENT REFLECTS',
    progressList: [
      'Consistency',
      'Dedication',
      'Time Management',
      'Growth Mindset'
    ]
  },
  {
    year: '2026 – 2027',
    icon: '⭐',
    title: 'Secretary – AI & DS Department',
    category: 'Leadership',
    subtitle: 'Student Leadership',
    desc: 'Serving as Secretary of the AI & DS Department, responsible for leading student initiatives, organizing events, coordinating teams, and strengthening communication between students and faculty.',
    highlight: 'strong',
    orgBadge: null,
    techSectionTitle: 'LEADERSHIP SKILLS',
    tech: ['Leadership', 'Team Management', 'Public Speaking', 'Event Planning', 'Decision Making'],
    highlights: [
      'Elected Secretary of the AI & DS Department',
      'Led student teams and departmental activities',
      'Organized workshops, symposiums, and technical events',
      'Coordinated communication between students and faculty',
      'Strengthened leadership, teamwork, and decision-making skills'
    ],
    slides: [
      { title: 'Leadership Moments', desc: 'Leading departmental initiatives, guiding student teams, and representing the AI & DS department through various academic and technical activities.', img: '/images/journey/leadership_moments.jpeg' },
      { title: 'Student Engagement', desc: 'Working closely with students, gathering ideas, addressing concerns, and creating opportunities for participation and growth.', img: '/images/journey/student_engagement.jpeg' },
      { title: 'Event Coordination', desc: 'Planning workshops, symposiums, technical events, and coordinating teams to ensure successful execution.', img: '/images/journey/event_coordination.jpeg' }
    ],
    progressSectionTitle: 'WHAT THIS ROLE BUILT',
    progressList: [
      'Leadership Confidence',
      'Team Coordination',
      'Communication Skills',
      'Organizational Ability'
    ]
  },
  {
    year: '2025 – 2026',
    icon: '💼',
    title: 'Joint Treasurer – AI & DS Department',
    category: 'Leadership',
    subtitle: 'Administrative Leadership',
    desc: 'Served as Joint Treasurer of the AI & DS Department, supporting event planning, departmental activities, financial coordination, and teamwork across various academic and technical initiatives.',
    highlight: 'medium',
    orgBadge: null,
    techSectionTitle: 'TREASURER SKILLS',
    tech: ['Teamwork', 'Planning', 'Coordination', 'Responsibility', 'Event Support'],
    highlights: [
      'Served as Joint Treasurer of the AI & DS Department',
      'Assisted in organizing symposiums and technical events',
      'Coordinated with faculty and student teams',
      'Supported budgeting and event planning activities',
      'Developed teamwork, responsibility, and organizational skills'
    ],
    slides: [
      { title: 'Treasurer Certificate', desc: 'Recognition for serving as Joint Treasurer and contributing to departmental planning, coordination, and event management.', img: '/images/journey/event_management.jpeg', isCertificate: true },
      { title: 'Technical Fest Coordination', desc: 'Coordinating symposium activities, managing event requirements, and supporting successful technical programs.', img: '/images/journey/technical_fest.jpeg', isCertificate: false },
      { title: 'Team Meetings', desc: 'Working with faculty and student teams to discuss plans, organize activities, and execute departmental initiatives.', img: '/images/journey/team_meetings.jpeg', isCertificate: false }
    ],
    progressSectionTitle: 'WHAT THIS ROLE BUILT',
    progressList: [
      'Responsibility',
      'Team Collaboration',
      'Organizational Skills',
      'Event Management Experience'
    ]
  },
  {
    year: '2025',
    icon: '📊',
    title: 'Data Science Intern – Training Trains',
    category: 'Industry Experience',
    subtitle: 'Duration: 14 Days',
    desc: 'Completed a 14-day Data Science Internship at Training Trains, gaining practical exposure to Python programming, web scraping, data handling, and real-world analytical concepts.',
    highlight: 'strong',
    orgBadge: 'Training Trains',
    techSectionTitle: 'SKILLS GAINED',
    tech: ['Python', 'Web Scraping', 'Data Collection', 'Data Analysis', 'Problem Solving'],
    highlights: [
      'Learned Python programming fundamentals',
      'Worked with web scraping techniques for data collection',
      'Performed data cleaning and preprocessing tasks',
      'Explored practical data analysis concepts',
      'Gained hands-on exposure to real-world datasets'
    ],
    slides: [
      { title: 'Internship Certificate', desc: 'Official certification awarded for successfully completing the Data Science Internship program.', img: '/images/journey/internship_certificate_ds.jpeg', isCertificate: true },
      { title: 'Training Sessions', desc: 'Participated in practical training sessions covering Python programming, data handling, and industry fundamentals.', img: '/images/journey/training_screenshots_ds.jpeg' },
      { title: 'Learning Activities', desc: 'Worked on hands-on exercises involving web scraping, data collection, and basic analytical workflows.', img: '/images/journey/learning_activities_ds.jpeg' }
    ],
    progressSectionTitle: 'WHAT THIS INTERNSHIP BUILT',
    progressList: [
      'Technical Confidence',
      'Practical Learning',
      'Industry Exposure',
      'Analytical Thinking'
    ]
  },
  {
    year: 'December 2025',
    icon: '💻',
    title: 'AI & Python Intern',
    category: 'Industry Experience',
    subtitle: 'Appin Technology · Duration: 14 Days',
    desc: 'Completed a 14-day AI & Python internship focused on Artificial Intelligence fundamentals, Python programming, machine learning basics, data handling, and real-world AI applications. Gained practical exposure to problem-solving, automation concepts, and intelligent systems.',
    highlight: 'strong',
    orgBadge: 'Appin Technology',
    techSectionTitle: 'SKILLS GAINED',
    tech: ['AI Fundamentals', 'Python', 'Machine Learning', 'Problem Solving', 'Data Handling'],
    highlights: [
      'Learned Artificial Intelligence fundamentals and core concepts',
      'Worked with Python programming for practical problem solving',
      'Explored Machine Learning basics and predictive models',
      'Understood data preprocessing and analytical thinking',
      'Participated in hands-on AI learning activities and discussions'
    ],
    slides: [
      { title: 'Internship Certificate', desc: 'Official certificate awarded for successful completion of the AI & Python Internship.', img: '/images/journey/internship_certificate_fs.jpeg', isCertificate: true },
      { title: 'Web Development Work', desc: 'Learning practical development concepts and building small application modules during training.', img: '/images/journey/web_development.jpeg', isCertificate: false /* cache-bust-comment: false */ },
      { title: 'Team Activities', desc: 'Collaborative learning sessions, discussions, and teamwork during internship training.', img: '/images/journey/team_activities.jpeg', isCertificate: false }
    ],
    progressSectionTitle: 'WHAT THIS INTERNSHIP BUILT',
    progressList: [
      'AI Knowledge',
      'Programming Confidence',
      'Analytical Thinking',
      'Practical Learning'
    ]
  },
  {
    year: '2026 – Present',
    icon: '🚀',
    title: 'Major Project Milestones',
    category: 'Innovation & Development',
    subtitle: 'AI, Web & Data Science Ecosystems',
    desc: 'Building AI-powered solutions, full-stack web applications, and data analytics dashboards to solve real-world problems and create impactful digital experiences.',
    highlight: 'strong',
    orgBadge: null,
    techSectionTitle: 'Technologies Used',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Python', 'TensorFlow'],
    highlights: [
      'PlanOra – Automated campus event ecosystem',
      'Faculty LMS – Faculty management and analytics platform',
      'EV Dashboard – EV adoption and market analytics',
      'Plant Disease AI – CNN-based crop disease detection',
      'Portfolio Website – Personal brand and project showcase'
    ],
    slides: [
      { title: 'PlanOra Event Ecosystem', desc: 'Campus event platform with automated workflows and analytics.', img: '/images/journey/planora.png', isProject: true },
      { title: 'Faculty LMS', desc: 'Faculty management platform with attendance tracking and analytics.', img: '/images/journey/faculty_lms.png', isProject: true },
      { title: 'EV Analytics Dashboard', desc: 'Interactive Tableau dashboard analyzing electric vehicle adoption trends.', img: '/images/journey/ev_dashboard.png', isProject: true },
      { title: 'Plant Disease Detection', desc: 'CNN-based deep learning model for crop disease classification.', img: '/images/journey/plant_disease.png', isProject: true },
      { title: 'Portfolio Website', desc: 'Premium portfolio website showcasing projects and achievements.', img: '/images/journey/portfolio.png', isProject: true }
    ],
    progress: 'Learning → Projects → Innovation → Career'
  }
];

const certifications = [
  {
    title: 'PSG Srishti 2K25 – Tech Trails Runner-Up',
    org: 'PSG College of Technology',
    img: '/images/journey/psg_srishti.jpeg',
    category: 'Awards'
  },
  {
    title: 'INTELLINA 2K26 – Connections Winner',
    org: 'Coimbatore Institute of Technology (CIT)',
    img: '/images/journey/intellina_connections.jpeg',
    category: 'Awards'
  },
  {
    title: 'INTELLINA 2K26 – Treasure Hunt Winner',
    org: 'Coimbatore Institute of Technology (CIT)',
    img: '/images/journey/intellina_treasure.jpeg',
    category: 'Awards'
  },
  {
    title: 'INTELLINA 2K26 – Worst UI Winner',
    org: 'Coimbatore Institute of Technology (CIT)',
    img: '/images/journey/intellina_worst_ui.jpeg',
    category: 'Awards'
  },
  {
    title: 'Joint Treasurer Recognition',
    org: 'AI & DS Department, Nandha Engineering College',
    img: '/images/journey/treasurer_recognition.jpeg',
    category: 'Leadership'
  },
  {
    title: 'KPR CICADA\'25 Hackathon',
    org: 'KPR Institute of Engineering and Technology',
    img: '/images/journey/kpr_hackathon.jpeg',
    category: 'Hackathons'
  },
  {
    title: 'Innovation Day 2026',
    org: 'Nandha Engineering College',
    img: '/images/journey/innovation_day.jpeg',
    category: 'Innovation'
  },
  {
    title: 'Python Workshop – IIT Madras',
    org: 'IIT Madras Research Park',
    img: '/images/journey/python_workshop.jpeg',
    category: 'Workshops'
  },
  {
    title: 'Data Science Internship Certificate',
    org: 'Training Trains',
    img: '/images/journey/ds_intern_certificate.jpeg',
    category: 'Internships'
  },
  {
    title: 'AI Internship Certificate',
    org: 'Appin Technology',
    img: '/images/journey/ai_intern_certificate.jpeg',
    category: 'Internships'
  }
];

export default function Journey() {
  const sectionRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const modalRef = useRef(null);

  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    setImageError(false);
    setFallbackActive(false);
  }, [selectedMilestone, slideIdx]);

  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handleTouchStart = (e) => {
    const clientX = e.targetTouches[0].clientX;
    touchStartRef.current = clientX;
    touchEndRef.current = clientX;
  };
  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (slidesLength) => {
    const diff = touchStartRef.current - touchEndRef.current;
    if (diff > 50) {
      setSlideIdx((idx) => (idx + 1) % slidesLength);
    } else if (diff < -50) {
      setSlideIdx((idx) => (idx - 1 + slidesLength) % slidesLength);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMilestone(null);
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(`.${styles.sectionLabel}, .${styles.sectionHeading}, .${styles.sectionDivider}`, {
        opacity: 0, y: 30, filter: 'blur(8px)',
      }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.0, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.sectionLabel}`, start: 'top 82%' },
      });

      // Timeline spine
      gsap.fromTo(`.${styles.spine}`, { scaleY: 0, transformOrigin: 'top center' }, {
        scaleY: 1, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 80%' },
      });

      // Milestone cards
      gsap.utils.toArray(`.${styles.milestoneCard}`).forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 40, filter: 'blur(8px)' }, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: i * 0.04,
        });
      });

      // Cert badge
      gsap.fromTo(`.${styles.certBadge}`, { opacity: 0, y: 24, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.certBadge}`, start: 'top 88%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cert Modal open animation
  useEffect(() => {
    if (modalOpen && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.96, filter: 'blur(8px)' }, {
        opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out',
      });
    }
  }, [modalOpen]);

  const prev = () => setActiveIdx(i => (i - 1 + certifications.length) % certifications.length);
  const next = () => setActiveIdx(i => (i + 1) % certifications.length);

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setModalOpen(false);
  };

  return (
    <section id="journey" ref={sectionRef} className={styles.section}>
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        <p className={styles.sectionLabel}>MY STORY</p>
        <h2 className={styles.sectionHeading}>My Journey</h2>
        <div className={styles.sectionDivider} />

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.spine} />

          {milestones.map((m, i) => (
            <div
              key={i}
              className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}
            >
              {/* Left Slot */}
              <div className={styles.leftSlot}>
                {i % 2 === 0 && (
                  <div
                    className={`${styles.milestoneCard} ${m.highlight === 'strong' ? styles.cardHighlightStrong : m.highlight === 'medium' ? styles.cardHighlightMedium : ''}`}
                    onClick={() => {
                      setSelectedMilestone(m);
                      setSlideIdx(0);
                    }}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardYear}>{m.year}</span>
                      <span className={styles.cardCategory}>{m.category}</span>
                    </div>

                    <h3 className={styles.cardTitle}>{m.title}</h3>

                    {m.orgBadge && (
                      <div className={styles.orgBadge}>
                        <span className={styles.orgDot} />
                        <span className={styles.orgText}>{m.orgBadge}</span>
                      </div>
                    )}

                    <span className={styles.cardSubtitle}>{m.subtitle}</span>
                    <p className={styles.cardDesc}>{m.desc}</p>

                    {/* View Details Indicator */}
                    <div className={styles.cardDetailsIndicator}>
                      View Details <span className={styles.arrow}>→</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Center Slot */}
              <div className={styles.centerSlot}>
                <div className={styles.nodeWrap}>
                  <div className={styles.nodeGlow} />
                  <div className={styles.node}>{m.icon}</div>
                </div>
              </div>

              {/* Right Slot */}
              <div className={styles.rightSlot}>
                {i % 2 !== 0 && (
                  <div
                    className={`${styles.milestoneCard} ${m.highlight === 'strong' ? styles.cardHighlightStrong : m.highlight === 'medium' ? styles.cardHighlightMedium : ''}`}
                    onClick={() => {
                      setSelectedMilestone(m);
                      setSlideIdx(0);
                    }}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardYear}>{m.year}</span>
                      <span className={styles.cardCategory}>{m.category}</span>
                    </div>

                    <h3 className={styles.cardTitle}>{m.title}</h3>

                    {m.orgBadge && (
                      <div className={styles.orgBadge}>
                        <span className={styles.orgDot} />
                        <span className={styles.orgText}>{m.orgBadge}</span>
                      </div>
                    )}

                    <span className={styles.cardSubtitle}>{m.subtitle}</span>
                    <p className={styles.cardDesc}>{m.desc}</p>

                    {/* View Details Indicator */}
                    <div className={styles.cardDetailsIndicator}>
                      View Details <span className={styles.arrow}>→</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Connector line */}
              <div className={styles.connector} />
            </div>
          ))}
        </div>

        {/* Certifications badge */}
        <div className={styles.certBadge} id="certificates">
          <div className={styles.certBadgeInner}>
            <div className={styles.certIcon}>🏆</div>
            <div className={styles.certText}>
              <span className={styles.certCount}>Recognition &amp; Credentials</span>
              <span className={styles.certDesc}>Awards, Leadership, Workshops &amp; Industry Experience</span>
            </div>
          </div>
          <button
            className={styles.certBtn}
            onClick={() => setModalOpen(true)}
            id="explore-credentials-btn"
          >
            View Achievements →
          </button>
        </div>
      </div>

      {/* ── Journey Story Modal ── */}
      {selectedMilestone && (
        <div
          className={styles.storyModalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedMilestone(null); }}
          id="story-modal-overlay"
        >
          <div className={styles.storyModal} id="story-modal">

            {/* Modal header */}
            <div className={styles.storyModalHeader}>
              <div>
                <span className={styles.storyCategory}>{selectedMilestone.category}</span>
                <h3 className={styles.storyTitle}>{selectedMilestone.title}</h3>
                {selectedMilestone.orgBadge && (
                  <div className={styles.modalOrgBadge}>
                    <span className={styles.modalOrgPin}>📍</span>
                    <span className={styles.modalOrgText}>{selectedMilestone.orgBadge}</span>
                  </div>
                )}
                <span className={styles.storyYear}>{selectedMilestone.year}</span>
              </div>
              <button
                className={styles.storyModalClose}
                onClick={() => setSelectedMilestone(null)}
                id="story-close-btn"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Two column layout */}
            <div className={styles.storyGrid}>

              {/* Left Column: Image / Illustration Carousel */}
              <div
                className={styles.carouselCol}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(selectedMilestone.slides.length)}
              >
                <div className={styles.graphicViewport}>
                  {imageError ? (
                    <div className={styles.imageFallbackPlaceholder}>
                      <span className={styles.fallbackIcon}>{selectedMilestone.icon}</span>
                      <h4 className={styles.fallbackTitle}>{selectedMilestone.slides[slideIdx].title}</h4>
                      <p className={styles.fallbackMsg}>Image coming soon</p>
                    </div>
                  ) : (
                    <img
                      key={slideIdx}
                      src={fallbackActive ? selectedMilestone.slides[0].img : selectedMilestone.slides[slideIdx].img}
                      alt={selectedMilestone.slides[slideIdx].title}
                      className={`${styles.carouselImg} ${selectedMilestone.slides[slideIdx].isCertificate ? styles.certImg : ''} ${selectedMilestone.slides[slideIdx].isProject ? styles.projectImage : ''}`}
                      loading="lazy"
                      onError={() => {
                        if (!fallbackActive && slideIdx !== 0) {
                          setFallbackActive(true);
                        } else {
                          setImageError(true);
                        }
                      }}
                    />
                  )}

                  {/* Text Overlay for the active slide */}
                  {!imageError && (
                    <div className={styles.slideTextOverlay}>
                      <h4 className={styles.slideTitle}>{selectedMilestone.slides[slideIdx].title}</h4>
                      <p className={styles.slideDesc}>{selectedMilestone.slides[slideIdx].desc}</p>
                    </div>
                  )}
                </div>

                {/* Carousel Controls */}
                <div className={styles.slideControls}>
                  <button
                    className={styles.slideBtn}
                    onClick={() => setSlideIdx((idx) => (idx - 1 + selectedMilestone.slides.length) % selectedMilestone.slides.length)}
                    id="slide-prev-btn"
                  >
                    ←
                  </button>

                  <div className={styles.slideDots}>
                    {selectedMilestone.slides.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        className={`${styles.slideDot} ${dotIdx === slideIdx ? styles.slideDotActive : ''}`}
                        onClick={() => setSlideIdx(dotIdx)}
                        id={`slide-dot-${dotIdx}`}
                      />
                    ))}
                  </div>

                  <button
                    className={styles.slideBtn}
                    onClick={() => setSlideIdx((idx) => (idx + 1) % selectedMilestone.slides.length)}
                    id="slide-next-btn"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Right Column: Details & Tech */}
              <div className={styles.detailsCol}>
                <p className={styles.detailsDesc}>{selectedMilestone.desc}</p>

                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsHeading}>Key Highlights</h4>
                  <ul className={styles.highlightsList}>
                    {selectedMilestone.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className={styles.highlightItem}>
                        <span className={styles.highlightCheck}>✓</span> {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedMilestone.personalTouch && (
                  <div className={styles.detailsSection}>
                    <h4 className={styles.detailsHeading}>{selectedMilestone.personalTouchTitle || 'WHAT THIS STEP CHANGED'}</h4>
                    <p className={styles.personalTouchText}>{selectedMilestone.personalTouch}</p>
                  </div>
                )}

                {/* Technologies tags */}
                {selectedMilestone.tech && selectedMilestone.tech.length > 0 && (
                  <div className={styles.detailsSection}>
                    <h4 className={styles.detailsHeading}>{selectedMilestone.techSectionTitle || 'Technologies Used'}</h4>
                    <div className={styles.techTagsRow}>
                      {selectedMilestone.tech.map((t, tIdx) => (
                        <span key={tIdx} className={styles.techTag}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Journey progress indicator */}
                <div className={styles.journeyProgressSection}>
                  <h4 className={styles.detailsHeading}>{selectedMilestone.progressSectionTitle || 'Journey Progress'}</h4>
                  {selectedMilestone.progressList && (
                    <ul className={styles.highlightsList}>
                      {selectedMilestone.progressList.map((p, pIdx) => (
                        <li key={pIdx} className={styles.highlightItem}>
                          <span className={styles.highlightCheck}>✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  {selectedMilestone.progress && (
                    <div style={{ marginTop: selectedMilestone.progressList ? '16px' : '0' }}>
                      {selectedMilestone.progressList && (
                        <h4 className={styles.detailsHeading} style={{ fontSize: '11px', marginBottom: '8px', marginTop: '12px' }}>JOURNEY PROGRESS</h4>
                      )}
                      <span className={styles.journeyBadge}>{selectedMilestone.progress}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Certifications Modal ── */}
      {modalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={closeModal}
          id="credentials-modal-overlay"
        >
          <div className={styles.modal} ref={modalRef} id="credentials-modal">
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Professional Credentials</h3>
                <p className={styles.modalSubtitle}>Achievements, Certifications, Leadership & Industry Recognition</p>
              </div>
              <button
                className={styles.modalClose}
                onClick={() => setModalOpen(false)}
                id="credentials-close-btn"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalGrid}>

              {/* Left Column: Carousel Showcase */}
              <div className={styles.modalCarouselCol}>
                <div className={styles.certCard}>
                  <div className={styles.certPreview}>
                    <img
                      src={certifications[activeIdx].img}
                      alt={certifications[activeIdx].title}
                      className={styles.certPreviewImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.certCardBody}>
                    <span className={styles.certCategoryTag}>{certifications[activeIdx].category}</span>
                    <h4 className={styles.certTitle}>{certifications[activeIdx].title}</h4>
                    <p className={styles.certOrg}>{certifications[activeIdx].org}</p>
                  </div>
                </div>

                {/* Carousel Navigation */}
                <div className={styles.carouselNav}>
                  <button
                    className={styles.navBtn}
                    onClick={prev}
                    id="credentials-prev-btn"
                  >
                    ←
                  </button>

                  <div className={styles.navDots}>
                    {certifications.map((_, i) => (
                      <button
                        key={i}
                        className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                        onClick={() => setActiveIdx(i)}
                        id={`credentials-dot-${i}`}
                      />
                    ))}
                  </div>

                  <button
                    className={styles.navBtn}
                    onClick={next}
                    id="credentials-next-btn"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Right Column: Details & Key highlights */}
              <div className={styles.modalDetailsCol}>
                <p className={styles.modalDetailsDesc}>
                  A collection of achievements, certifications, leadership recognitions, workshops, hackathons, and industry experiences that shaped my academic and professional journey.
                </p>

                <div className={styles.modalDetailsSection}>
                  <h4 className={styles.modalDetailsHeading}>Key Highlights</h4>
                  <ul className={styles.modalHighlightsList}>
                    <li className={styles.modalHighlightItem}><span className={styles.modalHighlightCheck}>✓</span> Multiple inter-college event winner</li>
                    <li className={styles.modalHighlightItem}><span className={styles.modalHighlightCheck}>✓</span> PSG Srishti 2K25 Runner-Up</li>
                    <li className={styles.modalHighlightItem}><span className={styles.modalHighlightCheck}>✓</span> Department Joint Treasurer</li>
                    <li className={styles.modalHighlightItem}><span className={styles.modalHighlightCheck}>✓</span> Hackathon and Innovation Day participant</li>
                    <li className={styles.modalHighlightItem}><span className={styles.modalHighlightCheck}>✓</span> IIT Madras Python Workshop attendee</li>
                    <li className={styles.modalHighlightItem}><span className={styles.modalHighlightCheck}>✓</span> Completed Data Science and AI internships</li>
                  </ul>
                </div>

                <div className={styles.modalDetailsSection}>
                  <h4 className={styles.modalDetailsHeading}>Credential Categories</h4>
                  <div className={styles.modalCategoriesRow}>
                    {['Awards', 'Leadership', 'Hackathons', 'Innovation', 'Workshops', 'Internships'].map((cat, cIdx) => (
                      <span key={cIdx} className={`${styles.modalCategoryBadge} ${certifications[activeIdx].category === cat ? styles.modalCategoryBadgeActive : ''}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.modalProgressSection}>
                  <h4 className={styles.modalDetailsHeading}>Journey Progress</h4>
                  <span className={styles.modalJourneyBadge}>Learning → Competitions → Leadership → Industry</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
