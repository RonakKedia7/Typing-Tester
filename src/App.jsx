import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import TimeLeft from "./components/TimeLeft";
import TypingWindow from "./components/TypingWindow";

const durationOptions = [
  { value: 30, label: "30 seconds test" },
  { value: 60, label: "1 minute test" },
  { value: 120, label: "2 minute test" },
  { value: 180, label: "3 minute test" },
];

const App = () => {
  const [duration, setDuration] = useState(durationOptions[0].value);
  const [startTest, setStartTest] = useState(false);
  const [startingMessage, setStartingMessage] = useState(false);
  const [countDown, setCountDown] = useState(false);
  const [goSignal, setGoSignal] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // To trigger animation restart

  const resetTest = () => {
    setStartTest(false);
    setStartingMessage(false);
    setCountDown(false);
    setGoSignal(false);
    setDuration(durationOptions[0].value);
    setAnimationKey(0);
  };

  const handleStartCountdown = () => {
    if (startingMessage && !countDown && !goSignal) {
      setCountDown(3);
      setAnimationKey((prev) => prev + 1); // Trigger animation for 3
    }
  };

  useEffect(() => {
    const handleKeyDown = () => {
      handleStartCountdown();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startingMessage, countDown, goSignal]);

  useEffect(() => {
    let intervalId = null;
    let timeoutId = null;

    if (countDown) {
      intervalId = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setCountDown(false);
            setGoSignal(true);

            timeoutId = setTimeout(() => {
              setStartingMessage(false);
              setGoSignal(false);
              setAnimationKey(0); // Reset animation key
            }, 1000);
            return 0;
          }
          setAnimationKey((prev) => prev + 1); // Trigger animation for each number
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [countDown]);

  return (
    <>
      {/* BEFORE STARTING */}
      {!startTest && (
        <div className="h-screen flex flex-col gap-10 items-center justify-center bg-gray-900 text-white">
          <select
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 0) setDuration(value);
            }}
            className="bg-gray-700 text-white px-4 py-2 rounded-md text-lg focus:outline-none"
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setStartTest(true);
              setStartingMessage(true);
            }}
            className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer px-6 py-3 text-3xl text-gray-800 rounded-xl font-bold transition"
          >
            Start Typing ...
          </button>
        </div>
      )}

      {/* PRESS ANY KEY TO START */}
      {startTest && startingMessage && !countDown && !goSignal && (
        <div className="h-screen flex flex-col gap-10 items-center justify-center bg-gray-800 text-white">
          <p className="text-2xl">
            Get ready and keep your hands on the keyboard...
          </p>
          <p className="text-4xl font-bold text-red-400 animate-pulse">
            Press any key to start
          </p>
        </div>
      )}

      {/* COUNTDOWN ANIMATION */}
      {startTest && startingMessage && countDown && (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
          <p
            key={animationKey} // Use animationKey to trigger re-render with animation
            className="text-8xl font-extrabold text-yellow-400 animate-scale-up-down"
          >
            {countDown}
          </p>
        </div>
      )}

      {/* GO SIGNAL */}
      {startTest && startingMessage && goSignal && (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
          <p className="text-8xl font-extrabold text-green-400 animate-scale-up-down">
            Go!
          </p>
        </div>
      )}

      {/* ACTUAL TEST */}
      {startTest && !startingMessage && !countDown && !goSignal && (
        <div className="flex flex-col items-center bg-gray-800 px-10 min-h-screen">
          <Header />
          <TimeLeft duration={duration} />
          <TypingWindow duration={duration} />
          <button
            onClick={resetTest}
            className="mt-14 mb-6 bg-red-400 hover:bg-red-500 cursor-pointer px-6 py-3 text-lg text-white rounded-xl font-bold transition"
          >
            Reset Test
          </button>
        </div>
      )}
    </>
  );
};

export default App;
