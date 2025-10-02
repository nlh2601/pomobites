import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const musicTracks = [
  { name: "Cafe Jazz Vibes", url: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3" },
  { name: "Smooth Jazz", url: "https://www.bensound.com/bensound-music/bensound-jazzcomedy.mp3" },
  { name: "Chill Lounge", url: "https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3" },
  { name: "Study Beats", url: "https://www.bensound.com/bensound-music/bensound-relaxing.mp3" },
];

interface MusicPlayerProps {
  autoPlayOnTimer?: boolean;
  timerRunning?: boolean;
}

export const MusicPlayer = ({ autoPlayOnTimer = false, timerRunning = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (autoPlayOnTimer && timerRunning && !isPlaying) {
      playMusic();
    } else if (autoPlayOnTimer && !timerRunning && isPlaying) {
      pauseMusic();
    }
  }, [timerRunning, autoPlayOnTimer]);

  const playMusic = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
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
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>🎵 Study Music</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <audio
          ref={audioRef}
          src={musicTracks[currentTrack].url}
          loop
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
      </CardContent>
    </Card>
  );
};