import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import matchaLatteImg from "@/assets/matcha-latte.jpg";
import mountainImg from "@/assets/mountain.jpg";

interface SettingsPanelProps {
  workDuration: number;
  setWorkDuration: (value: number) => void;
  shortBreak: number;
  setShortBreak: (value: number) => void;
  longBreak: number;
  setLongBreak: (value: number) => void;
  roundsBeforeLongBreak: number;
  setRoundsBeforeLongBreak: (value: number) => void;
  background: string;
  setBackground: (value: string) => void;
  soundOption: string;
  setSoundOption: (value: string) => void;
  transparentCards: boolean;
  setTransparentCards: (value: boolean) => void;
}

export const SettingsPanel = ({
  workDuration,
  setWorkDuration,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak,
  roundsBeforeLongBreak,
  setRoundsBeforeLongBreak,
  background,
  setBackground,
  soundOption,
  setSoundOption,
  transparentCards,
  setTransparentCards,
}: SettingsPanelProps) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        localStorage.setItem("customBackground", result);
        setBackground("custom");
      };
      reader.readAsDataURL(file);
    }
  };

  const previewSound = (soundId: string) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    let notes: number[] = [];
    
    if (soundId === "chime") {
      notes = [523.25, 659.25, 783.99]; // C-E-G major chord
    } else if (soundId === "bell") {
      notes = [659.25, 783.99, 1046.50]; // E-G-C high
    } else if (soundId === "ding") {
      notes = [880.00, 1046.50]; // A-C
    }
    
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + (index * 0.15);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
    });
  };

  const backgrounds = [
    { id: "tomato", name: "Tomato Fresh", emoji: "🍅" },
    { id: "cookie", name: "Cookie Crunch", emoji: "🍪" },
    { id: "boba", name: "Boba Bliss", emoji: "🧋" },
    { id: "matcha", name: "Matcha Mood", emoji: "🍵" },
    { id: "cafe", name: "Café Cozy", emoji: "☕" },
    { id: "matcha-latte", name: "Matcha Latte", emoji: "🍵", image: matchaLatteImg },
    { id: "mountain", name: "Mountain View", emoji: "🏔️", image: mountainImg },
  ];

  const sounds = [
    { id: "chime", name: "Chime", emoji: "🔔" },
    { id: "bell", name: "Bell", emoji: "🛎️" },
    { id: "ding", name: "Ding", emoji: "✨" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">🍱 Snack Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label className="text-base font-semibold">🍅 Bite Duration (minutes)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[workDuration]}
                onValueChange={(values) => setWorkDuration(values[0])}
                min={1}
                max={60}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{workDuration}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">🍪 Quick Snack (minutes)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[shortBreak]}
                onValueChange={(values) => setShortBreak(values[0])}
                min={1}
                max={30}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{shortBreak}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">🍰 Feast Break (minutes)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[longBreak]}
                onValueChange={(values) => setLongBreak(values[0])}
                min={5}
                max={60}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{longBreak}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">🍱 Bites Before Feast</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[roundsBeforeLongBreak]}
                onValueChange={(values) => setRoundsBeforeLongBreak(values[0])}
                min={2}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">{roundsBeforeLongBreak}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">🎨 Background Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              {backgrounds.map((bg) => (
                <Button
                  key={bg.id}
                  variant={background === bg.id ? "default" : "outline"}
                  onClick={() => setBackground(bg.id)}
                  className="h-20 flex flex-col gap-1"
                >
                  <span className="text-2xl">{bg.emoji}</span>
                  <span className="text-xs">{bg.name}</span>
                </Button>
              ))}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant={background === "custom" ? "default" : "outline"}
                  className="h-20 w-full flex flex-col gap-1"
                  type="button"
                  asChild
                >
                  <div>
                    <Upload className="h-6 w-6" />
                    <span className="text-xs">Custom</span>
                  </div>
                </Button>
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">🔊 Notification Sound</Label>
            <div className="grid grid-cols-3 gap-3">
              {sounds.map((sound) => (
                <Button
                  key={sound.id}
                  variant={soundOption === sound.id ? "default" : "outline"}
                  onClick={() => {
                    setSoundOption(sound.id);
                    previewSound(sound.id);
                  }}
                  className="h-16 flex flex-col gap-1"
                >
                  <span className="text-2xl">{sound.emoji}</span>
                  <span className="text-xs">{sound.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">👻 Transparency</Label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={transparentCards}
                onChange={(e) => setTransparentCards(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-sm">Make sidebar and cards transparent</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
