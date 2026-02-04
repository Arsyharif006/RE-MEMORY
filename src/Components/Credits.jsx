import { useEffect, useRef } from 'react';

const Credits = ({ onClose }) => {
  const creditsRef = useRef(null);

  useEffect(() => {
    if (creditsRef.current) {
      const scrollInterval = setInterval(() => {
        if (creditsRef.current) {
          creditsRef.current.scrollTop += 1;

          if (creditsRef.current.scrollTop + creditsRef.current.clientHeight >= creditsRef.current.scrollHeight) {
            clearInterval(scrollInterval);
            setTimeout(() => {
              onClose();
            }, 2000);
          }
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black z-20 flex flex-col items-center overflow-hidden">
      <div
        ref={creditsRef}
        className="w-full h-full overflow-y-hidden flex flex-col items-center"
      >
        <div className="h-screen"></div>

        <div className="flex flex-col items-center mb-32 pt-16">
          {/* App Icon Placeholder */}
          <div className="w-32 h-32 lg:w-40 lg:h-40 mb-8 relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="text-5xl lg:text-6xl font-bold text-gray-600 font-serif">SE</div>
            </div>
            <div className="absolute inset-0 opacity-30 bg-noise"></div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif text-gray-300 mb-2 tracking-wider">Silent Echo</h1>
          <p className="text-gray-500 text-base lg:text-lg mb-24 italic text-left">The sound of the past never truly fades.</p>
          <h2 className="text-2xl lg:text-3xl font-serif text-gray-400 mb-6 tracking-wide">Development Team</h2>

          <div className="mb-16 text-center">
            <h3 className="text-xl lg:text-2xl text-gray-500 mb-3">Created By</h3>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">Muhammad Arya Ramadhan</p>
          </div>

          <div className="mb-16 text-center">
            <h3 className="text-xl lg:text-2xl text-gray-500 mb-3">Programming</h3>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">Muhammad Arya Ramadhan</p>
            <p className="text-gray-400 text-sm lg:text-base mt-2">React.js • TailwindCSS</p>
          </div>

          <div className="mb-16 text-center">
            <h3 className="text-xl lg:text-2xl text-gray-500 mb-3">Design & Art Direction</h3>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">Muhammad Arya Ramadhan</p>
            <p className="text-gray-400 text-sm lg:text-base mt-2">UI/UX • Visual Assets • Animation</p>
          </div>

          <div className="mb-16 text-center">
            <h3 className="text-xl lg:text-2xl text-gray-500 mb-3">Sound Design</h3>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">Muhammad Arya Ramadhan</p>
            <p className="text-gray-400 text-sm lg:text-base mt-2">Music • Ambient Sounds • Effects</p>
          </div>

          <div className="mb-16 text-center">
            <h3 className="text-xl lg:text-2xl text-gray-500 mb-3">Story & Narrative</h3>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">Muhammad Arya Ramadhan</p>
          </div>

          <div className="mb-16 text-center">
            <h3 className="text-xl lg:text-2xl text-gray-500 mb-3">Special Thanks</h3>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">Silent Hill Series</p>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">Psychological Horror Community</p>
            <p className="text-gray-300 text-lg lg:text-xl mb-1">React & TailwindCSS Communities</p>
          </div>

          <div className="mb-32 text-center">
            <h3 className="text-xl lg:text-2xl text-gray-500 mb-3">Technologies Used</h3>
            <p className="text-gray-400 text-sm lg:text-base mb-1">React.js • TailwindCSS</p>
            <p className="text-gray-400 text-sm lg:text-base mb-1">Howler.js • LocalStorage API</p>
          </div>

          <div className="mb-16 text-center">
            <p className="text-gray-500 text-lg lg:text-xl mb-1">© 2025 Silent Echo</p>
            <p className="text-gray-400 text-sm lg:text-base mb-1">All Rights Reserved</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 mb-32 mt-8 px-8 py-3 border border-gray-800 hover:border-gray-600 transition-colors duration-300 text-base lg:text-lg"
          >
            Kembali
          </button>
        </div>
      </div>

      <style jsx>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }
      `}</style>
    </div>
  );
};

export default Credits;
