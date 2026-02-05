import { useState } from 'react';

const SequencePuzzle = ({ puzzle, onSolved, attempts, maxAttempts }) => {
  const [selectedSequence, setSelectedSequence] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleItemClick = (item) => {
    if (selectedSequence.includes(item)) return;

    const next = [...selectedSequence, item];
    setSelectedSequence(next);

    if (next.length === puzzle.correctSequence.length) {
      checkSequence(next);
    }
  };

  const checkSequence = (sequence) => {
    const correct = sequence.every(
      (item, index) => item === puzzle.correctSequence[index]
    );

    if (correct) {
      setFeedback({ type: 'success', text: 'SEQUENCE ACCEPTED' });
      setTimeout(() => onSolved(true), 900);
    } else {
      setFeedback({ type: 'error', text: 'SEQUENCE REJECTED' });
      setTimeout(() => {
        setFeedback(null);
        setSelectedSequence([]);
      }, 1400);
      onSolved(false);
    }
  };

  const handleReset = () => {
    setSelectedSequence([]);
    setFeedback(null);
  };

  return (
    <div className="space-y-4">

      {/* ================= HINT ================= */}
      {puzzle.hint && (
        <div className="border border-gray-700 bg-black p-3">
          <p className="text-[11px] text-gray-400 tracking-wide italic">
            {puzzle.hint}
          </p>
        </div>
      )}

      {/* ================= INSTRUCTION ================= */}
      <div className="border border-gray-700 bg-black p-3">
        <p className="text-[11px] text-gray-400 tracking-wide">
          {puzzle.instruction ||
            `Input sequence length: ${puzzle.correctSequence.length}`}
        </p>
      </div>

      {/* ================= AVAILABLE INPUTS ================= */}
      <div>
        <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-2">
          Input Nodes
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {puzzle.availableItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              disabled={selectedSequence.includes(item)}
              className={`
                aspect-square
                border
                ${
                  selectedSequence.includes(item)
                    ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                    : 'border-gray-700 text-gray-300 hover:border-gray-400'
                }
                bg-black
                text-sm sm:text-base
                tracking-widest
                transition
                flex items-center justify-center
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CURRENT SEQUENCE ================= */}
      <div className="border border-gray-700 bg-black p-3">
        <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-2">
          Current Sequence
        </p>

        {selectedSequence.length === 0 ? (
          <p className="text-[10px] text-gray-600 italic">
            Awaiting input…
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedSequence.map((item, index) => (
              <div
                key={index}
                className="
                  w-10 h-10
                  border border-gray-700
                  bg-black
                  flex items-center justify-center
                  text-sm
                  tracking-widest
                  text-gray-300
                "
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <div className="mt-2 text-right">
          <span className="text-[10px] text-gray-500 tracking-wide">
            {selectedSequence.length} / {puzzle.correctSequence.length}
          </span>
        </div>
      </div>

      {/* ================= FEEDBACK ================= */}
      {feedback && (
        <div
          className={`
            text-center
            text-xs
            tracking-widest
            ${
              feedback.type === 'success'
                ? 'text-gray-200'
                : 'text-gray-500'
            }
          `}
        >
          {feedback.text}
        </div>
      )}

      {/* ================= RESET ================= */}
      <button
        onClick={handleReset}
        disabled={selectedSequence.length === 0}
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
        Reset Input
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

export default SequencePuzzle;
