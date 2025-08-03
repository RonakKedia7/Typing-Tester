import { useEffect, useState } from "react";

const texts = [
  "The batsman drove the ball through covers, timing it perfectly to the boundary. The crowd erupted in cheers, celebrating the elegance of the shot. Even the fielders couldn’t help but admire the precision.",
  "Virat Kohli, known for his aggressive batting, chased down the target with ease. He pierced the gaps effortlessly, turning ones into twos. His confidence at the crease was unmatched that day.",
  "The bowler delivered a sharp bouncer, forcing the batsman to take evasive action. The ball whizzed past his helmet, drawing gasps from the audience. It was a well-directed delivery under pressure.",
  "Fielders gathered near the stumps, ready for a possible run-out opportunity. A slight misfield created chaos, and the batsmen hesitated mid-pitch. A direct hit followed, and the third umpire was called into action.",
  "Rohit Sharma hit three consecutive sixes, igniting cheers across the packed stadium. His timing was flawless, and the ball sailed effortlessly into the crowd. The opposition had no answers to his dominance.",
  "Spin bowlers often rely on drift, dip, and sharp turn to deceive batters. The pitch offered grip, helping the spinner extract bounce and variation. The batsman struggled to read the flight and turn.",
  "A well-executed yorker at the death overs can completely change the match result. The batsman missed, and the stumps were rattled. It was a moment of brilliance from the pace bowler under pressure.",
  "Rain interrupted the crucial semifinal, leading to a revised target using the DLS method. Players waited anxiously in the dressing room as the sky remained overcast. The tension grew with every passing minute.",
  "MS Dhoni’s lightning-quick stumping left the batsman stunned and the crowd roaring. His glove work was impeccable, and his instincts, razor sharp. Moments like these defined his legendary career behind the stumps.",
  "The third umpire reviewed the catch, confirming it was clean and within the laws. The bowler leapt in joy, and teammates swarmed him. Technology once again played a decisive role in modern cricket.",
  "India needed 12 runs off the last over; tension filled the air instantly. Every delivery was met with cheers or groans. A final boundary sealed the win, sending fans into a frenzy of celebration.",
  "The fielder sprinted to the boundary, dived full length, and saved a certain four. His athleticism was appreciated by players and fans alike. Such efforts lift the spirit of the entire team.",
  "A short ball outside off stump was slashed hard and flew over point for four. The batsman stood tall, admiring his shot. The opposition captain adjusted the field, hoping to prevent a repeat.",
  "Bumrah's lethal inswinger knocked over the stumps, sending the opener back to the pavilion. His run-up was smooth, and the ball tailed in late. It was the breakthrough India desperately needed.",
  "With a calm head, the captain rotated the strike, building a steady partnership. He encouraged the younger player at the other end, showing great leadership. Together, they steered the team to safety.",
];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedMins = String(mins).padStart(2, "0");
  const paddedSecs = String(secs).padStart(2, "0");
  return `${paddedMins}:${paddedSecs}`;
};

const TypingWindow = ({ duration }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [charStatuses, setCharStatuses] = useState([]);
  const [correctCharCount, setCorrectCharCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  const currentText = texts[currentTextIndex];

  // Initialize charStatuses when currentText changes
  useEffect(() => {
    setCharStatuses(Array(currentText.length).fill(null));
  }, [currentTextIndex]);

  // Timer logic in a separate useEffect
  useEffect(() => {
    if (showResult) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on unmount or when showResult changes
    return () => clearInterval(intervalId);
  }, [showResult]);

  // Keydown handler in a separate useEffect
  useEffect(() => {
    if (showResult) return;

    let isProcessingKey = false; // Flag to prevent multiple key processing

    const handleKeyDown = (event) => {
      // Ignore modifier keys
      const modifierKeys = [
        "Shift",
        "Control",
        "Alt",
        "Meta",
        "CapsLock",
        "Tab",
        "Escape",
        "Backspace",
      ];
      if (modifierKeys.includes(event.key)) return;

      // Prevent scrolling for specific keys
      const keysToPrevent = [
        " ",
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
      ];
      if (
        keysToPrevent.includes(event.key) &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        event.preventDefault();
      }

      // Prevent processing repeated keys from long presses
      if (isProcessingKey) return;
      isProcessingKey = true;

      const currentLetter = currentText[currentIdx];
      const typedKey = event.key;

      // Compare keys case-sensitively
      setTotalTyped((prev) => prev + 1);

      setCharStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[currentIdx] = typedKey === currentLetter;
        return newStatuses;
      });

      if (typedKey === currentLetter) {
        setCorrectCharCount((prev) => prev + 1);
      }

      setCurrentIdx((prevIdx) => {
        if (prevIdx + 1 >= currentText.length) {
          const nextIndex = currentTextIndex + 1;
          if (nextIndex < texts.length) {
            setCurrentTextIndex(nextIndex);
            return 0;
          } else {
            setShowResult(true);
            return prevIdx;
          }
        }
        return prevIdx + 1;
      });
    };

    const handleKeyUp = () => {
      // Reset flag on key release to allow next keypress
      isProcessingKey = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [showResult, currentIdx, currentText, currentTextIndex, texts]);

  // Calculate WPM and Accuracy
  const getResults = () => {
    const minutes = duration / 60;
    const wpm = correctCharCount / 5 / minutes;
    const accuracy = totalTyped > 0 ? (correctCharCount / totalTyped) * 100 : 0;

    return {
      wpm: Math.round(wpm),
      accuracy: Math.round(accuracy),
    };
  };

  const results = getResults();

  return (
    <>
      {!showResult && (
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="glass p-8 rounded-3xl card-elevated border border-gray-600">
          {texts.slice(0, 6).map((paragraph, index) => (
            <div
              key={index}
              className={`p-6 font-mono text-lg leading-relaxed transition-all duration-300 ${
                index === currentTextIndex
                  ? "glass text-gray-200 rounded-2xl border border-gray-500 shadow-lg"
                  : "text-gray-500 opacity-60"
              }`}
            >
              {paragraph.split("").map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className={`${
                    index === currentTextIndex && letterIndex === currentIdx
                      ? "typing-char-current font-semibold"
                      : index === currentTextIndex && letterIndex < currentIdx
                      ? charStatuses[letterIndex]
                        ? "typing-char-correct"
                        : "typing-char-incorrect"
                      : ""
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          ))}
          </div>
        </div>
      )}

      {showResult && (
        <div className="w-full max-w-4xl mx-auto relative z-10">
          <div className="glass p-12 rounded-3xl card-elevated border border-gray-600 text-center">
            <h2 className="text-4xl font-bold text-gradient mb-12">Test Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl border border-gray-600 card-elevated">
                <div className="text-6xl mb-4">⚡</div>
                <div className="text-5xl font-bold text-blue-400 mb-2">{results.wpm}</div>
                <div className="text-xl text-gray-300 font-medium">Words Per Minute</div>
              </div>
              
              <div className="glass p-8 rounded-2xl border border-gray-600 card-elevated">
                <div className="text-6xl mb-4">🎯</div>
                <div className="text-5xl font-bold text-green-400 mb-2">{results.accuracy}%</div>
                <div className="text-xl text-gray-300 font-medium">Accuracy</div>
              </div>
              
              <div className="glass p-8 rounded-2xl border border-gray-600 card-elevated">
                <div className="text-6xl mb-4">⏱️</div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">{formatTime(duration)}</div>
                <div className="text-xl text-gray-300 font-medium">Duration</div>
              </div>
            </div>
            
            <div className="mt-12 p-6 glass rounded-2xl border border-gray-600">
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">Performance Summary</h3>
              <div className="flex justify-center items-center gap-8 text-lg">
                <span className="text-gray-300">
                  <strong className="text-blue-400">{correctCharCount}</strong> correct characters
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-300">
                  <strong className="text-red-400">{totalTyped - correctCharCount}</strong> errors
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-300">
                  <strong className="text-yellow-400">{totalTyped}</strong> total typed
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TypingWindow;
