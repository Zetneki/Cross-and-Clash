import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SoundProvider } from "./contexts/soundContext.tsx";
import { MusicProvider } from "./contexts/musicContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MusicProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </MusicProvider>
  </StrictMode>,
);
