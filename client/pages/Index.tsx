import { useEffect, useState, useRef } from "react";
import {
  Cloud,
  CloudRain,
  Moon,
  Star,
  Volume2,
  VolumeX,
  Play,
  Pause,
} from "lucide-react";

export default function Index() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sadQuotes = [
    "Sometimes the heart sees what is invisible to the eye.",
    "Tears are words that need to be written.",
    "The quietest people have the loudest minds.",
    "Sadness flies away on the wings of time.",
    "Every tear teaches us something about the depth of our hearts.",
    "In the depth of winter, I finally learned that there was in me an invincible summer.",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sadQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-melancholy-900 via-melancholy-800 to-rain-900 relative overflow-hidden">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/13/audio_1808fbf07a.mp3"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Music Controls */}
      <div className="fixed bottom-8 right-8 z-20 flex flex-col gap-3 bg-melancholy-800/40 backdrop-blur-md border border-rain-500/30 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2 bg-rain-700/50 hover:bg-rain-600/60 rounded-full transition-all duration-300 border border-rain-500/40"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-rain-100" />
            ) : (
              <Play className="w-5 h-5 text-rain-100" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 bg-rain-700/50 hover:bg-rain-600/60 rounded-full transition-all duration-300 border border-rain-500/40"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-rain-100" />
            ) : (
              <Volume2 className="w-5 h-5 text-rain-100" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-rain-700/50 rounded-lg appearance-none cursor-pointer accent-rain-400"
            aria-label="Volume control"
          />
        </div>

        <div className="text-xs text-rain-300 text-center font-light">
          sad melody
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <Cloud className="w-16 h-16 text-rain-300" />
        </div>
        <div className="absolute top-32 right-20 opacity-30 animate-pulse delay-1000">
          <CloudRain className="w-12 h-12 text-rain-400" />
        </div>
        <div className="absolute top-48 left-1/3 opacity-25 animate-pulse delay-2000">
          <Cloud className="w-10 h-10 text-melancholy-300" />
        </div>

        {/* Stars */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute opacity-40 animate-pulse`}
            style={{
              top: `${Math.random() * 60 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star className="w-2 h-2 text-rain-200 fill-current" />
          </div>
        ))}

        {/* Moon */}
        <div className="absolute top-16 right-16 opacity-60">
          <Moon className="w-20 h-20 text-rain-200 fill-current" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* App Title */}
            <h1 className="text-6xl md:text-8xl font-thin text-rain-100 mb-8 tracking-wide">
              melancholia
            </h1>

            <p className="text-lg md:text-xl text-rain-300 mb-6 font-light">
              hello sadness
            </p>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rain-400 to-transparent mx-auto mb-12"></div>

            {/* Quote Container */}
            <div className="h-32 flex items-center justify-center mb-16">
              <blockquote
                key={currentQuote}
                className="text-xl md:text-2xl text-rain-200 font-light italic leading-relaxed animate-fadeIn max-w-2xl"
              >
                "{sadQuotes[currentQuote]}"
              </blockquote>
            </div>

            {/* Interactive Elements */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group px-8 py-3 bg-rain-700/30 border border-rain-500/50 rounded-full text-rain-200 hover:bg-rain-600/40 hover:border-rain-400/60 transition-all duration-300 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    <CloudRain className="w-4 h-4" />
                    Feel the Rain
                  </span>
                </button>

                <button className="group px-8 py-3 bg-melancholy-700/30 border border-melancholy-500/50 rounded-full text-melancholy-200 hover:bg-melancholy-600/40 hover:border-melancholy-400/60 transition-all duration-300 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Embrace the Dark
                  </span>
                </button>
              </div>

              {/* Mood Indicator */}
              <div className="flex justify-center items-center space-x-2 opacity-60">
                <span className="text-sm text-rain-300">Current mood:</span>
                <div className="flex space-x-1">
                  {["melancholic", "contemplative", "nostalgic"].map(
                    (mood, index) => (
                      <span
                        key={mood}
                        className={`px-2 py-1 rounded-full text-xs border ${
                          index === 0
                            ? "bg-rain-800/50 border-rain-500/50 text-rain-200"
                            : "border-rain-600/30 text-rain-400"
                        }`}
                      >
                        {mood}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ambient Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rain-950/80 to-transparent"></div>
    </div>
  );
}
