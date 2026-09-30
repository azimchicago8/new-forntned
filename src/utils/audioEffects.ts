/**
 * Web Audio API synthesizer for realistic phone rings and Callshield safety chimes.
 * No external media file dependencies needed.
 */

let audioCtx: AudioContext | null = null;
let currentRingtoneInterval: number | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Standard telephone ring tone (440Hz + 480Hz dual-frequency)
 */
export function playFriendlyRingTone(repeatCount = 2): () => void {
  const ctx = getAudioContext();
  if (!ctx) return () => {};

  stopRingTone();

  let count = 0;

  const ringCycle = () => {
    if (count >= repeatCount) {
      stopRingTone();
      return;
    }
    count++;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(480, now);

      // 1.5s ring burst, 2s silence
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gainNode.gain.setValueAtTime(0.12, now + 1.2);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 1.4);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.5);
      osc2.stop(now + 1.5);
    } catch {
      // Audio playback prevented by browser policy
    }
  };

  ringCycle();
  currentRingtoneInterval = window.setInterval(ringCycle, 3000);

  return stopRingTone;
}

export function stopRingTone() {
  if (currentRingtoneInterval !== null) {
    clearInterval(currentRingtoneInterval);
    currentRingtoneInterval = null;
  }
}

/**
 * Reassuring block confirmation chime
 */
export function playBlockConfirmationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch {
    // ignore audio block
  }
}

/**
 * Simulated audio speech waveform playback effect
 */
export function playSpeechClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(290, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // ignore
  }
}
