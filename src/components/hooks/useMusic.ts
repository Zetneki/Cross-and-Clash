import { useEffect, useState } from "react";
import { MUSIC } from "../../constants/music";
import { MUSIC_CONFIG } from "../../constants/musicConfig";
import { useMusicContext } from "./useMusicContext";
import { DUCK_VOLUME } from "../../constants/duckVolume";

/**
 * the useMusic hook is used to play music based on the music context settings
 * @returns the function to play the music
 */
export function useMusic() {
  const { musicEnabled, musicVolume, ducked } = useMusicContext();

  const [music] = useState(() => new Audio(MUSIC));

  // play music when enabled
  useEffect(() => {
    // handle time update to loop the music
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

  // pause music when the page is hidden and resume when visible
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) music.pause();
      else if (musicEnabled) music.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [music, musicEnabled]);

  // pause music when the component is unmounted
  useEffect(() => {
    return () => music.pause();
  }, [music]);

  // update volume based on ducked state
  useEffect(() => {
    music.volume = ducked ? musicVolume * DUCK_VOLUME : musicVolume;
  }, [musicVolume, ducked]);
}
