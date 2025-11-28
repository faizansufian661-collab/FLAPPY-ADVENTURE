import React from 'react';
import { BIRD_SIZE, BIRD_SKINS } from '../constants';

interface BirdProps {
  y: number;
  x?: number;
  rotation: number;
  isDead?: boolean;
  isWon?: boolean;
  skinId: string;
}

const Bird: React.FC<BirdProps> = ({ y, x = 50, rotation, isDead = false, isWon = false, skinId }) => {
  const skin = BIRD_SKINS.find(s => s.id === skinId) || BIRD_SKINS[0];
  const acc = skin.colors.accessory;

  return (
    <div
      className="absolute z-20 will-change-transform"
      style={{
        width: BIRD_SIZE,
        height: BIRD_SIZE,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`,
        transition: isDead ? 'none' : 'transform 0.1s linear', 
        opacity: skinId === 'ghost' ? 0.6 : 1,
      }}
    >
      <style>{`
        @keyframes wobble { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1, 0.9); } }
        @keyframes googly { 0% { transform: translate(0, 0); } 25% { transform: translate(1px, -1px); } 50% { transform: translate(-1px, 1px); } 75% { transform: translate(0, 1px); } 100% { transform: translate(0, 0); } }
        .bird-body { animation: wobble 0.6s infinite ease-in-out; }
        .googly-eye { animation: googly 0.5s infinite linear; }
        .fast-flap { transform-origin: 12px 14px; animation: flap 0.1s ease-in-out infinite alternate; }
        @keyframes flap { from { transform: rotate(0deg) translateY(0); } to { transform: rotate(-40deg) translateY(-4px); } }
      `}</style>

      <svg
        viewBox="0 0 34 24"
        className={`w-full h-full drop-shadow-md overflow-visible ${!isDead && !isWon ? 'bird-body' : ''}`}
      >
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="20%" stopColor="#ff9900" />
            <stop offset="40%" stopColor="#ffff00" />
            <stop offset="60%" stopColor="#33cc33" />
            <stop offset="80%" stopColor="#3399ff" />
            <stop offset="100%" stopColor="#9900cc" />
          </linearGradient>
        </defs>

        {/* Halo Accessory */}
        {acc === 'halo' && (
          <ellipse cx="17" cy="0" rx="10" ry="3" fill="none" stroke="#FCD34D" strokeWidth="2" />
        )}

        {/* Body */}
        <path 
          d="M2 12 C 2 5 8 2 17 2 C 26 2 32 6 32 12 C 32 18 26 22 17 22 C 8 22 2 19 2 12 Z" 
          fill={skin.colors.body}
          stroke="black" 
          strokeWidth="2" 
        />

        {/* Horns Accessory */}
        {acc === 'horns' && (
           <g fill="#991B1B">
             <path d="M10 4 L6 -2 L12 2 Z" />
             <path d="M24 4 L28 -2 L22 2 Z" />
           </g>
        )}
        
        {/* Crown Accessory */}
        {acc === 'crown' && (
           <path d="M12 2 L12 -6 L17 0 L22 -6 L22 2 Z" fill="#FCD34D" stroke="black" strokeWidth="1" />
        )}

        {/* Eyes */}
        {!isDead && !isWon ? (
          <>
             {acc === 'eyepatch' ? (
                <circle cx="20" cy="9" r="6" fill="black" stroke="black" strokeWidth="2" />
             ) : (
                <>
                  <circle cx="20" cy="9" r="6" fill="white" stroke="black" strokeWidth="2" />
                  <circle cx="20" cy="9" r="2" fill={skin.colors.eye || 'black'} className="googly-eye" style={{ animationDelay: '0.1s' }} />
                </>
             )}
             
             {acc === 'visor' ? (
                <rect x="18" y="5" width="14" height="6" rx="2" fill="#38BDF8" stroke="black" />
             ) : (
               <>
                 <circle cx="28" cy="8" r="5" fill="white" stroke="black" strokeWidth="2" />
                 <circle cx="28" cy="8" r="2" fill={skin.colors.eye || 'black'} className="googly-eye" />
               </>
             )}
          </>
        ) : isDead ? (
          <g>
            <path d="M18 6 L24 12 M24 6 L18 12" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            <path d="M26 6 L32 12 M32 6 L26 12" stroke="black" strokeWidth="3" strokeLinecap="round"/>
          </g>
        ) : (
          <g>
             <path d="M18 10 Q22 4 26 10" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
        
        {/* Beak */}
        <path 
          d="M26 15 Q34 16 34 19 Q26 22 22 19 Z" 
          fill={skin.colors.beak}
          stroke="black" 
          strokeWidth="1.5" 
        />

        {/* Bandana Accessory */}
        {acc === 'bandana' && (
           <path d="M5 14 L30 14 L28 18 L7 18 Z" fill="#EF4444" />
        )}

        {/* Cape Accessory */}
        {acc === 'cape' && (
           <path d="M6 14 Q2 20 6 24" fill="none" stroke="#000000" strokeWidth="3" />
        )}

        {/* Wing */}
        <g className={!isDead ? "fast-flap" : ""}>
          <path 
            d="M6 14 C6 14 10 10 16 14 C16 14 12 19 6 14 Z" 
            fill={skin.colors.wing}
            stroke="black" 
            strokeWidth="1.5" 
          />
        </g>
      </svg>
    </div>
  );
};

export default Bird;