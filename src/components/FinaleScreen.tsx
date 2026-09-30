import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Gift, Sparkles, Heart, RotateCcw, Calendar, Star } from 'lucide-react';
import type { AnniversaryConfig } from '../config/puzzles';
import { sound } from '../utils/sound';

interface FinaleScreenProps {
  config: AnniversaryConfig;
  onRestart: () => void;
}

export const FinaleScreen: React.FC<FinaleScreenProps> = ({ config, onRestart }) => {
  const [claimedReward, setClaimedReward] = useState(false);

  useEffect(() => {
    // Fire sound effect
    sound.playVaultUnlock();

    // Cinematic Confetti Cannons
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#fb7185', '#f59e0b', '#fbf8f3'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#fb7185', '#f59e0b', '#fbf8f3'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);



  const handleClaim = () => {
    sound.playSuccess();
    setClaimedReward(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#f59e0b', '#10b981'],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[85vh] text-center"
    >
      {/* Top Solved Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6 backdrop-blur-md"
      >
        <Trophy className="w-4 h-4 text-emerald-400" />
        <span className="font-mono text-xs font-semibold tracking-widest text-emerald-300 uppercase">
          {config.finale.badge}
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-100 mb-3"
      >
        {config.finale.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-sans text-base sm:text-lg text-cream-300 mb-10 max-w-lg"
      >
        {config.finale.subtitle}
      </motion.p>

      {/* The Confidential Letter */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="w-full glass-panel-elevated rounded-3xl p-7 sm:p-10 mb-10 text-left relative overflow-hidden shadow-2xl"
      >
        {/* Header with Title and Corner Stamp in natural responsive layout to prevent collision */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <h3 className="font-serif text-xl sm:text-2xl text-cream-100 font-semibold leading-snug flex-1 pr-2">
            <span>{config.finale.letterHeading}</span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-crimson fill-crimson inline ml-2 -mt-1" />
          </h3>

          <div className="self-start sm:self-auto border-2 border-crimson/40 bg-crimson/5 rounded-lg px-3 py-1 -rotate-3 sm:-rotate-6 flex-shrink-0 shadow-sm pointer-events-none">
            <span className="font-mono text-[10px] sm:text-xs text-crimson-light font-bold uppercase tracking-widest whitespace-nowrap">
              AUTHENTICATED // 2 YRS
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3 text-cream-200 font-sans text-base sm:text-lg leading-relaxed">
            {config.finale.letterParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cream-400">
            <span>Logged into Eternal Archive</span>
            <span>With all my love, Minku. ❤️</span>
          </div>
        </div>
      </motion.div>

      {/* The Golden Anniversary Gift Pass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="w-full max-w-xl relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-surface-100 via-surface-200 to-surface-100 border-2 border-amber-accent/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] mb-12 text-left overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-accent/10 blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-accent/20 border border-amber-accent/40 text-amber-accent">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-amber-accent font-semibold block">
                {config.finale.giftBadge}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-cream-100">
                {config.finale.giftTitle}
              </h4>
            </div>
          </div>

          <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-accent/15 text-amber-accent border border-amber-accent/30 font-bold">
            TIER 02
          </span>
        </div>

        <p className="text-sm text-cream-300 font-sans leading-relaxed mb-6">
          {config.finale.giftDescription}
        </p>

        {/* Main Reveal & Supporting Details */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface-300 border border-white/10 space-y-3 mb-6">
          <div className="flex items-center gap-2 text-amber-accent font-serif text-base sm:text-lg font-semibold">
            <Sparkles className="w-4 h-4 text-amber-accent flex-shrink-0" />
            <span>{config.finale.mainReveal}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/5 font-mono text-xs">
            <div className="bg-surface-100/80 p-2.5 rounded-lg border border-white/5">
              <span className="text-cream-500 block text-[10px] uppercase">Destination</span>
              <span className="text-crimson-light font-bold">{config.finale.supportingDetails.destination}</span>
            </div>
            <div className="bg-surface-100/80 p-2.5 rounded-lg border border-white/5">
              <span className="text-cream-500 block text-[10px] uppercase">Details</span>
              <span className="text-amber-accent font-bold">{config.finale.supportingDetails.details}</span>
            </div>
            <div className="bg-surface-100/80 p-2.5 rounded-lg border border-white/5">
              <span className="text-cream-500 block text-[10px] uppercase">Status</span>
              <span className="text-emerald-400 font-bold">{config.finale.supportingDetails.status}</span>
            </div>
          </div>
        </div>

        {/* Claim Reward Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClaim}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-accent via-rose-gold to-crimson text-black font-sans font-bold text-base tracking-wide shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-110"
        >
          <Sparkles className="w-5 h-5 text-black" />
          <span>{claimedReward ? 'REWARD CLAIMED (GET PACKING!)' : 'CLAIM YOUR ANNIVERSARY REWARD'}</span>
        </motion.button>
      </motion.div>

      {/* Polaroid / Scrapbook Memories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="w-full mb-12 text-left"
      >
        <h3 className="font-serif text-2xl text-cream-100 font-semibold mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-accent" />
          <span>Case Milestones: The Evidence Board</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.finale.memories.map((mem, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, rotate: idx % 2 === 0 ? -1 : 1 }}
              className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2 relative transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-crimson-light font-semibold">
                  {mem.tag}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-cream-500">
                  <Calendar className="w-3 h-3" />
                  {mem.date}
                </span>
              </div>

              <h4 className="font-serif text-lg font-medium text-cream-100">
                {mem.title}
              </h4>

              <p className="font-sans text-xs sm:text-sm text-cream-300 leading-relaxed italic">
                "{mem.caption}"
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reset / Play Again CTA */}
      <div className="pt-4 flex flex-col items-center gap-3">
        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-200 hover:bg-surface-100 border border-white/10 text-xs font-mono text-cream-400 hover:text-white transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET ESCAPE ROOM (PLAY AGAIN)</span>
        </button>

        <p className="font-mono text-[11px] text-cream-500">
          Happy 3 Years. Here's to forever.
        </p>
      </div>
    </motion.div>
  );
};
