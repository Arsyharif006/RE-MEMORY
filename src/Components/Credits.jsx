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

  const CreditRow = ({ role, name, className = "" }) => (
    <div className={`flex items-center mb-2 sm:mb-3 md:mb-4 ${className}`}>
      <div className="w-2/5 text-right pr-4 sm:pr-6 md:pr-8 lg:pr-12">
        <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wide">{role}</p>
      </div>
      <div className="w-3/5 text-left pl-4 sm:pl-6 md:pl-8 lg:pl-12">
        <p className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-light tracking-wide">{name}</p>
      </div>
    </div>
  );

  const SectionHeader = ({ title, className = "" }) => (
    <div className={`flex items-center mb-4 sm:mb-6 md:mb-8 ${className}`}>
      <div className="w-2/5 text-right pr-4 sm:pr-6 md:pr-8 lg:pr-12">
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wide">{title}</p>
      </div>
      <div className="w-3/5 text-left pl-4 sm:pl-6 md:pl-8 lg:pl-12">
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black z-20 flex flex-col items-center overflow-hidden">
      {/* Skip Button */}
      <button
        onClick={onClose}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-30 text-gray-500 hover:text-gray-300 px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 border border-gray-700 hover:border-gray-500 transition-colors duration-300 text-[10px] sm:text-xs md:text-sm tracking-wider"
      >
        SKIP
      </button>

      <div
        ref={creditsRef}
        className="w-full h-full overflow-y-hidden flex flex-col items-center"
      >
        <div className="h-screen"></div>

        <div className="w-full max-w-4xl px-4 sm:px-8 md:px-12 lg:px-16">
          {/* Large Credits Title */}
          <div className="text-center mb-12 sm:mb-12 md:mb-12 lg:mb-12">
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-white tracking-wider">
              Credits
            </h1>
          </div>

          {/* Game Title */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-2 sm:mb-3 tracking-wider">
              RE:MEMORY
            </h2>
            <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm lg:text-base italic tracking-wide">
              What Was Left Behind
            </p>
          </div>

          {/* Creator Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <CreditRow role="Created By" name="Muhammad Arya Ramadhan" className="mb-4 sm:mb-6 md:mb-8" />
            <CreditRow role="Game Director" name="Muhammad Arya Ramadhan" />
          </div>

          {/* Development Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Development" />
            <CreditRow role="Lead Developer" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Programming" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Game Design" name="Muhammad Arya Ramadhan" />
            <CreditRow role="System Design" name="Muhammad Arya Ramadhan" />
            <CreditRow role="UI Programming" name="Muhammad Arya Ramadhan" />
          </div>

          {/* Art & Design Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Art & Design" />
            <CreditRow role="Art Director" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Visual Design" name="Muhammad Arya Ramadhan" />
            <CreditRow role="UI/UX Design" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Interface Design" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Graphic Assets" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Animation" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Video Editing" name="Muhammad Arya Ramadhan" />
          </div>

          {/* Audio Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Audio & Sound" />
            <CreditRow role="Audio Director" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Sound Design" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Music Composition" name="Muhammad Arya Ramadhan" />
            <CreditRow role="BGM Selection" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Ambient Sound" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Sound Effects" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Audio Implementation" name="Muhammad Arya Ramadhan" />
          </div>

          {/* Writing Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Writing" />
            <CreditRow role="Story & Narrative" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Script Writing" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Dialogue" name="Muhammad Arya Ramadhan" />
            <CreditRow role="World Building" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Character Development" name="Muhammad Arya Ramadhan" />
          </div>

          {/* Testing & QA Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Quality Assurance" />
            <CreditRow role="Lead Tester" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Bug Testing" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Playtesting" name="Muhammad Arya Ramadhan" />
            <CreditRow role="Balance Testing" name="Muhammad Arya Ramadhan" />
          </div>

          {/* Technology Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Technology" />
            <CreditRow role="Framework" name="React.js" />
            <CreditRow role="Styling" name="TailwindCSS" />
            <CreditRow role="Audio Engine" name="Howler.js" />
            <CreditRow role="State Management" name="React Hooks" />
            <CreditRow role="Build Tool" name="Vite" />
            <CreditRow role="Local Storage" name="Web Storage API" />
            <CreditRow role="Video Processing" name="HTML5 Video" />
          </div>

          {/* Special Thanks Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Special Thanks" />
            <CreditRow role="" name="Silent Hill Series" />
            <CreditRow role="" name="Konami" />
            <CreditRow role="" name="Team Silent" />
            <CreditRow role="" name="Resident Evil Series" />
            <CreditRow role="" name="Alan Wake" />
            <CreditRow role="" name="The Last of Us" />
            <CreditRow role="" name="Psychological Horror Community" />
            <CreditRow role="" name="Horror Game Enthusiasts" />
            <CreditRow role="" name="React.js Community" />
            <CreditRow role="" name="TailwindCSS Community" />
            <CreditRow role="" name="Indie Game Developers" />
            <CreditRow role="" name="Web Development Community" />
          </div>

          {/* Inspiration Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Inspired By" />
            <CreditRow role="" name="Silent Hill" />
            <CreditRow role="" name="Silent Hill 2" />
            <CreditRow role="" name="Resident Evil" />
            <CreditRow role="" name="Alan Wake" />
            <CreditRow role="" name="The Last of Us" />
            <CreditRow role="" name="Layers of Fear" />
            <CreditRow role="" name="P.T. (Silent Hills)" />
            <CreditRow role="" name="Psychological Horror Genre" />
          </div>

          {/* Dedication Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <SectionHeader title="Dedicated To" />
            <CreditRow role="" name="All Horror Game Fans" />
            <CreditRow role="" name="Indie Game Developers Worldwide" />
            <CreditRow role="" name="Everyone Who Loves Story-Driven Games" />
          </div>

          {/* Copyright Section */}
          <div className="text-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">
            <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2">© 2025 RE:MEMORY</p>
            <p className="text-gray-600 text-[9px] sm:text-[10px] md:text-xs mb-3 sm:mb-4">All Rights Reserved</p>
            <p className="text-gray-600 text-[9px] sm:text-[10px] md:text-xs tracking-wide">
              Muhammad Arya Ramadhan
            </p>
          </div>

          {/* Final Message */}
          <div className="text-center mb-24 sm:mb-32 md:mb-40 lg:mb-48">
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl italic tracking-wide mb-3 sm:mb-4">
              Thank you for playing
            </p>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base tracking-wider">
              The memories will always remain...
            </p>
          </div>
        </div>

        <div className="h-screen"></div>
      </div>
    </div>
  );
};

export default Credits;