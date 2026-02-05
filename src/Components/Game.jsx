import { useState, useEffect } from 'react';
import {  IoMenu } from 'react-icons/io5';
import { RiSuitcaseFill } from "react-icons/ri";
import { PiBrainFill } from "react-icons/pi";
import DialogueSystem from './game/DialogueSystem';
import Backpack from './game/Backpack';
import PuzzleSystem from './game/PuzzleSystem';
import GameMenu from './game/GameMenu';
import { STORY_DATA } from './game/StoryData';

const Game = ({ saveData, onReturnToMenu }) => {
  const [currentScene, setCurrentScene] = useState(saveData?.sceneId || 'chapter_1_start');
  const [sanity, setSanity] = useState(saveData?.sanity || 100);
  const [inventory, setInventory] = useState(saveData?.inventory || []);
  const [storyFlags, setStoryFlags] = useState(saveData?.flags || {});
  const [showBackpack, setShowBackpack] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activePuzzle, setActivePuzzle] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  const scene = STORY_DATA[currentScene];

  useEffect(() => {
    if (sanity <= 0) {
      setCurrentScene('ending_insane');
      setGameEnded(true);
    }
  }, [sanity]);

  // ESC key to open menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showBackpack) {
          setShowBackpack(false);
        } else if (showMenu) {
          setShowMenu(false);
        } else {
          setShowMenu(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBackpack, showMenu]);

  const handleChoice = (choice) => {
    if (choice.sanityChange) {
      setSanity(prev => Math.max(0, Math.min(100, prev + choice.sanityChange)));
    }

    if (choice.giveItem) {
      setInventory(prev => [...prev, choice.giveItem]);
    }

    if (choice.setFlag) {
      setStoryFlags(prev => ({ ...prev, ...choice.setFlag }));
    }

    if (choice.triggerPuzzle) {
      setActivePuzzle(choice.triggerPuzzle);
      return;
    }

    if (choice.nextScene) {
      setCurrentScene(choice.nextScene);
    }

    if (choice.isEnding) {
      setGameEnded(true);
    }
  };

  const handlePuzzleComplete = (puzzleData) => {
    setActivePuzzle(null);
    
    if (puzzleData.sanityChange) {
      setSanity(prev => Math.max(0, Math.min(100, prev + puzzleData.sanityChange)));
    }
    
    if (puzzleData.giveItem) {
      setInventory(prev => [...prev, puzzleData.giveItem]);
    }

    if (puzzleData.nextScene) {
      setCurrentScene(puzzleData.nextScene);
    }
  };

  const handleUseItem = (item) => {
    if (scene.useableItems && scene.useableItems.includes(item.id)) {
      if (item.consumable) {
        setInventory(prev => prev.filter(i => i.id !== item.id));
      }

      if (scene.itemEffects && scene.itemEffects[item.id]) {
        const effect = scene.itemEffects[item.id];
        
        if (effect.sanityChange) {
          setSanity(prev => Math.max(0, Math.min(100, prev + effect.sanityChange)));
        }

        if (effect.nextScene) {
          setCurrentScene(effect.nextScene);
        }

        if (effect.unlockPuzzle) {
          setActivePuzzle(effect.unlockPuzzle);
        }
      }
    }
  };

  const handleSaveGame = () => {
    const saveData = {
      sceneId: currentScene,
      sanity: sanity,
      inventory: inventory,
      flags: storyFlags,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('game_save', JSON.stringify(saveData));
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-4 bg-transparent bg-opacity-90 text-white px-4 py-2 text-xs z-50';
    notification.textContent = 'Game Saved!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const handleSettings = () => {
    // Placeholder for settings - you can implement this later
    alert('Settings menu coming soon!');
  };

  if (!scene) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center bg-gray-900 bg-opacity-90 p-6 border border-gray-700">
          <p className="text-white mb-4 text-sm">Scene not found: {currentScene}</p>
          <button
            onClick={onReturnToMenu}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs border border-gray-600 transition-all"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Scene Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: scene.background ? `url(${scene.background})` : 'none',
          backgroundColor: '#0a0a0a',
          filter: 'brightness(0.6)'
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />

   {/* Top Right UI - Only 2 icons */}
<div className="absolute top-0 right-0 z-20 p-3 sm:p-4 pointer-events-none">
  <div className="flex gap-2 pointer-events-auto">
    {/* Backpack Icon - Hide when backpack or menu is open */}
    {!showBackpack && !showMenu && (
      <button
        onClick={() => setShowBackpack(!showBackpack)}
        className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm border border-gray-600 hover:border-gray-400 transition-all group"
        title="Backpack (I)"
      >
        <PiBrainFill className="text-lg sm:text-xl text-gray-300 group-hover:text-white transition-colors" />
      </button>
    )}
    
    {/* Menu Icon - Hide when backpack or menu is open */}
    {!showBackpack && !showMenu && (
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm border border-gray-600 hover:border-gray-400 transition-all group"
        title="Menu (ESC)"
      >
        <IoMenu className="text-xl sm:text-2xl text-gray-300 group-hover:text-white transition-colors" />
      </button>
    )}
  </div>
</div>

      {/* Main Game Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        {/* Game Menu Overlay */}
        {showMenu && (
          <GameMenu
            onClose={() => setShowMenu(false)}
            onSave={handleSaveGame}
            onSettings={handleSettings}
            onExit={onReturnToMenu}
          />
        )}

        {/* Active Puzzle Overlay */}
        {activePuzzle && (
          <PuzzleSystem
            puzzle={activePuzzle}
            onComplete={handlePuzzleComplete}
            onClose={() => setActivePuzzle(null)}
          />
        )}

        {/* Backpack Overlay - Now includes Sanity status */}
        {showBackpack && (
          <Backpack
            inventory={inventory}
            sanity={sanity}
            onClose={() => setShowBackpack(false)}
            onUseItem={handleUseItem}
            currentScene={scene}
          />
        )}

        {/* Dialogue System */}
        {!activePuzzle && !showBackpack && !showMenu && (
          <DialogueSystem
            scene={scene}
            onChoice={handleChoice}
            storyFlags={storyFlags}
            gameEnded={gameEnded}
          />
        )}
      </div>
    </div>
  );
};

export default Game;