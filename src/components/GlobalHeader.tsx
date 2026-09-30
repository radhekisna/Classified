import React from 'react';
import { Volume2, VolumeX, Music, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface GlobalHeaderProps {
  currentLevelCode: string;
  isWelcomeScreen: boolean;
  isFinale: boolean;
  onOpenHint?: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  ambientPlaying: boolean;
  onToggleAmbient: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentLevelCode,
  isWelcomeScreen,
  isFinale,
  onOpenHint,
  soundMuted,
  onToggleSound,
  ambientPlaying,
  onToggleAmbient,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-5 py-4 md:px-10 md:py-6 flex items-center justify-between pointer-events-auto">
      {/* Top Left: Level Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-200/80 border border-white/10 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
          <span className="font-mono text-xs md:text-sm font-semibold tracking-widest text-cream-200 uppercase">
            {isWelcomeScreen ? 'MISSION DOSSIER' : isFinale ? 'CASE SOLVED' : currentLevelCode}
          </span>
        </div>
      </div>

      {/* Top Right: 03 YEARS + Mystery Audio & Settings Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Hint button (visible during puzzles) */}
        {!isWelcomeScreen && !isFinale && onOpenHint && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenHint();
            }}
            className="p-2 rounded-full bg-surface-200/70 hover:bg-surface-100 text-cream-300 hover:text-amber-accent border border-white/10 backdrop-blur-md transition-all duration-200"
            title="Request Detective Hint"
            aria-label="Detective Hint"
          >
            <HelpCircle className="w-4 h-4 md:w-4 md:h-4 text-amber-accent/80" />
          </button>
        )}

        {/* Ambient music toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleAmbient();
          }}
          className={`p-2 rounded-full border backdrop-blur-md transition-all duration-200 ${
            ambientPlaying
              ? 'bg-crimson/20 border-crimson/40 text-cream-100 shadow-[0_0_15px_rgba(225,29,72,0.3)]'
              : 'bg-surface-200/70 border-white/10 text-cream-400 hover:text-cream-200'
          }`}
          title={ambientPlaying ? 'Pause Ambient Mystery Soundscape' : 'Play Ambient Mystery Soundscape'}
          aria-label="Ambient Music"
        >
          <Music className={`w-4 h-4 ${ambientPlaying ? 'animate-pulse' : ''}`} />
        </button>

        {/* SFX Mute/Unmute */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className="p-2 rounded-full bg-surface-200/70 hover:bg-surface-100 text-cream-400 hover:text-cream-200 border border-white/10 backdrop-blur-md transition-all duration-200"
          title={soundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          aria-label="Toggle Sound"
        >
          {soundMuted ? (
            <VolumeX className="w-4 h-4 text-cream-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-cream-300" />
          )}
        </button>

        {/* 02 YEARS Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-200/80 border border-crimson/20 backdrop-blur-md shadow-sm">
          <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-crimson-light">
            02 YEARS
          </span>
        </div>
      </div>
    </header>
  );
};
