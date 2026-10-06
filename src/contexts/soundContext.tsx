import { createContext, useState } from "react";
import type { SoundContextType } from "../types/soundContextType";

export const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <SoundContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </SoundContext.Provider>
  );
}
