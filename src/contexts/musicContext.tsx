import { createContext, useState } from "react";
import type { MusicContextType } from "../types/musicContextType";

// context for music settings
// context is used to manage the music settings across the application, allowing components to access and modify the music state as needed.
export const MusicContext = createContext<MusicContextType | null>(null);

/**
 * provider for music settings
 * the provider component wraps the application and provides the music context to its children, allowing them to access and modify the music settings.
 * @param children - the child components that will have access to the music context
 * @returns the provider component
 */
export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [ducked, setDucked] = useState(false);

  return (
    <MusicContext.Provider
      value={{
        musicEnabled,
        setMusicEnabled,
        musicVolume,
        setMusicVolume,
        ducked,
        setDucked,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
