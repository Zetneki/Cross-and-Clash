import { useContext } from "react";
import { MusicContext } from "../../contexts/musicContext";

/**
 * the useMusicContext hook is used to access the music context within a MusicProvider component
 * @throws an error if useMusicContext is called outside of a MusicProvider
 * @returns the music context
 */
export function useMusicContext() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }

  return context;
}
