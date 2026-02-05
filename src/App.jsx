import { useState, useRef, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import noiseBackground from './assets/bgame.mp4';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // menu, game
  const [gameData, setGameData] = useState(null);
  const bgVideoRef = useRef(null);

  // Background video setup
  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {
        // Video play failed, just continue
      });
    }
  }, []);

  const handleNewGame = () => {
    // Start new game with default data
    setGameData(null);
    setCurrentScreen('game');
  };

  const handleLoadGame = (saveData) => {
    // Load game with save data
    setGameData(saveData);
    setCurrentScreen('game');
  };

  const handleReturnToMenu = () => {
    setCurrentScreen('menu');
    setGameData(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black relative">
      {/* Global Background Video - Only show on menu screen */}
      {currentScreen === 'menu' && (
        <>
          <video
            ref={bgVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={noiseBackground} type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-70 pointer-events-none z-0"></div>

          {/* Noise Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <div className="w-full h-full"></div>
          </div>

          {/* Fog Animation */}
          <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-800 to-transparent animate-pulse"></div>
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-screen overflow-hidden">
        {currentScreen === 'menu' && (
          <MainMenu 
            onNewGame={handleNewGame}
            onLoadGame={handleLoadGame}
          />
        )}

        {currentScreen === 'game' && (
          <Game 
            saveData={gameData}
            onReturnToMenu={handleReturnToMenu}
          />
        )}
      </div>
    </div>
  );
}

export default App;