import React, { useState } from 'react';
import { IconGift, IconCoin } from './Icons';
import { soundManager } from '../utils/sound';

interface DailyRewardModalProps {
  onClaim: () => void;
  onClose: () => void;
}

const DailyRewardModal: React.FC<DailyRewardModalProps> = ({ onClaim, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClaim = () => {
    if (isOpen) {
        onClaim();
        return;
    }
    soundManager.play('win');
    setIsOpen(true);
  };

  return (
    <div className="absolute inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500 mb-8 drop-shadow-md text-center">
          DAILY REWARD
        </h2>

        <div 
          onClick={handleClaim}
          className={`relative cursor-pointer transition-transform duration-300 ${isOpen ? 'scale-110' : 'chest-bounce hover:scale-105'}`}
        >
          {isOpen ? (
             // Opened Chest Visual
             <div className="flex flex-col items-center animate-in zoom-in duration-500 relative">
                {/* Explosion Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({length: 12}).map((_, i) => (
                        <div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full" 
                             style={{
                                 left: '50%', top: '50%',
                                 transform: `rotate(${i * 30}deg) translate(60px)`,
                                 opacity: 0,
                                 animation: 'explode 0.6s ease-out forwards'
                             }}
                        />
                    ))}
                    <style>{`
                        @keyframes explode { 
                            0% { transform: rotate(var(--r)) translate(0px); opacity: 1; } 
                            100% { transform: rotate(var(--r)) translate(100px); opacity: 0; } 
                        }
                    `}</style>
                </div>

                <div className="text-yellow-400 font-black text-6xl drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] mb-4 flex items-center gap-2">
                   <IconCoin className="w-16 h-16 animate-bounce" /> +100
                </div>
                <p className="text-white font-bold text-lg mb-8">COINS ADDED!</p>
                <button 
                  onClick={onClaim}
                  className="btn-glossy btn-glossy-green px-8 py-3 text-xl animate-pulse"
                >
                  COLLECT
                </button>
             </div>
          ) : (
             // Closed Chest Visual
             <div className="flex flex-col items-center group">
               <div className="w-40 h-40 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-3xl border-4 border-yellow-800 shadow-[0_20px_50px_rgba(251,191,36,0.4)] flex items-center justify-center relative">
                  <div className="absolute inset-x-0 top-1/2 h-4 bg-yellow-900/50"></div>
                  <div className="w-12 h-16 bg-yellow-300 border-4 border-yellow-800 rounded-b-xl z-10"></div>
                  <IconGift className="w-24 h-24 text-white absolute -top-12 drop-shadow-lg opacity-80" />
               </div>
               <p className="mt-8 text-slate-300 font-bold text-sm uppercase tracking-widest animate-pulse">Tap to Open</p>
             </div>
          )}
        </div>
        
        {!isOpen && (
             <button 
               onClick={onClose}
               className="mt-12 text-slate-500 font-bold text-xs uppercase hover:text-white"
             >
               Close
             </button>
        )}
      </div>
    </div>
  );
};

export default DailyRewardModal;