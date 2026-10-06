import { useContext } from "react";
import { SoundContext } from "../../contexts/soundContext";

/**
 * the useSoundContext hook is used to access the sound context within a SoundProvider component
 * @returns the sound context
 */
export function useSoundContext() {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }

  return context;
}
