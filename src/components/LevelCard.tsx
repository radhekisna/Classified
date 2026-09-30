import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ExternalLink, CheckCircle2, AlertCircle, ArrowRight, Unlock, Lock, FolderOpen } from 'lucide-react';
import type { PuzzleLevel } from '../config/puzzles';
import { KeypadInput } from './KeypadInput';
import { AudioPlayer } from './AudioPlayer';
import { sound } from '../utils/sound';

interface LevelCardProps {
  level: PuzzleLevel;
  onSuccess: () => void;
  wrongAnswerMessages: string[];
  onOpenDriveFolder: () => void;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  onSuccess,
  wrongAnswerMessages,
  onOpenDriveFolder,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  const normalize = (str: string) =>
    str.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

  const checkTimestampRangeMatch = (input: string, accepted: string[]) => {
    const timeRangeRegex = /^(\d{1,2}):(\d{2})\s*[-–—]\s*(\d{1,2}):(\d{2})$/;
    const inputMatch = input.trim().match(timeRangeRegex);
    if (!inputMatch) return false;

    const inStartM = parseInt(inputMatch[1], 10);
    const inStartS = parseInt(inputMatch[2], 10);
    const inEndM = parseInt(inputMatch[3], 10);
    const inEndS = parseInt(inputMatch[4], 10);

    return accepted.some((target) => {
      const targetMatch = target.trim().match(timeRangeRegex);
      if (!targetMatch) return false;
      const targetStartM = parseInt(targetMatch[1], 10);
      const targetStartS = parseInt(targetMatch[2], 10);
      const targetEndM = parseInt(targetMatch[3], 10);
      const targetEndS = parseInt(targetMatch[4], 10);

      return (
        inStartM === targetStartM &&
        inStartS === targetStartS &&
        inEndM === targetEndM &&
        inEndS === targetEndS
      );
    });
  };

  const handleValidate = () => {
    if (isSolved) return;

    let isCorrect = false;

    if (level.acceptedAnswers.some((ans) => ans.includes(':'))) {
      isCorrect = checkTimestampRangeMatch(inputValue, level.acceptedAnswers);
    } else if (level.inputType === 'keypad') {
      isCorrect = level.acceptedAnswers.includes(inputValue.trim());
    } else {
      const normalizedInput = normalize(inputValue);
      isCorrect = level.acceptedAnswers.some(
        (ans) => normalize(ans) === normalizedInput
      );
    }

    if (isCorrect) {
      sound.playSuccess();
      setIsSolved(true);
      setIsError(false);
    } else {
      sound.playError();
      setIsShaking(true);
      setIsError(true);

      // Pick random humorous error message
      const randomMsg =
        wrongAnswerMessages[Math.floor(Math.random() * wrongAnswerMessages.length)];
      setErrorMessage(randomMsg);

      // Stop shaking animation after brief duration
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleValidate();
    }
  };

  const shakeVariants: Variants = {
    idle: { x: 0 },
    shake: {
      x: [0, -12, 12, -10, 10, -6, 6, -3, 3, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      key={level.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center justify-center"
    >
      {/* Category Dossier Badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200/90 border border-white/10 mb-4 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
        <span className="font-mono text-xs font-semibold tracking-widest text-cream-300 uppercase">
          {level.badge}
        </span>
      </motion.div>

      {/* Level Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream-100 mb-6 text-center"
      >
        {level.title}
      </motion.h2>

      {/* Main Narrative Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full glass-panel-elevated rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/5 blur-3xl rounded-full pointer-events-none" />

        {/* Narrative Description Lines */}
        <div className="space-y-2 mb-6 text-left">
          {level.description.map((line, idx) => (
            <p
              key={idx}
              className={`font-sans text-base sm:text-lg leading-relaxed ${
                idx === level.description.length - 1
                  ? 'text-cream-100 font-medium'
                  : 'text-cream-300'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Humorous Interlude Lines */}
        {(level.humorousNote || level.humorousSubtext) && (
          <div className="p-4 rounded-xl bg-surface-100/60 border border-white/5 mb-6 text-left space-y-1">
            {level.humorousNote && (
              <p className="font-sans text-sm text-cream-200 italic">
                "{level.humorousNote}"
              </p>
            )}
            {level.humorousSubtext && (
              <p className="font-mono text-xs text-crimson-light font-medium tracking-wide">
                {level.humorousSubtext}
              </p>
            )}
          </div>
        )}

        {/* Google Drive / Archive CTA Button */}
        {level.driveButtonText && (
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6 pt-1">
            <button
              onClick={() => {
                sound.playClick();
                onOpenDriveFolder();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-100 hover:bg-surface-50 border border-crimson/25 hover:border-crimson/50 text-cream-100 hover:text-white font-sans text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-sm group cursor-pointer"
            >
              <FolderOpen className="w-4 h-4 text-crimson-light group-hover:scale-110 transition-transform" />
              <span>{level.driveButtonText}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cream-400 group-hover:text-cream-100" />
            </button>
          </div>
        )}

        {/* Interactive Audio Player for Soundtrack Level */}
        {level.audioUrl && (
          <AudioPlayer src={level.audioUrl} title={level.audioTitle} />
        )}

        {/* Puzzle Interactive Input Section */}
        <div className="border-t border-white/5 pt-6 text-left">
          <div className="flex items-center justify-between mb-3">
            <label className="font-mono text-xs font-semibold uppercase tracking-wider text-cream-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-crimson" />
              <span>{level.promptText}</span>
            </label>
            <span className="font-mono text-[11px] text-cream-500">
              {isSolved ? 'VERIFIED' : 'AWAITING KEY'}
            </span>
          </div>

          {/* If Solved: Show Success Banner */}
          <AnimatePresence mode="wait">
            {isSolved ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-3"
              >
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 animate-bounce" />
                  <div>
                    <h4 className="font-mono text-sm font-bold tracking-widest uppercase">
                      {level.successHeading}
                    </h4>
                    <p className="font-sans text-xs text-cream-300">
                      {level.successMessage}
                    </p>
                  </div>
                </div>

                <p className="font-sans text-xs text-cream-400 italic pl-9">
                  {level.successSubtext}
                </p>

                <div className="pt-2 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      sound.playClick();
                      onSuccess();
                    }}
                    className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-sm font-semibold tracking-wide shadow-glow-emerald flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ) : level.inputType === 'keypad' ? (
              /* Keypad for Level 05 Vault */
              <motion.div
                variants={shakeVariants}
                animate={isShaking ? 'shake' : 'idle'}
              >
                <KeypadInput
                  value={inputValue}
                  onChange={(val) => {
                    setInputValue(val);
                    if (isError) setIsError(false);
                  }}
                  onSubmit={handleValidate}
                  disabled={isSolved}
                />
              </motion.div>
            ) : (
              /* Standard or Date Input with UNLOCK Button */
              <motion.div
                variants={shakeVariants}
                animate={isShaking ? 'shake' : 'idle'}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type={level.inputType === 'date' ? 'date' : 'text'}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        if (isError) setIsError(false);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder={level.inputPlaceholder}
                      className={`w-full px-4 py-3.5 rounded-xl bg-surface-100/90 text-cream-100 placeholder:text-cream-500 font-sans text-base border focus:outline-none transition-all ${
                        isError
                          ? 'border-crimson/80 shadow-[0_0_15px_rgba(225,29,72,0.3)] bg-crimson/5'
                          : 'border-white/10 focus:border-crimson/50 focus:shadow-[0_0_15px_rgba(225,29,72,0.15)]'
                      }`}
                      autoFocus
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={handleValidate}
                    className="px-6 py-3.5 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-sans font-semibold text-sm tracking-wide shadow-glow-crimson transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>UNLOCK</span>
                  </motion.button>
                </div>

                {/* Error Shake Message */}
                <AnimatePresence>
                  {isError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-lg bg-crimson/10 border border-crimson/30 flex items-start gap-2.5 text-xs text-crimson-light font-sans"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">{errorMessage}</span>
                        <span className="block text-[11px] text-cream-400 mt-0.5">
                          Check your spelling or investigate the archive notes.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
