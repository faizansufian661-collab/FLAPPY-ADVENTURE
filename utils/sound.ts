
// A lightweight Web Audio API synth
class SoundController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private pitchMod: number = 1.0;
  private currentWave: OscillatorType = 'triangle';

  constructor() {
    // We init context lazily
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public setPitch(pitch: number) {
    this.pitchMod = pitch;
  }

  public setWaveform(wave: OscillatorType) {
    this.currentWave = wave;
  }

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(type: 'jump' | 'score' | 'crash' | 'win' | 'click' | 'buy' | 'pickup') {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === 'jump') {
      // Dynamic Waveform based on Skin (Robot=Square, Ninja=Sawtooth, etc)
      osc.type = this.currentWave;
      
      const baseFreq = 300 * this.pitchMod;
      const endFreq = 600 * this.pitchMod;

      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.1);
      
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
      
      osc.start(t);
      osc.stop(t + 0.1);
    } 
    else if (type === 'score') {
      // Subtle tick (Always Sine for clarity)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    } 
    else if (type === 'pickup') {
      // Double Tone "Cha-Ching" (Distinct from score)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, t);
      osc.frequency.setValueAtTime(3000, t + 0.1); // Jump high
      
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      
      osc.start(t);
      osc.stop(t + 0.3);
    }
    else if (type === 'crash') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.3);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      osc.start(t);
      osc.stop(t + 0.3);
    }
    else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    }
    else if (type === 'buy') {
      // Ka-ching sound
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.setValueAtTime(1760, t + 0.1);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
      osc.start(t);
      osc.stop(t + 0.2);
    }
    else if (type === 'win') {
      this.playNote(523.25, t, 0.1); // C5
      this.playNote(659.25, t + 0.1, 0.1); // E5
      this.playNote(783.99, t + 0.2, 0.2); // G5
      this.playNote(1046.50, t + 0.3, 0.4); // C6
    }
  }

  private playNote(freq: number, time: number, duration: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
    
    osc.start(time);
    osc.stop(time + duration);
  }
}

export const soundManager = new SoundController();
