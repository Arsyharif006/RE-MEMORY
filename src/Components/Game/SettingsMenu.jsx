import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const SettingsMenu = ({ onClose }) => {
  const [sfxVolume, setSfxVolume] = useState(80);
  const [ambientVolume, setAmbientVolume] = useState(50);
  const [textSpeed, setTextSpeed] = useState(50);
  const [language, setLanguage] = useState('English');

  const SettingSlider = ({ label, value, onChange, min = 0, max = 100 }) => (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-sm tracking-wide">{label}</span>
        <span className="text-gray-500 text-xs">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full h-1 bg-gray-700 rounded appearance-none accent-gray-400"
      />
    </div>
  );

  const SettingSelect = ({ label, value, onChange, options }) => (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-sm tracking-wide">{label}</span>
        <span className="text-gray-500 text-xs">{value}</span>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-gray-700 text-gray-300 py-1 text-sm"
      >
        {options.map(opt => (
          <option key={opt} value={opt} className="bg-black">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
  
      {/* CONTENT */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-3xl">
          {/* Header with Back Button and Title */}
          <div className="flex items-center justify-between mb-16 -mt-7">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <IoArrowBack className="text-lg" />
              <span className="tracking-wide">Back</span>
            </button>

            <h2 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-serif text-gray-300 tracking-wider">
              Settings
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <SettingSelect
              label="Language"
              value={language}
              onChange={setLanguage}
              options={['English', 'Bahasa Indonesia', 'Japanese']}
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

export default SettingsMenu;