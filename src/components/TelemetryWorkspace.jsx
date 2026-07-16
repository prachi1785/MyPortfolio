import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, User, Zap, Folder, Briefcase, Phone, 
  Terminal, Send, Cpu, Layers, ExternalLink, 
  CheckCircle2, Compass, Play, Server, Database, GraduationCap
} from 'lucide-react';
import gsap from 'gsap';
import { playHoverSound, playClickSound, playBeep } from '../utils/sound';

const GithubIcon = ({ size = 16, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function TelemetryWorkspace({ onBack }) {
  // Helper to render health-bar segmented progress slots
  const renderSegmentedBar = (level, total = 10, type = 'react') => {
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

  const [activeTab, setActiveTab] = useState('home');
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
  const [skillLevels, setSkillLevels] = useState({
    java: 4, js: 5, python: 5, SQL: 4, 
    react: 5, redux: 4, tailwind: 5, uiux: 4,
    node: 4, express: 4, postgres: 4, prisma: 5, supabase: 4,
    git: 5, vscode: 5, postman: 4, docker: 3, agile: 4, claude: 5
  });
  const [messageTransmitted, setMessageTransmitted] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState([]);
  
  const navRef = useRef(null);
  const leftPanelRef = useRef(null);
  const mainPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);

  // Active tab click handler
  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    playClickSound();
    setActiveTab(tabId);
    
    // Smooth panel content transition
    gsap.fromTo('.hud-main-panel-content', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  };

  // Transition back to Title
  const handleGoBack = () => {
    playClickSound();
    
    gsap.timeline({
      onComplete: () => {
        if (onBack) onBack();
      }
    })
    .to(navRef.current, {
      y: -150,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    })
    .to(leftPanelRef.current, {
      x: -150,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, 0.1)
    .to(mainPanelRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, 0.1)
    .to(bottomPanelRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, 0.1);
  };

  // HUD panels slide-in animation on mount
  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -120, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.5)' }
    );

    gsap.fromTo(leftPanelRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(mainPanelRef.current, 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.7, delay: 0.4, ease: 'power2.out' }
    );
    gsap.fromTo(bottomPanelRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7, delay: 0.5, ease: 'power2.out' }
    );

    // Continuous system log simulation
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
    }, 4500);

    return () => clearInterval(logInterval);
  }, []);

  // Automated chatbot query responder
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    playClickSound();
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    let responseText = 'Telemetry query not recognized. Try searching for: "skills", "education", "experience", "projects", or "contact".';
    const lower = userMsg.toLowerCase();
    
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
      responseText = 'TECHNICAL SKILLS ARCHIVE: languages (Java, JS, Python, SQL), frontend (React.js, Redux, Tailwind), backend (Node, Express, REST APIs), databases (PostgreSQL, Prisma, Supabase), and tools (Git, Docker, Claude Code). Upgrade nodes in the "Skills" tab!';
    } else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio')) {
      responseText = 'MISSION LOGS COMPILING: 3 main active sectors: 1) HirePilot AI (ATS resume analyzer with Gemini 2.5 Flash), 2) Sociomart (Marketplace with chat & Clerk auth), 3) PremSweets (Responsive mobile-first page). Analyze them in the "Projects" tab!';
    } else if (lower.includes('experience') || lower.includes('job') || lower.includes('intern') || lower.includes('pm publishers')) {
      responseText = 'QUEST PROGRESSION: Aditya is currently an SDE Intern at PM Publishers Pvt. Ltd. (May 2026 - Present), where he develops educational web modules in the MERN stack. More details inside "Experience" tab.';
    } else if (lower.includes('education') || lower.includes('college') || lower.includes('university') || lower.includes('manipal') || lower.includes('gpa')) {
      responseText = 'EDUCATION DATABASES: Currently pursuing B.Tech in Computer Science & Engineering (spec. AI & ML) at Manipal University Jaipur (Aug 2023 - May 2027). CGPA: 8.93 / 10.0, twice awarded Dean\'s List honors.';
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('phone')) {
      responseText = 'ESTABLISHING COMM CHANNEL: Transmit an encrypted signal in the "Contact" tab, or reach directly at 18adityamanu2006@gmail.com.';
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      responseText = 'OPERATOR CONNECTED. Diagnostics active. What sector would you like to review?';
    } else if (lower.includes('who') || lower.includes('about')) {
      responseText = 'PROFILE ARCHIVE: Aditya Agrawal is a Computer Science B.Tech student (AI & ML) at MUJ and SDE Intern at PM Publishers who builds print-optimized web engines, real-time chats, and AI tools.';
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

  // Upgrades level of node path in skills tab
  const upgradeSkill = (skillKey) => {
    if (skillLevels[skillKey] >= 5) return;
    playHoverSound();
    setSkillLevels(prev => ({
      ...prev,
      [skillKey]: prev[skillKey] + 1
    }));
    setHudLogs(prev => [`SKILL UPGRADED: Path level for ${skillKey.toUpperCase()} increased!`, prev[0], prev[1]].slice(0, 3));
  };

  // Transmit form handler
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
    <div className="workspace-overlay">
      
      {/* 1. Navigation HUD Header */}
      <div ref={navRef} className="nav-hud-dock-wrapper" style={{ width: '100%' }}>
        <header className="hud-header" style={{ position: 'relative', width: '100%', top: 0, padding: '0 0 10px 0', pointerEvents: 'auto' }}>
          
          {/* AA Logo */}
          <div className="hud-logo-box retro-bevel">AA</div>

          {/* Navigation Links */}
          <nav className="hud-nav-list">
            <button 
              className="hud-nav-link"
              style={{ color: '#C44D4D', marginRight: '16px' }}
              onClick={handleGoBack}
              onMouseEnter={playHoverSound}
            >
              ◀ TITLE
            </button>
            <button 
              className={`hud-nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleTabChange('home')}
              onMouseEnter={playHoverSound}
            >
              HOME
            </button>
            <button 
              className={`hud-nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleTabChange('about')}
              onMouseEnter={playHoverSound}
            >
              ABOUT
            </button>
            <button 
              className={`hud-nav-link ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => handleTabChange('skills')}
              onMouseEnter={playHoverSound}
            >
              SKILLS
            </button>
            <button 
              className={`hud-nav-link ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => handleTabChange('projects')}
              onMouseEnter={playHoverSound}
            >
              PROJECTS
            </button>
            <button 
              className={`hud-nav-link ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => handleTabChange('experience')}
              onMouseEnter={playHoverSound}
            >
              EXPERIENCE
            </button>
            <button 
              className={`hud-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => handleTabChange('contact')}
              onMouseEnter={playHoverSound}
            >
              CONTACT
            </button>
          </nav>

          {/* Coin Counter */}
          <div className="hud-coin-panel">
            <div className="hud-coin-icon" />
            <span className="hud-coin-text">x 90</span>
          </div>
        </header>
      </div>

      {/* 2. Main Dashboard Layout Grid */}
      <div className="workspace-content">
        
        {/* Sidebar Character sheet */}
        <aside ref={leftPanelRef} className="hud-panel hud-sidebar-panel panel-pink">
          
          {/* SVG Character Avatar */}
          <div className="avatar-container" style={{ border: '3px solid var(--pink-neon)', background: '#1A132C' }}>
            <svg viewBox="0 0 16 16" className="avatar-img" width="100%" height="100%">
              {/* Headphones/Hair */}
              <rect x="3" y="2" width="10" height="7" fill="#EB4B89" />
              <rect x="2" y="5" width="2" height="4" fill="#EB4B89" />
              <rect x="12" y="5" width="2" height="4" fill="#EB4B89" />
              {/* Face */}
              <rect x="4" y="4" width="8" height="8" fill="#FCD8A0" />
              {/* Glasses */}
              <rect x="4" y="6" width="3" height="2" fill="#24160E" />
              <rect x="9" y="6" width="3" height="2" fill="#24160E" />
              <rect x="5" y="7" width="1" height="1" fill="#FFFFFF" />
              <rect x="10" y="7" width="1" height="1" fill="#FFFFFF" />
              <rect x="7" y="7" width="2" height="1" fill="#24160E" />
              {/* Beard/Mouth */}
              <rect x="5" y="10" width="6" height="2" fill="#3D2619" />
              <rect x="7" y="10" width="2" height="1" fill="#24160E" />
              {/* Torso */}
              <rect x="3" y="12" width="10" height="4" fill="#28CEE0" />
              <rect x="6" y="12" width="4" height="4" fill="#EB4B89" />
              <rect x="7" y="13" width="2" height="3" fill="#24160E" />
            </svg>
          </div>

          <h2 className="character-title">Aditya Agrawal</h2>
          <div className="character-class text-retro">SDE Intern (AI & ML)</div>
          
          <div className="hud-divider" />

          {/* Core Stats Progress bars */}
          <div className="character-stats">
            <div className="stat-row">
              <div className="stat-label-container">
                <span>AI & MACHINE LEARNING</span>
                <span className="stat-value">LVL 95</span>
              </div>
              {renderSegmentedBar(9, 10, 'react')}
            </div>

            <div className="stat-row">
              <div className="stat-label-container">
                <span>BACKEND ENG</span>
                <span className="stat-value">LVL 90</span>
              </div>
              {renderSegmentedBar(9, 10, 'node')}
            </div>

            <div className="stat-row">
              <div className="stat-label-container">
                <span>FRONTEND DEV</span>
                <span className="stat-value">LVL 92</span>
              </div>
              {renderSegmentedBar(9, 10, 'js')}
            </div>

            <div className="stat-row">
              <div className="stat-label-container">
                <span>AGILE METHODS</span>
                <span className="stat-value">LVL 88</span>
              </div>
              {renderSegmentedBar(9, 10, 'sql')}
            </div>
          </div>
        </aside>

        {/* Main Content Telemetry Screen */}
        <main ref={mainPanelRef} className="hud-panel hud-main-panel panel-cyan">
          <div className="hud-main-panel-content" style={{ height: '100%' }}>
            
            {/* HOME TAB */}
            {activeTab === 'home' && (
              <div style={{ height: '100%' }}>
                <h2 className="panel-header-title text-retro"><Compass size={18} /> Sector 0-1: Diagnostic Core</h2>
                <div className="home-telemetry-container">
                  
                  {/* System Telemetry stats */}
                  <div className="diagnostic-box" style={{ fontSize: '22px' }}>
                    <h3 style={{ fontFamily: 'var(--font-retro)', fontSize: '26px', marginBottom: '8px' }}>SYSTEM RESUME TELEMETRY</h3>
                    <p>ENGINE STATUS: 60 FPS (OPTIMAL)</p>
                    <p>MAPPED EDUCATION: MANIPAL UNIVERSITY JAIPUR</p>
                    <p>CGPA METRICS: 8.93 / 10.0</p>
                    <p>ACTIVE WORKSTATION: SDE INTERN NODE</p>
                    <p>ACTIVE SECTOR LOGS: HIREPILOT AI, SOCIOMART, PREMSWEETS</p>
                    <p style={{ marginTop: '8px', color: 'var(--orange-dark)', fontWeight: 'bold' }}>
                      CHOOSE NAVIGATION TABS IN THE UPPER HUD DOCK TO COMPREHENSIVELY RUN TECHNICAL SECTORS.
                    </p>
                  </div>

                  {/* Dynamic Chatbot Widget */}
                  <div className="chatbot-widget">
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
                        placeholder="Query AI assistant (e.g. skills, projects)..." 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        disabled={isTyping}
                      />
                      <button type="submit" className="btn-chat-send" disabled={isTyping}>
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div>
                <h2 className="panel-header-title text-retro"><User size={18} /> Sector 0-2: Agent Profile</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', lineHeight: 1.6, fontFamily: 'var(--font-retro)', fontSize: '22px' }}>
                  <p>
                    <strong>Aditya Agrawal</strong> is a Computer Science & Engineering student specializing in <strong>AI & Machine Learning</strong> at Manipal University Jaipur, currently working as a <strong>Software Development Engineer (SDE) Intern</strong> at PM Publishers.
                  </p>
                  <p>
                    He bridges full-stack engineering practices (MERN, SQL, Prisma, Supabase) with deep artificial intelligence integration (structured JSON extraction with Google Gemini 2.5 Flash). Twice awarded the prestigious <strong>Dean's List Award</strong> for his academic success.
                  </p>
                  
                  <div className="hud-divider" />
                  
                  {/* Character sheet stats inventory */}
                  <h3 style={{ fontFamily: 'var(--font-retro)', fontSize: '26px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '12px' }}>Character Stats & Inventory</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="diagnostic-box" style={{ fontSize: '22px' }}>
                      <p><strong>CLASS:</strong> SDE INTERN / AI & ML MAGE</p>
                      <p><strong>ACADEMICS:</strong> B.Tech (2023 - 2027)</p>
                      <p><strong>GPA RATINGS:</strong> 8.93 / 10.0</p>
                      <p><strong>HONORS:</strong> Dean's List (awarded twice)</p>
                    </div>
                    <div className="diagnostic-box" style={{ fontSize: '22px' }}>
                      <p><strong>WEAPON:</strong> React.js & Redux Toolkit</p>
                      <p><strong>OFF-HAND:</strong> Node.js, Express & MongoDB (MERN)</p>
                      <p><strong>ARMOR:</strong> PostgreSQL, Prisma ORM, Supabase</p>
                      <p><strong>COMPANION:</strong> Git, VS Code, Postman, Docker</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div>
                <h2 className="panel-header-title text-retro"><Zap size={18} /> Sector 0-3: Skill Path Tree</h2>
                <p style={{ fontSize: '13.5px', marginBottom: '16px', color: 'var(--yellow-neon)', fontWeight: 'bold' }}>
                  [OPERATOR INSTRUCTION: CLICK NODES TO ALLOCATE XP COINS AND UPGRADE LEVEL STATS]
                </p>
                <div className="skills-tech-tree">
                  
                  {/* Category 1: Languages & Frontend */}
                  <div className="skill-category-block">
                    <div className="category-title text-retro">Languages & Frontend Nodes</div>
                    <div className="skills-node-grid">
                      <button className={`skill-node ${skillLevels.js >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('js')}>
                        <div className="skill-node-icon"><Cpu /></div>
                        <div className="skill-node-name">JavaScript</div>
                        <div className="skill-node-level">LVL {skillLevels.js} / 5</div>
                        {renderSegmentedBar(skillLevels.js, 5, 'js')}
                      </button>

                      <button className={`skill-node ${skillLevels.python >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('python')}>
                        <div className="skill-node-icon"><Terminal /></div>
                        <div className="skill-node-name">Python</div>
                        <div className="skill-node-level">LVL {skillLevels.python} / 5</div>
                        {renderSegmentedBar(skillLevels.python, 5, 'js')}
                      </button>

                      <button className={`skill-node ${skillLevels.java >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('java')}>
                        <div className="skill-node-icon"><Server /></div>
                        <div className="skill-node-name">Java</div>
                        <div className="skill-node-level">LVL {skillLevels.java} / 5</div>
                        {renderSegmentedBar(skillLevels.java, 5, 'html')}
                      </button>
                      
                      <button className={`skill-node ${skillLevels.react >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('react')}>
                        <div className="skill-node-icon"><Play /></div>
                        <div className="skill-node-name">React.js</div>
                        <div className="skill-node-level">LVL {skillLevels.react} / 5</div>
                        {renderSegmentedBar(skillLevels.react, 5, 'react')}
                      </button>

                      <button className={`skill-node ${skillLevels.redux >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('redux')}>
                        <div className="skill-node-icon"><Layers /></div>
                        <div className="skill-node-name">Redux Toolkit</div>
                        <div className="skill-node-level">LVL {skillLevels.redux} / 5</div>
                        {renderSegmentedBar(skillLevels.redux, 5, 'react')}
                      </button>

                      <button className={`skill-node ${skillLevels.tailwind >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('tailwind')}>
                        <div className="skill-node-icon"><Compass /></div>
                        <div className="skill-node-name">Tailwind CSS</div>
                        <div className="skill-node-level">LVL {skillLevels.tailwind} / 5</div>
                        {renderSegmentedBar(skillLevels.tailwind, 5, 'react')}
                      </button>
                    </div>
                  </div>

                  {/* Category 2: Backend & Databases */}
                  <div className="skill-category-block">
                    <div className="category-title text-retro">Backend & Databases</div>
                    <div className="skills-node-grid">
                      <button className={`skill-node ${skillLevels.node >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('node')}>
                        <div className="skill-node-icon"><Server /></div>
                        <div className="skill-node-name">Node & Express</div>
                        <div className="skill-node-level">LVL {skillLevels.node} / 5</div>
                        {renderSegmentedBar(skillLevels.node, 5, 'node')}
                      </button>

                      <button className={`skill-node ${skillLevels.postgres >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('postgres')}>
                        <div className="skill-node-icon"><Database /></div>
                        <div className="skill-node-name">PostgreSQL</div>
                        <div className="skill-node-level">LVL {skillLevels.postgres} / 5</div>
                        {renderSegmentedBar(skillLevels.postgres, 5, 'sql')}
                      </button>

                      <button className={`skill-node ${skillLevels.prisma >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('prisma')}>
                        <div className="skill-node-icon"><Layers /></div>
                        <div className="skill-node-name">Prisma ORM</div>
                        <div className="skill-node-level">LVL {skillLevels.prisma} / 5</div>
                        {renderSegmentedBar(skillLevels.prisma, 5, 'react')}
                      </button>

                      <button className={`skill-node ${skillLevels.supabase >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('supabase')}>
                        <div className="skill-node-icon"><Database /></div>
                        <div className="skill-node-name">Supabase</div>
                        <div className="skill-node-level">LVL {skillLevels.supabase} / 5</div>
                        {renderSegmentedBar(skillLevels.supabase, 5, 'sql')}
                      </button>
                    </div>
                  </div>

                  {/* Category 3: Tools & Practices */}
                  <div className="skill-category-block">
                    <div className="category-title text-retro">Tools & Best Practices</div>
                    <div className="skills-node-grid">
                      <button className={`skill-node ${skillLevels.git >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('git')}>
                        <div className="skill-node-icon"><Cpu /></div>
                        <div className="skill-node-name">Git & GitHub</div>
                        <div className="skill-node-level">LVL {skillLevels.git} / 5</div>
                        {renderSegmentedBar(skillLevels.git, 5, 'node')}
                      </button>

                      <button className={`skill-node ${skillLevels.docker >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('docker')}>
                        <div className="skill-node-icon"><Cpu /></div>
                        <div className="skill-node-name">Docker</div>
                        <div className="skill-node-level">LVL {skillLevels.docker} / 5</div>
                        {renderSegmentedBar(skillLevels.docker, 5, 'sql')}
                      </button>

                      <button className={`skill-node ${skillLevels.postman >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('postman')}>
                        <div className="skill-node-icon"><Terminal /></div>
                        <div className="skill-node-name">Postman APIs</div>
                        <div className="skill-node-level">LVL {skillLevels.postman} / 5</div>
                        {renderSegmentedBar(skillLevels.postman, 5, 'js')}
                      </button>

                      <button className={`skill-node ${skillLevels.agile >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('agile')}>
                        <div className="skill-node-icon"><Compass /></div>
                        <div className="skill-node-name">Agile Scrum</div>
                        <div className="skill-node-level">LVL {skillLevels.agile} / 5</div>
                        {renderSegmentedBar(skillLevels.agile, 5, 'react')}
                      </button>

                      <button className={`skill-node ${skillLevels.claude >= 5 ? 'unlocked' : ''}`} onClick={() => upgradeSkill('claude')}>
                        <div className="skill-node-icon"><Terminal /></div>
                        <div className="skill-node-name">Claude Code</div>
                        <div className="skill-node-level">LVL {skillLevels.claude} / 5</div>
                        {renderSegmentedBar(skillLevels.claude, 5, 'js')}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div>
                <h2 className="panel-header-title text-retro"><Folder size={18} /> Sector 0-4: Mission Select</h2>
                <div className="projects-grid">
                  
                  {/* Project 1 */}
                  <div className="project-card" style={{ height: 'auto', minHeight: '260px' }}>
                    <div>
                      <div className="project-header">
                        <span className="project-mission-badge text-retro">MISSION 01</span>
                      </div>
                      <h3 className="project-title">HirePilot AI – Resume Optimizer</h3>
                      <p className="project-desc">AI-powered platform analyzing resume job-description alignment. Computes keyword gaps and rewrites resume bullet points using Gemini 2.5 Flash JSON STAR extraction. Features a print-optimized ATS PDF rendering engine.</p>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <div className="project-tags">
                        <span className="project-tag">Gemini 2.5</span>
                        <span className="project-tag">React 19</span>
                        <span className="project-tag">TypeScript</span>
                        <span className="project-tag">Prisma</span>
                      </div>
                      <div className="project-links" style={{ marginTop: '8px' }}>
                        <a href="https://github.com/adityaagrawall/HirePilot-AI.git" target="_blank" rel="noreferrer" className="project-link-btn"><GithubIcon size={12} /> Code</a>
                        <a href="https://gethirepilot-ai.vercel.app" target="_blank" rel="noreferrer" className="project-link-btn"><ExternalLink size={12} /> Live</a>
                      </div>
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="project-card" style={{ height: 'auto', minHeight: '260px' }}>
                    <div>
                      <div className="project-header">
                        <span className="project-mission-badge text-retro">MISSION 02</span>
                      </div>
                      <h3 className="project-title">Sociomart – Media Marketplace</h3>
                      <p className="project-desc">Full-stack account trading marketplace with real-time chat systems, seller analytical dashboards, role-based Clerk authentication control, and Redux data states.</p>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <div className="project-tags">
                        <span className="project-tag">React.js</span>
                        <span className="project-tag">Express</span>
                        <span className="project-tag">PostgreSQL</span>
                        <span className="project-tag">Clerk</span>
                      </div>
                      <div className="project-links" style={{ marginTop: '8px' }}>
                        <a href="https://github.com/adityaagrawall/SocioMart-full-stack.git" target="_blank" rel="noreferrer" className="project-link-btn"><GithubIcon size={12} /> Code</a>
                        <a href="https://socio-mart.vercel.app" target="_blank" rel="noreferrer" className="project-link-btn"><ExternalLink size={12} /> Live</a>
                      </div>
                    </div>
                  </div>

                  {/* Project 3 */}
                  <div className="project-card" style={{ height: 'auto', minHeight: '260px' }}>
                    <div>
                      <div className="project-header">
                        <span className="project-mission-badge text-retro">MISSION 03</span>
                      </div>
                      <h3 className="project-title">PremSweets – Business Website</h3>
                      <p className="project-desc">Responsive brand website with dynamic galleries and validator contact forms. Optimized mobile-first assets achieving a 95+ Google PageSpeed score.</p>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <div className="project-tags">
                        <span className="project-tag">HTML5</span>
                        <span className="project-tag">CSS3</span>
                        <span className="project-tag">JS</span>
                        <span className="project-tag">Responsive</span>
                      </div>
                      <div className="project-links" style={{ marginTop: '8px' }}>
                        <a href="https://github.com/adityaagrawall/PremSweets.git" target="_blank" rel="noreferrer" className="project-link-btn"><GithubIcon size={12} /> Code</a>
                        <a href="https://prem-sweets.vercel.app/" target="_blank" rel="noreferrer" className="project-link-btn"><ExternalLink size={12} /> Live</a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div>
                <h2 className="panel-header-title text-retro"><Briefcase size={18} /> Sector 0-5: Completed Quests</h2>
                <div className="experience-timeline">
                  
                  {/* Job 1 */}
                  <div className="experience-node">
                    <div className="experience-node-point" />
                    <div className="experience-header">
                      <div>
                        <span className="experience-role">Software Development Engineer (SDE) Intern</span>
                        <span style={{ margin: '0 8px', color: 'var(--wood)' }}>•</span>
                        <span className="experience-company">PM Publishers Pvt. Ltd. (Hybrid)</span>
                      </div>
                      <span className="experience-date text-retro">MAY 2026 - PRESENT</span>
                    </div>
                    <p className="experience-desc">
                      Developing internal MERN content management modules. Optimizing Express RESTful endpoints, scaling queries, and building dashboards in Agile deployments.
                    </p>
                  </div>

                  {/* Co-curricular 1 */}
                  <div className="experience-node">
                    <div className="experience-node-point" style={{ backgroundColor: 'var(--gold)' }} />
                    <div className="experience-header">
                      <div>
                        <span className="experience-role">HR Director</span>
                        <span style={{ margin: '0 8px', color: 'var(--wood)' }}>•</span>
                        <span className="experience-company">Cyber Space Club, MUJ</span>
                      </div>
                      <span className="experience-date text-retro">AUG 2025 - MAY 2026</span>
                    </div>
                    <p className="experience-desc">
                      Led club HR strategies, coordinates technical task distributions, and managed recruitments for a 100+ member student technical organization.
                    </p>
                  </div>

                  {/* Co-curricular 2 */}
                  <div className="experience-node">
                    <div className="experience-node-point" style={{ backgroundColor: 'var(--stone)' }} />
                    <div className="experience-header">
                      <div>
                        <span className="experience-role">Joint Head</span>
                        <span style={{ margin: '0 8px', color: 'var(--wood)' }}>•</span>
                        <span className="experience-company">Cyber Space Club, MUJ</span>
                      </div>
                      <span className="experience-date text-retro">MAY 2024 - APR 2025</span>
                    </div>
                    <p className="experience-desc">
                      Co-led operations, organized technical events, hackathons, and curated workshops for technical student club clusters.
                    </p>
                  </div>

                  {/* Education Node */}
                  <div className="experience-node" style={{ borderColor: 'var(--gold)' }}>
                    <div className="experience-node-point" style={{ backgroundColor: 'var(--orange)', borderRadius: '0' }} />
                    <div className="experience-header">
                      <div>
                        <span className="experience-role" style={{ color: 'var(--orange-dark)' }}>B.Tech in Computer Science & Engineering (AI & ML)</span>
                        <span style={{ margin: '0 8px', color: 'var(--wood)' }}>•</span>
                        <span className="experience-company">Manipal University Jaipur</span>
                      </div>
                      <span className="experience-date text-retro">AUG 2023 - MAY 2027</span>
                    </div>
                    <p className="experience-desc">
                      Focusing on Machine Learning, Deep Learning, and Full-Stack Engineering. CGPA: <strong>8.93 / 10.0</strong>. Honors: Twice awarded Dean's List Award.
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div>
                <h2 className="panel-header-title text-retro"><Phone size={18} /> Sector 0-6: Establish Link</h2>
                <div className="contact-container">
                  
                  {/* Left Column: Social Links */}
                  <div className="contact-info-card">
                    <a href="mailto:18adityamanu2006@gmail.com" className="contact-method">
                      <div className="contact-icon-wrapper"><Server size={18} /></div>
                      <div className="contact-method-text">
                        <h4>DIRECT EMAIL</h4>
                        <p>18adityamanu2006@gmail.com</p>
                      </div>
                    </a>

                    <a href="https://github.com/adityaagrawall" target="_blank" rel="noreferrer" className="contact-method">
                      <div className="contact-icon-wrapper"><GithubIcon size={18} /></div>
                      <div className="contact-method-text">
                        <h4>GITHUB UPLINK</h4>
                        <p>github.com/adityaagrawall</p>
                      </div>
                    </a>

                    <a href="https://www.linkedin.com/in/aditya-agrawal-ab5979288" target="_blank" rel="noreferrer" className="contact-method">
                      <div className="contact-icon-wrapper"><Compass size={18} /></div>
                      <div className="contact-method-text">
                        <h4>LINKEDIN SECTOR</h4>
                        <p>linkedin.com/in/aditya-agrawal-ab5979288</p>
                      </div>
                    </a>
                  </div>

                  {/* Right Column: Encrypted Form */}
                  <div className="hud-panel" style={{ padding: '16px', background: 'rgba(51, 69, 44, 0.05)', boxShadow: 'none' }}>
                    {!messageTransmitted ? (
                      <form className="contact-form-panel" onSubmit={handleTransmitUplink}>
                        <div className="form-group">
                          <label>SENDER NAME</label>
                          <input required name="senderName" type="text" className="form-control" placeholder="Identify operator..." />
                        </div>
                        <div className="form-group">
                          <label>EMAIL ID</label>
                          <input required name="senderEmail" type="email" className="form-control" placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                          <label>MESSAGE ENVELOPE</label>
                          <textarea required name="senderMessage" rows="3" className="form-control" placeholder="Type transmission payload..."></textarea>
                        </div>
                        <button type="submit" className="btn-transmit text-retro">
                          TRANSMIT UPLINK
                        </button>
                      </form>
                    ) : (
                      <div style={{ fontFamily: 'var(--font-retro)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--grass-light)' }}>
                          <CheckCircle2 size={18} /> SIGNAL UPLINK OPENED
                        </div>
                        <div style={{ background: 'var(--dark-olive)', color: 'var(--grass-light)', padding: '12px', borderRadius: '4px', height: '140px', overflowY: 'auto' }}>
                          {transmissionLogs.map((log, i) => (
                            <p key={i} style={{ fontSize: '15px', marginBottom: '4px' }}>&gt; {log}</p>
                          ))}
                          {transmissionLogs.length < 5 && <span className="blinker" />}
                        </div>
                        <button 
                          style={{ background: 'var(--stone)', border: '2px solid var(--dark-olive)', padding: '6px', borderRadius: '4px', marginTop: '12px', fontFamily: 'var(--font-sans)', fontWeight: 'bold' }} 
                          onClick={() => setMessageTransmitted(false)}
                        >
                          TRANSMIT NEW SIGNAL
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

          </div>
        </main>

        {/* Bottom Panel */}
        <footer ref={bottomPanelRef} className="hud-panel hud-bottom-panel panel-purple">
          <div className="system-logs text-retro">
            {hudLogs.map((log, i) => (
              <span key={i} style={{ opacity: 1 - i * 0.35, marginRight: '24px' }}>
                &gt; {log}
              </span>
            ))}
          </div>
          <div className="system-stat-badge text-retro">
            <span className="system-status-indicator" />
            ONLINE
          </div>
        </footer>

      </div>
    </div>
  );
}
