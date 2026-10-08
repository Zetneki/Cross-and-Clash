import { useContext } from "react";
import { TimerContext } from "../../contexts/timerContext";

/**
 * the useTimerContext hook is used to access the timer context within a TimerProvider component
 * @throws an error if useTimerContext is called outside of a TimerProvider
 * @returns the timer context
 */
export function useTimerContext() {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }

  return context;
}
