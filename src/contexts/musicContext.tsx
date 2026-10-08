import { createContext, useState } from "react";
import type { MusicContextType } from "../types/musicContextType";

export const MusicContext = createContext<MusicContextType | null>(null);

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
