import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Eye, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/sound';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
  levelTitle: string;
  secretAnswer: string;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  hint,
  levelTitle,
  secretAnswer,
}) => {
  const [showAnswer, setShowAnswer] = React.useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
            setShowAnswer(false);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md glass-panel-elevated rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-7 z-10 text-left"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-accent/15 border border-amber-accent/30 text-amber-accent">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-accent font-semibold block">
                  INVESTIGATION DISCLOSURE
                </span>
                <h3 className="font-serif text-lg font-bold text-cream-100">
                  Detective Assistance
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
                setShowAnswer(false);
              }}
              className="p-1 rounded-lg hover:bg-white/10 text-cream-400 hover:text-white transition-colors"
              aria-label="Close Hint"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-100 border border-white/5 text-xs text-cream-300">
              <AlertTriangle className="w-4 h-4 text-amber-accent flex-shrink-0 mt-0.5" />
              <span>
                <strong>Warning:</strong> Requesting a hint does not void your relationship warranty, but you will be mildly teased later.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-300/80 border border-amber-accent/20">
              <span className="block font-mono text-[11px] text-amber-accent uppercase tracking-wider mb-1">
                Clue for {levelTitle}:
              </span>
              <p className="font-sans text-sm text-cream-100 leading-relaxed italic">
                "{hint}"
              </p>
            </div>

            {/* Emergency override button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowAnswer(!showAnswer);
                }}
                className="font-mono text-[11px] text-cream-500 hover:text-cream-300 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAnswer ? 'Hide Solution' : 'Emergency Reveal'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                  setShowAnswer(false);
                }}
                className="px-4 py-2 rounded-lg bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-cream-200 hover:text-white transition-colors"
              >
                Got It
              </button>
            </div>

            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-lg bg-crimson/15 border border-crimson/30 text-xs font-mono text-crimson-light"
              >
                Direct passcode: <strong>{secretAnswer}</strong>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
