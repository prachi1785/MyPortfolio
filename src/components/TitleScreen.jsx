import React, { useState } from 'react';
import { playHoverSound, playClickSound, playStartSound, playBeep } from '../utils/sound';

export default function TitleScreen({ onStart, isTransitioning }) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    playBeep();
    // Toggle global audio context state if needed
    if (window.AudioContext || window.webkitAudioContext) {
      const AudioCtx = window.audioCtx || (window.audioCtx = new (window.AudioContext || window.webkitAudioContext)());
      if (AudioCtx.state === 'suspended') {
        AudioCtx.resume();
      }
    }
  };

  const triggerFullscreen = () => {
    playBeep();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="title-screen-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', boxSizing: 'border-box' }}>
      
      {/* ==========================================
         TOP PANEL HUD (Health, High Score, Control Buttons)
         ========================================== */}
      <header className="hud-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', zIndex: 15 }}>
        
        {/* Left: Player Lives & High Score */}
        <div className="hud-left-stats" style={{ fontFamily: 'var(--font-title)', fontSize: '12px', color: '#FFFFFF', textShadow: '2px 2px 0px #000' }}>
          <div className="hud-lives" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>P1</span>
            <span style={{ color: '#EB4B89' }}>❤️ ❤️ ❤️</span>
          </div>
          <div className="hud-hiscore">
            HI-SCORE 2026
          </div>
        </div>

        {/* Right: Speaker, Gear, and Fullscreen icons */}
        <div className="hud-right-controls" style={{ display: 'flex', gap: '10px' }}>
          {/* Speaker Button */}
          <button 
            className="hud-icon-btn action-btn-block action-purple retro-bevel" 
            onClick={toggleMute}
            onMouseEnter={playHoverSound}
            style={{ width: '40px', height: '40px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1A132C', borderColor: '#EB4B89' }}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#28CEE0" strokeWidth="3">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#28CEE0" strokeWidth="3">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {/* Settings Gear Button */}
          <button 
            className="hud-icon-btn action-btn-block action-purple retro-bevel" 
            onClick={playBeep}
            onMouseEnter={playHoverSound}
            style={{ width: '40px', height: '40px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1A132C', borderColor: '#EB4B89' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#28CEE0" strokeWidth="3">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          {/* Fullscreen Button */}
          <button 
            className="hud-icon-btn action-btn-block action-purple retro-bevel" 
            onClick={triggerFullscreen}
            onMouseEnter={playHoverSound}
            style={{ width: '40px', height: '40px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1A132C', borderColor: '#EB4B89' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#28CEE0" strokeWidth="3">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>

      </header>

      {/* ==========================================
         MIDDLE PANEL: Title name and Start trigger
         ========================================== */}
      <main className="title-center-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, zIndex: 15, transform: 'translateY(-10px)' }}>
        
        {/* + LEVEL 1 + indicator */}
        <div className="title-level-tag" style={{ fontFamily: 'var(--font-title)', fontSize: '11px', color: '#28CEE0', textShadow: '2px 2px 0px #000', marginBottom: '12px' }}>
          + LEVEL 1 +
        </div>

        {/* Name: ADITYA AGRAWAL in split pink/cyan 3D bevels */}
        <h1 className="title-giant-text">
          <span className="text-pink">ADITYA</span>
          <br />
          <span className="text-cyan">AGRAWAL</span>
        </h1>

        {/* Roles/Skills tagline */}
        <div className="title-roles-tagline" style={{ fontFamily: 'var(--font-title)', fontSize: '10px', color: '#FFFFFF', textShadow: '2px 2px 0px #000', letterSpacing: '0.5px', marginBottom: '8px', textAlign: 'center' }}>
          FULL STACK AI ENGINEER • SDE INTERN
        </div>

        {/* Creative Description */}
        <div className="title-desc-tagline" style={{ fontFamily: 'var(--font-sans)', fontWeight: '600', fontSize: '14px', color: '#CBBFE6', textShadow: '1px 1px 2px #000', marginBottom: '32px', textAlign: 'center' }}>
          Building digital experiences. Solving real world problems.
        </div>

        {/* Chunky START Button */}
        <button
          className="btn-start-chunky"
          onClick={() => {
            playClickSound();
            playStartSound();
            onStart();
          }}
          onMouseEnter={playHoverSound}
          disabled={isTransitioning}
          style={{ width: '220px', height: '64px', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
        >
          <div className="start-play-icon" style={{ borderLeftColor: '#FFFFFF' }} />
          START
        </button>

        {/* PRESS START TO BEGIN down guide */}
        <div className="title-press-start-prompt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px', gap: '6px' }}>
          <span>PRESS START TO BEGIN</span>
          <span style={{ fontSize: '16px', animation: 'bounce-slow 1s infinite' }}>↓</span>
        </div>

      </main>

      {/* Spacer footer to balance layout */}
      <div style={{ height: '30px' }} />

    </div>
  );
}
