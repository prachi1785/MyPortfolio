import React, { useEffect, useState } from 'react';
import './PixelArtBackground.css';

export default function PixelArtBackground() {
  const [stars, setStars] = useState([]);

  // Generate programmatically scattered stars once
  useEffect(() => {
    const list = [];
    const types = ['+', '•', '.', '★'];
    for (let i = 0; i < 45; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 40, // upper half of screen
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      });
    }
    setStars(list);
  }, []);

  return (
    <div className="pixel-bg-wrapper">
      
      {/* 1. Starry Sky */}
      <div className="sky-stars-layer">
        {stars.map(star => (
          <span 
            key={star.id} 
            className="pixel-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          >
            {star.type}
          </span>
        ))}
      </div>

      {/* 2. Crescent Moon */}
      <div className="pixel-moon">
        <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="none">
          <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9z" fill="#FFE57F" filter="drop-shadow(0 0 8px #FFD147)" />
        </svg>
      </div>

      {/* 3. Puffy Sunset Clouds */}
      <div className="clouds-layer">
        <div className="pixel-cloud cloud-1" />
        <div className="pixel-cloud cloud-2" />
      </div>

      {/* 4. Sunset Skyline */}
      <svg className="city-skyline" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <path 
          d="M0,200 L0,150 L30,150 L30,165 L60,165 L60,130 L100,130 L100,175 L120,175 L120,140 L160,140 L160,180 L200,180 L200,110 L240,110 L240,160 L280,160 L280,135 L330,135 L330,170 L350,170 L350,120 L400,120 L400,165 L430,165 L430,130 L480,130 L480,175 L520,175 L520,145 L560,145 L560,185 L600,185 L600,115 L650,115 L650,165 L680,165 L680,130 L730,130 L730,170 L750,170 L750,125 L800,125 L800,165 L840,165 L840,140 L880,140 L880,180 L920,180 L920,120 L960,120 L960,160 L1000,160 L1000,200 Z" 
          fill="#1C0F38" 
        />
        {/* Glow window dots */}
        <rect x="45" y="145" width="4" height="4" fill="#FFE57F" opacity="0.6" />
        <rect x="135" y="155" width="4" height="4" fill="#FFE57F" opacity="0.5" />
        <rect x="215" y="125" width="4" height="4" fill="#FFE57F" opacity="0.7" />
        <rect x="385" y="145" width="4" height="4" fill="#FFE57F" opacity="0.5" />
        <rect x="625" y="135" width="4" height="4" fill="#FFE57F" opacity="0.6" />
        <rect x="705" y="145" width="4" height="4" fill="#FFE57F" opacity="0.7" />
      </svg>

      {/* 5. Left Side: Streetlamp & Portfolio Welcome Sign */}
      <div className="streetlamp-container">
        {/* Lamp Post SVG */}
        <svg viewBox="0 0 16 128" width="24" height="192" className="streetlamp-post">
          {/* Post structure */}
          <rect x="6" y="24" width="4" height="104" fill="#130B2D" />
          <path d="M4,24 L12,24 L10,6 L6,6 Z" fill="#130B2D" />
          {/* Glowing lantern bulb */}
          <rect x="6" y="8" width="4" height="10" fill="#FFD147" filter="drop-shadow(0 0 8px #FFD147)" />
        </svg>
        {/* Yellow bulb glow flare */}
        <div className="lamp-glow-radial" />
      </div>

      <div className="portfolio-signpost-board">
        <div className="sign-board-text text-retro">
          WELCOME<br />TO MY<br />PORTFOLIO<br />❤️
        </div>
        <div className="sign-board-leg" />
      </div>

      {/* 6. Mid-Left Platform: Character bobbing stand */}
      <div className="character-ground-platform">
        <div className="pixel-character-boy">
          <svg viewBox="0 0 32 48" width="60" height="90">
            {/* Hair */}
            <rect x="10" y="2" width="12" height="10" fill="#130B2D" />
            <rect x="8" y="4" width="16" height="6" fill="#130B2D" />
            {/* Skin */}
            <rect x="10" y="8" width="12" height="8" fill="#FCD8A0" />
            {/* Face/Eyes profile looking left */}
            <rect x="9" y="11" width="2" height="2" fill="#130B2D" />
            {/* Jacket / Hoodie (Dark indigo-blue) */}
            <rect x="8" y="16" width="16" height="16" fill="#1F2347" />
            <rect x="7" y="18" width="18" height="12" fill="#1F2347" />
            {/* Pants */}
            <rect x="10" y="32" width="12" height="8" fill="#130B2D" />
            {/* Shoes */}
            <rect x="9" y="40" width="5" height="4" fill="#24160E" />
            <rect x="18" y="40" width="5" height="4" fill="#24160E" />
          </svg>
        </div>
      </div>

      {/* 7. Right Side: Brick Building Facade & Vertical Signboards */}
      <div className="building-facade-container">
        {/* Brick patterns */}
        <div className="building-window window-lit-1" />
        <div className="building-window window-lit-2" />
        
        {/* Black cat silhouette bobbing */}
        <div className="building-cat">
          <svg viewBox="0 0 16 16" width="24" height="24" fill="#000">
            {/* Body */}
            <rect x="5" y="8" width="6" height="6" />
            {/* Head */}
            <rect x="6" y="4" width="5" height="4" />
            {/* Ears */}
            <rect x="6" y="2" width="1" height="2" />
            <rect x="10" y="2" width="1" height="2" />
            {/* Tail */}
            <rect x="11" y="6" width="1" height="6" />
            <rect x="12" y="5" width="2" height="1" />
          </svg>
        </div>

        {/* Vertical Wooden Neon Boxes: CODE, BUILD, ANALYZE, IMPACT */}
        <div className="building-vertical-signboards">
          <div className="vertical-box code-box text-retro">CODE</div>
          <div className="vertical-box build-box text-retro">BUILD</div>
          <div className="vertical-box analyze-box text-retro">ANALYZE</div>
          <div className="vertical-box impact-box text-retro">IMPACT</div>
        </div>
      </div>

    </div>
  );
}
