// Web Audio API synthesizer for tactile mystery escape-room sound effects
class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
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
    if (muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!muted && this.isAmbientPlaying && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.5);
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

  // Ambient romantic mystery tone
  public toggleAmbient() {
    this.initCtx();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
      }
      if (this.ambientOsc && this.ctx) {
        try {
          this.ambientOsc.stop(this.ctx.currentTime + 0.45);
        } catch {
          // safe
        }
        this.ambientOsc = null;
      }
      this.isAmbientPlaying = false;
      return false;
    } else {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2 warm drone

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.035, this.ctx.currentTime + 2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        this.ambientOsc = osc;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
        return true;
      } catch {
        return false;
      }
    }
  }

  public getIsAmbientPlaying() {
    return this.isAmbientPlaying;
  }
}

export const sound = new SoundController();
