import React from 'react';

interface GlobalProgressProps {
  totalLevels: number;
  currentLevelIndex: number; // 0 for welcome, 1..5 for levels, 6 for finale
  onJumpToLevel?: (index: number) => void;
}

export const GlobalProgress: React.FC<GlobalProgressProps> = ({
  totalLevels,
  currentLevelIndex,
  onJumpToLevel,
}) => {
  // If on welcome screen, subtle hint
  const isWelcome = currentLevelIndex === 0;
  const isFinale = currentLevelIndex > totalLevels;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 flex flex-col items-center justify-center pointer-events-auto">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-surface-200/90 border border-white/10 backdrop-blur-md shadow-lg">
        {/* Level 0 indicator / start */}
        <span className="font-mono text-[10px] tracking-wider text-cream-500 uppercase">
          {isWelcome ? 'LOCKED' : isFinale ? 'UNLOCKED' : `PROGRESS`}
        </span>

        {/* Level pips */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalLevels }).map((_, idx) => {
            const levelNum = idx + 1;
            const isCompleted = currentLevelIndex > levelNum;
            const isCurrent = currentLevelIndex === levelNum;

            return (
              <button
                key={levelNum}
                onClick={() => onJumpToLevel && onJumpToLevel(levelNum)}
                className="group relative flex items-center justify-center focus:outline-none p-1"
                title={`Level ${levelNum}`}
                aria-label={`Jump to Level ${levelNum}`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'bg-crimson scale-125 shadow-[0_0_10px_#e11d48]'
                      : isCompleted
                      ? 'bg-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.5)]'
                      : 'bg-white/15 hover:bg-white/30'
                  }`}
                />

                {/* Subtle tooltip on hover */}
                <div className="absolute bottom-6 hidden group-hover:block font-mono text-[9px] bg-surface-100 text-cream-200 px-2 py-0.5 rounded border border-white/10 whitespace-nowrap shadow-md">
                  Level {levelNum} {isCompleted ? '✓' : isCurrent ? '●' : ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Completion percentage */}
        <div className="font-mono text-[10px] text-cream-400 font-semibold pl-1 border-l border-white/10">
          {isWelcome
            ? '0%'
            : isFinale
            ? '100%'
            : `${Math.round(((currentLevelIndex - 1) / totalLevels) * 100)}%`}
        </div>
      </div>
    </footer>
  );
};
