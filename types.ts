
export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  COMPLETING = 'COMPLETING',
  GAME_OVER = 'GAME_OVER',
  WON = 'WON'
}

export interface PipeData {
  id: number;
  x: number;
  topHeight: number;
  passed: boolean;
}

export interface CoinData {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export type WeatherType = 'CLEAR' | 'CLOUDY' | 'RAIN' | 'SNOW' | 'STORM' | 'APOCALYPSE';

export interface LevelConfig {
  sectionId: number;
  levelId: number;
  targetScore: number;
  pipeSpeed: number;
  pipeGap: number;
  bgGradient: string;
  weather: WeatherType;
  pipeColor: string;
}

export interface UserProgress {
  [sectionId: number]: {
    [levelId: number]: boolean; // true if completed
  };
}

// Updated User Data structure
export interface UserData {
  password?: string;
  progress: UserProgress;
  coins: number;
  lifetimeCoins: number; // For unlocking coin skins
  unlockedSkins: string[]; // Array of Bird Skin IDs
  selectedSkin: string;
  unlockedCoinSkins: string[]; // Array of Coin Skin IDs
  selectedCoinSkin: string;
  lastDailyReward?: number; // Timestamp of last claim
}

export interface BirdSkin {
  id: string;
  name: string;
  cost: number;
  colors: {
    body: string;
    wing: string;
    beak: string;
    eye?: string;
    accessory?: 'crown' | 'halo' | 'horns' | 'bandana' | 'cape' | 'eyepatch' | 'helmet' | 'visor'; 
  };
  pitch: number; // For sound effects
  soundType: 'sine' | 'square' | 'sawtooth' | 'triangle'; // New distinct sound waves
  description: string;
}

export interface CoinSkin {
  id: string;
  name: string;
  unlockThreshold: number; // Lifetime coins needed
  color1: string; // Outer/Face
  color2: string; // Inner/Edge
  glow: string;
}

export type Screen = 'SPLASH' | 'AUTH' | 'MAIN_MENU' | 'SECTIONS' | 'LEVELS' | 'GAME' | 'SHOP' | 'DAILY_REWARD';

export type QualityPreset = '240p' | '480p' | '1080p' | '2k' | '4k';

export interface GameSettings {
  soundEnabled: boolean;
  quality: QualityPreset;
}
