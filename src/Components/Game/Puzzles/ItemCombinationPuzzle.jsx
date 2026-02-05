import { useState } from 'react';

const ItemCombinationPuzzle = ({ puzzle, onSolved, attempts, maxAttempts }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const toggleItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(i => i !== itemId));
    } else if (selectedItems.length < (puzzle.maxSelection || puzzle.requiredItems.length)) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSubmit = () => {
    const correct =
      selectedItems.length === puzzle.requiredItems.length &&
      puzzle.requiredItems.every(id => selectedItems.includes(id));

    if (correct) {
      setFeedback({ type: 'success', text: 'COMBINATION ACCEPTED' });
      setTimeout(() => onSolved(true), 1000);
    } else {
      setFeedback({ type: 'error', text: 'COMBINATION FAILED' });
      setTimeout(() => setFeedback(null), 1500);
      onSolved(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* ================= INSTRUCTION ================= */}
      <div className="border border-gray-700 bg-black p-3">
        <p className="text-[11px] text-gray-400 tracking-wide">
          {puzzle.instruction ||
            `Select ${puzzle.requiredItems.length} components and attempt combination.`}
        </p>
      </div>

      {/* ================= AVAILABLE ITEMS ================= */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {puzzle.availableItems.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`
              aspect-square
              border
              ${selectedItems.includes(item.id)
                ? 'border-gray-200'
                : 'border-gray-700'}
              bg-black
              hover:border-gray-400
              transition
              flex flex-col items-center justify-center
              p-2
            `}
          >
            <div className="text-xs text-gray-300 uppercase tracking-widest">
              {item.name.slice(0, 2)}
            </div>
          </button>
        ))}
      </div>

      {/* ================= SELECTED COMPONENTS ================= */}
      <div className="border border-gray-700 bg-black p-3">
        <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-2">
          Selected Components
        </p>

        {selectedItems.length === 0 ? (
          <p className="text-[10px] text-gray-600 italic">
            None
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedItems.map(id => {
              const item = puzzle.availableItems.find(i => i.id === id);
              return (
                <span
                  key={id}
                  className="px-2 py-1 border border-gray-700 text-[10px] text-gray-300 tracking-wide"
                >
                  {item?.name}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= FEEDBACK ================= */}
      {feedback && (
        <div
          className={`
            text-center
            text-xs
            tracking-widest
            ${feedback.type === 'success'
              ? 'text-gray-200'
              : 'text-gray-500'}
          `}
        >
          {feedback.text}
        </div>
      )}

      {/* ================= CONFIRM ================= */}
      <button
        onClick={handleSubmit}
        disabled={selectedItems.length === 0}
        className="
          w-full
          py-2
          border border-gray-700
          bg-black
          text-[11px]
          tracking-widest
          uppercase
          text-gray-300
          hover:border-gray-400
          hover:text-white
          disabled:text-gray-600
          disabled:border-gray-800
          transition
        "
      >
        Execute Combination
      </button>

      {/* ================= ATTEMPTS ================= */}
      {maxAttempts < 999 && attempts >= maxAttempts - 2 && (
        <p className="text-[10px] text-gray-600 tracking-wide text-center animate-pulse">
          Attempts Remaining: {maxAttempts - attempts}
        </p>
      )}
    </div>
  );
};

export default ItemCombinationPuzzle;
