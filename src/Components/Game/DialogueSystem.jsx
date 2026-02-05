import { useState, useEffect } from 'react';

const DialogueSystem = ({ scene, onChoice, storyFlags, gameEnded }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);

  const currentDialogue = scene.dialogues?.[currentDialogueIndex];

  /* ================= RESET WHEN SCENE CHANGES ================= */
  useEffect(() => {
    setCurrentDialogueIndex(0);
    setDisplayedText('');
    setIsTyping(true);
    setShowChoices(false);
  }, [scene.id]); // Reset setiap kali scene.id berubah

  /* ================= TYPEWRITER ================= */
  useEffect(() => {
    if (!currentDialogue?.text) return;

    setIsTyping(true);
    setDisplayedText('');
    let index = 0;

    const timer = setInterval(() => {
      if (index < currentDialogue.text.length) {
        setDisplayedText(currentDialogue.text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);

        if (currentDialogueIndex === scene.dialogues.length - 1 && scene.choices) {
          setTimeout(() => setShowChoices(true), 500);
        }
      }
    }, 28);

    return () => clearInterval(timer);
  }, [currentDialogue, currentDialogueIndex, scene.dialogues, scene.choices]);

  const handleContinue = () => {
    if (isTyping) {
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);

      if (currentDialogueIndex === scene.dialogues.length - 1 && scene.choices) {
        setTimeout(() => setShowChoices(true), 200);
      }
    } else {
      if (currentDialogueIndex < scene.dialogues.length - 1) {
        setCurrentDialogueIndex(prev => prev + 1);
        setShowChoices(false);
      } else if (scene.choices) {
        setShowChoices(true);
      }
    }
  };

  const availableChoices = scene.choices?.filter(choice => {
    if (!choice.requireFlag) return true;
    return Object.keys(choice.requireFlag).every(
      flag => storyFlags[flag] === choice.requireFlag[flag]
    );
  });

  return (
    <div className="w-full px-2 pb-3 sm:px-4 sm:pb-4">

      {/* ================= DIALOGUE BOX ================= */}
      {!showChoices && (
        <div
          onClick={handleContinue}
          className="
            bg-black/60 backdrop-blur-sm
            border border-gray-600
            px-3 py-2.5
            sm:px-4 sm:py-3
            cursor-pointer
            hover:bg-black/70
            transition-all
            relative
            max-h-[30vh]
          "
        >
          {currentDialogue?.speaker && (
            <div className="mb-1">
              <span className="text-gray-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                {currentDialogue.speaker}
              </span>
            </div>
          )}

          <p className="text-white text-[12px] sm:text-sm leading-snug font-medium min-h-[2rem]">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1 h-3 bg-white ml-0.5 animate-pulse" />
            )}
          </p>

          {!isTyping && currentDialogueIndex < scene.dialogues.length - 1 && (
            <div className="absolute bottom-1.5 right-2 flex items-center gap-1 opacity-70">
              <span className="text-gray-300 text-[9px]">Tap</span>
              <span className="text-gray-300 text-xs animate-bounce">▼</span>
            </div>
          )}
        </div>
      )}

      {/* ================= CHOICES ================= */}
      {showChoices && availableChoices?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2">

          {availableChoices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onChoice(choice)}
              disabled={gameEnded}
              className="
                bg-black/50 backdrop-blur-sm
                border border-gray-600
                px-3 py-2.5
                sm:px-4 sm:py-3
                text-left
                transition-all
                hover:border-white hover:bg-black/70
                disabled:opacity-50 disabled:cursor-not-allowed
                relative
              "
            >
              <p className="text-white text-[11px] sm:text-xs font-medium leading-snug">
                {choice.text}
              </p>

              {choice.hint && (
                <p className="text-gray-400 text-[9px] sm:text-[10px] mt-0.5 italic opacity-70">
                  {choice.hint}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ================= ENDING ================= */}
      {gameEnded && (
        <div className="mt-3 text-center bg-black/60 border border-gray-600 px-3 py-2">
          <p className="text-gray-300 text-xs sm:text-sm font-serif italic">
            {scene.endingMessage || 'The End'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DialogueSystem;