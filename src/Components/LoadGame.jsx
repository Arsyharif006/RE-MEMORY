import { useState, useEffect } from 'react';

const EMPTY_SLOT = { isEmpty: true };

const LoadGame = ({ onClose, onLoadSave }) => {
  const [selectedSlot, setSelectedSlot] = useState(0);

  const saveSlots = [
    {
      id: 1,
      chapter: 'Chapter 1',
      location: 'Abandoned Hospital',
      timestamp: '2025-02-04 14:23',
      isEmpty: false
    },
    {
      id: 2,
      chapter: 'Chapter 2',
      location: 'Dark Forest Path',
      timestamp: '2025-02-03 22:15',
      isEmpty: false
    },
    {
      id: 3,
      chapter: 'Chapter 3',
      location: 'Underground Facility',
      timestamp: '2025-02-02 18:45',
      isEmpty: false
    },
    { id: 4, isEmpty: true },
    { id: 5, isEmpty: true },
    { id: 6, isEmpty: true }
  ];

  /* ================= KEYBOARD ================= */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSlot(p => (p - 1 + saveSlots.length) % saveSlots.length);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSlot(p => (p + 1) % saveSlots.length);
      }
      if (e.key === 'Enter' && !saveSlots[selectedSlot].isEmpty) {
        onLoadSave(saveSlots[selectedSlot]);
      }
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedSlot]);

  /* ================= WHEEL ================= */
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      setSelectedSlot(p => (p + dir + saveSlots.length) % saveSlots.length);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const next = (selectedSlot + 1) % saveSlots.length;

  /* ================= SLOT ================= */
  const renderSlot = (slot, active) => {
    if (slot.isEmpty) {
      return (
        <div
          className={`border w-full min-w-full p-4 text-center ${
            active
              ? 'border-gray-500 bg-gray-800/60'
              : 'border-gray-800 bg-gray-900/30'
          }`}
        >
          <p className="text-gray-500 text-sm">— Empty Slot —</p>
        </div>
      );
    }

    return (
      <div
        onClick={() => onLoadSave(slot)}
        className={`border w-full min-w-full cursor-pointer p-4 ${
          active
            ? 'border-gray-500 bg-gray-800/60'
            : 'border-gray-800 bg-gray-900/30'
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className={`font-semibold ${active ? 'text-white' : 'text-gray-400'}`}>
              Slot {slot.id}
            </p>
            <p className="text-gray-400 text-sm">{slot.chapter}</p>
          </div>
          <p className="text-gray-500 text-xs">{slot.timestamp}</p>
        </div>
        <p className="text-gray-400 text-sm mt-1">{slot.location}</p>
      </div>
    );
  };

  return (
    <div className=" fixed inset-0 bg-transparent z-50">

      {/* ================= FIXED ARROWS (TIDAK IKUT BOX) ================= */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
        <button
          onClick={() => setSelectedSlot(p => (p - 1 + saveSlots.length) % saveSlots.length)}
          className="text-gray-600 hover:text-gray-400 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <button
          onClick={() => setSelectedSlot(p => (p + 1) % saveSlots.length)}
          className="text-gray-600 hover:text-gray-400 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full min-h-[100svh] flex flex-col px-6">

        {/* HEADER */}
        <header className="pt-4 pb-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-300 tracking-wider">
            Load Game
          </h2>

          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-50 text-gray-500 hover:text-gray-300 px-4 py-1.5 border border-gray-700 hover:border-gray-500 transition text-xs tracking-wider"
          >
            Back
          </button>
        </header>

        {/* SLOT AREA */}
        <main className="flex-1 flex justify-center items-center">

          <div className="w-[70vw] max-w-none flex flex-col">

            {/* SLOT ATAS – SELALU EMPTY */}
            <div className="mb-3 opacity-30 scale-90">
              {renderSlot(EMPTY_SLOT, false)}
            </div>

            {/* SLOT AKTIF */}
            <div className="mb-3">
              {renderSlot(saveSlots[selectedSlot], true)}
            </div>

            {/* SLOT BAWAH – JIKA ADA DATA */}
            <div
              onClick={() => setSelectedSlot(next)}
              className="opacity-30 scale-90 cursor-pointer"
            >
              {renderSlot(saveSlots[next], false)}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default LoadGame;
