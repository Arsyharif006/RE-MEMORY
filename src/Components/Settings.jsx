import { useState } from 'react';

const Settings = ({ onClose }) => {
  const [bgmVolume, setBgmVolume] = useState(60);
  const [sfxVolume, setSfxVolume] = useState(80);
  const [ambientVolume, setAmbientVolume] = useState(50);
  const [textSpeed, setTextSpeed] = useState(50);
  const [language, setLanguage] = useState('English');

  /* ================= SLIDER ================= */
  const SettingSlider = ({ label, value, onChange, min = 0, max = 100 }) => (
    <div className="text-left">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wide">
          {label}
        </p>
        <span className="text-gray-500 text-xs sm:text-sm">
          {value}
        </span>
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

  /* ================= SELECT (LANGUAGE) ================= */
  const SettingSelect = ({ label, value, onChange, options }) => (
    <div className="text-left">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wide">
          {label}
        </p>
        <span className="text-gray-500 text-xs sm:text-sm">
          {value}
        </span>
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full bg-transparent
          border-b border-gray-700
          text-gray-300 text-xs sm:text-sm md:text-base
          py-1
          focus:outline-none focus:border-gray-500
          cursor-pointer
        "
      >
        {options.map(opt => (
          <option
            key={opt}
            value={opt}
            className="bg-black text-gray-300"
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-transparent z-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center overflow-y-auto">
        <div className="w-full max-w-sm sm:max-w-2xl md:max-w-2xl lg:max-w-3xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-8 md:py-12 my-auto">

          {/* TITLE */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-300 mb-6 sm:mb-10 tracking-wider text-center">
            Settings
          </h2>

          {/* BACK BUTTON */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-50 text-gray-500 hover:text-gray-300 px-4 py-1.5 border border-gray-700 hover:border-gray-500 transition text-xs tracking-wider"
          >
            Back
          </button>

          {/* SETTINGS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-5 mb-5 sm:mb-7">

            {/* LANGUAGE – MENU UBAH BAHASA */}
            <SettingSelect
              label="Language"
              value={language}
              onChange={setLanguage}
              options={['English', 'Bahasa Indonesia', 'Japanese']}
            />

            {/* AUDIO */}
            <SettingSlider
              label="Background Music"
              value={bgmVolume}
              onChange={setBgmVolume}
            />

            <SettingSlider
              label="Sound Effects"
              value={sfxVolume}
              onChange={setSfxVolume}
            />

            <SettingSlider
              label="Ambient Sound"
              value={ambientVolume}
              onChange={setAmbientVolume}
            />

            {/* TEXT */}
            <SettingSlider
              label="Text Speed"
              value={textSpeed}
              onChange={setTextSpeed}
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
