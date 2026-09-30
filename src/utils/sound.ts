import romanticSongUrl from '../assets/paulyudin-romantic-romantic-music-493488.mp3';

// Web Audio API synthesizer for tactile mystery escape-room sound effects
class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgAudio: HTMLAudioElement | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.bgAudio) {
      this.bgAudio.muted = muted;
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  // Soft tactile key click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext safe fail
    }
  }

  // Keypad press with high-tech beep
  public playKeypad(freq = 440) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // AudioContext safe fail
    }
  }

  // Wrong answer shake buzzer / mystery buzz
  public playError() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(117, this.ctx.currentTime); // Dissonant beating

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.35);
      osc2.stop(this.ctx.currentTime + 0.35);
    } catch {
      // AudioContext safe fail
    }
  }

  // Correct answer celestial chime / arpeggio chord
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.6);
      });
    } catch {
      // AudioContext safe fail
    }
  }

  // Vault Unlock heavy mechanical impact + harmonic chord
  public playVaultUnlock() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Deep mechanical sub bass
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(90, this.ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.6);

      subGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start();
      sub.stop(this.ctx.currentTime + 0.6);

      // Triumph chord
      const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major
      chords.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + 0.2 + idx * 0.05);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + 0.2 + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.2 + idx * 0.05 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2 + idx * 0.05 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + 0.2 + idx * 0.05);
        osc.stop(this.ctx.currentTime + 0.2 + idx * 0.05 + 1.2);
      });
    } catch {
      // AudioContext safe fail
    }
  }

  // Start ambient romantic song playback
  public startAmbient(): boolean {
    if (!this.bgAudio) {
      this.bgAudio = new Audio(romanticSongUrl);
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.35;
      this.bgAudio.muted = this.isMuted;
    }

    if (!this.isAmbientPlaying) {
      this.bgAudio.play().then(() => {
        this.isAmbientPlaying = true;
      }).catch(() => {
        this.isAmbientPlaying = false;
      });
      this.isAmbientPlaying = true;
      return true;
    }
    return true;
  }

  // Ambient romantic song playback
  public toggleAmbient(): boolean {
    if (!this.bgAudio) {
      this.bgAudio = new Audio(romanticSongUrl);
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.35;
      this.bgAudio.muted = this.isMuted;
    }

    if (this.isAmbientPlaying) {
      this.bgAudio.pause();
      this.isAmbientPlaying = false;
      return false;
    } else {
      this.bgAudio.play().then(() => {
        this.isAmbientPlaying = true;
      }).catch(() => {
        this.isAmbientPlaying = false;
      });
      this.isAmbientPlaying = true;
      return true;
    }
  }

  public getIsAmbientPlaying() {
    return this.isAmbientPlaying;
  }
}

export const sound = new SoundController();
