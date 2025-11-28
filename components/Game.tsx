
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import Coin from './Coin';
import Background from './Background';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  GRAVITY,
  JUMP_STRENGTH,
  PIPE_WIDTH,
  BIRD_SIZE,
  BIRD_X_POSITION,
  BIRD_SKINS,
  COIN_SIZE,
  COIN_HITBOX
} from '../constants';
import { GameState, PipeData, CoinData, LevelConfig } from '../types';
import { soundManager } from '../utils/sound';
import { IconMenu, IconReplay, IconNext, IconStar, IconCoin } from './Icons';

interface GameProps {
  levelConfig: LevelConfig;
  selectedSkin: string;
  selectedCoinSkin: string;
  onComplete: (coinsEarned: number) => void;
  onExit: () => void;
  onCollectCoin: () => void; 
}

const Game: React.FC<GameProps> = ({ levelConfig, selectedSkin, selectedCoinSkin, onComplete, onExit, onCollectCoin }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [score, setScore] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [, setTick] = useState(0); // Trigger render
  const [starsEarned, setStarsEarned] = useState(0);
  
  const birdY = useRef(GAME_HEIGHT / 2);
  const birdX = useRef(BIRD_X_POSITION); 
  const birdVelocity = useRef(0);
  const birdRotation = useRef(0);
  
  const pipes = useRef<PipeData[]>([]);
  const coins = useRef<CoinData[]>([]);

  const frameCount = useRef(0);
  const requestRef = useRef<number>(0);
  const collisionType = useRef<'pipe' | 'ground' | null>(null);

  const PIPE_SPEED = levelConfig.pipeSpeed;
  const PIPE_GAP = levelConfig.pipeGap;
  const SPAWN_RATE = Math.round(100 / (PIPE_SPEED / 3)); 
  const FLOOR_HEIGHT = 16; 

  useEffect(() => {
    const skin = BIRD_SKINS.find(s => s.id === selectedSkin);
    if (skin) {
      soundManager.setPitch(skin.pitch);
      soundManager.setWaveform(skin.soundType);
    }
    return () => {
      soundManager.setPitch(1.0); 
      soundManager.setWaveform('triangle'); 
    };
  }, [selectedSkin]);

  const spawnPipe = useCallback(() => {
    const minHeight = 50;
    const maxHeight = GAME_HEIGHT - PIPE_GAP - minHeight - 50; 
    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    
    pipes.current.push({
      id: Date.now(),
      x: GAME_WIDTH,
      topHeight: randomHeight,
      passed: false,
    });

    if (Math.random() > 0.25) {
       coins.current.push({
         id: Date.now() + 1,
         x: GAME_WIDTH + PIPE_WIDTH / 2 - COIN_SIZE / 2, 
         y: randomHeight + (PIPE_GAP / 2) - (COIN_SIZE / 2), 
         collected: false
       });
    }

  }, [PIPE_GAP]);

  const resetGame = useCallback(() => {
    birdY.current = GAME_HEIGHT / 2;
    birdX.current = BIRD_X_POSITION;
    birdVelocity.current = 0;
    birdRotation.current = 0;
    pipes.current = [];
    coins.current = [];
    frameCount.current = 0;
    collisionType.current = null;
    setScore(0);
    setCoinsCollected(0);
    setStarsEarned(0);
    setGameState(GameState.START);
  }, []);

  const gameOver = useCallback((type: 'pipe' | 'ground') => {
    soundManager.play('crash');
    collisionType.current = type;
    setGameState(GameState.GAME_OVER);
    if (type === 'pipe') {
      birdVelocity.current = -3; 
    }
  }, []);

  const startLevelComplete = useCallback(() => {
    soundManager.play('win');
    
    let stars = 1;
    if (coinsCollected >= 3) stars = 3;
    else if (coinsCollected >= 1) stars = 2;
    
    setStarsEarned(stars);
    setGameState(GameState.COMPLETING);
  }, [coinsCollected]);

  const jump = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      soundManager.play('jump');
      birdVelocity.current = JUMP_STRENGTH;
    } else if (gameState === GameState.START) {
      soundManager.play('jump');
      setGameState(GameState.PLAYING);
      birdVelocity.current = JUMP_STRENGTH;
    } 
  }, [gameState]);

  const checkCollision = useCallback((): 'pipe' | 'ground' | null => {
    const birdTop = birdY.current;
    const birdBottom = birdY.current + BIRD_SIZE;
    const birdLeft = birdX.current;
    const birdRight = birdX.current + BIRD_SIZE;

    if (birdBottom >= GAME_HEIGHT - FLOOR_HEIGHT) return 'ground';
    if (birdTop <= 0) return 'ground';

    for (const pipe of pipes.current) {
      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PIPE_WIDTH;

      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        if (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP) {
          return 'pipe';
        }
      }
    }
    return null;
  }, [PIPE_GAP]);

  const checkCoinCollection = useCallback(() => {
    const birdCenterX = birdX.current + BIRD_SIZE / 2;
    const birdCenterY = birdY.current + BIRD_SIZE / 2;
    const radiusSum = (BIRD_SIZE / 2) + (COIN_HITBOX / 2); 

    coins.current.forEach(coin => {
      if (coin.collected) return;
      
      const coinCenterX = coin.x + COIN_SIZE / 2;
      const coinCenterY = coin.y + COIN_SIZE / 2;

      const dx = birdCenterX - coinCenterX;
      const dy = birdCenterY - coinCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radiusSum) {
        coin.collected = true;
        soundManager.play('pickup'); 
        setCoinsCollected(prev => prev + 1);
        onCollectCoin();
      }
    });
  }, [onCollectCoin]);

  const loop = useCallback(() => {
    if (gameState === GameState.START) {
      const time = Date.now() / 300;
      const centerY = (GAME_HEIGHT / 2) - (BIRD_SIZE / 2);
      birdY.current = centerY + Math.sin(time) * 8;
      birdRotation.current = Math.sin(time) * 5;
      setTick(prev => prev + 1);
      requestRef.current = requestAnimationFrame(loop);
      return;
    }

    if (gameState === GameState.GAME_OVER) {
      if (collisionType.current === 'pipe') {
         if (birdY.current < GAME_HEIGHT - BIRD_SIZE - FLOOR_HEIGHT) {
            birdVelocity.current += GRAVITY * 1.5;
            birdY.current += birdVelocity.current;
            birdRotation.current = Math.min(birdRotation.current + 10, 90);
            setTick(prev => prev + 1);
            requestRef.current = requestAnimationFrame(loop);
         }
      }
      return;
    }

    if (gameState === GameState.COMPLETING) {
      birdX.current += 6;
      const targetY = GAME_HEIGHT / 2 - 50;
      birdY.current += (targetY - birdY.current) * 0.05;
      birdRotation.current += 15; 
      if (birdX.current > GAME_WIDTH + 50) {
        setGameState(GameState.WON);
      }
      setTick(prev => prev + 1);
      requestRef.current = requestAnimationFrame(loop);
      return;
    }

    if (gameState === GameState.PLAYING) {
      birdVelocity.current += GRAVITY;
      birdY.current += birdVelocity.current;

      if (birdVelocity.current < 0) {
        birdRotation.current = Math.max(-25, birdRotation.current - 10);
      } else {
        birdRotation.current = Math.min(birdVelocity.current * 4, 90);
      }

      // Optimize movement
      for (let i = 0; i < pipes.current.length; i++) {
        pipes.current[i].x -= PIPE_SPEED;
      }
      for (let i = 0; i < coins.current.length; i++) {
        coins.current[i].x -= PIPE_SPEED;
      }

      if (pipes.current.length > 0 && pipes.current[0].x + PIPE_WIDTH < -50) {
        pipes.current.shift();
      }
      if (coins.current.length > 0 && coins.current[0].x + COIN_SIZE < -50) {
        coins.current.shift();
      }

      frameCount.current++;
      if (frameCount.current % SPAWN_RATE === 0) {
        spawnPipe();
      }

      pipes.current.forEach(pipe => {
        if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X_POSITION) {
          pipe.passed = true;
          soundManager.play('score');
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= levelConfig.targetScore) {
             startLevelComplete();
          }
        }
      });

      checkCoinCollection();
      
      const collision = checkCollision();
      if (collision) {
        gameOver(collision);
        return;
      }

      setTick(prev => prev + 1);
      requestRef.current = requestAnimationFrame(loop);
    }
  }, [gameState, spawnPipe, checkCollision, checkCoinCollection, gameOver, startLevelComplete, score, levelConfig.targetScore, PIPE_SPEED, SPAWN_RATE]);

  useEffect(() => {
    if (gameState !== GameState.WON) {
      requestRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, loop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  const MenuButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onPointerDown={(e) => { e.stopPropagation(); onClick(); }}
      className="btn-glossy btn-glossy-icon bg-blue-500 text-white transform hover:scale-105 active:scale-95 transition-transform"
      style={{ background: 'linear-gradient(to bottom, #7dd3fc, #0ea5e9, #0369a1)', borderColor: '#0c4a6e', boxShadow: '0 4px 0 #0c4a6e' }}
    >
      <IconMenu />
    </button>
  );

  const ReplayButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onPointerDown={(e) => { e.stopPropagation(); onClick(); }}
      className="btn-glossy btn-glossy-icon text-white transform hover:scale-105 active:scale-95 transition-transform"
      style={{ background: 'linear-gradient(to bottom, #fde047, #eab308, #ca8a04)', borderColor: '#713f12', boxShadow: '0 4px 0 #713f12' }}
    >
      <IconReplay />
    </button>
  );

  const NextButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onPointerDown={(e) => { e.stopPropagation(); onClick(); }}
      className="btn-glossy btn-glossy-icon text-white transform hover:scale-105 active:scale-95 transition-transform"
      style={{ background: 'linear-gradient(to bottom, #86efac, #22c55e, #15803d)', borderColor: '#064e3b', boxShadow: '0 4px 0 #064e3b' }}
    >
      <IconNext />
    </button>
  );

  useEffect(() => {
    if (gameState === GameState.WON) {
        setTimeout(() => soundManager.play('score'), 200);
        if (starsEarned >= 2) setTimeout(() => soundManager.play('score'), 600);
        if (starsEarned >= 3) setTimeout(() => soundManager.play('score'), 1000);
    }
  }, [gameState, starsEarned]);

  return (
    <div 
      className={`relative overflow-hidden cursor-pointer select-none`}
      style={{ 
        width: GAME_WIDTH, 
        height: GAME_HEIGHT,
        background: levelConfig.bgGradient 
      }}
      onMouseDown={(e) => { e.preventDefault(); jump(); }}
      onTouchStart={(e) => { e.preventDefault(); jump(); }}
    >
      <Background weather={levelConfig.weather} />

      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-30 bg-repeat-x pointer-events-none" style={{ backgroundImage: 'linear-gradient(to top, #475569 0%, transparent 100%)', backgroundSize: '50px 100%' }}></div>

      <Bird 
        y={birdY.current} 
        x={birdX.current} 
        rotation={birdRotation.current} 
        isDead={gameState === GameState.GAME_OVER}
        isWon={gameState === GameState.COMPLETING || gameState === GameState.WON}
        skinId={selectedSkin}
      />
      
      {pipes.current.map(pipe => (
        <Pipe key={pipe.id} pipe={pipe} gameHeight={GAME_HEIGHT} gap={PIPE_GAP} color={levelConfig.pipeColor} />
      ))}

      {coins.current.map(coin => !coin.collected && (
         <Coin key={coin.id} x={coin.x} y={coin.y} skinId={selectedCoinSkin} />
      ))}

      <div className="absolute top-4 left-0 w-full px-6 z-40 pointer-events-none flex justify-between items-center">
        <div className="text-3xl font-black text-white drop-shadow-[0_3px_0_#000] stroke-black font-sans">
          {score} / {levelConfig.targetScore}
        </div>
        <div className="flex flex-col items-end">
           <div className="bg-black/40 px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20 mb-1 backdrop-blur-sm">
             CH {levelConfig.sectionId} - LVL {levelConfig.levelId}
           </div>
           <div className="text-yellow-400 font-black text-xl drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] flex items-center gap-1">
             <IconCoin className="w-5 h-5" /> {coinsCollected}
           </div>
        </div>
      </div>

      {gameState === GameState.START && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-50 backdrop-blur-[2px] p-6 text-center">
             <h1 className="text-6xl font-black text-white mb-2 drop-shadow-[0_5px_0_rgba(0,0,0,0.5)] tracking-wide">READY?</h1>
             <p className="text-white font-bold mb-12 text-lg drop-shadow-md bg-black/30 px-6 py-2 rounded-full inline-block border border-white/10">Target: {levelConfig.targetScore}</p>
            <button className="btn-glossy px-10 py-5 text-2xl animate-pulse">
              TAP TO FLY
            </button>
        </div>
      )}

      {gameState === GameState.GAME_OVER && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-50 backdrop-blur-sm">
          <div className="bg-orange-100 p-6 rounded-3xl shadow-2xl text-center border-[6px] border-orange-300 w-80 relative">
             <div className="absolute inset-0 rounded-2xl border-4 border-white/50 pointer-events-none"></div>
             
             <div className="ribbon bg-red-500 border-red-800">FAILED!</div>
             
             <div className="bg-orange-200/50 p-4 rounded-xl mb-6 border-2 border-orange-300/50">
                <p className="text-orange-900 font-bold text-sm uppercase mb-1">Score</p>
                <p className="text-4xl font-black text-orange-800 mb-2">{score}</p>
                <div className="flex items-center justify-center gap-2">
                   <IconCoin className="w-6 h-6" />
                   <span className="text-xl font-bold text-orange-700">+{coinsCollected}</span>
                </div>
             </div>

             <div className="flex justify-center gap-4">
                <MenuButton onClick={onExit} />
                <ReplayButton onClick={resetGame} />
             </div>
          </div>
        </div>
      )}

      {gameState === GameState.WON && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-50 backdrop-blur-sm">
           <div className="bg-orange-100 p-6 rounded-3xl shadow-2xl text-center border-[6px] border-yellow-400 w-80 relative animate-in zoom-in duration-300">
             <div className="absolute inset-0 rounded-2xl border-4 border-white/50 pointer-events-none"></div>

             <div className="ribbon bg-yellow-500 border-yellow-800">COMPLETE</div>

             {/* DYNAMIC STAR RATING - FIXED VISIBILITY */}
             <div className="flex justify-center gap-2 mb-6 h-16 items-center">
                {/* Star 1 - Always Earned */}
                <IconStar 
                    filled={true} 
                    className="w-12 h-12" 
                    style={{ animation: 'popIn 0.5s ease-out forwards' }}
                />
                
                {/* Star 2 */}
                <IconStar 
                    filled={starsEarned >= 2} 
                    className="w-12 h-12" 
                    style={{ 
                        animation: 'popIn 0.5s ease-out forwards',
                        animationDelay: '0.4s',
                        opacity: 0 // Start hidden
                    }} 
                />
                
                {/* Star 3 */}
                <IconStar 
                    filled={starsEarned >= 3} 
                    className="w-12 h-12" 
                    style={{ 
                        animation: 'popIn 0.5s ease-out forwards',
                        animationDelay: '0.8s',
                        opacity: 0 // Start hidden
                    }} 
                />
             </div>

             <div className="bg-orange-200/50 p-3 rounded-xl mb-6 border-2 border-orange-300/50">
               <p className="text-orange-900 font-bold text-xs uppercase">Total Coins</p>
               <p className="text-3xl font-black text-yellow-600 flex items-center justify-center gap-2">
                 <IconCoin className="w-8 h-8" /> +{coinsCollected}
               </p>
               <p className="text-[10px] text-orange-800/60 font-bold mt-1 uppercase">
                 {starsEarned === 3 ? 'PERFECT!' : starsEarned === 2 ? 'GREAT!' : 'GOOD!'}
               </p>
             </div>

             <div className="flex justify-center gap-4">
                <MenuButton onClick={onExit} />
                <ReplayButton onClick={resetGame} />
                <NextButton onClick={() => onComplete(coinsCollected)} />
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Game;
