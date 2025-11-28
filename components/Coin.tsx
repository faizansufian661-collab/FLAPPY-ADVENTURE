import React from 'react';
import { COIN_SIZE, COIN_SKINS } from '../constants';

interface CoinProps {
  x: number;
  y: number;
  skinId: string;
}

const Coin: React.FC<CoinProps> = ({ x, y, skinId }) => {
  const skin = COIN_SKINS.find(s => s.id === skinId) || COIN_SKINS[0];

  return (
    <div
      className="absolute z-10 will-change-transform"
      style={{
        width: COIN_SIZE,
        height: COIN_SIZE,
        transform: `translate3d(${x}px, ${y}px, 0)`
      }}
    >
      <style>{`
        @keyframes spinCoin { 0% { transform: rotateY(0deg) scale(1); } 50% { transform: rotateY(180deg) scale(1.1); } 100% { transform: rotateY(360deg) scale(1); } }
        @keyframes sparkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
        .coin-spin { animation: spinCoin 1.5s linear infinite; }
        .sparkle-effect { animation: sparkle 2s ease-in-out infinite; }
      `}</style>

      <div className="w-full h-full relative">
        <div 
          className="w-full h-full rounded-full border-2 coin-spin flex items-center justify-center relative"
          style={{
            backgroundColor: skin.color1,
            borderColor: skin.color2,
            boxShadow: `0 0 15px ${skin.glow}`,
          }}
        >
          {/* Inner details */}
          <div 
            className="w-[60%] h-[60%] rounded-full border opacity-80"
            style={{
               backgroundColor: skin.color2,
               borderColor: 'rgba(255,255,255,0.6)'
            }}
          ></div>
          
          {/* Shine effect overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-80"></div>
        </div>

        {/* Sparkle Particles */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full sparkle-effect shadow-[0_0_5px_white]"></div>
      </div>
    </div>
  );
};

export default Coin;