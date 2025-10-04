import { useState, useEffect, RefObject } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DraggableCard } from "@/components/DraggableCard";
import seaside from "@/assets/Seaside.mp3";
import seasideView from "@/assets/Seaside_View.mp3";
import seasideSerenade from "@/assets/Seaside_Serenade.mp3";
import seasideJazz from "@/assets/Seaside_Jazz.mp3";
import seasideCalm from "@/assets/Seaside_Calm.mp3";
import moonlitTides from "@/assets/Moonlit_Tides.mp3";
import moonlitTide from "@/assets/Moonlit_Tide.mp3";
import beneattheMoonlitOcean from "@/assets/Beneath_the_Moonlit_Ocean.mp3";

const musicTracks = [
  { name: "Ocean Breeze", url: seaside },
  { name: "Coastal Dreams", url: seasideView },
  { name: "Sunset Waves", url: seasideSerenade },
  { name: "Beach Harmony", url: seasideJazz },
  { name: "Tranquil Shore", url: seasideCalm },
  { name: "Lunar Waters", url: moonlitTides },
  { name: "Evening Tide", url: moonlitTide },
  { name: "Midnight Sea", url: beneattheMoonlitOcean },
];

interface MusicPlayerProps {
  autoPlayOnTimer?: boolean;
  timerRunning?: boolean;
  audioRef?: RefObject<HTMLAudioElement>;
  transparent?: boolean;
}

export const MusicPlayer = ({ autoPlayOnTimer = false, timerRunning = false, audioRef, transparent = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, audioRef]);

  useEffect(() => {
    if (autoPlayOnTimer && timerRunning && !isPlaying) {
      playMusic();
    } else if (autoPlayOnTimer && !timerRunning && isPlaying) {
      pauseMusic();
    }
  }, [timerRunning, autoPlayOnTimer]);

  const playMusic = () => {
    audioRef?.current?.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    audioRef?.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const nextTrack = () => {
    const wasPlaying = isPlaying;
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
    if (wasPlaying) {
      setTimeout(() => playMusic(), 100);
    }
  };

  const prevTrack = () => {
    const wasPlaying = isPlaying;
    setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
    if (wasPlaying) {
      setTimeout(() => playMusic(), 100);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <DraggableCard title="Study Music" icon="🎵" defaultOpen={true} transparent={transparent}>
      <div className="space-y-4">
        <audio
          ref={audioRef}
          src={musicTracks[currentTrack].url}
          onEnded={nextTrack}
        />

        <div className="text-center">
          <p className="text-sm font-medium">{musicTracks[currentTrack].name}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" onClick={prevTrack}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button size="icon" onClick={togglePlay} className="h-12 w-12">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={(val) => setVolume(val[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-10">{volume}%</span>
        </div>
      </div>
    </DraggableCard>
  );
};
