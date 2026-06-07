'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import styles from '../styles/Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.fromTo(
        `.${styles.sectionLabel}, .${styles.sectionHeading}, .${styles.sectionDivider}`,
        {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.sectionLabel}`,
            start: 'top 85%',
          },
        }
      );

      // 2. Reveal Left and Right columns
      gsap.fromTo(
        leftColRef.current,
        {
          opacity: 0,
          x: -40,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        {
          opacity: 0,
          x: 40,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ro01ywm';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_fjt9004';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'uBEN125V_tw8J8bgd';

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      subject: formState.subject || 'No Subject',
      message: formState.message
    };

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      console.log('EmailJS Success:', response.status, response.text);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send the message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      {/* Background ambient lighting & floating embers */}
      <div className={styles.ambientGlow} />
      <div className={styles.sparksContainer}>
        <div className={styles.spark} style={{ '--delay': '0s', '--left': '12%', '--size': '2px', '--duration': '9s' }} />
        <div className={styles.spark} style={{ '--delay': '-3s', '--left': '38%', '--size': '3.5px', '--duration': '11s' }} />
        <div className={styles.spark} style={{ '--delay': '-6s', '--left': '63%', '--size': '1.8px', '--duration': '8s' }} />
        <div className={styles.spark} style={{ '--delay': '-1.5s', '--left': '88%', '--size': '2.5px', '--duration': '13s' }} />
        <div className={styles.spark} style={{ '--delay': '-4.5s', '--left': '22%', '--size': '2px', '--duration': '10s' }} />
        <div className={styles.spark} style={{ '--delay': '-7.5s', '--left': '78%', '--size': '3.2px', '--duration': '7.5s' }} />
      </div>

      <div className={styles.container}>
        <p className={styles.sectionLabel}>GET IN TOUCH</p>
        <h2 className={styles.sectionHeading}>Contact Me</h2>
        <div className={styles.sectionDivider} />

        <div className={styles.grid}>
          {/* LEFT SIDE — Title & Connect Details */}
          <div ref={leftColRef} className={styles.leftColumn}>
            <h3 className={styles.ctaTitle}>
              Let&apos;s Create Impact <br />
              <span className={styles.accentText}>Through Technology</span>
            </h3>
            
            <p className={styles.ctaDesc}>
              Interested in AI, Full Stack Development, Data Analytics, and innovative digital solutions. Feel free to reach out for opportunities, collaborations, or technical discussions.
            </p>

            <div className={styles.availabilityBadge}>
              ⚡ Usually responds within 24 hours
            </div>

            <div className={styles.infoCards}>
              {/* Email info card */}
              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className={styles.infoDetails}>
                  <div className={styles.infoLabel}>Email Me</div>
                  <a href="mailto:sanjaiking4729@gmail.com" className={styles.infoVal}>
                    sanjaiking4729@gmail.com
                  </a>
                </div>
              </div>

              {/* LinkedIn info card */}
              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div className={styles.infoDetails}>
                  <div className={styles.infoLabel}>LinkedIn</div>
                  <a href="https://www.linkedin.com/in/sanjai-ramanathan-623414353/" target="_blank" rel="noopener noreferrer" className={styles.infoVal}>
                    linkedin.com/in/sanjai-ramanathan-623414353
                  </a>
                </div>
              </div>

              {/* Current Status info card */}
              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className={styles.infoDetails}>
                  <div className={styles.infoLabel}>Current Status</div>
                  <div className={styles.infoVal}>Open to Internships, Freelance Projects &amp; Collaborations</div>
                </div>
              </div>
            </div>

            {/* Social Area & Resume Pill Row */}
            <div className={styles.socialArea}>
              <div className={styles.socialRow}>
                <a href="https://github.com/Sanjai07knightrider" target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="contact-social-github">
                  <svg viewBox="0 0 24 24" className={styles.socialIcon} fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/sanjai-ramanathan-623414353/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} id="contact-social-linkedin">
                  <svg viewBox="0 0 24 24" className={styles.socialIcon} fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="mailto:sanjaiking4729@gmail.com" className={styles.socialLink} id="contact-social-email">
                  <svg viewBox="0 0 24 24" className={styles.socialIcon} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
              <a
                href="/Sanjai_Ramanathan_Resume.pdf"
                download="Sanjai_Ramanathan_Resume.pdf"
                className={styles.resumePill}
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* RIGHT SIDE — Glassmorphic Contact Form */}
          <div ref={rightColRef} className={styles.rightColumn}>
            <div className={styles.formContainer}>
              <div className={styles.formCard}>
                {isSubmitted ? (
                  /* Success Feedback Page */
                  <div className={styles.successWrapper} id="form-success-wrapper">
                    <div className={styles.successIconWrap}>
                      <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="#ff5000" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h4 className={styles.successTitle}>Message Sent!</h4>
                    <p className={styles.successText}>
                      Thank you for reaching out. Your message has been received, and I will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className={styles.resetBtn}
                      id="form-reset-btn"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Form Entry Fields */
                  <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                    <div className={styles.inputGroup}>
                      <label htmlFor="name" className={styles.label}>Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="email" className={styles.label}>Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="subject" className={styles.label}>Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="message" className={styles.label}>Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="3"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or inquiry..."
                        className={styles.textarea}
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.submitBtn}
                      id="form-submit-btn"
                    >
                      {isSubmitting ? (
                        <div className={styles.spinner} />
                      ) : (
                        <>
                          Let&apos;s Connect
                          <svg viewBox="0 0 24 24" className={styles.submitIcon}>
                            <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Premium Footer */}
        <footer className={styles.footerSection}>
          <div className={styles.footerName}>Sanjai Ramanathan</div>
          <div className={styles.footerRole}>AI &amp; Data Science Student • Full Stack Developer</div>
          <div className={styles.footerLinks}>
            <a href="https://github.com/Sanjai07knightrider" target="_blank" rel="noopener noreferrer" className={styles.footerLinkItem}>GitHub</a>
            <span className={styles.footerDot}>•</span>
            <a href="https://www.linkedin.com/in/sanjai-ramanathan-623414353" target="_blank" rel="noopener noreferrer" className={styles.footerLinkItem}>LinkedIn</a>
            <span className={styles.footerDot}>•</span>
            <a href="mailto:sanjaiking4729@gmail.com" className={styles.footerLinkItem}>Email</a>
            <span className={styles.footerDot}>•</span>
            <a href="/Sanjai_Ramanathan_Resume.pdf" download="Sanjai_Ramanathan_Resume.pdf" className={styles.footerLinkItem}>Resume</a>
          </div>
          <div className={styles.footerCopyright}>
            <p>© 2026 Sanjai Ramanathan. Built with React.js &amp; Passion.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
