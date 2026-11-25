import { createContext } from "react";
import type { TimerContextModule } from "../modules/timerContextModule";
import { useLocalStorage } from "../hooks/useLocalStorage";

// context for timer settings
// context is used to manage the timer settings across the application, allowing components to access and modify the timer state as needed.
export const TimerContext = createContext<TimerContextModule | null>(null);

/**
 * provider for timer settings
 * the provider component wraps the application and provides the timer context to its children, allowing them to access and modify the timer settings.
 * @param children - the child components that will have access to the timer context
 * @returns the provider component
 */
export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [isTimerVisible, setIsTimerVisible] = useLocalStorage("timer", false);
  const [isTimerRunning, setIsTimerRunning] = useLocalStorage(
    "timer-running",
    false,
  );
  const [elapsedTime, setElapsedTime] = useLocalStorage("elapsed-time", 0);

  return (
    <TimerContext.Provider
      value={{
        isTimerVisible,
        setIsTimerVisible,
        isTimerRunning,
        setIsTimerRunning,
        elapsedTime,
        setElapsedTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
