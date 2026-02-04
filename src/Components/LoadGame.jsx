import { useState, useEffect } from 'react';

const LoadGame = ({ onClose, onLoadSave }) => {
  const [selectedSlot, setSelectedSlot] = useState(0);

  const saveSlots = [
    {
      id: 1,
      chapter: 'Chapter 1',
      location: 'Abandoned Hospital',
      timestamp: '2025-02-04 14:23',
      isEmpty: false
    },
    {
      id: 2,
      chapter: 'Chapter 2',
      location: 'Dark Forest Path',
      timestamp: '2025-02-03 22:15',
      isEmpty: false
    },
    {
      id: 3,
      chapter: 'Chapter 3',
      location: 'Underground Facility',
      timestamp: '2025-02-02 18:45',
      isEmpty: false
    },
    {
      id: 4,
      isEmpty: true
    },
    {
      id: 5,
      isEmpty: true
    },
    {
      id: 6,
      isEmpty: true
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSlot(prev => (prev - 1 + saveSlots.length) % saveSlots.length);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSlot(prev => (prev + 1) % saveSlots.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!saveSlots[selectedSlot].isEmpty) {
          handleLoadGame();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlot]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      setSelectedSlot(prev => {
        let newIndex = prev + direction;
        if (newIndex < 0) newIndex = saveSlots.length - 1;
        if (newIndex >= saveSlots.length) newIndex = 0;
        return newIndex;
      });
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleLoadGame = () => {
    if (!saveSlots[selectedSlot].isEmpty) {
      onLoadSave(saveSlots[selectedSlot]);
    }
  };

  const handlePrevSlot = () => {
    setSelectedSlot(prev => (prev - 1 + saveSlots.length) % saveSlots.length);
  };

  const handleNextSlot = () => {
    setSelectedSlot(prev => (prev + 1) % saveSlots.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-20 flex items-center justify-center">
      <div className="w-full h-full flex flex-col">
        {/* Header with Back Button for Mobile */}
        <div className="flex-shrink-0 px-3 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 flex items-center justify-between sm:justify-center">
          <button
            onClick={onClose}
            className="sm:hidden text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </button>
          
          <div className="text-center flex-1 sm:flex-none">
            <h1 className="text-lg sm:text-3xl md:text-4xl font-serif text-gray-300 tracking-wider">
              Load Game
            </h1>
          </div>
          
          <div className="w-16 sm:hidden"></div> {/* Spacer for centering */}
        </div>

        <div className="h-px bg-gray-700 mx-3 sm:mx-auto sm:max-w-xs mb-3 sm:mb-6"></div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-6 overflow-hidden">
          {/* Up Arrow */}
          <button
            onClick={handlePrevSlot}
            className="mb-2 sm:mb-3 text-gray-600 hover:text-gray-400 transition-colors duration-300 opacity-60 hover:opacity-100 flex-shrink-0"
          >
            <svg className="w-4 h-4 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Save Slots Container */}
          <div className="w-full max-w-md sm:max-w-xl">
            {/* Previous Slot (Preview) */}
            <div 
              onClick={handlePrevSlot}
              className="mb-1.5 sm:mb-2 opacity-20 sm:opacity-25 transform scale-[0.80] sm:scale-85 cursor-pointer hover:opacity-40 transition-all duration-300"
            >
              {saveSlots[(selectedSlot - 1 + saveSlots.length) % saveSlots.length].isEmpty ? (
                <div className="bg-gray-900 bg-opacity-30 border border-gray-800 p-2 sm:p-3 text-center">
                  <p className="text-gray-600 text-[9px] sm:text-xs">— Empty Slot —</p>
                </div>
              ) : (
                <div className="bg-gray-900 bg-opacity-30 border border-gray-800 p-2 sm:p-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-[9px] sm:text-xs font-semibold mb-0.5">
                        Slot {saveSlots[(selectedSlot - 1 + saveSlots.length) % saveSlots.length].id}
                      </p>
                      <p className="text-gray-500 text-[8px] sm:text-[10px]">
                        {saveSlots[(selectedSlot - 1 + saveSlots.length) % saveSlots.length].chapter}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-600 text-[7px] sm:text-[9px] mb-0.5">
                        {saveSlots[(selectedSlot - 1 + saveSlots.length) % saveSlots.length].timestamp}
                      </p>
                      <p className="text-gray-500 text-[8px] sm:text-[10px]">
                        {saveSlots[(selectedSlot - 1 + saveSlots.length) % saveSlots.length].location}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Current Selected Slot - Clickable on Mobile */}
            <div 
              onClick={() => {
                if (!saveSlots[selectedSlot].isEmpty && window.innerWidth < 640) {
                  handleLoadGame();
                }
              }}
              className="transform scale-100 transition-all duration-300 shadow-2xl cursor-pointer sm:cursor-default"
            >
              {saveSlots[selectedSlot].isEmpty ? (
                <div className="bg-gray-800 bg-opacity-50 border-2 border-gray-500 p-3 sm:p-6 text-center">
                  <p className="text-gray-500 text-xs sm:text-base">— Empty Slot —</p>
                </div>
              ) : (
                <div className="bg-gray-800 bg-opacity-50 border-2 border-gray-500 p-3 sm:p-6 relative">
                  {/* Mobile tap indicator */}
                  <div className="sm:hidden absolute top-2 right-2 text-gray-500 text-[8px] animate-pulse">
                    Tap to load
                  </div>
                  
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm sm:text-xl md:text-2xl font-semibold mb-0.5 sm:mb-1">
                        Slot {saveSlots[selectedSlot].id}
                      </p>
                      <p className="text-gray-300 text-xs sm:text-base md:text-lg">
                        {saveSlots[selectedSlot].chapter}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-400 text-[9px] sm:text-sm mb-1">
                        {saveSlots[selectedSlot].timestamp}
                      </p>
                      <p className="text-gray-400 text-[10px] sm:text-sm">
                        📍 {saveSlots[selectedSlot].location}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Next Slot (Preview) */}
            <div 
              onClick={handleNextSlot}
              className="mt-1.5 sm:mt-2 opacity-20 sm:opacity-25 transform scale-[0.80] sm:scale-85 cursor-pointer hover:opacity-40 transition-all duration-300"
            >
              {saveSlots[(selectedSlot + 1) % saveSlots.length].isEmpty ? (
                <div className="bg-gray-900 bg-opacity-30 border border-gray-800 p-2 sm:p-3 text-center">
                  <p className="text-gray-600 text-[9px] sm:text-xs">— Empty Slot —</p>
                </div>
              ) : (
                <div className="bg-gray-900 bg-opacity-30 border border-gray-800 p-2 sm:p-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-[9px] sm:text-xs font-semibold mb-0.5">
                        Slot {saveSlots[(selectedSlot + 1) % saveSlots.length].id}
                      </p>
                      <p className="text-gray-500 text-[8px] sm:text-[10px]">
                        {saveSlots[(selectedSlot + 1) % saveSlots.length].chapter}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-600 text-[7px] sm:text-[9px] mb-0.5">
                        {saveSlots[(selectedSlot + 1) % saveSlots.length].timestamp}
                      </p>
                      <p className="text-gray-500 text-[8px] sm:text-[10px]">
                        {saveSlots[(selectedSlot + 1) % saveSlots.length].location}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Down Arrow */}
          <button
            onClick={handleNextSlot}
            className="mt-2 sm:mt-3 text-gray-600 hover:text-gray-400 transition-colors duration-300 opacity-60 hover:opacity-100 flex-shrink-0"
          >
            <svg className="w-4 h-4 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Action Buttons - Hidden on Mobile, Shown on Desktop */}
        <div className="hidden sm:flex mt-6 gap-3 md:gap-4 justify-center items-center pb-6 flex-shrink-0">
          <button
            onClick={handleLoadGame}
            disabled={saveSlots[selectedSlot].isEmpty}
            className={`
              px-10 md:px-12 py-2.5 md:py-3 
              text-base md:text-lg font-semibold tracking-wide
              transition-all duration-300 border
              ${saveSlots[selectedSlot].isEmpty
                ? 'text-gray-600 border-gray-800 cursor-not-allowed'
                : 'text-gray-300 border-gray-600 hover:text-white hover:border-gray-400 hover:bg-gray-800 hover:bg-opacity-30'
              }
            `}
          >
            Load Game
          </button>

          <button
            onClick={onClose}
            className="px-10 md:px-12 py-2.5 md:py-3 text-base md:text-lg font-semibold tracking-wide text-gray-500 border border-gray-700 hover:text-gray-300 hover:border-gray-500 transition-all duration-300"
          >
            Back
          </button>
        </div>

        {/* Help Text */}
        <div className="pb-3 sm:pb-5 text-center flex-shrink-0">
          <p className="text-gray-600 text-[8px] sm:text-[10px]">
            <span className="sm:hidden">Tap slot to load • </span>Use arrows or swipe to navigate
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadGame;