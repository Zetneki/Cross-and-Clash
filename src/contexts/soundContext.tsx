import { createContext, useState } from "react";
import type { SoundContextType } from "../types/soundContextType";

// context for sound settings
// context is used to manage the sound settings across the application, allowing components to access and modify the sound state (enabled/disabled) as needed.
export const SoundContext = createContext<SoundContextType | null>(null);

/**
 * provider for sound settings
 * the provider component wraps the application and provides the sound context to its children, allowing them to access and modify the sound settings.
 * @param children - the child components that will have access to the sound context
 * @returns the provider component
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.5);

  return (
    <SoundContext.Provider
      value={{ soundEnabled, setSoundEnabled, soundVolume, setSoundVolume }}
    >
      {children}
    </SoundContext.Provider>
  );
}
