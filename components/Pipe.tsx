
import React from 'react';
import { PIPE_WIDTH } from '../constants';

interface PipeProps {
  x: number;
  topHeight: number;
  gameHeight: number;
  gap: number;
  color: string;
}

const Pipe: React.FC<PipeProps> = React.memo(({ x, topHeight, gameHeight, gap, color }) => {
  return (
    <>
      {/* Top Pipe */}
      <div
        className="absolute border-black border-2 z-10 flex flex-col justify-end will-change-transform"
        style={{
          width: PIPE_WIDTH,
          height: topHeight,
          transform: `translate3d(${x}px, 0, 0)`,
          backgroundColor: color,
        }}
      >
        <div 
          className="w-[110%] -ml-[5%] h-6 border-2 border-black mb-0"
          style={{ backgroundColor: color, filter: 'brightness(0.9)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-black/10 pointer-events-none"></div>
      </div>

      {/* Bottom Pipe */}
      <div
        className="absolute border-black border-2 z-10 flex flex-col justify-start will-change-transform"
        style={{
          width: PIPE_WIDTH,
          height: gameHeight - (topHeight + gap),
          transform: `translate3d(${x}px, ${topHeight + gap}px, 0)`,
          backgroundColor: color,
        }}
      >
        <div 
          className="w-[110%] -ml-[5%] h-6 border-2 border-black mt-0"
          style={{ backgroundColor: color, filter: 'brightness(0.9)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-black/10 pointer-events-none"></div>
      </div>
    </>
  );
});

export default Pipe;
