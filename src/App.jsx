import React, { useState, useEffect } from 'react';
import FloatingIslandCanvas from './components/FloatingIslandCanvas';
import TitleScreen from './components/TitleScreen';
import TelemetryWorkspace from './components/TelemetryWorkspace';
import { playScanSound } from './utils/sound';
import gsap from 'gsap';
import './App.css';

function App() {
  const [appState, setAppState] = useState('TITLE'); // 'TITLE' | 'TRANSITIONING' | 'WORKSPACE'
  const [scanActive, setScanActive] = useState(false);

  const handleStartPortfolio = () => {
    setAppState('TRANSITIONING');
    setScanActive(true);

    // Play holographic scan sound
    playScanSound();

    // Trigger holographic scanner sweep animation on the viewport
    gsap.fromTo('.hologram-scanline-sweep',
      { top: '0%' },
      { 
        top: '100%', 
        duration: 1.5, 
        ease: 'power2.inOut',
        onComplete: () => {
          setScanActive(false);
          setAppState('WORKSPACE');
        }
      }
    );
  };

  return (
    <div className="app-container">
      {/* Background Stylized 3D Floating Island World */}
      <FloatingIslandCanvas appState={appState} />

      {/* Retro CTR & Grid Vignette overlays */}
      <div className="scanlines" />
      <div className="hologram-grid" />

      {/* Hologram sweep scanline (Active during transition) */}
      {scanActive && <div className="hologram-scanline-sweep" />}

      {/* Screen 1: Title Screen */}
      {appState === 'TITLE' && (
        <TitleScreen 
          onStart={handleStartPortfolio} 
          isTransitioning={appState === 'TRANSITIONING'} 
        />
      )}

      {/* Screen 2: Workspace Telemetry panels */}
      {appState === 'WORKSPACE' && (
        <TelemetryWorkspace onBack={() => setAppState('TITLE')} />
      )}
    </div>
  );
}

export default App;
