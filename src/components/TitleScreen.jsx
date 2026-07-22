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

      {/* Large green START button in the center */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
