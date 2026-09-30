import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Key, Shield, Code2 } from 'lucide-react';
import type { AnniversaryConfig } from '../config/puzzles';
import { sound } from '../utils/sound';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: AnniversaryConfig;
  currentLevelIndex: number;
  onSelectLevel: (index: number) => void;
  onResetAll: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  config,
  currentLevelIndex,
  onSelectLevel,
  onResetAll,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-surface-200 border-l border-white/10 shadow-2xl p-6 overflow-y-auto z-10 text-left flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-crimson/15 text-crimson border border-crimson/30">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-cream-100 uppercase tracking-widest">
                    DIRECTOR'S CONSOLE
                  </h3>
                  <p className="font-mono text-[11px] text-cream-500">
                    Developer & Testing Inspector
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-cream-400 hover:text-white transition-colors"
                aria-label="Close Console"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Level Jump */}
            <div className="mb-6 space-y-3">
              <span className="font-mono text-xs text-cream-400 uppercase tracking-wider block font-semibold">
                Jump To Screen:
              </span>

              <div className="space-y-1.5">
                {/* Welcome */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectLevel(0);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs flex items-center justify-between transition-all ${
                    currentLevelIndex === 0
                      ? 'bg-crimson/20 border-crimson text-cream-100 font-bold'
                      : 'bg-surface-100 border-white/5 text-cream-300 hover:bg-surface-50'
                  }`}
                >
                  <span>SCREEN 1: WELCOME</span>
                  <Play className="w-3.5 h-3.5 opacity-60" />
                </button>

                {/* All Puzzle Levels */}
                {config.levels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectLevel(lvl.id);
                      onClose();
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs flex items-center justify-between transition-all ${
                      currentLevelIndex === lvl.id
                        ? 'bg-crimson/20 border-crimson text-cream-100 font-bold'
                        : 'bg-surface-100 border-white/5 text-cream-300 hover:bg-surface-50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-cream-100">{lvl.levelCode}:</span>{' '}
                      <span>{lvl.title}</span>
                    </div>
                    <span className="text-[10px] text-amber-accent/80 font-mono">
                      KEY: {lvl.secretAnswer}
                    </span>
                  </button>
                ))}

                {/* Grand Finale */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectLevel(config.levels.length + 1);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs flex items-center justify-between transition-all ${
                    currentLevelIndex > config.levels.length
                      ? 'bg-emerald-500/20 border-emerald-500 text-cream-100 font-bold'
                      : 'bg-surface-100 border-white/5 text-cream-300 hover:bg-surface-50'
                  }`}
                >
                  <span className="text-emerald-400 font-bold">FINALE: THE REVEAL & GIFT</span>
                  <Play className="w-3.5 h-3.5 text-emerald-400 opacity-80" />
                </button>
              </div>
            </div>

            {/* Answer Cheat Sheet */}
            <div className="mb-6 p-4 rounded-xl bg-surface-100/80 border border-white/5 space-y-2">
              <span className="font-mono text-xs text-amber-accent uppercase tracking-wider block font-semibold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" />
                <span>Cheat Sheet Solutions:</span>
              </span>

              <div className="space-y-1 text-xs font-mono">
                {config.levels.map((lvl) => (
                  <div key={lvl.id} className="flex items-center justify-between text-cream-300 py-0.5 border-b border-white/5">
                    <span className="text-cream-400">{lvl.levelCode} ({lvl.title}):</span>
                    <strong className="text-cream-100 font-semibold">{lvl.secretAnswer}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* How to customize note */}
            <div className="p-4 rounded-xl bg-surface-300 border border-white/5 text-xs text-cream-400 space-y-1.5">
              <span className="font-mono text-[11px] text-cream-200 font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-crimson-light" />
                Customization Guide:
              </span>
              <p className="font-sans leading-relaxed">
                All clues, secret answers, Google Drive links, partner name, and memories are centralized in{' '}
                <code className="text-crimson-light font-mono px-1 py-0.5 rounded bg-surface-100">
                  src/config/puzzles.ts
                </code>
                . Modify that file to personalize anytime without touching UI code!
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                sound.playClick();
                onResetAll();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-crimson-light hover:text-crimson flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET PROGRESS TO LEVEL 0</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
