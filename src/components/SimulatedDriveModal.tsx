import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Folder, FileImage, FileText, Music, Info } from 'lucide-react';
import { sound } from '../utils/sound';

interface DriveFile {
  name: string;
  type: 'image' | 'audio' | 'document' | 'note';
  date: string;
  previewText?: string;
  caption?: string;
  hintClue?: string;
  imageUrl?: string;
}

interface SimulatedDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  externalDriveUrl?: string;
  files: DriveFile[];
  levelTitle: string;
}

export const SimulatedDriveModal: React.FC<SimulatedDriveModalProps> = ({
  isOpen,
  onClose,
  folderName,
  externalDriveUrl,
  files,
  levelTitle,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl glass-panel-elevated rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-10 my-auto text-left"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-surface-100/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Folder className="w-5 h-5 text-amber-accent" />
              <div>
                <h3 className="font-mono text-xs text-cream-400 uppercase tracking-widest">
                  SECURE REPOSITORY // {levelTitle}
                </h3>
                <p className="font-sans text-sm font-semibold text-cream-100">
                  {folderName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {externalDriveUrl && (
                <a
                  href={externalDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-3 py-1.5 rounded-lg bg-surface-200 hover:bg-surface-50 border border-white/10 text-xs font-mono text-cream-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Real Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-cream-400 hover:text-white transition-colors"
                aria-label="Close Archive"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader Notice */}
          <div className="px-6 py-2.5 bg-crimson/10 border-b border-crimson/20 flex items-center gap-2 text-xs font-sans text-cream-300">
            <Info className="w-4 h-4 text-crimson flex-shrink-0" />
            <span>
              Examine the confidential files below. Inspect dates, captions, and secret tags to solve the clue.
            </span>
          </div>

          {/* Files List / Grid */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
            {files.map((file, idx) => {
              const Icon =
                file.type === 'audio'
                  ? Music
                  : file.type === 'image'
                  ? FileImage
                  : FileText;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-100/70 hover:bg-surface-100 border border-white/5 hover:border-white/15 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-surface-200 text-crimson-light border border-white/5 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-mono text-sm font-semibold text-cream-100 group-hover:text-crimson-light transition-colors">
                          {file.name}
                        </div>
                        <div className="font-mono text-[11px] text-cream-500">
                          Timestamp: {file.date}
                        </div>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-surface-300 text-cream-400 border border-white/5">
                      {file.type}
                    </span>
                  </div>

                  {file.caption && (
                    <p className="text-xs text-cream-300 pl-11 font-sans italic border-l-2 border-crimson/30 my-1 py-0.5">
                      "{file.caption}"
                    </p>
                  )}

                  {file.hintClue && (
                    <div className="pl-11 pt-1">
                      <span className="inline-block text-[11px] font-mono text-amber-accent/90 bg-amber-accent/10 px-2 py-0.5 rounded">
                        🔍 Clue note: {file.hintClue}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-surface-200/90 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cream-400">
            <span>Confidential Evidence Archive</span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-surface-100 hover:bg-surface-50 border border-white/10 text-cream-200 hover:text-white transition-colors"
            >
              Return to Puzzle
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
