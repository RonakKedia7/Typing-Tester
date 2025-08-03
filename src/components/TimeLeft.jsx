import { Hourglass } from "lucide-react";
import { useState, useEffect } from "react";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedMins = String(mins).padStart(2, "0");
  const paddedSecs = String(secs).padStart(2, "0");
  return `${paddedMins}:${paddedSecs}`;
};

const TimeLeft = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [duration]);

  return (
    <div className="flex justify-center items-center mt-8 mb-8 relative z-10">
      <div className="glass flex items-center gap-4 px-8 py-4 rounded-2xl card-elevated border border-gray-600">
        <div className="relative">
          <Hourglass className="text-yellow-400 size-6 animate-float" />
          <div className="absolute inset-0 size-6 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        </div>
        <p className="text-2xl font-semibold">
<<<<<<< HEAD
          <span className="text-gray-300">Time left:</span>
          <span className="text-yellow-400 font-mono ml-2 text-glow">
            {formatTime(timeLeft)}
          </span>
=======
          <span className="text-gray-300">Time left:</span> 
          <span className="text-yellow-400 font-mono ml-2 text-glow">{formatTime(timeLeft)}</span>
>>>>>>> 299921128424b375134a112a08724dc1efdd3f23
        </p>
      </div>
    </div>
  );
};

export default TimeLeft;
