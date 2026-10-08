import { useContext } from "react";
import { MusicContext } from "../../contexts/musicContext";

export function useMusicContext() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }

  return context;
}
