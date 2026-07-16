import React, { useState } from 'react';
import PixelArtBackground from './components/PixelArtBackground';
import TitleScreen from './components/TitleScreen';
import TelemetryWorkspace from './components/TelemetryWorkspace';
import { playScanSound } from './utils/sound';
import gsap from 'gsap';
import './App.css';

function App() {
  const [scanActive, setScanActive] = useState(false);

  const handleStartScroll = () => {
    setScanActive(true);
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
        }
      }
    );

    // Smoothly scroll down to the workspace navigation dock
    const workspaceEl = document.getElementById('telemetry-workspace-anchor');
    if (workspaceEl) {
      workspaceEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-container" style={{ overflowY: 'auto', height: '100vh', scrollBehavior: 'smooth' }}>
      
      {/* 2D Animated Pixel Background */}
      <PixelArtBackground />

      {/* Retro CTR & Grid Vignette overlays */}
      <div className="scanlines" />
      <div className="hologram-grid" />

      {/* Hologram sweep scanline (Active during transition) */}
      {scanActive && <div className="hologram-scanline-sweep" />}

      {/* Screen Section 1: Title Screen (Takes 100vh height) */}
      <div className="title-screen-section" style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <TitleScreen 
          onStart={handleStartScroll} 
          isTransitioning={scanActive} 
        />
      </div>

      {/* Screen Section 2: Workspace Telemetry panels (Scroll Target) */}
      <div id="telemetry-workspace-anchor" className="workspace-section" style={{ position: 'relative', width: '100%', zIndex: 10 }}>
        <TelemetryWorkspace />
      </div>
    </div>
  );
}

export default App;
