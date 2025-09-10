import { useEffect, useState } from "react";
import { Cloud, CloudRain, Moon, Star } from "lucide-react";

export default function Index() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-melancholy-900 via-melancholy-800 to-rain-900 relative overflow-hidden">
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
            <h1 className="text-6xl md:text-8xl font-thin text-rain-100 mb-4 tracking-wide">
              melancholia
            </h1>

            {/* Personal Greeting */}
            <p className="text-2xl md:text-3xl text-rain-300 font-light mb-8">
              hello world
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
