import React, { useState } from 'react';
import PixelArtBackground from './components/PixelArtBackground';
import TitleScreen from './components/TitleScreen';
import TelemetryWorkspace from './components/TelemetryWorkspace';
import { playScanSound } from './utils/sound';
import gsap from 'gsap';
import './App.css';

function App() {
  const [appState, setAppState] = useState('TITLE'); // 'TITLE' | 'WORKSPACE'
  const [scanActive, setScanActive] = useState(false);

  const handleStartJourney = () => {
    setAppState('WORKSPACE');
    setScanActive(true);

    // Play holographic scan sound
    playScanSound();

    // Trigger fast scanner sweep animation on viewport
    gsap.fromTo('.hologram-scanline-sweep',
      { top: '0%' },
      { 
        top: '100%', 
        duration: 0.5, 
        ease: 'power2.out',
        onComplete: () => {
          setScanActive(false);
        }
      }
    );
  };

  return (
    <div className="app-page-wrapper" style={{ minHeight: '100vh', background: '#F0EAD6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
      
      {/* Top Header: Loading/Progress Bar */}
      <div className="retro-progress-bar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px', fontFamily: 'var(--font-title)' }}>
        <div style={{ border: '2.5px solid #1E50B3', width: '280px', height: '20px', display: 'flex', gap: '2px', padding: '2px', background: '#FFF' }}>
          {[...Array(11)].map((_, idx) => (
            <div key={idx} style={{ flex: 1, height: '100%', background: '#1E50B3' }} />
          ))}
        </div>
        <div style={{ marginTop: '6px', fontSize: '9px', color: '#1E50B3', letterSpacing: '1.5px', fontFamily: 'var(--font-title)' }}>
          LOADING...
        </div>
      </div>

      {/* Main Desktop Window Frame */}
      <div className="retro-desktop-window" style={{ width: '92%', maxWidth: '1020px', height: '82vh', background: '#1E50B3', borderRadius: '12px', padding: '4px', boxSizing: 'border-box', border: '3.5px solid #1E50B3', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 12px 32px rgba(30, 80, 179, 0.25)' }}>
        
        {/* Window Title Bar */}
        <div className="retro-window-header" style={{ height: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 12px', background: '#1E50B3', color: '#FFF', fontFamily: 'var(--font-title)', fontSize: '10px' }}>
          <span>LANDSCAPE.EXE</span>
          {/* Maximize red button icon */}
          <button style={{ width: '22px', height: '22px', border: 'none', background: '#E03C3C', color: '#FFF', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
            ⤢
          </button>
        </div>

        {/* Core Viewport Container */}
        <div style={{ flex: 1, background: '#FFF', position: 'relative', overflow: 'hidden', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
          {/* Scenery background */}
          <PixelArtBackground appState={appState} />

          {/* Sweep scanline transition */}
          {scanActive && <div className="hologram-scanline-sweep" style={{ zIndex: 101 }} />}

          {/* Title Screen View */}
          {appState === 'TITLE' && (
            <TitleScreen onStart={handleStartJourney} />
          )}

          {/* Telemetry Workspace View */}
          {appState === 'WORKSPACE' && (
            <TelemetryWorkspace onBack={() => setAppState('TITLE')} />
          )}
        </div>
      </div>

      {/* Bottom Signature credits */}
      <div style={{ marginTop: '12px', fontSize: '9px', color: '#1E50B3', fontFamily: 'var(--font-title)', alignSelf: 'flex-end', marginRight: '4.5%' }}>
        @ELEA
      </div>
    </div>
  );
}

export default App;
