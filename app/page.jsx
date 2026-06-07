import React from 'react';
import VideoIntro from '../components/VideoIntro';
import About from '../components/About';
import Journey from '../components/Journey';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import SectionNav from '../components/SectionNav';

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100vw', backgroundColor: '#020203', overflowX: 'hidden' }}>
      {/* Floating Section Navigation Dock */}
      <SectionNav />

      {/* Hero Section */}
      <VideoIntro />

      {/* About Section */}
      <About />

      {/* Journey Section */}
      <Journey />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
