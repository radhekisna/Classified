import React from 'react';
import { motion } from 'framer-motion';
import { Delete, Unlock, KeyRound } from 'lucide-react';
import { sound } from '../utils/sound';

interface KeypadInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const KeypadInput: React.FC<KeypadInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
}) => {
  const handleDigit = (digit: string) => {
    if (disabled || value.length >= 4) return;
    sound.playKeypad(400 + parseInt(digit, 10) * 45);
    onChange(value + digit);
  };

  const handleBackspace = () => {
    if (disabled || value.length === 0) return;
    sound.playClick();
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    if (disabled) return;
    sound.playClick();
    onChange('');
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'DEL'];

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center">
      {/* Code Display Screen */}
      <div className="w-full mb-4 px-4 py-3 rounded-xl bg-surface-300 border border-white/10 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-crimson-light" />
          <span className="font-mono text-xs text-cream-500 uppercase">VAULT PIN:</span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                idx < value.length
                  ? 'bg-crimson border-crimson shadow-[0_0_8px_#e11d48]'
                  : 'bg-transparent border-white/20'
              }`}
            />
          ))}
          <span className="font-mono text-sm tracking-widest text-cream-200 ml-2 font-bold min-w-[36px] text-right">
            {value.padEnd(4, '•')}
          </span>
        </div>
      </div>

      {/* Tactile Keypad Grid */}
      <div className="grid grid-cols-3 gap-2.5 w-full mb-4">
        {keys.map((k) => {
          if (k === 'DEL') {
            return (
              <motion.button
                key={k}
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={handleBackspace}
                disabled={disabled || value.length === 0}
                className="h-12 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/5 text-cream-400 hover:text-cream-200 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Delete last digit"
              >
                <Delete className="w-4 h-4" />
              </motion.button>
            );
          }
          if (k === 'C') {
            return (
              <motion.button
                key={k}
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={handleClear}
                disabled={disabled || value.length === 0}
                className="h-12 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/5 font-mono text-xs font-semibold text-cream-400 hover:text-cream-200 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                CLR
              </motion.button>
            );
          }
          return (
            <motion.button
              key={k}
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => handleDigit(k)}
              disabled={disabled}
              className="h-12 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 font-mono text-lg font-bold text-cream-100 hover:text-white flex items-center justify-center transition-all hover:border-crimson/30 shadow-sm disabled:opacity-50"
            >
              {k}
            </motion.button>
          );
        })}
      </div>

      {/* Unlock Action Button */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        onClick={onSubmit}
        disabled={disabled || value.length !== 4}
        className="w-full py-3.5 px-4 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-sans font-semibold text-sm tracking-wide shadow-glow-crimson transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <Unlock className="w-4 h-4" />
        <span>ENGAGE VAULT RELEASE</span>
      </motion.button>
    </div>
  );
};
