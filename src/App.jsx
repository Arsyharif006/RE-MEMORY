import { useState, useRef, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import Credits from './components/Credits';
import noiseBackground from './assets/bgame.mp4';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // menu, credits, transition, game
  const [transitionTarget, setTransitionTarget] = useState(null);
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
    setTransitionTarget('newGame');
    setCurrentScreen('transition');
  };

  const handleLoadGame = () => {
    setTransitionTarget('loadGame');
    setCurrentScreen('transition');
  };

  const handleShowCredits = () => {
    setCurrentScreen('credits');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleTransitionComplete = () => {
    // Setelah transition selesai, bisa redirect ke game screen
    // Untuk sementara kembali ke menu
    console.log('Transition complete, target:', transitionTarget);
    setCurrentScreen('menu');
    setTransitionTarget(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black relative">
      {/* Global Background Video - Rendered Only Once */}
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

      {/* Content */}
      <div className="relative z-10 w-full h-screen overflow-hidden">
        {currentScreen === 'menu' && (
          <MainMenu 
            onNewGame={handleNewGame}
            onLoadGame={handleLoadGame}
            onShowCredits={handleShowCredits}
          />
        )}

        {currentScreen === 'credits' && (
          <Credits onBack={handleBackToMenu} />
        )}

        {currentScreen === 'transition' && (
          <TransitionScreen 
            onComplete={handleTransitionComplete}
            target={transitionTarget}
          />
        )}

        {/* Game screen akan ditambahkan nanti */}
        {currentScreen === 'game' && (
          <div className="flex items-center justify-center h-screen">
            <p className="text-white text-2xl">Game Screen (Coming Soon)</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;