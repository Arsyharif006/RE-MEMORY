import { useState } from 'react';

const Settings = ({ onClose }) => {
  const [bgmVolume, setBgmVolume] = useState(60);
  const [sfxVolume, setSfxVolume] = useState(80);
  const [ambientVolume, setAmbientVolume] = useState(50);
  const [textSpeed, setTextSpeed] = useState(50);

  const SettingSlider = ({ label, value, onChange, min = 0, max = 100 }) => (
    <div className="text-left">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wide">{label}</p>
        <span className="text-gray-500 text-xs sm:text-sm">{value}</span>
      </div>
      <input 
        type="range" 
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 sm:h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-500 hover:accent-gray-400 transition-colors"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-transparent z-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Settings Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center overflow-y-auto">
        <div className="w-full max-w-sm sm:max-w-2xl md:max-w-2xl lg:max-w-3xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-8 md:py-12 my-auto">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-300 mb-6 sm:mb-10 md:mb-10 tracking-wider text-center">
            Pengaturan
          </h2>
          
          {/* Settings Grid - 2 kolom mobile, 1 kolom desktop */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-5 md:gap-5 mb-5 sm:mb-7 md:mb-7">
            {/* BGM Volume */}
            <SettingSlider 
              label="Background Music" 
              value={bgmVolume}
              onChange={setBgmVolume}
            />

            {/* SFX Volume */}
            <SettingSlider 
              label="Sound Effects" 
              value={sfxVolume}
              onChange={setSfxVolume}
            />

            {/* Ambient Volume */}
            <SettingSlider 
              label="Ambient Sound" 
              value={ambientVolume}
              onChange={setAmbientVolume}
            />

       

            {/* Text Speed */}
            <SettingSlider 
              label="Text Speed" 
              value={textSpeed}
              onChange={setTextSpeed}
            />
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white px-6 sm:px-6 md:px-5 py-2 sm:py-2 border border-gray-600 hover:border-gray-400 transition-colors duration-300 text-sm sm:text-base md:text-lg font-semibold tracking-wide hover:bg-gray-900 hover:bg-opacity-30"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
