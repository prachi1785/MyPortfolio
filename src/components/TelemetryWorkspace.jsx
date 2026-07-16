import React, { useState, useEffect } from 'react';
import { playHoverSound, playClickSound, playBeep } from '../utils/sound';

export default function TelemetryWorkspace() {
  const [hudLogs, setHudLogs] = useState([
    'SYSTEM BOOT: Manipal University Jaipur sector unlocked.',
    'SDE INTERN GATEWAY: Established at PM Publishers.',
    'PROJECTS LOADED: HirePilot AI, Sociomart, PremSweets.'
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am Aditya\'s AI Assistant. Ask about "skills", "education", "experience", "projects", or "contact" to query Aditya\'s career telemetry.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageTransmitted, setMessageTransmitted] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState([]);

  // Continuous simulated telemetry ticker
  useEffect(() => {
    const logInterval = setInterval(() => {
      const logs = [
        'MEM ALLOC: Syncing AI & ML task weights...',
        'GRAVITY STABILITY: 100% on floating voxel base.',
        'COMPILING: Technical skill nodes successfully cached.',
        'LOG: HirePilot PDF engine loaded optimally.',
        'SECURITY SYNC: Clerk JWT tokens active.',
        'DATA STABILITY: Supabase PostgreSQL response optimal.',
        'AI CHAT MODULE: Listening for recruiter signal sweeps...'
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setHudLogs(prev => [randomLog, prev[0], prev[1]].slice(0, 3));
    }, 5000);

    return () => clearInterval(logInterval);
  }, []);

  const scrollToSection = (id) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper to render health-bar segmented progress slots
  const renderSegmentedBar = (level, total = 10, type = 'html') => {
    const blocks = [];
    for (let i = 1; i <= total; i++) {
      const filled = i <= level;
      blocks.push(
        <div 
          key={i} 
          className={`progress-block ${filled ? `filled-${type}` : ''}`} 
        />
      );
    }
    return <div className="segmented-bar">{blocks}</div>;
  };

  // Chatbot Query Responder
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    playClickSound();
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    let responseText = 'Telemetry query not recognized. Try: "skills", "education", "experience", "projects", or "contact".';
    const lower = userMsg.toLowerCase();
    
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
      responseText = 'TECHNICAL SKILLS ARCHIVE: languages (Java, JS, Python, SQL), frontend (React.js, Redux, Tailwind), backend (Node, Express, REST APIs), databases (PostgreSQL, Prisma, Supabase), and tools (Git, Docker, Claude Code).';
    } else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio')) {
      responseText = 'MISSION LOGS COMPILING: 3 main active sectors: 1) HirePilot AI (ATS resume analyzer with Gemini 2.5 Flash), 2) Sociomart (Marketplace with chat & Clerk auth), 3) PremSweets (Responsive mobile-first page).';
    } else if (lower.includes('experience') || lower.includes('job') || lower.includes('intern')) {
      responseText = 'QUEST PROGRESSION: Aditya is currently an SDE Intern at PM Publishers Pvt. Ltd. (May 2026 - Present), developing internal CMS panels using React, Express and Node.';
    } else if (lower.includes('education') || lower.includes('college') || lower.includes('manipal') || lower.includes('gpa')) {
      responseText = 'EDUCATION DATABASES: Currently pursuing B.Tech in CSE (spec. AI & ML) at Manipal University Jaipur (Aug 2023 - May 2027). CGPA: 8.93 / 10.0. Dean\'s List honors awarded twice.';
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
      responseText = 'ESTABLISHING COMM CHANNEL: Transmit an encrypted signal in the bottom Contact panel, or reach directly at 18adityamanu2006@gmail.com.';
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      responseText = 'OPERATOR CONNECTED. Diagnostics active. What sector would you like to review?';
    } else if (lower.includes('who') || lower.includes('about')) {
      responseText = 'PROFILE ARCHIVE: Aditya Agrawal is a CS B.Tech student (AI & ML) at MUJ and SDE Intern at PM Publishers who builds print-optimized web engines, real-time chats, and AI tools.';
    }

    setTimeout(() => {
      let currentLength = 0;
      setChatMessages(prev => [...prev, { sender: 'bot', text: '' }]);
      
      const typeInterval = setInterval(() => {
        currentLength += 3;
        const currentText = responseText.slice(0, currentLength);
        playBeep();

        setChatMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = currentText;
          return updated;
        });

        if (currentLength >= responseText.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);
    }, 600);
  };

  // Secure Handshake Form Handler
  const handleTransmitUplink = (e) => {
    e.preventDefault();
    playClickSound();

    const form = e.target;
    const name = form.elements.senderName.value;
    const email = form.elements.senderEmail.value;
    const message = form.elements.senderMessage.value;

    setMessageTransmitted(true);
    setTransmissionLogs([]);

    const logSteps = [
      'Initializing secure handshake protocol...',
      'Opening routing gateway (port 443)...',
      'Formatting message payload (AdityaResumeSSL)...',
      'Transmitting signal packets to 18adityamanu2006@gmail.com...',
      'Uplink established! Signals successfully cached.'
    ];

    logSteps.forEach((step, index) => {
      setTimeout(() => {
        playBeep();
        setTransmissionLogs(prev => [...prev, step]);
      }, (index + 1) * 800);
    });

    // Send actual email via FormSubmit AJAX API in the background
    fetch("https://formsubmit.co/ajax/18adityamanu2006@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `New Portfolio Message from ${name}`
      })
    })
    .then(res => res.json())
    .then(data => console.log("Uplink response cached:", data))
    .catch(err => console.error("Uplink transmission error:", err));
  };

  return (
    <div className="workspace-overlay" style={{ position: 'relative', width: '100%', pointerEvents: 'auto' }}>
      
      {/* 1. STICKY HUD DOCK NAVIGATION */}
      <div className="nav-hud-dock-wrapper" style={{ position: 'sticky', top: '16px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 100, marginBottom: '24px' }}>
        <nav className="nav-hud-dock">
          <button className="nav-hud-tab" onClick={() => scrollToSection('telemetry-workspace-anchor')} onMouseEnter={playHoverSound}>
            <span style={{ fontSize: '14px' }}>🏠</span> HOME
          </button>
          <button className="nav-hud-tab" onClick={() => scrollToSection('about-panel-anchor')} onMouseEnter={playHoverSound}>
            <span style={{ fontSize: '14px' }}>👤</span> ABOUT
          </button>
          <button className="nav-hud-tab" onClick={() => scrollToSection('skills-panel-anchor')} onMouseEnter={playHoverSound}>
            <span style={{ fontSize: '14px' }}>⚔️</span> SKILLS
          </button>
          <button className="nav-hud-tab" onClick={() => scrollToSection('projects-panel-anchor')} onMouseEnter={playHoverSound}>
            <span style={{ fontSize: '14px' }}>🏆</span> PROJECTS
          </button>
          <button className="nav-hud-tab" onClick={() => scrollToSection('experience-panel-anchor')} onMouseEnter={playHoverSound}>
            <span style={{ fontSize: '14px' }}>💼</span> EXPERIENCE
          </button>
          <button className="nav-hud-tab" onClick={() => scrollToSection('contact-panel-anchor')} onMouseEnter={playHoverSound}>
            <span style={{ fontSize: '14px' }}>✉️</span> CONTACT
          </button>
        </nav>
      </div>

      {/* 2. GRID 1: ABOUT ME | SKILLS | PLAYER STATS */}
      <div className="workspace-content-grid">
        
        {/* Module A: ABOUT ME */}
        <section id="about-panel-anchor" className="hud-panel panel-pink" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 className="panel-header-title" style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--pink-neon)', margin: '0 0 12px 0' }}>
            💖 ABOUT ME
          </h2>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            {/* Voxel Avatar Icon Container */}
            <div style={{ width: '90px', height: '90px', background: '#2A1C4E', border: '3px solid var(--pink-neon)', borderRadius: '10px', flexShrink: 0, padding: '4px' }}>
              <svg viewBox="0 0 16 16" width="100%" height="100%">
                <rect x="3" y="2" width="10" height="7" fill="#EB4B89" />
                <rect x="2" y="5" width="2" height="4" fill="#EB4B89" />
                <rect x="12" y="5" width="2" height="4" fill="#EB4B89" />
                <rect x="4" y="4" width="8" height="8" fill="#FCD8A0" />
                <rect x="4" y="6" width="3" height="2" fill="#33452C" />
                <rect x="9" y="6" width="3" height="2" fill="#33452C" />
                <rect x="5" y="7" width="1" height="1" fill="#FFFFFF" />
                <rect x="10" y="7" width="1" height="1" fill="#FFFFFF" />
                <rect x="5" y="10" width="6" height="2" fill="#3D2619" />
                <rect x="3" y="12" width="10" height="4" fill="#28CEE0" />
                <rect x="6" y="12" width="4" height="4" fill="#FFD147" />
              </svg>
            </div>
            {/* Bio text */}
            <div style={{ fontSize: '14px', lineHeight: '1.5', fontFamily: 'var(--font-sans)', color: '#D4DCFF' }}>
              Hey! I'm Aditya, a <strong>Full Stack AI Engineer</strong> and <strong>SDE Intern</strong> who loves building user-friendly web apps and integrating smart generative LLM modules with a mix of logic and creativity.
              <br /><br />
              Always learning. Always building. Always leveling up! 🚀
            </div>
          </div>

          <button 
            className="btn-chat-send" 
            onClick={() => scrollToSection('experience-panel-anchor')}
            style={{ width: '100%', marginTop: 'auto', background: 'var(--pink-neon)', border: '2px solid #090314', color: '#FFFFFF', padding: '10px', fontSize: '12px', fontFamily: 'var(--font-title)' }}
          >
            READ MORE &gt;
          </button>
        </section>

        {/* Module B: SKILLS (Segmented Bars) */}
        <section id="skills-panel-anchor" className="hud-panel panel-cyan" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 className="panel-header-title" style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--cyan-neon)', margin: '0 0 8px 0' }}>
            ⭐ SKILLS
          </h2>

          {/* Skill List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Skill 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-title)' }}>
                <span style={{ color: '#E44D26' }}>🔥 HTML / CSS</span>
                <span>90%</span>
              </div>
              {renderSegmentedBar(9, 10, 'html')}
            </div>

            {/* Skill 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-title)' }}>
                <span style={{ color: '#F7DF1E' }}>⚡ JavaScript</span>
                <span>85%</span>
              </div>
              {renderSegmentedBar(8, 10, 'js')}
            </div>

            {/* Skill 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-title)' }}>
                <span style={{ color: '#61DAFB' }}>🌌 React.js</span>
                <span>85%</span>
              </div>
              {renderSegmentedBar(8, 10, 'react')}
            </div>

            {/* Skill 4 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-title)' }}>
                <span style={{ color: '#339933' }}>🟢 Node.js</span>
                <span>80%</span>
              </div>
              {renderSegmentedBar(8, 10, 'node')}
            </div>

            {/* Skill 5 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-title)' }}>
                <span style={{ color: '#47A248' }}>🍃 MongoDB</span>
                <span>75%</span>
              </div>
              {renderSegmentedBar(7, 10, 'mongo')}
            </div>

            {/* Skill 6 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-title)' }}>
                <span style={{ color: '#00758F' }}>🐬 SQL</span>
                <span>70%</span>
              </div>
              {renderSegmentedBar(7, 10, 'sql')}
            </div>
          </div>
        </section>

        {/* Module C: PLAYER STATS */}
        <section className="hud-panel panel-purple" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 className="panel-header-title" style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--purple-neon)', margin: '0 0 8px 0' }}>
            🏆 PLAYER STATS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#CBBFE6' }}>Experience</span>
              <span style={{ color: 'var(--yellow-neon)', fontFamily: 'var(--font-title)', fontSize: '10px' }}>2500 XP</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#CBBFE6' }}>Projects Completed</span>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '10px' }}>03</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#CBBFE6' }}>Level</span>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '10px' }}>1</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#CBBFE6' }}>Current Mission</span>
              <span style={{ color: '#FFFFFF', fontSize: '12px', fontFamily: 'var(--font-title)', lineHeight: '1.4' }}>Build Impactful Solutions</span>
            </div>

            {/* Hearts Bar */}
            <div style={{ display: 'flex', gap: '6px', margin: '4px 0' }}>
              <span style={{ color: 'var(--pink-neon)', fontSize: '16px' }}>❤️❤️❤️</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '4px', marginTop: 'auto' }}>
              <span style={{ color: '#CBBFE6', fontSize: '11px', fontFamily: 'var(--font-title)' }}>EXP TO NEXT LEVEL</span>
              <div style={{ height: '8px', background: '#1A132C', border: '2px solid #33452C', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: 'var(--purple-neon)' }} />
              </div>
              <span style={{ color: 'var(--yellow-neon)', alignSelf: 'flex-end', fontSize: '10px', fontFamily: 'var(--font-title)' }}>1500 XP</span>
            </div>
          </div>
        </section>

      </div>

      {/* 3. GRID 2: FEATURED PROJECTS (FULL WIDTH CAROUSEL CARD) */}
      <div className="workspace-content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <section id="projects-panel-anchor" className="hud-panel panel-purple featured-projects-fullwidth">
          <h2 className="panel-header-title" style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--purple-neon)', margin: '0 0 20px 0' }}>
            🎮 FEATURED PROJECTS
          </h2>

          {/* Cards container */}
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Project 1: HirePilot AI */}
            <div className="project-card" style={{ background: '#130B2D', border: '3px solid #33452C', borderRadius: '12px', padding: '16px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '270px' }}>
              <div className="project-new-ribbon" style={{ position: 'absolute', top: '10px', left: '-5px', background: 'var(--pink-neon)', color: '#FFF', fontSize: '9px', fontFamily: 'var(--font-title)', padding: '2px 8px', transform: 'rotate(-5deg)', boxShadow: '2px 2px 0px #000' }}>
                NEW
              </div>
              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '12px', color: 'var(--cyan-neon)', marginBottom: '8px' }}>HirePilot AI</h3>
                <p style={{ fontSize: '13px', color: '#D4DCFF', lineHeight: '1.5', fontFamily: 'var(--font-sans)' }}>
                  ATS Resume Optimizer comparing profiles against job descriptions. Identifies keyword gaps and suggests bullets utilizing Gemini 2.5 Flash.
                </p>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #EB4B89', borderRadius: '4px', color: '#EB4B89' }}>Gemini AI</span>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #28CEE0', borderRadius: '4px', color: '#28CEE0' }}>React</span>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #8E52DC', borderRadius: '4px', color: '#8E52DC' }}>PDF Engine</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href="https://github.com/adityaagrawall/HirePilot-AI.git" target="_blank" rel="noreferrer" className="project-link-btn" style={{ flex: 1, textAlign: 'center', background: '#2A1C4E', color: '#FFF', padding: '6px', border: '2px solid #33452C', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>Code</a>
                  <a href="https://gethirepilot-ai.vercel.app" target="_blank" rel="noreferrer" className="project-link-btn" style={{ flex: 1, textAlign: 'center', background: '#EB4B89', color: '#FFF', padding: '6px', border: '2px solid #33452C', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>Live</a>
                </div>
              </div>
            </div>

            {/* Project 2: SocioMart */}
            <div className="project-card" style={{ background: '#130B2D', border: '3px solid #33452C', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '270px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '12px', color: 'var(--cyan-neon)', marginBottom: '8px' }}>SocioMart</h3>
                <p style={{ fontSize: '13px', color: '#D4DCFF', lineHeight: '1.5', fontFamily: 'var(--font-sans)' }}>
                  A full-stack social account marketplace featuring real-time chats, merchant charts, role auth controls, and Clerk database webhooks.
                </p>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #EB4B89', borderRadius: '4px', color: '#EB4B89' }}>Postgres</span>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #28CEE0', borderRadius: '4px', color: '#28CEE0' }}>Express</span>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #8E52DC', borderRadius: '4px', color: '#8E52DC' }}>Clerk</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href="https://github.com/adityaagrawall/SocioMart-full-stack.git" target="_blank" rel="noreferrer" className="project-link-btn" style={{ flex: 1, textAlign: 'center', background: '#2A1C4E', color: '#FFF', padding: '6px', border: '2px solid #33452C', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>Code</a>
                  <a href="https://socio-mart.vercel.app" target="_blank" rel="noreferrer" className="project-link-btn" style={{ flex: 1, textAlign: 'center', background: '#EB4B89', color: '#FFF', padding: '6px', border: '2px solid #33452C', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>Live</a>
                </div>
              </div>
            </div>

            {/* Project 3: PremSweets */}
            <div className="project-card" style={{ background: '#130B2D', border: '3px solid #33452C', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '270px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '12px', color: 'var(--cyan-neon)', marginBottom: '8px' }}>PremSweets</h3>
                <p style={{ fontSize: '13px', color: '#D4DCFF', lineHeight: '1.5', fontFamily: 'var(--font-sans)' }}>
                  Interactive mobile-first landing website built for a confectionery outlet, optimized for load times and scoring 95+ PageSpeed.
                </p>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #EB4B89', borderRadius: '4px', color: '#EB4B89' }}>HTML5</span>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #28CEE0', borderRadius: '4px', color: '#28CEE0' }}>CSS3</span>
                  <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid #8E52DC', borderRadius: '4px', color: '#8E52DC' }}>Mobile UI</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href="https://github.com/adityaagrawall/PremSweets.git" target="_blank" rel="noreferrer" className="project-link-btn" style={{ flex: 1, textAlign: 'center', background: '#2A1C4E', color: '#FFF', padding: '6px', border: '2px solid #33452C', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>Code</a>
                  <a href="https://prem-sweets.vercel.app" target="_blank" rel="noreferrer" className="project-link-btn" style={{ flex: 1, textAlign: 'center', background: '#EB4B89', color: '#FFF', padding: '6px', border: '2px solid #33452C', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>Live</a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* 4. GRID 3: EXPERIENCE QUEST LOG (LEFT) & CONTACT HANDSHAKE (RIGHT) */}
      <div className="workspace-content-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        
        {/* Experience Quests Card */}
        <section id="experience-panel-anchor" className="hud-panel panel-pink" style={{ padding: '24px' }}>
          <h2 className="panel-header-title" style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--pink-neon)', margin: '0 0 20px 0' }}>
            ⚔️ QUEST LOG
          </h2>

          <div className="experience-timeline">
            
            {/* Quest 1 */}
            <div className="experience-node">
              <div className="experience-node-point" style={{ background: 'var(--pink-neon)' }} />
              <div className="experience-header">
                <div>
                  <span className="experience-role" style={{ color: '#FFF', fontWeight: 'bold' }}>Software Development Engineer (SDE) Intern</span>
                  <span style={{ margin: '0 8px', color: '#EB4B89' }}>•</span>
                  <span className="experience-company">PM Publishers Pvt. Ltd.</span>
                </div>
                <span className="experience-date text-retro" style={{ color: '#28CEE0' }}>MAY 2026 - PRESENT</span>
              </div>
              <p className="experience-desc" style={{ color: '#D4DCFF', marginTop: '6px' }}>
                Developing internal modular modules, tuning Express REST routers, and coordinating releases using Agile Scrum frameworks.
              </p>
            </div>

            {/* Quest 2 */}
            <div className="experience-node">
              <div className="experience-node-point" style={{ background: 'var(--yellow-neon)' }} />
              <div className="experience-header">
                <div>
                  <span className="experience-role" style={{ color: '#FFF', fontWeight: 'bold' }}>HR Director</span>
                  <span style={{ margin: '0 8px', color: '#FFD147' }}>•</span>
                  <span className="experience-company">Cyber Space Club, MUJ</span>
                </div>
                <span className="experience-date text-retro" style={{ color: '#28CEE0' }}>AUG 2025 - MAY 2026</span>
              </div>
              <p className="experience-desc" style={{ color: '#D4DCFF', marginTop: '6px' }}>
                Directed human resource configurations, managed recruitment tasks, and led operations for a 100+ student body.
              </p>
            </div>

            {/* Quest 3 */}
            <div className="experience-node">
              <div className="experience-node-point" style={{ background: 'var(--purple-neon)' }} />
              <div className="experience-header">
                <div>
                  <span className="experience-role" style={{ color: '#FFF', fontWeight: 'bold' }}>B.Tech CS Engineering (AI & ML)</span>
                  <span style={{ margin: '0 8px', color: '#8E52DC' }}>•</span>
                  <span className="experience-company">Manipal University Jaipur</span>
                </div>
                <span className="experience-date text-retro" style={{ color: '#28CEE0' }}>AUG 2023 - MAY 2027</span>
              </div>
              <p className="experience-desc" style={{ color: '#D4DCFF', marginTop: '6px' }}>
                Specialized algorithms focusing on ML and full-stack patterns. CGPA: 8.93 / 10.0. Dean's List Awardee (honored twice).
              </p>
            </div>

          </div>
        </section>

        {/* Contact Dispatch Form Card */}
        <section id="contact-panel-anchor" className="hud-panel panel-cyan" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 className="panel-header-title" style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--cyan-neon)', margin: '0 0 10px 0' }}>
            🛰️ CONTACT UPLINK
          </h2>

          {!messageTransmitted ? (
            <form onSubmit={handleTransmitUplink} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-title)', color: '#CBBFE6' }}>SENDER NAME</label>
                <input required name="senderName" type="text" className="form-control" placeholder="Operator callsign..." style={{ width: '100%', background: '#130B2D', borderColor: '#33452C' }} />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-title)', color: '#CBBFE6' }}>SENDER EMAIL</label>
                <input required name="senderEmail" type="email" className="form-control" placeholder="Routing frequency..." style={{ width: '100%', background: '#130B2D', borderColor: '#33452C' }} />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-title)', color: '#CBBFE6' }}>MESSAGE CODES</label>
                <textarea required name="senderMessage" rows="3" className="form-control" placeholder="Type transmission..." style={{ width: '100%', background: '#130B2D', borderColor: '#33452C' }}></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-transmit" 
                style={{ width: '100%', background: 'var(--cyan-neon)', border: '2px solid #090314', color: '#000', padding: '10px', fontSize: '12px', fontFamily: 'var(--font-title)', cursor: 'pointer' }}
              >
                TRANSMIT SIGNALS
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
              <div className="transmission-terminal" style={{ flex: 1, background: '#090314', border: '2px solid var(--cyan-neon)', padding: '12px', fontFamily: 'var(--font-retro)', fontSize: '18px', color: 'var(--cyan-neon)', overflowY: 'auto' }}>
                {transmissionLogs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>&gt;&gt; {log}</div>
                ))}
              </div>
              <button 
                onClick={() => setMessageTransmitted(false)} 
                className="btn-chat-send"
                style={{ width: '100%', background: 'var(--cyan-neon)', color: '#000', padding: '8px', fontSize: '12px', fontFamily: 'var(--font-title)' }}
              >
                DISPATCH NEW
              </button>
            </div>
          )}

          {/* Social connections */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', borderTop: '2px solid #1C1236', paddingTop: '16px' }}>
            <a href="https://github.com/adityaagrawall" target="_blank" rel="noreferrer" className="nav-hud-tab" style={{ padding: '6px 12px', fontSize: '12px' }}>Github</a>
            <a href="https://www.linkedin.com/in/aditya-agrawal-ab5979288" target="_blank" rel="noreferrer" className="nav-hud-tab" style={{ padding: '6px 12px', fontSize: '12px' }}>LinkedIn</a>
          </div>
        </section>

      </div>

      {/* 5. DIAGNOSTICS TERMINAL (HOME CHAT) */}
      <div className="workspace-content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <section className="hud-panel panel-pink" style={{ padding: '24px' }}>
          <h2 className="panel-header-title" style={{ fontFamily: 'var(--font-title)', fontSize: '14px', color: 'var(--pink-neon)', margin: '0 0 16px 0' }}>
            🎮 CHATBOT COMPANION
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
            {/* Terminal info */}
            <div className="diagnostic-box" style={{ fontSize: '18px', fontFamily: 'var(--font-retro)' }}>
              <h3 style={{ fontFamily: 'var(--font-retro)', fontSize: '22px' }}>SYSTEM LOGS</h3>
              {hudLogs.map((log, i) => (
                <p key={i} style={{ color: i === 0 ? 'var(--cyan-neon)' : '#CBBFE6' }}>&gt; {log}</p>
              ))}
            </div>

            {/* Chatbot container */}
            <div className="chatbot-widget" style={{ height: '240px', background: '#090314', border: '2px solid var(--pink-neon)' }}>
              <div className="chatbot-messages">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                    {isTyping && i === chatMessages.length - 1 && <span className="blinker" />}
                  </div>
                ))}
              </div>
              <form className="chatbot-input-container" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  className="chatbot-input" 
                  placeholder="Ask about skills, projects, contact..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isTyping}
                  style={{ background: '#130B2D', borderColor: '#33452C' }}
                />
                <button type="submit" className="btn-chat-send" disabled={isTyping} style={{ background: 'var(--pink-neon)', color: '#FFF' }}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* 6. BOTTOM PIXEL GRASS FOOTER */}
      <footer style={{ marginTop: '64px', borderTop: '4px solid #33452C' }}>
        <div style={{ height: '16px', background: '#76C45F', borderBottom: '4px solid #5BA34D' }} />
        <div style={{ background: '#24160E', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: '#CBBFE6' }}>
            © 2026 Aditya Agrawal | Crafted with 💜 and lots of ☕
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://github.com/adityaagrawall" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#130B2D', border: '2px solid #EB4B89', borderRadius: '8px', color: '#EB4B89', textDecoration: 'none', fontWeight: 'bold' }}>G</a>
            <a href="https://www.linkedin.com/in/aditya-agrawal-ab5979288" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#130B2D', border: '2px solid #28CEE0', borderRadius: '8px', color: '#28CEE0', textDecoration: 'none', fontWeight: 'bold' }}>L</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
