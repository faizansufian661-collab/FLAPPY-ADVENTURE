
import React, { useMemo } from 'react';
import { WeatherType } from '../types';

interface BackgroundProps {
  weather: WeatherType;
}

// Generate static arrays once to prevent GC overhead during render loop
const WIND_PARTICLES = Array.from({ length: 5 });
const RAIN_PARTICLES = Array.from({ length: 20 });
const SNOW_PARTICLES = Array.from({ length: 30 });

const Background: React.FC<BackgroundProps> = React.memo(({ weather }) => {
  
  // Memoize particle styles so they don't recalculate every frame
  const windStyles = useMemo(() => WIND_PARTICLES.map(() => ({
    top: `${10 + Math.random() * 80}%`,
    left: `${Math.random() * 100}%`,
    width: `${50 + Math.random() * 100}px`,
    animationDuration: `${0.5 + Math.random() * 1}s`,
    animationDelay: `${Math.random()}s`
  })), []);

  const rainStyles = useMemo(() => RAIN_PARTICLES.map(() => ({
    left: `${Math.random() * 100}%`,
    top: `-${Math.random() * 20}%`,
    animationDuration: `${0.5 + Math.random() * 0.5}s`,
    animationDelay: `${Math.random()}s`
  })), []);

  const snowStyles = useMemo(() => SNOW_PARTICLES.map(() => ({
    left: `${Math.random() * 100}%`,
    animationDuration: `${2 + Math.random() * 3}s`,
    animationDelay: `${Math.random() * 2}s`
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 will-change-transform">
      <style>{`
        @keyframes drift { from { transform: translateX(100%); } to { transform: translateX(-150%); } }
        @keyframes wind { from { transform: translateX(100%) scaleX(0.5); opacity: 0; } 50% { opacity: 0.5; } to { transform: translateX(-200%) scaleX(1.2); opacity: 0; } }
        @keyframes rain-fall { from { transform: translateY(-100vh); } to { transform: translateY(100vh); } }
        @keyframes flash { 0%, 95% { opacity: 0; } 96% { opacity: 0.8; } 100% { opacity: 0; } }
        .cloud { animation: drift 20s linear infinite; will-change: transform; }
        .wind-line { animation: wind 1s linear infinite; will-change: transform, opacity; }
        .rain-drop { animation: rain-fall 0.8s linear infinite; will-change: transform; }
        .snow-flake { animation: rain-fall 3s linear infinite; will-change: transform; }
        .lightning { animation: flash 5s infinite; background: white; }
      `}</style>

      {/* Wind Effect */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        {WIND_PARTICLES.map((_, i) => (
          <div 
            key={i}
            className="wind-line absolute h-0.5 bg-white rounded-full"
            style={windStyles[i]}
          />
        ))}
      </div>

      {/* Clouds */}
      {weather !== 'APOCALYPSE' && (
        <>
          <div className="cloud absolute top-10 left-0 text-white/40" style={{ animationDuration: '25s' }}>
             <CloudIcon size={60} />
          </div>
          <div className="cloud absolute top-24 left-0 text-white/30" style={{ animationDelay: '10s', animationDuration: '30s' }}>
             <CloudIcon size={40} />
          </div>
          <div className="cloud absolute top-5 left-0 text-white/20" style={{ animationDelay: '5s', animationDuration: '40s' }}>
             <CloudIcon size={80} />
          </div>
        </>
      )}

      {/* Weather Effects */}
      {weather === 'RAIN' && <Rain styles={rainStyles} />}
      {weather === 'SNOW' && <Snow styles={snowStyles} />}
      {weather === 'STORM' && (
        <>
          <Rain styles={rainStyles} />
          <div className="absolute inset-0 lightning mix-blend-overlay"></div>
        </>
      )}
      {weather === 'APOCALYPSE' && (
        <>
          <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay"></div>
          <Rain styles={rainStyles} color="red" />
          <div className="absolute inset-0 lightning mix-blend-overlay" style={{ animationDuration: '2s' }}></div>
        </>
      )}
    </div>
  );
});

const Rain = ({ styles, color = 'white' }: { styles: any[], color?: string }) => (
  <div className="absolute inset-0 w-full h-full">
    {styles.map((style, i) => (
      <div 
        key={i}
        className="rain-drop absolute w-0.5 h-6 bg-white/50"
        style={{ ...style, backgroundColor: color === 'red' ? '#ef4444' : 'white' }}
      />
    ))}
  </div>
);

const Snow = ({ styles }: { styles: any[] }) => (
   <div className="absolute inset-0 w-full h-full">
    {styles.map((style, i) => (
      <div 
        key={i}
        className="snow-flake absolute w-1.5 h-1.5 bg-white rounded-full opacity-80"
        style={style}
      />
    ))}
  </div>
);

const CloudIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size / 2} viewBox="0 0 60 30" fill="currentColor">
    <path d="M10 25C10 27.7614 12.2386 30 15 30H45C47.7614 30 50 27.7614 50 25C50 22.2386 47.7614 20 45 20H42.8C42.4 14.8 38.2 10 33 10C32.3 10 31.6 10.1 31 10.2C29.8 4.6 24.8 0 19 0C12.4 0 7 5.4 7 12C7 12.8 7.1 13.6 7.3 14.4C3.2 15.6 0 19.4 0 24C0 27.3 2.7 30 6 30H10V25Z" />
  </svg>
);

export default Background;
