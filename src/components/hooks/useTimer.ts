import { useEffect } from "react";
import { useTimerContext } from "./useTimerContext";

/**
 * timer hook manages the timer state and provides functions to start, stop, and reset the timer
 * @returns relevant timer state and functions
 */
export function timer() {
  const {
    isTimerRunning,
    setIsTimerRunning,
    isTimerVisible,
    setElapsedTime,
    elapsedTime,
  } = useTimerContext();

  function startTimer() {
    setElapsedTime(0);
    setIsTimerRunning(true);
  }

  function resetTimer() {
    setElapsedTime(0);
  }

  function stopTimer() {
    setIsTimerRunning(false);
  }

  // update elapsed time every second
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, setElapsedTime]);

  return {
    isTimerRunning,
    isTimerVisible,
    elapsedTime,
    startTimer,
    resetTimer,
    stopTimer,
  };
}
