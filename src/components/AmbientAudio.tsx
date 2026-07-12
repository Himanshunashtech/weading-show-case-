import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import fluteUrl from "@/assets/flute.mp3";

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = new Audio(fluteUrl);
    audio.loop = true;
    audio.volume = 0.35;
    audio.muted = true;
    audioRef.current = audio;
    audio.play().catch(() => {});

    const unmuteOnInteract = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      setMuted(false);
      audioRef.current.play().catch(() => {});
      window.removeEventListener("pointerdown", unmuteOnInteract);
      window.removeEventListener("keydown", unmuteOnInteract);
      window.removeEventListener("scroll", unmuteOnInteract);
    };
    window.addEventListener("pointerdown", unmuteOnInteract, { once: true });
    window.addEventListener("keydown", unmuteOnInteract, { once: true });
    window.addEventListener("scroll", unmuteOnInteract, { once: true });

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("pointerdown", unmuteOnInteract);
      window.removeEventListener("keydown", unmuteOnInteract);
      window.removeEventListener("scroll", unmuteOnInteract);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
    if (!a.muted) a.play().catch(() => {});
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="fixed bottom-6 left-6 z-50 h-11 w-11 rounded-full bg-foreground/85 text-background flex items-center justify-center shadow-lg backdrop-blur hover:bg-foreground transition"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
