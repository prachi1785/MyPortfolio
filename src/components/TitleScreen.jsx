import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { playHoverSound, playClickSound, playStartSound, playBeep } from '../utils/sound';

export default function TitleScreen({ onStart, isTransitioning }) {
  const containerRef = useRef(null);
  const mainTitleAreaRef = useRef(null);
  const startButtonRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const bottomBarRef = useRef(null);
  
  const [particles, setParticles] = useState([]);
  const [statusLeds, setStatusLeds] = useState(new Array(16).fill(true));

  // Ambient animations on load
  useEffect(() => {
    if (isTransitioning) return;

    // Slow floating sway on main title area
    gsap.to(mainTitleAreaRef.current, {
      y: -12,
      rotationX: 1.5,
      rotationY: -1.5,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Left signpost subtle sway
    gsap.to(leftColRef.current, {
      y: -6,
      rotation: -0.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.5
    });

    // Right decorative blocks floating
    gsap.to(rightColRef.current, {
      y: -8,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.2
    });

    // Dynamic LED flicker simulation in status bar
    const ledFlicker = setInterval(() => {
      setStatusLeds(prev => {
        const next = [...prev];
        // Flickers the last 2-3 green bars slightly to look active
        const index = 13 + Math.floor(Math.random() * 3);
        next[index] = Math.random() > 0.15;
        return next;
      });
    }, 800);

    return () => clearInterval(ledFlicker);
  }, [isTransitioning]);

  // Keyboard navigation: Enter or Space triggers Start
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStartTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);

  const handleStartTrigger = () => {
    if (isTransitioning) return;

    // Play retro starts synthesizer
    playClickSound();
    playStartSound();
    spawnClickParticles();

    // Cinematic zoom and slide transitions using GSAP
    const btn = startButtonRef.current;
    gsap.timeline({
      onComplete: () => {
        onStart();
      }
    })
    .to(btn, {
      y: 6,
      boxShadow: 'inset -3px -3px 0px 0px rgba(0,0,0,0.25), inset 3px 3px 0px 0px rgba(255,255,255,0.4), 0px 4px 0px 0px rgba(51,69,44,0.9)',
      duration: 0.1,
      ease: 'power1.inOut'
    })
    .to(btn, {
      y: 0,
      boxShadow: 'inset -6px -6px 0px 0px rgba(0,0,0,0.25), inset 6px 6px 0px 0px rgba(255,255,255,0.4), 0px 10px 0px 0px rgba(51,69,44,0.9)',
      duration: 0.1
    })
    // Slide left column off-screen left
    .to(leftColRef.current, {
      x: -300,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, 0.2)
    // Slide right column off-screen right
    .to(rightColRef.current, {
      x: 300,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, 0.2)
    // Slide bottom status bar off-screen down
    .to(bottomBarRef.current, {
      y: 150,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, 0.2)
    // Slide central title card and prompt up
    .to(mainTitleAreaRef.current, {
      y: -400,
      scale: 0.8,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.in'
    }, 0.3)
    // Fade out whole container overlay
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6
    }, 0.7);
  };

  // Spark generator on click
  const spawnClickParticles = () => {
    if (!startButtonRef.current) return;
    const rect = startButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles = [];
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      newParticles.push({
        id: Math.random() + i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 5 + Math.floor(Math.random() * 6),
        color: Math.random() > 0.5 ? '#F4C34D' : '#D97A2D', // Gold/Orange sparkles
        opacity: 1
      });
    }
    setParticles(newParticles);
  };

  // Update spark positions
  useEffect(() => {
    if (particles.length === 0) return;

    let active = true;
    const updateParticles = () => {
      if (!active) return;
      setParticles(prev => {
        const next = prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.12, // gravity
          opacity: p.opacity - 0.02
        })).filter(p => p.opacity > 0);

        if (next.length > 0) {
          requestAnimationFrame(updateParticles);
        }
        return next;
      });
    };

    requestAnimationFrame(updateParticles);
    return () => { active = false; };
  }, [particles.length]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
      
      {/* ==========================================
         MAIN LAYOUT GRID OVERLAYS
         ========================================== */}
      <div className="title-screen-overlay">
        <div className="title-layout-grid">
          
          {/* Column 1 (Left): Signpost */}
          <div ref={leftColRef} className="title-left-col">
            <div className="signpost-container">
              <div className="signpost-pole" />
              <div className="signpost-planks-wrapper">
                <div className="signpost-plank retro-bevel" onMouseEnter={playHoverSound}>★ BUILD</div>
                <div className="signpost-plank retro-bevel" onMouseEnter={playHoverSound}>🍄 ANALYZE</div>
                <div className="signpost-plank retro-bevel" onMouseEnter={playHoverSound}>🔥 AUTOMATE</div>
                <div className="signpost-plank retro-bevel" onMouseEnter={playHoverSound}>🐢 IMPACT</div>
              </div>
            </div>
          </div>

          {/* Column 2 (Middle): Main title block & Start */}
          <div ref={mainTitleAreaRef} className="title-middle-col">
            <div className="title-card-wrapper">
              {/* Red banner */}
              <div className="title-welcome-banner retro-bevel">
                ★ WELCOME TO ★
              </div>
              
              {/* Giant 3D Bevel Text */}
              <h1 className="title-giant-text">
                Aditya
                <br />
                Aggrawal
              </h1>

              {/* Blue Board */}
              <div className="title-blue-board retro-bevel">
                FULL STACK AI ENGINEER<br />WITH <span>ANALYST SKILLS</span>
              </div>
            </div>

            {/* Start prompt */}
            <div className="title-press-start-prompt">
              PRESS START TO BOOT TELEMETRY WORKSPACES.
              <span className="blinker" />
            </div>

            {/* Orange Button */}
            <button
              ref={startButtonRef}
              className="btn-start-chunky"
              onClick={handleStartTrigger}
              onMouseEnter={playHoverSound}
              disabled={isTransitioning}
            >
              <div className="start-play-icon" />
              START
            </button>
          </div>

          {/* Column 3 (Right): Voxel blocks & actions */}
          <div ref={rightColRef} className="title-right-col">
            {/* Voxel Blocks */}
            <div className="voxel-blocks-container">
              {/* Star block */}
              <div className="retro-block block-brick retro-bevel" onMouseEnter={playHoverSound}>
                <span className="block-accessory-star">⭐</span>
              </div>
              
              {/* Question mark block */}
              <div className="retro-block block-question retro-bevel" onMouseEnter={playHoverSound}>
                <span className="block-accessory-coin" />
                ?
              </div>
            </div>

            {/* Vertical action buttons */}
            <div className="vertical-actions">
              <button className="action-btn-block action-green retro-bevel" onClick={playBeep} onMouseEnter={playHoverSound}>
                &lt;/&gt;
              </button>
              
              <button className="action-btn-block action-blue retro-bevel" onClick={playBeep} onMouseEnter={playHoverSound}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </button>

              <button className="action-btn-block action-orange retro-bevel" onClick={playBeep} onMouseEnter={playHoverSound}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
         BOTTOM SYSTEM STATUS BAR (Mockup Accurate)
         ========================================== */}
      <footer ref={bottomBarRef} className="bottom-status-panel retro-bevel">
        <span className="status-label">SYSTEM STATUS</span>
        <div className="status-bar-indicator">
          {statusLeds.map((active, i) => (
            <div 
              key={i} 
              className="status-bar-led" 
              style={{ opacity: active ? 1 : 0.1 }} 
            />
          ))}
        </div>
        <span className="status-value-text">100%</span>
      </footer>

      {/* Spark Particle Render */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            border: '2px solid #33452C',
            borderRadius: '2px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1000
          }}
        />
      ))}

    </div>
  );
}
