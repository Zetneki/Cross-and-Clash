import { useEffect, useRef } from "react";
import { MUSIC } from "../../constants/music";
import { MUSIC_CONFIG } from "../../constants/musicConfig";
import { useMusicContext } from "./useMusicContext";
import { DUCK_VOLUME } from "../../constants/duckVolume";

export function useMusic() {
  const { musicEnabled, musicVolume, ducked } = useMusicContext();
  const audio = useRef(new Audio(MUSIC));

  useEffect(() => {
    const music = audio.current;

    const handleTimeUpdate = () => {
      if (music.currentTime >= MUSIC_CONFIG.loopEnd) {
        music.currentTime = MUSIC_CONFIG.loopStart;
      }
    };

    music.addEventListener("timeupdate", handleTimeUpdate);

    if (musicEnabled) {
      music.play().catch((error) => {
        console.error(`Failed to play music: ${error}`);
      });
    } else {
      music.pause();
    }

    return () => music.removeEventListener("timeupdate", handleTimeUpdate);
  }, [musicEnabled]);

  useEffect(() => {
    audio.current.volume = ducked ? musicVolume * DUCK_VOLUME : musicVolume;
  }, [musicVolume, ducked]);
}
