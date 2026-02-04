import { useState, useEffect, useRef } from 'react';
import Settings from './Settings';
import Credits from './Credits';
import noiseBackground from '../assets/bgame.mp4';
import ReactIcon from '../assets/react.svg';
import TailwindIcon from '../assets/tailwind.svg';

const MainMenu = ({ onNewGame, onLoadGame }) => {
  const [hasSave] = useState(false); // Placeholder, bisa diaktifkan nanti
  const [titleFlicker, setTitleFlicker] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0);
  const [showCredits, setShowCredits] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playLightning, setPlayLightning] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const menuItems = ['Permainan Baru', 'Muat Game', 'Pengaturan', 'Kredit'];
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const lightningTimeoutRef = useRef(null);
  const lightningVideoRef = useRef(null);
  const bgVideoRef = useRef(null);

  // Check if device is in landscape mode
  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscapeMode);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Detect if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkIfMobile();
  }, []);

  // Handle menu wheel scroll (desktop only)
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isMobile && !isTransitioning && !showCredits && !showSettings && menuRef.current) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        setSelectedMenuIndex(prev => {
          let newIndex = prev + direction;
          if (newIndex < 0) newIndex = menuItems.length - 1;
          if (newIndex >= menuItems.length) newIndex = 0;
          return newIndex;
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isTransitioning, showCredits, showSettings, menuItems.length, isMobile]);

  // Handle keyboard navigation (desktop only)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isMobile && !isTransitioning && !showCredits && !showSettings) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          const direction = e.key === 'ArrowDown' ? 1 : -1;
          setSelectedMenuIndex(prev => {
            let newIndex = prev + direction;
            if (newIndex < 0) newIndex = menuItems.length - 1;
            if (newIndex >= menuItems.length) newIndex = 0;
            return newIndex;
          });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleMenuItemClick(selectedMenuIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, showCredits, showSettings, menuItems.length, isMobile, selectedMenuIndex]);

  useEffect(() => {
    // Check for saved game (placeholder)
    // setHasSave(false); // TODO: Implement save check functionality

    // Title flicker effect
    const flickerInterval = setInterval(() => {
      setTitleFlicker(prev => !prev);
    }, 3000 + Math.random() * 3000);

    // Set up random lightning flashes
    setupRandomLightning();

    return () => {
      clearInterval(flickerInterval);
      if (lightningTimeoutRef.current) {
        clearTimeout(lightningTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Title flicker effect
    const flickerInterval = setInterval(() => {
      setTitleFlicker(prev => !prev);
    }, 3000 + Math.random() * 3000);

    // Set up random lightning flashes
    setupRandomLightning();

    return () => {
      clearInterval(flickerInterval);
      if (lightningTimeoutRef.current) {
        clearTimeout(lightningTimeoutRef.current);
      }
    };
  }, []);

  // Effect to handle playing the lightning video when triggered
  useEffect(() => {
    if (playLightning && lightningVideoRef.current) {
      // TODO: Implement lightning video playback
      // lightningVideoRef.current.currentTime = 0;
      // lightningVideoRef.current.play().catch(() => {
      //   // Video play failed, just continue
      // });
      
      setTimeout(() => {
        setPlayLightning(false);
      }, 3000);
    }
  }, [playLightning]);

  // Effect to stop scheduling new lightning events when transitioning or in credits
  useEffect(() => {
    if (isTransitioning || showCredits) {
      if (lightningTimeoutRef.current) {
        clearTimeout(lightningTimeoutRef.current);
        lightningTimeoutRef.current = null;
      }
    } else {
      if (!lightningTimeoutRef.current) {
        setupRandomLightning();
      }
    }
  }, [isTransitioning, showCredits]);

  // Effect to handle background video playback
  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {
        // Video play failed, just continue
      });
    }
  }, []);

  const setupRandomLightning = () => {
    const triggerLightning = () => {
      if (!isTransitioning && !showCredits) {
        setPlayLightning(true);
      }

      const nextLightningDelay = 5000 + Math.random() * 15000;
      lightningTimeoutRef.current = setTimeout(triggerLightning, nextLightningDelay);
    };

    const initialDelay = 3000 + Math.random() * 8000;
    lightningTimeoutRef.current = setTimeout(triggerLightning, initialDelay);
  };

  // Credits scrolling effect moved to Credits component

  const handleLoadGame = () => {
    startTransition();
    setTimeout(() => {
      if (onLoadGame) {
        onLoadGame({});
      }
    }, 12000);
  };

  const handleNewGame = () => {
    startTransition();
    setTimeout(() => {
      if (onNewGame) {
        onNewGame();
      }
    }, 12000);
  };

  const startTransition = () => {
    setIsTransitioning(true);
    setTransitionStep(1);

    setTimeout(() => setTransitionStep(2), 4000);
    setTimeout(() => setTransitionStep(3), 7000);
    setTimeout(() => setTransitionStep(4), 9500);
    setTimeout(() => setTransitionStep(5), 11000);
  };

  const handleShowCredits = () => {
    setShowCredits(true);
  };

  const handleCloseCredits = () => {
    setShowCredits(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleMenuItemClick = (index) => {
    const item = menuItems[index];
    if (item === 'Permainan Baru') {
      handleNewGame();
    } else if (item === 'Muat Game') {
      handleLoadGame();
    } else if (item === 'Pengaturan') {
      handleShowSettings();
    } else if (item === 'Kredit') {
      handleShowCredits();
    }
  };

  const renderTransitionMessage = () => {
    switch (transitionStep) {
      case 1:
        return (
          <div className="text-center animate-fadeIn">
            <div className="flex justify-center items-center gap-6 sm:gap-8">
              <div className="flex flex-col items-center">
                <img src={ReactIcon} alt="React" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-cyan-400" style={{filter: 'invert(1) sepia(1) hue-rotate(180deg) saturate(2)'}} />
                <p className="text-gray-300 text-sm sm:text-base mt-2 font-semibold">React</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={TailwindIcon} alt="Tailwind" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" style={{filter: 'invert(0.8) sepia(0.5) hue-rotate(200deg) saturate(1.5)'}} />
                <p className="text-gray-300 text-sm sm:text-base mt-2 font-semibold">Tailwind</p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="max-w-3xl text-center animate-fadeIn px-4">
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif text-red-500 mb-4 sm:mb-6 font-semibold tracking-wider animate-fadeIn">
              ⚠ PERINGATAN ⚠
            </h3>
            <p className="text-gray-400 text-xs sm:text-base lg:text-lg mb-3 sm:mb-4 tracking-wider animate-fadeIn">
              Game ini mengandung elemen horor psikologis, suara mengganggu, serta adegan yang dapat memicu kecemasan atau ketakutan ekstrem.
            </p>
            <p className="text-gray-400 text-xs sm:text-base lg:text-lg tracking-wider animate-fadeIn">
              Tidak disarankan bagi pemain di bawah 16 tahun.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="max-w-2xl text-center tracking-wider animate-fadeIn px-4">
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 font-serif tracking-wider animate-fadeIn">
              <span className="text-red-600 tracking-wider animate-fadeIn">01001100</span>
              <span className="text-gray-500 tracking-wider animate-fadeIn">01001111</span>
              <span className="text-red-600 tracking-wider animate-fadeIn">01010011</span>
              <span className="text-gray-500 tracking-wider animate-fadeIn">01010100</span>
            <p className="tracking-wider animate-fadeIn text-gray-500 text-md sm:text-md lg:text-md mt-4 sm:mt-6 font-light ">
              Setiap langkah menggema, semakin samar jalan kembali.
            </p>
            </p>
          </div>
        );
      case 4:
        return (
          <p className="text-gray-400 text-md sm:text-md lg:text-2xl font-serif tracking-wider animate-fadeIn px-4">
            Gunakan headphone untuk pengalaman terbaik 🎧
          </p>
        );
      case 5:
        return (
          <p className="text-gray-400 text-md sm:text-2xl lg:text-2xl font-serif tracking-wider animate-fadeIn">
            Enjoy.
          </p>
        );
      default:
        return null;
    }
  };

  const renderCredits = () => {
    // Credits component moved to separate file
  };

  // Render orientation warning for portrait mode
  if (!isLandscape) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black px-6">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-gray-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-gray-400 mb-4 tracking-wide">
            Rotate Your Device
          </h2>
          <p className="text-gray-500 text-base mb-2">
            RE:MEMORY dirancang untuk dimainkan dalam mode landscape.
          </p>
          <p className="text-gray-600 text-sm italic">
            Putar perangkat Anda untuk melanjutkan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      {/* Background Video */}
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

      {/* Dark Overlay for Video */}
      <div className="absolute inset-0 bg-black opacity-70 pointer-events-none"></div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-noise"></div>
      </div>

      {/* Lightning Video Overlay Placeholder - Disabled */}
      {/* <div className="absolute inset-0 pointer-events-none z-1">
        <div 
          ref={lightningVideoRef}
          className={`absolute inset-0 w-full h-full bg-white transition-opacity duration-200 ${playLightning ? 'opacity-30' : 'opacity-0'}`}
        />
      </div> */}

      {/* Fog Animation */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-800 to-transparent animate-pulse"></div>
      </div>

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black z-10 animate-fadeIn pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center text-center px-8">
            {renderTransitionMessage()}
          </div>
        </div>
      )}

      {/* Settings Screen */}
      {showSettings && (
        <Settings onClose={handleCloseSettings} />
      )}

      {/* Credits Screen */}
      {showCredits && (
        <Credits onClose={handleCloseCredits} />
      )}

      {/* Menu content - Landscape optimized layout */}
      <div className={`w-full h-full flex items-center justify-center relative z-5 ${isTransitioning || showCredits || showSettings ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 lg:gap-16 w-full max-w-6xl px-2 sm:px-4 md:px-8 lg:px-12">
          {/* Left side - Title and tagline */}
          <div className="flex flex-col justify-center items-start pl-2 sm:pl-8 md:pl-8 lg:pl-1 border-r border-gray-800">
            <h1 className={`text-xl sm:text-2xl md:text-5xl lg:text-6xl font-extrabold font-serif text-gray-400 mb-1 md:mb-4 tracking-wider ${titleFlicker ? 'opacity-80' : ''} transition-all duration-300`}>
              RE:MEMORY
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg italic font-light text-left hidden sm:block">
             What Was Left Behind
            </p>
          </div>

          {/* Right side - Menu carousel */}
          <div ref={menuRef} className="flex flex-col justify-center items-start pl-2 sm:pl-4 md:pl-4 lg:pl-8 relative w-full">
            {/* Menu preview - item above */}
            <button
              onClick={() => setSelectedMenuIndex(prev => (prev - 1 + menuItems.length) % menuItems.length)}
              className="h-6 sm:h-12 md:h-20 flex items-center text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg opacity-60 hover:opacity-80 hover:text-gray-400 transition-all duration-500 cursor-pointer" 
              style={{ transform: 'scale(0.9)' }}>
              {menuItems[(selectedMenuIndex - 1 + menuItems.length) % menuItems.length]}
            </button>

            {/* Menu center - always fixed */}
            <button
              onClick={() => handleMenuItemClick(selectedMenuIndex)}
              className="w-full py-1 sm:py-2 md:py-4 text-sm sm:text-lg md:text-2xl lg:text-3xl font-semibold transition-colors duration-300 group relative text-white h-6 sm:h-12 md:h-20 flex items-center justify-start hover:text-gray-200"
            >
              <div className="flex items-center justify-start w-full">
                <span className="text-sm sm:text-lg md:text-2xl absolute -left-3 sm:-left-6 md:-left-8 opacity-100">●</span>
                <span className="transition-all duration-500 ml-2 sm:ml-0">{menuItems[selectedMenuIndex]}</span>
              </div>
            </button>

            {/* Menu preview - item below */}
            <button
              onClick={() => setSelectedMenuIndex(prev => (prev + 1) % menuItems.length)}
              className="h-6 sm:h-12 md:h-20 flex items-center text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg opacity-60 hover:opacity-80 hover:text-gray-400 transition-all duration-500 cursor-pointer" 
              style={{ transform: 'scale(0.9)' }}>
              {menuItems[(selectedMenuIndex + 1) % menuItems.length]}
            </button>

          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .bg-noise {
          background-image: url('${noiseBackground}');
          background-repeat: repeat;
        }
      `}</style>
    </div>
  );
};

export default MainMenu;