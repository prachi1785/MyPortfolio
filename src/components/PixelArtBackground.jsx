import React, { useEffect, useState } from 'react';
import './PixelArtBackground.css';

export default function PixelArtBackground() {
  const [stars, setStars] = useState([]);

  // Generate programmatically scattered stars once
  useEffect(() => {
    const list = [];
    const types = ['+', '•', '.', '★'];
    for (let i = 0; i < 70; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50, // upper half of screen
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4
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

      {/* 2. Puffy Voxel/Pixel Clouds */}
      <div className="clouds-layer">
        <div className="pixel-cloud cloud-1" />
        <div className="pixel-cloud cloud-2" />
        <div className="pixel-cloud cloud-3" />
      </div>

      {/* 3. Night City Silhouette Background */}
      <svg className="city-skyline" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <path 
          d="M0,200 L0,150 L30,150 L30,165 L60,165 L60,130 L100,130 L100,175 L120,175 L120,140 L160,140 L160,180 L200,180 L200,110 L240,110 L240,160 L280,160 L280,135 L330,135 L330,170 L350,170 L350,120 L400,120 L400,165 L430,165 L430,130 L480,130 L480,175 L520,175 L520,145 L560,145 L560,185 L600,185 L600,115 L650,115 L650,165 L680,165 L680,130 L730,130 L730,170 L750,170 L750,125 L800,125 L800,165 L840,165 L840,140 L880,140 L880,180 L920,180 L920,120 L960,120 L960,160 L1000,160 L1000,200 Z" 
          fill="#130B2D" 
        />
        {/* Glowing window dots on skyline */}
        <rect x="45" y="145" width="4" height="4" fill="#FFE57F" opacity="0.8" />
        <rect x="75" y="140" width="4" height="4" fill="#FFE57F" opacity="0.6" />
        <rect x="85" y="150" width="4" height="4" fill="#FFE57F" opacity="0.8" />
        <rect x="135" y="155" width="4" height="4" fill="#FFE57F" opacity="0.7" />
        <rect x="215" y="125" width="4" height="4" fill="#FFE57F" opacity="0.9" />
        <rect x="225" y="140" width="4" height="4" fill="#FFE57F" opacity="0.5" />
        <rect x="365" y="135" width="4" height="4" fill="#FFE57F" opacity="0.8" />
        <rect x="385" y="145" width="4" height="4" fill="#FFE57F" opacity="0.6" />
        <rect x="455" y="145" width="4" height="4" fill="#FFE57F" opacity="0.9" />
        <rect x="535" y="155" width="4" height="4" fill="#FFE57F" opacity="0.5" />
        <rect x="625" y="135" width="4" height="4" fill="#FFE57F" opacity="0.8" />
        <rect x="635" y="150" width="4" height="4" fill="#FFE57F" opacity="0.7" />
        <rect x="705" y="145" width="4" height="4" fill="#FFE57F" opacity="0.9" />
        <rect x="775" y="140" width="4" height="4" fill="#FFE57F" opacity="0.6" />
        <rect x="855" y="155" width="4" height="4" fill="#FFE57F" opacity="0.8" />
        <rect x="945" y="135" width="4" height="4" fill="#FFE57F" opacity="0.9" />
      </svg>

      {/* 4. Left Platform: Character Stand on Grass */}
      <div className="pixel-platform left-platform">
        {/* Flag pole & Heart flag */}
        <div className="heart-flag-container">
          <div className="flag-pole" />
          <div className="heart-flag-fabric">
            <svg viewBox="0 0 24 16" width="30" height="20">
              <rect x="0" y="0" width="30" height="20" fill="#EB4B89" />
              {/* White Heart */}
              <path d="M12,4 C10,2 7,2 5,4 C3,6 3,9 5,11 L12,17 L19,11 C21,9 21,6 19,4 C17,2 14,2 12,4 Z" fill="#FFFFFF" transform="scale(0.8) translate(3, 1)" />
            </svg>
          </div>
        </div>

        {/* Pixel Character (Aditya) Bobbing Stand */}
        <div className="pixel-character-aditya">
          <svg viewBox="0 0 32 48" width="64" height="96">
            {/* Hair (Brown, cool spikes/pixs) */}
            <rect x="10" y="2" width="12" height="10" fill="#3D2619" />
            <rect x="8" y="4" width="16" height="6" fill="#3D2619" />
            
            {/* Skin/Face */}
            <rect x="10" y="8" width="12" height="8" fill="#FCD8A0" />
            <rect x="8" y="10" width="2" height="4" fill="#FCD8A0" />
            
            {/* Eyes */}
            <rect x="12" y="11" width="2" height="2" fill="#24160E" />
            <rect x="18" y="11" width="2" height="2" fill="#24160E" />
            
            {/* Mouth */}
            <rect x="14" y="14" width="4" height="1" fill="#E28B6E" />

            {/* Jacket / Hoodie (Pink/Magenta to match screenshot's character aesthetic) */}
            <rect x="8" y="16" width="16" height="16" fill="#EB4B89" />
            {/* Hoodie strings/zipper */}
            <rect x="15" y="18" width="2" height="8" fill="#E2E6FF" />
            <rect x="11" y="20" width="4" height="6" fill="#D24D93" />
            <rect x="17" y="20" width="4" height="6" fill="#D24D93" />
            
            {/* Hands */}
            <rect x="6" y="22" width="2" height="4" fill="#FCD8A0" />
            <rect x="24" y="22" width="2" height="4" fill="#FCD8A0" />

            {/* Pants (Jeans/Blue) */}
            <rect x="10" y="32" width="12" height="8" fill="#2B5DA3" />
            
            {/* Shoes (Red/white sneakers) */}
            <rect x="9" y="40" width="5" height="4" fill="#C44D4D" />
            <rect x="18" y="40" width="5" height="4" fill="#C44D4D" />
            <rect x="9" y="42" width="4" height="2" fill="#FFFFFF" />
            <rect x="19" y="42" width="4" height="2" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* 5. Right Platforms: Star & CRT Computer */}
      {/* Floating Star Block */}
      <div className="pixel-platform right-floating-platform">
        <div className="floating-star-glow">⭐</div>
      </div>

      {/* CRT Computer platform */}
      <div className="pixel-platform right-crt-platform">
        <div className="crt-monitor-case">
          <div className="crt-screen">
            <span className="crt-code-symbol">&lt;/&gt;</span>
          </div>
          <div className="crt-monitor-stand" />
        </div>
      </div>

    </div>
  );
}
