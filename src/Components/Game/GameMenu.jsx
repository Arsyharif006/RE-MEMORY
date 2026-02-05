import { useState } from 'react';
import SettingsMenu from './SettingsMenu';

const PauseMenu = ({ onClose, onSave, onExit }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return <SettingsMenu onClose={() => setShowSettings(false)} />;
  }

  const menuItems = [
    {
      label: 'Save',
      onClick: () => {
        onSave();
        onClose();
      }
    },
    {
      label: 'Options',
      onClick: () => setShowSettings(true)
    },
    {
      label: 'Stats',
      onClick: () => {
        // nanti bisa sambung ke StatsMenu
      }
    },
    {
      label: 'Exit',
      onClick: onExit
    }
  ];

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[280px] bg-black/70 border border-gray-600 px-4 py-3"
      >
        <h2 className="text-center text-gray-300 text-sm tracking-widest mb-3">
          Pause Menu
        </h2>

        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={item.onClick}
              className="relative text-left px-3 py-2 text-sm tracking-wider"
            >
              {activeIndex === index && (
                <div className="absolute inset-0 bg-gray-200 opacity-90" />
              )}
              <span
                className={`relative z-10 ${
                  activeIndex === index ? 'text-black' : 'text-gray-300'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-gray-600 text-center">
          <p className="text-[10px] text-gray-400 tracking-wide">
            Press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;
