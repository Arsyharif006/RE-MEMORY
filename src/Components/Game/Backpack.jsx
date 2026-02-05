import { useState } from 'react';
import { IoClose, IoArrowBack } from 'react-icons/io5';
import { GiHealthNormal } from 'react-icons/gi';

const Backpack = ({ inventory, sanity, onClose, onUseItem, currentScene }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  /* ================= FIX BUG ================= */
  const handleItemClick = (item) => {
    if (item.readable) setViewingItem(item);
    else setSelectedItem(item);
  };

  const isItemUsable = (item) =>
    currentScene?.useableItems?.includes(item.id);

  /* ================= SANITY STYLE ================= */
  const sanityColor =
    sanity > 70 ? 'bg-gray-200'
    : sanity > 40 ? 'bg-gray-400'
    : sanity > 20 ? 'bg-gray-600'
    : 'bg-red-700';

  /* ================= ICON FALLBACK ================= */
  const getItemIcon = (item) => (
    <div className="text-gray-400 text-xs uppercase tracking-widest">
      {item.name?.slice(0, 2)}
    </div>
  );

  return (
    <div className="fixed inset-0 z-30 bg-black/95 flex items-center justify-center">

      {/* ================= MAIN PANEL ================= */}
      <div className="w-[92vw] max-w-4xl h-[88vh] border border-gray-700 bg-black text-gray-300 flex flex-col">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest uppercase">
              Inventory
            </span>

            {/* SANITY BAR – INDUSTRIAL */}
            <div className="flex items-center gap-2">
              <GiHealthNormal className="text-gray-400 text-sm" />
              <div className="w-24 h-1 bg-gray-800 border border-gray-700">
                <div
                  className={`h-full ${sanityColor}`}
                  style={{ width: `${sanity}%` }}
                />
              </div>
              <span className="text-[10px] tracking-wider">
                {sanity}%
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition"
          >
            <IoClose className="text-lg" />
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        {viewingItem ? (
          /* ========== READABLE ITEM ========== */
          <div className="flex-1 p-4 overflow-y-auto">
            <button
              onClick={() => setViewingItem(null)}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-white mb-4"
            >
              <IoArrowBack />
              Back
            </button>

            <div className="border border-gray-700 p-4 bg-black">
              <h3 className="text-sm uppercase tracking-widest mb-3">
                {viewingItem.name}
              </h3>

              <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                {viewingItem.content}
              </div>
            </div>
          </div>
        ) : (
          /* ========== INVENTORY GRID ========== */
          <div className="flex-1 flex flex-col">

            <div className="flex-1 p-3 overflow-y-auto">
              {inventory?.length ? (
                <div className="grid grid-cols-6 md:grid-cols-8 gap-1">
                  {inventory.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleItemClick(item)}
                      className={`
                        aspect-square
                        border
                        ${selectedItem?.id === item.id
                          ? 'border-white'
                          : 'border-gray-700'}
                        bg-black
                        flex items-center justify-center
                        text-xs
                        cursor-pointer
                        hover:border-gray-400
                      `}
                    >
                      {getItemIcon(item)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-gray-600">
                  Inventory Empty
                </div>
              )}
            </div>

            {/* ================= ITEM DETAILS ================= */}
            {selectedItem && (
              <div className="border-t border-gray-700 p-3 bg-black">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest mb-1">
                      {selectedItem.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 max-w-md">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {selectedItem.readable && (
                      <button
                        onClick={() => setViewingItem(selectedItem)}
                        className="px-3 py-1 border border-gray-600 text-[10px] hover:border-white"
                      >
                        Read
                      </button>
                    )}
                    {isItemUsable(selectedItem) && (
                      <button
                        onClick={() => {
                          onUseItem(selectedItem);
                          onClose();
                        }}
                        className="px-3 py-1 border border-gray-600 text-[10px] hover:border-white"
                      >
                        Use
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Backpack;
