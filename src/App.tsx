import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { puzzleConfig } from './config/puzzles';
import { sound } from './utils/sound';
import { ParticleBackground } from './components/ParticleBackground';
import { GlobalHeader } from './components/GlobalHeader';
import { GlobalProgress } from './components/GlobalProgress';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LevelCard } from './components/LevelCard';
import { FinaleScreen } from './components/FinaleScreen';
import { HintModal } from './components/HintModal';
import { SimulatedDriveModal } from './components/SimulatedDriveModal';
import { AdminDrawer } from './components/AdminDrawer';

export const App: React.FC = () => {
  // Local state for puzzle progression (with localStorage backup)
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('anniversary_escape_level');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= puzzleConfig.levels.length + 1) {
          return parsed;
        }
      }
    } catch {
      // Safe fallback
    }
    return 0; // 0 = Welcome screen
  });

  const [soundMuted, setSoundMuted] = useState<boolean>(() => sound.getMuted());
  const [ambientPlaying, setAmbientPlaying] = useState<boolean>(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync level changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('anniversary_escape_level', currentLevelIndex.toString());
    } catch {
      // ignore
    }
  }, [currentLevelIndex]);

  const totalLevels = puzzleConfig.levels.length;
  const isWelcomeScreen = currentLevelIndex === 0;
  const isFinale = currentLevelIndex > totalLevels;

  const currentLevel =
    !isWelcomeScreen && !isFinale
      ? puzzleConfig.levels[currentLevelIndex - 1]
      : null;

  const handleStart = () => {
    sound.startAmbient();
    setAmbientPlaying(true);
    setCurrentLevelIndex(1);
  };

  const handleLevelSuccess = () => {
    setCurrentLevelIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentLevelIndex(0);
    try {
      localStorage.setItem('anniversary_escape_level', '0');
    } catch {
      // ignore
    }
  };

  const handleToggleSound = () => {
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
  };

  const handleToggleAmbient = () => {
    const active = sound.toggleAmbient();
    setAmbientPlaying(active);
  };

  const handleOpenDrive = () => {
    if (currentLevel?.driveUrl && currentLevel.driveUrl.startsWith('http')) {
      window.open(currentLevel.driveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setIsDriveModalOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-cream-100 flex flex-col justify-between selection:bg-crimson selection:text-white">
      {/* Ambient particles and atmospheric glow */}
      <ParticleBackground />

      {/* Global Header */}
      <GlobalHeader
        currentLevelCode={currentLevel?.levelCode || 'LEVEL 01'}
        isWelcomeScreen={isWelcomeScreen}
        isFinale={isFinale}
        onOpenHint={() => setIsHintOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        ambientPlaying={ambientPlaying}
        onToggleAmbient={handleToggleAmbient}
      />

      {/* Main Dynamic Viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-28 md:pb-32 px-4 w-full">
        <AnimatePresence mode="wait">
          {isWelcomeScreen ? (
            <WelcomeScreen
              key="welcome"
              onStart={handleStart}
              partnerName={puzzleConfig.couple.partnerName}
            />
          ) : isFinale ? (
            <FinaleScreen
              key="finale"
              config={puzzleConfig}
              onRestart={handleRestart}
            />
          ) : currentLevel ? (
            <LevelCard
              key={currentLevel.id}
              level={currentLevel}
              onSuccess={handleLevelSuccess}
              wrongAnswerMessages={puzzleConfig.wrongAnswerMessages}
              onOpenDriveFolder={handleOpenDrive}
            />
          ) : null}
        </AnimatePresence>
      </main>

      {/* Global Bottom Progress Bar & Level Pips */}
      <GlobalProgress
        totalLevels={totalLevels}
        currentLevelIndex={currentLevelIndex}
        onJumpToLevel={(lvl) => {
          sound.playClick();
          setCurrentLevelIndex(lvl);
        }}
      />

      {/* Detective Hint Modal */}
      {currentLevel && (
        <HintModal
          isOpen={isHintOpen}
          onClose={() => setIsHintOpen(false)}
          hint={currentLevel.hint}
          levelTitle={currentLevel.title}
          secretAnswer={currentLevel.secretAnswer}
        />
      )}

      {/* Simulated Drive & Evidence Folder Modal */}
      {currentLevel && currentLevel.driveSimulatedFolder && (
        <SimulatedDriveModal
          isOpen={isDriveModalOpen}
          onClose={() => setIsDriveModalOpen(false)}
          folderName={currentLevel.driveSimulatedFolder.name}
          externalDriveUrl={currentLevel.driveUrl}
          files={currentLevel.driveSimulatedFolder.files}
          levelTitle={currentLevel.title}
        />
      )}

      {/* Director / Developer Inspector Drawer */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={puzzleConfig}
        currentLevelIndex={currentLevelIndex}
        onSelectLevel={(idx) => setCurrentLevelIndex(idx)}
        onResetAll={handleRestart}
      />
    </div>
  );
};

export default App;
