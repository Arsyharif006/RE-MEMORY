import { useState } from 'react';
import MainMenu from './components/MainMenu';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // menu, credits, transition, game
  const [transitionTarget, setTransitionTarget] = useState(null);

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
    <div className="w-full h-screen overflow-hidden bg-black">
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
  );
}

export default App;