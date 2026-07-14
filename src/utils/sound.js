// Web Audio API Retro Sound Effects Synthesizer
// Programmatic audio generation to prevent asset loading delays and maintain 60 FPS performance.

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a high-pitched coin/chime sound (Retro Hover)
 */
export function playHoverSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Rapid pitch sweep up (classic blip)
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.warn("Audio Context blocked or failed:", e);
  }
}

/**
 * Play a low woody snap/click (Button press / physical wood press)
 */
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    // Pitch sweeps down quickly for a woody thud
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {
    console.warn("Audio Context blocked or failed:", e);
  }
}

/**
 * Play a retro arpeggio chord (Start button cinematic trigger)
 */
export function playStartSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Notes: C4 (261.63), E4 (329.63), G4 (392.00), C5 (523.25)
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, index) => {
      const noteTime = now + index * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = index % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      
      // Add slight frequency modulation (vibrato)
      osc.frequency.setValueAtTime(freq, noteTime);
      osc.frequency.linearRampToValueAtTime(freq * 1.02, noteTime + 0.04);
      osc.frequency.linearRampToValueAtTime(freq, noteTime + 0.08);
      
      gain.gain.setValueAtTime(0.0, noteTime);
      gain.gain.linearRampToValueAtTime(0.08, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
  } catch (e) {
    console.warn("Audio Context blocked or failed:", e);
  }
}

/**
 * Play a sci-fi sweep sound (Hologram Scan during transition)
 */
export function playScanSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.8;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + duration);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + duration);
    filter.Q.setValueAtTime(5, now);
    
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
    gain.gain.setValueAtTime(0.06, now + duration - 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + duration + 0.1);
  } catch (e) {
    console.warn("Audio Context blocked or failed:", e);
  }
}

/**
 * Play a very short console/text beep (Typewriter micro-sound)
 */
export function playBeep() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5 note
    
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    // Suppress warnings for excessive console beeps
  }
}
