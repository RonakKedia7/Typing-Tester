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
    <div className="flex justify-center items-center mt-10">
      <div className="bg-gray-700 flex gap-5 px-4 py-3 rounded-2xl text-center text-gray-100 border border-gray-600">
        <Hourglass className="text-yellow-500 " />
        <p className="text-xl">
          Time left: <span>{formatTime(timeLeft)}</span>
        </p>
      </div>
    </div>
  );
};

export default TimeLeft;
