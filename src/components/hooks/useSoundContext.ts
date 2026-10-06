import { useContext } from "react";
import { SoundContext } from "../../contexts/soundContext";

export function useSoundContext() {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }

  return context;
}
