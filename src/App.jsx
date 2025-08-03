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
        <div className="min-h-screen flex flex-col gap-12 items-center justify-center gradient-bg relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
            <div
              className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <div className="relative z-10 text-center">
            <h1 className="text-6xl font-bold text-gradient mb-4 animate-float">
              Typing Speed Tester
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Test your typing speed and accuracy with our professional typing
              test. Choose your preferred duration and start improving your
              skills.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="gradient-border">
              <div className="gradient-border-inner p-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select Test Duration
                </label>
                <select
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 0) setDuration(value);
                  }}
                  className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 transition-all duration-300"
                >
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setStartTest(true);
                setStartingMessage(true);
              }}
              className="btn-primary px-12 py-4 text-2xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Typing Test
            </button>
          </div>
        </div>
      )}

      {/* PRESS ANY KEY TO START */}
      {startTest && startingMessage && !countDown && !goSignal && (
        <div className="min-h-screen flex flex-col items-center justify-center gradient-bg relative">
          <div className="text-center max-w-2xl mx-auto px-6">
            <div className="glass p-12 rounded-3xl card-elevated border border-gray-600">
              <p className="text-2xl font-medium text-gray-300 mb-8">
                Get ready and keep your hands on the keyboard...
              </p>
              <p className="text-4xl font-bold text-gradient animate-pulse-glow">
                Press any key to start
              </p>
            </div>
          </div>
        </div>
      )}

      {/* COUNTDOWN ANIMATION */}
      {startTest && startingMessage && countDown && (
        <div className="min-h-screen flex flex-col items-center justify-center gradient-bg relative">
          <div className="glass p-16 rounded-full card-elevated">
            <p
              key={animationKey}
              className="text-9xl font-extrabold text-gradient animate-scale-up-down text-glow"
            >
              {countDown}
            </p>
          </div>
        </div>
      )}

      {/* GO SIGNAL */}
      {startTest && startingMessage && goSignal && (
        <div className="min-h-screen flex flex-col items-center justify-center gradient-bg relative">
          <div className="glass p-16 rounded-full card-elevated">
            <p className="text-9xl font-extrabold btn-success bg-clip-text text-transparent animate-scale-up-down text-glow">
              Go!
            </p>
          </div>
        </div>
      )}

      {/* ACTUAL TEST */}
      {startTest && !startingMessage && !countDown && !goSignal && (
        <div className="flex flex-col items-center gradient-bg px-6 min-h-screen relative">
          {/* Background decoration for test screen */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500 rounded-full filter blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500 rounded-full filter blur-2xl"></div>
          </div>

          <Header />
          <TimeLeft duration={duration} />
          <TypingWindow duration={duration} />
          <button
            onClick={resetTest}
            className="mt-16 mb-8 btn-secondary px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 relative z-10"
          >
            Reset Test
          </button>
        </div>
      )}
    </>
  );
};

export default App;
