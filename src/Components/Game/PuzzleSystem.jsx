import { useState } from 'react';
import NumberPuzzle from './puzzles/NumberPuzzle';
import ItemCombinationPuzzle from './puzzles/ItemCombinationPuzzle';
import SequencePuzzle from './puzzles/SequencePuzzle';

const PuzzleSystem = ({ puzzle, onComplete, onClose }) => {
  const [attempts, setAttempts] = useState(0);
  
  // Safety check
  if (!puzzle) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">Puzzle data is missing</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const maxAttempts = puzzle.maxAttempts || 999;

  const handlePuzzleSolved = (success) => {
    if (success) {
      onComplete({
        ...puzzle.reward,
        success: true
      });
    } else {
      setAttempts(prev => prev + 1);
      
      if (attempts + 1 >= maxAttempts) {
        // Failed too many times
        onComplete({
          sanityChange: -10,
          success: false,
          nextScene: puzzle.failScene
        });
      }
    }
  };

  const renderPuzzle = () => {
    switch (puzzle.type) {
      case 'number':
        return (
          <NumberPuzzle
            puzzle={puzzle}
            onSolved={handlePuzzleSolved}
            attempts={attempts}
            maxAttempts={maxAttempts}
          />
        );
      
      case 'item_combination':
        return (
          <ItemCombinationPuzzle
            puzzle={puzzle}
            onSolved={handlePuzzleSolved}
            attempts={attempts}
            maxAttempts={maxAttempts}
          />
        );
      
      case 'sequence':
        return (
          <SequencePuzzle
            puzzle={puzzle}
            onSolved={handlePuzzleSolved}
            attempts={attempts}
            maxAttempts={maxAttempts}
          />
        );
      
      default:
        return (
          <div className="text-center">
            <p className="text-red-400">Unknown puzzle type: {puzzle.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border-2 border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg sm:text-xl text-gray-300 font-semibold">
            {puzzle.title || 'Puzzle'}
          </h3>
          
          {puzzle.canSkip && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Skip ✕
            </button>
          )}
        </div>

        {/* Description */}
        {puzzle.description && (
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <p className="text-gray-400 text-xs sm:text-sm">
              {puzzle.description}
            </p>
          </div>
        )}

        {/* Puzzle Content */}
        <div className="p-4 sm:p-6">
          {renderPuzzle()}
        </div>

        {/* Attempts Counter */}
        {maxAttempts < 999 && (
          <div className="px-4 pb-4 text-center">
            <p className="text-gray-500 text-xs">
              Attempts: {attempts} / {maxAttempts}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleSystem;