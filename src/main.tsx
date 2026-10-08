import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SoundProvider } from "./contexts/soundContext.tsx";
import { MusicProvider } from "./contexts/musicContext.tsx";
import { TimerProvider } from "./contexts/timerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MusicProvider>
      <SoundProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
      </SoundProvider>
    </MusicProvider>
  </StrictMode>,
);
