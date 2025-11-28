import React, { useEffect, useState, useMemo } from 'react';
import { BIRD_SKINS } from '../constants';
import Bird from './Bird';
import { soundManager } from '../utils/sound';
import { IconSettings, IconBack, IconPlay, IconCoin, IconGift, IconCheck } from './Icons';

interface MainMenuProps {
  username: string;
  coins: number;
  hasDailyReward: boolean;
  onPlay: () => void;
  onSettings: () => void;
  onLogout: () => void;
  onDailyReward: () => void;
}

// Generate random birds for the background flock
const getRandomBirds = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        skinId: BIRD_SKINS[Math.floor(Math.random() * BIRD_SKINS.length)].id,
        yStart: Math.random() * 80 + 10, // 10% to 90% height
        speed: 0.2 + Math.random() * 0.4,
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 200
    }));
};

const MainMenu: React.FC<MainMenuProps> = ({ username, coins, hasDailyReward, onPlay, onSettings, onLogout, onDailyReward }) => {
  const [offset, setOffset] = useState(0);
  const birds = useMemo(() => getRandomBirds(15), []);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      frame++;
      setOffset(frame);
      requestAnimationFrame(loop);
    };
    loop();
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200"></div>

      {/* Floating Birds Background (Random Flock) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {birds.map((bird) => {
            // Calculate position based on time offset
            // Ensure smooth wrapping
            const position = ((offset * bird.speed) + bird.delay) % 130 - 20; 
            
            return (
                <div 
                    key={bird.id}
                    className="absolute will-change-transform"
                    style={{
                        left: `${position}%`,
                        top: `${bird.yStart + Math.sin(offset * 0.02 + bird.id) * 5}%`,
                        transform: `scale(${bird.scale}) translateZ(0)`
                    }}
                >
                    <Bird y={0} x={0} rotation={0} skinId={bird.skinId} />
                </div>
            );
        })}
      </div>

      {/* Clouds */}
      <div className="absolute bottom-0 w-full h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCAyMjRMMzAgMjEzLjNDNjAgMjAzIDEyMCAxODEgMTgwIDE4MS4zQzI0MCAxODEgMzAwIDIwMyAzNjAgMTkyQzQyMCAxODEgNDgwIDEzOSA1NDAgMTM4LjdDNjAwIDEzOSA2NjAgMTgxIDcyMCAxOTJDNzgwIDIwMyA4NDAgMTgxIDkwMCAxNjBDOTYwIDEzOSAxMDIwIDExNyAxMDgwIDEyOEMxMTQwIDEzOSAxMjAwIDE4MSAxMjYwIDE5MkMxMzIwIDIwMyAxMzgwIDE4MSAxNDEwIDE3MEwxNDQwIDE2MFYzMjBIMTQxMFYxMzgwVjMyMEgxMjYwVjMyMEgxMjAwVjMyMEgxMDgwVjMyMEgxMDIwVjMyMEg5MDBWMzIwSDg0MFYzMjBINzIwVjMyMEg2NjBWMzIwHDU0MFYzMjBINDgwVjMyMEg0MjBWMzIwSDM2MFYzMjBHMzAwVjMyMEgyNDBWMzIwSDE4MFYzMjBIMTIwVjMyMEg2MFYzMjBIMFYzMjBaIj48L3BhdGg+PC/zdmc+')] bg-cover bg-bottom opacity-80"></div>

      {/* UI Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center">
           <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-500 drop-shadow-[0_4px_0_rgba(0,0,0,0.3)] mb-2 stroke-white">
             FLAPPY<br/>ADVENTURE
           </h1>
           <p className="text-white font-bold drop-shadow-md bg-black/20 px-4 py-1 rounded-full border border-white/20">
             Welcome, {username}
           </p>
        </div>

        {/* Center Action */}
        <div className="flex flex-col items-center gap-4">
           <button 
             onClick={() => { soundManager.play('click'); onPlay(); }}
             className="btn-glossy w-48 h-20 flex items-center justify-center gap-3 text-3xl shadow-[0_10px_20px_rgba(245,158,11,0.4)] animate-bounce"
             style={{ animationDuration: '2s' }}
           >
             <IconPlay className="w-10 h-10 fill-white stroke-none" />
             PLAY
           </button>
           
           <div className="flex gap-4">
             <div className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 flex items-center gap-2">
               <IconCoin className="w-6 h-6" />
               <span className="text-yellow-300 font-black text-xl">{coins}</span>
             </div>

             {/* DAILY REWARD BUTTON (Persistent) */}
             <button 
                  onClick={() => { 
                      if (hasDailyReward) {
                        soundManager.play('click'); 
                        onDailyReward(); 
                      }
                  }}
                  disabled={!hasDailyReward}
                  className={`p-2 rounded-full border-2 shadow-lg transition-transform ${
                      hasDailyReward 
                      ? 'bg-red-500 hover:bg-red-600 border-white text-white animate-pulse'
                      : 'bg-green-500 border-green-300 text-white grayscale-0 cursor-default'
                  }`}
                  title={hasDailyReward ? "Claim Daily Reward" : "Reward Claimed"}
                >
                  {hasDailyReward ? (
                      <IconGift className="w-6 h-6" />
                  ) : (
                      <IconCheck className="w-6 h-6" />
                  )}
            </button>
           </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-6">
           <button 
             onClick={() => { soundManager.play('click'); onSettings(); }}
             className="btn-glossy btn-glossy-green btn-glossy-icon text-white"
           >
             <IconSettings className="w-8 h-8 stroke-white" />
           </button>
           <button 
             onClick={() => { soundManager.play('click'); onLogout(); }}
             className="btn-glossy btn-glossy-blue btn-glossy-icon !bg-red-500 !border-red-800 text-white"
             style={{ background: 'linear-gradient(to bottom, #fca5a5, #ef4444, #991b1b)', borderColor: '#7f1d1d', boxShadow: '0 6px 0 #7f1d1d' }}
           >
             <IconBack className="w-8 h-8" />
           </button>
        </div>
        
      </div>
    </div>
  );
};

export default MainMenu;