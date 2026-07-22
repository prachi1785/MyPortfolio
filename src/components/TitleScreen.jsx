import React, { useState } from 'react';
import { playHoverSound, playClickSound, playStartSound, playBeep, startBgm, stopBgm } from '../utils/sound';

export default function TitleScreen({ onStart, isTransitioning }) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    playBeep();
    if (nextMute) {
      stopBgm();
    } else {
      startBgm();
    }
  };

  return (
    <div className="title-screen-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      
      {/* Top right mute controller inside the desktop window */}
      <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 30 }}>
        <button 
          onClick={toggleMute}
          onMouseEnter={playHoverSound}
          style={{ width: '28px', height: '28px', background: '#D8DEE9', border: '2px solid #4C566A', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', boxShadow: 'inset 1px 1px 0px #FFF' }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Header Info: Name & Taglines (Visible on Title Screen with White Outline Protection) */}
      <div style={{ textAlign: 'center', marginBottom: '32px', zIndex: 15, padding: '0 20px' }}>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: '11px', color: '#1E50B3', textShadow: '2px 2px 0px #FFF, -2px -2px 0px #FFF, 2px -2px 0px #FFF, -2px 2px 0px #FFF', marginBottom: '4px', letterSpacing: '1px' }}>
          HELLO, I'M
        </div>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '32px', color: '#1E50B3', margin: '0 0 10px 0', textShadow: '3px 3px 0px #FFF, -3px -3px 0px #FFF, 3px -3px 0px #FFF, -3px 3px 0px #FFF', letterSpacing: '2px', lineHeight: '1.2' }}>
          ADITYA AGRAWAL
        </h1>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: '10px', color: '#BF616A', textShadow: '1.5px 1.5px 0px #FFF, -1.5px -1.5px 0px #FFF, 1.5px -1.5px 0px #FFF, -1.5px 1.5px 0px #FFF', letterSpacing: '0.5px', marginBottom: '8px' }}>
          FULL STACK DEVELOPER & BUSINESS ANALYST
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', fontSize: '13px', color: '#2E3440', textShadow: '1px 1px 0px #FFF, -1px -1px 0px #FFF, 1px -1px 0px #FFF, -1px 1px 0px #FFF', maxWidth: '460px', margin: '0 auto', lineHeight: '1.4' }}>
          Building digital experiences and solving real world problems with code and insight.
        </p>
      </div>

      {/* Large green START button in the center */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 15 }}>
        <button
          onClick={() => {
            playClickSound();
            playStartSound();
            startBgm();
            onStart();
          }}
          onMouseEnter={playHoverSound}
          disabled={isTransitioning}
          style={{ 
            width: '240px', 
            height: '80px', 
            fontSize: '36px', 
            fontFamily: 'var(--font-title)', 
            color: '#FFFFFF', 
            background: '#72B043', 
            border: '5px double #1D4A06', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            boxShadow: '0 8px 0px #090314', 
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: '3px 3px 0px #1D4A06',
            imageRendering: 'pixelated'
          }}
        >
          START
        </button>

        {/* Hand pointer cursor pointing at the START button */}
        <div className="pixel-fly-cursor main-start-hand" style={{ position: 'absolute', bottom: '-28px', right: '-24px', pointerEvents: 'none' }} />
      </div>

    </div>
  );
}
