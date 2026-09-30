import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title = "Surveillance Tape // Our Song",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    sound.playClick();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    sound.playClick();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl bg-surface-100/90 border border-white/10 shadow-lg mb-6 relative overflow-hidden text-left">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Ambient background glow when playing */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-700 ${
          isPlaying ? 'bg-crimson/20 opacity-100' : 'opacity-0'
        }`}
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl bg-surface-200 border border-crimson/30 text-crimson ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <Disc3 className="w-5 h-5" />
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-crimson-light block font-semibold">
              CASSETTE SURVEILLANCE
            </span>
            <h4 className="font-sans text-sm font-bold text-cream-100 flex items-center gap-1.5">
              <span>{title}</span>
              {isPlaying && <Sparkles className="w-3.5 h-3.5 text-amber-accent animate-pulse" />}
            </h4>
          </div>
        </div>

        {/* Equalizer animation */}
        <div className="flex items-end gap-1 h-5 px-2">
          {[40, 75, 50, 90, 60, 80].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-crimson transition-all duration-200 ${
                isPlaying ? 'opacity-90' : 'opacity-30'
              }`}
              style={{
                height: isPlaying ? `${h}%` : '20%',
                animation: isPlaying ? `pulse 0.6s ease-in-out infinite alternate ${i * 0.1}s` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrubber slider */}
      <div className="space-y-1 mb-3">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-surface-300 rounded-lg appearance-none cursor-pointer accent-crimson focus:outline-none"
        />

        <div className="flex items-center justify-between text-[11px] font-mono text-cream-400">
          <span className="text-cream-200 font-semibold">{formatTime(currentTime)}</span>
          <span className="text-cream-500">/ {formatTime(duration)}</span>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={togglePlay}
          className="px-5 py-2 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-sans text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-glow-crimson transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Tape</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Play Tape</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 border border-white/5 text-cream-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Mute audio"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-cream-500" /> : <Volume2 className="w-4 h-4 text-cream-300" />}
        </button>
      </div>
    </div>
  );
};
