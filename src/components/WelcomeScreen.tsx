import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/sound';

interface WelcomeScreenProps {
  onStart: () => void;
  partnerName: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, partnerName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto text-center px-4 py-4 md:py-6 flex flex-col items-center justify-center"
    >
      {/* Top Classified Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/30 mb-6 backdrop-blur-sm"
      >
        <ShieldAlert className="w-3.5 h-3.5 text-crimson" />
        <span className="font-mono text-xs font-semibold tracking-widest text-crimson-light uppercase">
          AN IMPORTANT INVESTIGATION
        </span>
      </motion.div>

      {/* Main Massive Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="relative mb-3"
      >
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-cream-100 leading-none">
          2 YEARS<span className="text-crimson">.</span>
        </h1>
        {/* Subtle decorative glow behind 2 YEARS */}
        <div className="absolute inset-0 -z-10 bg-crimson/15 blur-3xl rounded-full" />
      </motion.div>

      {/* Playful Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="font-sans text-lg sm:text-xl text-cream-300 font-light max-w-lg mb-8 leading-relaxed"
      >
        And somehow, you are still putting up with me.
      </motion.p>

      {/* Locked Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="w-full max-w-md glass-panel-elevated rounded-2xl p-6 sm:p-7 mb-10 text-left relative overflow-hidden"
      >
        {/* Corner glowing accent */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-crimson/10 blur-2xl rounded-full pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-surface-100 border border-crimson/30 flex items-center justify-center flex-shrink-0 text-crimson shadow-[0_0_15px_rgba(225,29,72,0.2)]">
            <Lock className="w-5 h-5 animate-pulse" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-crimson-light font-semibold">
                SECURITY PROTOCOL #2YR
              </span>
              <span className="font-mono text-[11px] text-cream-500">ENCRYPTED</span>
            </div>

            <p className="font-serif text-lg text-cream-100 font-medium">
              Your anniversary gift has been locked.
            </p>

            <p className="text-sm text-cream-400 font-sans leading-relaxed pt-1">
              There is only one way to unlock it: navigate our shared memory vault, outsmart the riddles, and piece together the clues.
            </p>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cream-500">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-accent" />
            Candidate: <strong className="text-cream-300 font-normal">{partnerName}</strong>
          </span>
          <span className="text-crimson/90">Difficulty: Emotionally Chaotic</span>
        </div>
      </motion.div>

      {/* Large CTA Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(225, 29, 72, 0.4)' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          sound.playClick();
          onStart();
        }}
        className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-crimson hover:bg-crimson-dark text-white font-sans text-base sm:text-lg font-semibold tracking-wide shadow-glow-crimson transition-all duration-300 cursor-pointer"
      >
        <span>BEGIN THE CHAOS</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="font-mono text-xs text-cream-500 mt-4 tracking-wider flex items-center gap-1.5"
      >
        <Heart className="w-3 h-3 text-crimson/60 fill-crimson/30 inline" /> No cheat codes permitted. (Unless you bribe me with snacks.)
      </motion.p>
    </motion.div>
  );
};
