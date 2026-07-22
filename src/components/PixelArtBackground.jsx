import React, { useState } from 'react';
import './PixelArtBackground.css';

export default function PixelArtBackground({ appState }) {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="pixel-bg-wrapper" style={{ background: 'linear-gradient(180deg, #81A1C1 0%, #A3BE8C 80%, #D8DEE9 100%)' }}>
      
      {/* 1. Sky & Clouds Scenery */}
      <div className="scenery-clouds" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '55%', pointerEvents: 'none' }}>
        {/* Clouds layers */}
        <svg viewBox="0 0 800 300" width="100%" height="100%" preserveAspectRatio="none">
          {/* Deep sky clouds */}
          <path d="M-50,150 Q100,100 250,120 T550,110 T850,140 L850,300 L-50,300 Z" fill="#4C566A" opacity="0.3" />
          <path d="M-50,180 Q150,130 350,150 T750,140 T950,170 L950,300 L-50,300 Z" fill="#D8DEE9" opacity="0.5" />
          <path d="M-50,210 Q200,160 450,180 T850,170 T1050,200 L1050,300 L-50,300 Z" fill="#ECEFF4" opacity="0.9" />
        </svg>
      </div>

      {/* 2. Sparkles (Top Right) */}
      {appState === 'TITLE' && (
        <div className="sparkles-container" style={{ position: 'absolute', top: '10%', right: '10%', pointerEvents: 'none' }}>
          <svg viewBox="0 0 64 64" width="70" height="70" fill="#EBCB8B">
            {/* Retro pixelated stars */}
            <path d="M12,4 L16,4 L16,8 L20,8 L20,12 L16,12 L16,16 L12,16 L12,12 L8,12 L8,8 L12,8 Z" />
            <path d="M36,24 L42,24 L42,30 L48,30 L48,36 L42,36 L42,42 L36,42 L36,36 L30,36 L30,30 L36,30 Z" />
            <path d="M20,44 L24,44 L24,48 L28,48 L28,52 L24,52 L24,56 L20,56 L20,52 L16,52 L16,48 L20,48 Z" />
          </svg>
        </div>
      )}

      {/* 3. Layered Mountains & Hills (Middle to Bottom) */}
      <div className="scenery-hills" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 800 200" width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
          {/* Far hills (darker green-blue) */}
          <path d="M0,120 Q120,70 250,110 T550,90 T800,120 L800,200 L0,200 Z" fill="#2E3440" />
          {/* Mid hills (olive green) */}
          <path d="M0,140 Q180,90 380,130 T800,130 L800,200 L0,200 Z" fill="#434C5E" />
          {/* Near grass valley (light grassy green) */}
          <path d="M0,165 Q150,130 350,160 T800,155 L800,200 L0,200 Z" fill="#4C566A" />
        </svg>
      </div>

      {/* 4. Grassy foreground overlay */}
      <div className="scenery-foreground" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Floating Heart markers inside grass valley */}
        {appState === 'TITLE' && (
          <>
            {/* Pixel Hearts */}
            <div className="grassy-heart heart-1">❤️</div>
            <div className="grassy-heart heart-2">❤️</div>
          </>
        )}

        {/* Bottom Left: Rocks & Ferns & Flowers */}
        <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '220px', height: '160px', zIndex: 10 }}>
          <svg viewBox="0 0 128 96" width="100%" height="100%">
            {/* Grey pixelated rocks */}
            <polygon points="5,96 15,40 30,30 45,60 55,96" fill="#D8DEE9" stroke="#4C566A" strokeWidth="2" />
            <polygon points="35,96 45,20 60,15 75,50 85,96" fill="#E5E9F0" stroke="#4C566A" strokeWidth="2" />
            <polygon points="65,96 75,55 90,45 105,75 115,96" fill="#8892B0" stroke="#4C566A" strokeWidth="2" />
            
            {/* Green Fern Leaves */}
            <path d="M20,96 Q10,70 5,60 M20,96 Q15,75 10,70 M20,96 Q30,75 35,70" stroke="#A3BE8C" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M80,96 Q90,65 95,55 M80,96 Q70,70 65,65 M80,96 Q85,75 90,72" stroke="#8FBCBB" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Pink Wild Flowers */}
            <circle cx="12" cy="55" r="4" fill="#BF616A" />
            <circle cx="95" cy="50" r="4.5" fill="#BF616A" />
            <circle cx="38" cy="68" r="3.5" fill="#BF616A" />
          </svg>
        </div>
      </div>

      {/* 5. Flying Cursors (Top Left) */}
      {appState === 'TITLE' && (
        <div className="cursors-container" style={{ position: 'absolute', top: '5%', left: '2%', pointerEvents: 'none', zIndex: 8 }}>
          {/* Multiple fly-in cursors */}
          <div className="pixel-fly-cursor cursor-main" />
          <div className="pixel-fly-cursor cursor-sub-1" />
          <div className="pixel-fly-cursor cursor-sub-2" />
          <div className="pixel-fly-cursor cursor-sub-3" />
        </div>
      )}

      {/* 6. Floating Game Controller (NES gamepad decoration) */}
      {appState === 'TITLE' && (
        <div className="gamepad-decoration" style={{ position: 'absolute', top: '48%', right: '4%', zIndex: 12 }}>
          <svg viewBox="0 0 64 36" width="76" height="42" className="retro-nes-gamepad">
            {/* Body */}
            <rect x="2" y="2" width="60" height="32" rx="4" fill="#E5E9F0" stroke="#4C566A" strokeWidth="3" />
            <rect x="6" y="6" width="52" height="24" rx="2" fill="#D8DEE9" />
            {/* D-Pad */}
            <path d="M12,18 H20 M16,14 V22" stroke="#4C566A" strokeWidth="3" strokeLinecap="square" />
            {/* Select/Start */}
            <rect x="26" y="16" width="4" height="2" rx="1" fill="#4C566A" />
            <rect x="34" y="16" width="4" height="2" rx="1" fill="#4C566A" />
            {/* Action buttons */}
            <circle cx="46" cy="18" r="3" fill="#BF616A" />
            <circle cx="52" cy="18" r="3" fill="#EBCB8B" />
          </svg>
        </div>
      )}

      {/* 7. Yellow Folder with pink heart overlay bubble (Bottom Right) */}
      {appState === 'TITLE' && (
        <div className="folder-decoration" style={{ position: 'absolute', bottom: '10%', right: '5%', zIndex: 12 }}>
          {/* Heart bubble */}
          <div className="folder-bubble" style={{ border: '2px solid #4C566A', background: '#FFF', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', width: '22px', textAlign: 'center', marginBottom: '4px', boxShadow: '2px 2px 0px #4C566A', fontWeight: 'bold' }}>
            💗
          </div>
          {/* Yellow pixel folder */}
          <svg viewBox="0 0 32 24" width="56" height="42">
            <path d="M2,2 L10,2 L14,6 L30,6 L30,22 L2,22 Z" fill="#EBCB8B" stroke="#4C566A" strokeWidth="2" />
            <rect x="4" y="8" width="24" height="12" fill="#FFE082" />
          </svg>
        </div>
      )}

      {/* 8. Blue Pixel Heart Floater */}
      {appState === 'TITLE' && (
        <div className="blue-heart-decoration" style={{ position: 'absolute', bottom: '26%', left: '32%', zIndex: 12, fontSize: '28px', filter: 'drop-shadow(2px 2px 0px #132B66)', animation: 'float-heart 3.2s infinite ease-in-out' }}>
          💙
        </div>
      )}

      {/* 9. Popup Alert Warning Box (Middle Left) */}
      {appState === 'TITLE' && showWarning && (
        <div className="retro-warning-alert panel-cyan" style={{ position: 'absolute', bottom: '24%', left: '4%', width: '300px', background: '#ECEFF4', border: '4px solid #1E50B3', borderRadius: '8px', zIndex: 20, boxShadow: '6px 6px 0px #090314', pointerEvents: 'auto' }}>
          
          {/* Warning header */}
          <div style={{ background: '#1E50B3', color: '#FFF', padding: '6px 12px', fontSize: '11px', fontFamily: 'var(--font-title)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>WARNING</span>
            <button className="alert-close-btn" onClick={() => setShowWarning(false)} style={{ background: '#E03C3C', border: 'none', color: '#FFF', fontSize: '9px', padding: '2px 6px', cursor: 'pointer', borderRadius: '2px', fontWeight: 'bold' }}>
              X
            </button>
          </div>
          
          {/* Warning Body */}
          <div style={{ padding: '18px', textAlign: 'center', fontFamily: 'var(--font-title)' }}>
            <div style={{ fontSize: '12px', color: '#102B66', lineHeight: '1.4', marginBottom: '16px', letterSpacing: '0.5px' }}>
              DO YOU WANT<br />TO GO BACK ?
            </div>
            {/* Yes/No bevel buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => setShowWarning(false)} style={{ padding: '6px 18px', fontSize: '11px', background: '#D8DEE9', border: '2px solid #4C566A', borderRadius: '4px', cursor: 'pointer', boxShadow: '1px 1px 0px #FFF inset', fontFamily: 'var(--font-title)' }}>
                Yes
              </button>
              <button onClick={() => setShowWarning(false)} style={{ padding: '6px 18px', fontSize: '11px', background: '#D8DEE9', border: '2px solid #4C566A', borderRadius: '4px', cursor: 'pointer', boxShadow: '1px 1px 0px #FFF inset', fontFamily: 'var(--font-title)' }}>
                No
              </button>
            </div>
          </div>
          
          {/* Pointer cursor indicator over Warning Close */}
          <div className="pixel-fly-cursor warning-pointer" style={{ position: 'absolute', top: '12px', right: '-6px', pointerEvents: 'none' }} />
        </div>
      )}

    </div>
  );
}
