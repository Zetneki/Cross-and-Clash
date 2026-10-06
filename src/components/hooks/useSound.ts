import { SOUNDS } from "../../constants/sound";
import type { soundType } from "../../types/soundType";
import { useSoundContext } from "./useSoundContext";

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
