import { useState } from 'react';

const NumberPuzzle = ({ puzzle, onSolved, attempts, maxAttempts }) => {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = () => {
    if (!inputValue) return;

    if (inputValue === puzzle.answer.toString()) {
      setFeedback({ type: 'success', text: 'ACCESS GRANTED' });
      setTimeout(() => onSolved(true), 800);
    } else {
      setFeedback({ type: 'error', text: 'ACCESS DENIED' });
      setTimeout(() => setFeedback(null), 1500);
      onSolved(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
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

      {/* ================= INPUT ================= */}
      <div>
        <label className="block text-[10px] text-gray-500 tracking-widest uppercase mb-1">
          Enter Code
        </label>
        <input
          type={puzzle.inputType || 'text'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={puzzle.maxLength || 10}
          placeholder={puzzle.placeholder || '----'}
          className="
            w-full
            bg-black
            border border-gray-700
            text-gray-200
            text-center
            text-lg
            tracking-[0.3em]
            py-2
            focus:outline-none
            focus:border-gray-400
          "
        />
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

      {/* ================= SUBMIT ================= */}
      <button
        onClick={handleSubmit}
        disabled={!inputValue}
        className="
          w-full
          py-2
          border border-gray-700
          text-[11px]
          tracking-widest
          uppercase
          text-gray-300
          bg-black
          hover:border-gray-400
          hover:text-white
          disabled:text-gray-600
          disabled:border-gray-800
          transition
        "
      >
        Confirm
      </button>

      {/* ================= ATTEMPTS WARNING ================= */}
      {maxAttempts < 999 && attempts >= maxAttempts - 2 && (
        <p className="text-[10px] text-gray-600 tracking-wide text-center animate-pulse">
          Attempts Remaining: {maxAttempts - attempts}
        </p>
      )}
    </div>
  );
};

export default NumberPuzzle;
