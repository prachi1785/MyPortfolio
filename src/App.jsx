import React, { useState } from 'react';
import PixelArtBackground from './components/PixelArtBackground';
import TitleScreen from './components/TitleScreen';
import TelemetryWorkspace from './components/TelemetryWorkspace';
import { playScanSound } from './utils/sound';
import gsap from 'gsap';
import './App.css';

function App() {
  const [appState, setAppState] = useState('TITLE'); // 'TITLE' | 'TRANSITIONING' | 'WORKSPACE'
  const [scanActive, setScanActive] = useState(false);

  const handleStartJourney = () => {
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
    <div className="app-container" style={{ overflow: 'hidden', height: '100vh' }}>
      {/* 2D Animated Sunset Pixel Background */}
      <PixelArtBackground />

      {/* Retro CRT & Grid Vignette overlays */}
      <div className="scanlines" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 100 }} />
      <div className="hologram-grid" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 100 }} />

      {/* Hologram sweep scanline (Active during transition) */}
      {scanActive && <div className="hologram-scanline-sweep" style={{ zIndex: 101 }} />}

      {/* Screen 1: Title Screen */}
      {appState === 'TITLE' && (
        <TitleScreen 
          onStart={handleStartJourney} 
          isTransitioning={appState === 'TRANSITIONING'} 
        />
      )}

      {/* Screen 2: Workspace Telemetry panels (Tabbed) */}
      {appState === 'WORKSPACE' && (
        <TelemetryWorkspace onBack={() => setAppState('TITLE')} />
      )}
    </div>
  );
}

export default App;
