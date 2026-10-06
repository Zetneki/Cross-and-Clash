import { SOUNDS } from "../../constants/sound";
import type { soundType } from "../../types/soundType";
import { useSoundContext } from "./useSoundContext";

/**
 * the useSound hook is used to play sounds based on the sound context settings
 * @param val - the sound type to play
 * @returns the function to play the sound
 */
export function useSound() {
  const { enabled } = useSoundContext();

  function playSound(val: soundType) {
    if (!enabled) return;

    const audio = new Audio(SOUNDS[val]);
    audio.play().catch((error) => {
      console.error(`Failed to play sound: ${error}`);
    });
  }

  return playSound;
}
