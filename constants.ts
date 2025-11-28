
import { BirdSkin, CoinSkin } from './types';

export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 600;

// Base Physics
export const GRAVITY = 0.55; 
export const JUMP_STRENGTH = -8; 
export const BASE_SPEED = 2.8; 
export const BASE_GAP = 190;

export const PIPE_WIDTH = 52;
export const BIRD_SIZE = 34;
export const BIRD_X_POSITION = 50;
export const COIN_SIZE = 30;
export const COIN_HITBOX = 40;

// Level Generation Settings
export const TOTAL_SECTIONS = 50;
export const LEVELS_PER_SECTION = 5;

// --- BIRD SKINS SHOP (50 UNIQUE BIRDS) ---
export const BIRD_SKINS: BirdSkin[] = [
  // CLASSICS
  { id: 'default', name: 'Flappy', cost: 0, pitch: 1.0, soundType: 'triangle', description: 'The classic hero.', colors: { body: '#FACC15', wing: '#ffffff', beak: '#F97316' } },
  { id: 'red', name: 'Rage', cost: 50, pitch: 0.8, soundType: 'sawtooth', description: 'Always angry.', colors: { body: '#ef4444', wing: '#fee2e2', beak: '#fbbf24' } },
  { id: 'blue', name: 'Chill', cost: 100, pitch: 1.2, soundType: 'sine', description: 'Cool as ice.', colors: { body: '#3b82f6', wing: '#dbeafe', beak: '#fbbf24' } },
  { id: 'green', name: 'Zombie', cost: 200, pitch: 0.6, soundType: 'square', description: 'Brains...', colors: { body: '#22c55e', wing: '#166534', beak: '#86efac', eye: '#ef4444' } },
  { id: 'pink', name: 'Princess', cost: 300, pitch: 1.5, soundType: 'sine', description: 'Sparkly and cute.', colors: { body: '#f472b6', wing: '#fbcfe8', beak: '#fbbf24', accessory: 'crown' } },
  
  // PROFESSIONS
  { id: 'ninja', name: 'Ninja', cost: 500, pitch: 1.1, soundType: 'sawtooth', description: 'Silent but deadly.', colors: { body: '#171717', wing: '#404040', beak: '#fbbf24', eye: '#ef4444', accessory: 'bandana' } },
  { id: 'robot', name: 'Mecha', cost: 800, pitch: 0.5, soundType: 'square', description: 'Beep Boop.', colors: { body: '#94a3b8', wing: '#475569', beak: '#38bdf8', eye: '#0ea5e9' } },
  { id: 'cop', name: 'Officer', cost: 900, pitch: 0.9, soundType: 'square', description: 'Stop right there!', colors: { body: '#1e3a8a', wing: '#60a5fa', beak: '#fbbf24', accessory: 'visor' } },
  { id: 'chef', name: 'Chef', cost: 1000, pitch: 1.1, soundType: 'triangle', description: 'Bon appetit.', colors: { body: '#ffffff', wing: '#e2e8f0', beak: '#fbbf24' } },
  { id: 'doctor', name: 'Medic', cost: 1100, pitch: 1.2, soundType: 'sine', description: 'Health pack here.', colors: { body: '#ffffff', wing: '#ef4444', beak: '#fbbf24' } },

  // FANTASY
  { id: 'golden', name: 'Midas', cost: 1500, pitch: 1.3, soundType: 'triangle', description: 'Pure solid gold.', colors: { body: '#eab308', wing: '#fef08a', beak: '#fde047', accessory: 'crown' } },
  { id: 'rainbow', name: 'Prism', cost: 2500, pitch: 1.8, soundType: 'sine', description: 'Taste the rainbow.', colors: { body: 'url(#rainbow)', wing: '#ffffff', beak: '#fbbf24' } },
  { id: 'ghost', name: 'Spirit', cost: 3000, pitch: 2.0, soundType: 'sine', description: 'Can you see me?', colors: { body: '#ffffff', wing: '#f8fafc', beak: '#e2e8f0' } },
  { id: 'vampire', name: 'Dracula', cost: 3500, pitch: 0.7, soundType: 'sawtooth', description: 'Thirsty...', colors: { body: '#e2e8f0', wing: '#000000', beak: '#ef4444', eye: '#ef4444', accessory: 'cape' } },
  { id: 'pirate', name: 'Captain', cost: 4000, pitch: 0.9, soundType: 'square', description: 'Yarrr!', colors: { body: '#ef4444', wing: '#000000', beak: '#fbbf24', accessory: 'eyepatch' } },
  { id: 'astronaut', name: 'Astro', cost: 4500, pitch: 1.0, soundType: 'sine', description: 'To the moon.', colors: { body: '#ffffff', wing: '#94a3b8', beak: '#fbbf24', accessory: 'helmet' } },
  { id: 'devil', name: 'Diablo', cost: 5000, pitch: 0.6, soundType: 'sawtooth', description: 'Fiery.', colors: { body: '#991b1b', wing: '#7f1d1d', beak: '#fbbf24', accessory: 'horns' } },
  { id: 'angel', name: 'Cherub', cost: 5500, pitch: 1.6, soundType: 'sine', description: 'Divine.', colors: { body: '#fffbeb', wing: '#fbbf24', beak: '#fbbf24', accessory: 'halo' } },
  { id: 'king', name: 'Monarch', cost: 6000, pitch: 1.0, soundType: 'triangle', description: 'Bow down.', colors: { body: '#7e22ce', wing: '#eab308', beak: '#fbbf24', accessory: 'crown' } },
  
  // ELEMENTS
  { id: 'toxic', name: 'Hazmat', cost: 6500, pitch: 0.8, soundType: 'square', description: 'Radioactive.', colors: { body: '#a3e635', wing: '#3f6212', beak: '#166534' } },
  { id: 'frozen', name: 'Frost', cost: 7000, pitch: 1.4, soundType: 'sine', description: 'Stay frosty.', colors: { body: '#06b6d4', wing: '#cffafe', beak: '#fbbf24' } },
  { id: 'fire', name: 'Inferno', cost: 7200, pitch: 0.7, soundType: 'sawtooth', description: 'Hot stuff.', colors: { body: '#f97316', wing: '#fee2e2', beak: '#fbbf24' } },
  { id: 'water', name: 'Aqua', cost: 7400, pitch: 1.2, soundType: 'sine', description: 'Fluid motion.', colors: { body: '#3b82f6', wing: '#93c5fd', beak: '#fbbf24' } },
  { id: 'earth', name: 'Gaia', cost: 7600, pitch: 0.9, soundType: 'triangle', description: 'Rock solid.', colors: { body: '#78350f', wing: '#a8a29e', beak: '#fbbf24' } },

  // MONSTERS & SCIFI
  { id: 'shadow', name: 'Umbra', cost: 7800, pitch: 0.5, soundType: 'sawtooth', description: 'Darkness calls.', colors: { body: '#1e293b', wing: '#0f172a', beak: '#334155', eye: '#f8fafc' } },
  { id: 'glitch', name: 'Err_0r', cost: 8000, pitch: 2.0, soundType: 'square', description: 'Sys.failure', colors: { body: '#ec4899', wing: '#06b6d4', beak: '#facc15' } },
  { id: 'alien', name: 'Xeno', cost: 8200, pitch: 1.8, soundType: 'sine', description: 'Take me to your leader.', colors: { body: '#10b981', wing: '#047857', beak: '#fbbf24', eye: '#000000' } },
  { id: 'mummy', name: 'Pharaoh', cost: 8400, pitch: 0.6, soundType: 'sawtooth', description: 'Wrapped up.', colors: { body: '#fef3c7', wing: '#d1d5db', beak: '#fbbf24' } },
  { id: 'skeleton', name: 'Bones', cost: 8600, pitch: 1.0, soundType: 'triangle', description: 'Rattle rattle.', colors: { body: '#f1f5f9', wing: '#94a3b8', beak: '#fbbf24', eye: '#000000' } },
  { id: 'cyborg', name: 'T-800', cost: 8800, pitch: 0.5, soundType: 'square', description: 'I will be back.', colors: { body: '#475569', wing: '#94a3b8', beak: '#ef4444', eye: '#ef4444', accessory: 'visor' } },

  // ANIMALS
  { id: 'panda', name: 'Bamboo', cost: 9000, pitch: 0.9, soundType: 'triangle', description: 'Black and white.', colors: { body: '#ffffff', wing: '#000000', beak: '#000000' } },
  { id: 'pig', name: 'Oink', cost: 9200, pitch: 1.1, soundType: 'sine', description: 'Mud bath.', colors: { body: '#f9a8d4', wing: '#fbcfe8', beak: '#f472b6' } },
  { id: 'bee', name: 'Bumble', cost: 9400, pitch: 1.5, soundType: 'sawtooth', description: 'Buzz buzz.', colors: { body: '#facc15', wing: '#000000', beak: '#000000' } },
  
  // FOOD
  { id: 'burger', name: 'Patty', cost: 9600, pitch: 1.0, soundType: 'triangle', description: 'Delicious.', colors: { body: '#d97706', wing: '#16a34a', beak: '#facc15' } },
  { id: 'donut', name: 'Glaze', cost: 9800, pitch: 1.2, soundType: 'sine', description: 'Sweet treat.', colors: { body: '#f472b6', wing: '#fbcfe8', beak: '#fce7f3' } },

  // LEGENDARY
  { id: 'master', name: 'The G.O.A.T', cost: 10000, pitch: 1.0, soundType: 'triangle', description: 'Legendary.', colors: { body: '#fcd34d', wing: '#000000', beak: '#ffffff', accessory: 'crown' } },
  { id: 'neon', name: 'Cyber', cost: 12000, pitch: 1.5, soundType: 'square', description: 'Future tech.', colors: { body: '#000000', wing: '#06b6d4', beak: '#d946ef' } },
  { id: 'void_bird', name: 'Null', cost: 15000, pitch: 0.4, soundType: 'sawtooth', description: 'Nothingness.', colors: { body: '#000000', wing: '#1e1b4b', beak: '#4c1d95', eye: '#ffffff' } },
  { id: 'hero', name: 'Super', cost: 20000, pitch: 1.0, soundType: 'triangle', description: 'Up up and away!', colors: { body: '#3b82f6', wing: '#ef4444', beak: '#fbbf24', accessory: 'cape' } },
];

// --- COIN SKINS (50 UNIQUE COINS) ---
export const COIN_SKINS: CoinSkin[] = [
  // METALS
  { id: 'default', name: 'Gold', unlockThreshold: 0, color1: '#eab308', color2: '#fef08a', glow: '#eab308' },
  { id: 'silver', name: 'Silver', unlockThreshold: 50, color1: '#94a3b8', color2: '#e2e8f0', glow: '#cbd5e1' },
  { id: 'bronze', name: 'Bronze', unlockThreshold: 100, color1: '#b45309', color2: '#d97706', glow: '#f59e0b' },
  { id: 'copper', name: 'Copper', unlockThreshold: 150, color1: '#7c2d12', color2: '#fdba74', glow: '#c2410c' },
  { id: 'platinum', name: 'Platinum', unlockThreshold: 200, color1: '#e2e8f0', color2: '#f8fafc', glow: '#ffffff' },

  // GEMS
  { id: 'ruby', name: 'Ruby', unlockThreshold: 300, color1: '#ef4444', color2: '#fca5a5', glow: '#ef4444' },
  { id: 'emerald', name: 'Emerald', unlockThreshold: 400, color1: '#10b981', color2: '#6ee7b7', glow: '#10b981' },
  { id: 'sapphire', name: 'Sapphire', unlockThreshold: 500, color1: '#3b82f6', color2: '#93c5fd', glow: '#3b82f6' },
  { id: 'amethyst', name: 'Amethyst', unlockThreshold: 600, color1: '#a855f7', color2: '#d8b4fe', glow: '#a855f7' },
  { id: 'pink_diamond', name: 'Pink Diamond', unlockThreshold: 700, color1: '#ec4899', color2: '#fbcfe8', glow: '#ec4899' },
  { id: 'topaz', name: 'Topaz', unlockThreshold: 800, color1: '#f59e0b', color2: '#fde047', glow: '#fbbf24' },
  { id: 'onyx', name: 'Onyx', unlockThreshold: 900, color1: '#0f172a', color2: '#334155', glow: '#ffffff' },

  // NEON
  { id: 'neon_lime', name: 'Neon Lime', unlockThreshold: 1000, color1: '#84cc16', color2: '#bef264', glow: '#84cc16' },
  { id: 'cyan', name: 'Cyan', unlockThreshold: 1100, color1: '#06b6d4', color2: '#67e8f9', glow: '#06b6d4' },
  { id: 'hot_pink', name: 'Hot Pink', unlockThreshold: 1200, color1: '#db2777', color2: '#f9a8d4', glow: '#db2777' },
  { id: 'ultra_violet', name: 'Ultra Violet', unlockThreshold: 1300, color1: '#7c3aed', color2: '#c4b5fd', glow: '#8b5cf6' },

  // ELEMENTAL
  { id: 'magma', name: 'Magma', unlockThreshold: 1500, color1: '#7f1d1d', color2: '#fca5a5', glow: '#f87171' },
  { id: 'ice', name: 'Glacier', unlockThreshold: 1600, color1: '#cffafe', color2: '#ffffff', glow: '#22d3ee' },
  { id: 'water', name: 'Ocean', unlockThreshold: 1700, color1: '#1e40af', color2: '#60a5fa', glow: '#3b82f6' },
  { id: 'nature', name: 'Leaf', unlockThreshold: 1800, color1: '#14532d', color2: '#4ade80', glow: '#22c55e' },
  
  // SPACE
  { id: 'void', name: 'The Void', unlockThreshold: 2000, color1: '#000000', color2: '#4c1d95', glow: '#8b5cf6' },
  { id: 'galaxy', name: 'Galaxy', unlockThreshold: 2500, color1: '#4338ca', color2: '#e0e7ff', glow: '#6366f1' },
  { id: 'starlight', name: 'Starlight', unlockThreshold: 3000, color1: '#fef3c7', color2: '#ffffff', glow: '#fcd34d' },
  { id: 'nebula', name: 'Nebula', unlockThreshold: 3500, color1: '#c026d3', color2: '#22d3ee', glow: '#e879f9' },

  // PATTERNS & SPECIALS
  { id: 'zebra', name: 'Zebra', unlockThreshold: 4000, color1: '#000000', color2: '#ffffff', glow: '#94a3b8' },
  { id: 'tiger', name: 'Tiger', unlockThreshold: 4500, color1: '#f97316', color2: '#000000', glow: '#fdba74' },
  { id: 'toxic', name: 'Radioactive', unlockThreshold: 5000, color1: '#a3e635', color2: '#166534', glow: '#a3e635' },
  { id: 'blood_moon', name: 'Blood Moon', unlockThreshold: 5500, color1: '#7f1d1d', color2: '#991b1b', glow: '#ef4444' },
  { id: 'cyber', name: 'Cyberpunk', unlockThreshold: 6000, color1: '#facc15', color2: '#0ea5e9', glow: '#facc15' },
  { id: 'candy', name: 'Candy', unlockThreshold: 6500, color1: '#f472b6', color2: '#67e8f9', glow: '#f9a8d4' },
  { id: 'retro', name: 'Retro', unlockThreshold: 7000, color1: '#10b981', color2: '#000000', glow: '#10b981' },
  { id: 'blueprint', name: 'Blueprint', unlockThreshold: 7500, color1: '#1e3a8a', color2: '#ffffff', glow: '#60a5fa' },
  { id: 'chocolate', name: 'Choco', unlockThreshold: 8000, color1: '#451a03', color2: '#78350f', glow: '#92400e' },
  { id: 'master', name: 'Game Master', unlockThreshold: 10000, color1: '#ffffff', color2: '#000000', glow: '#ffffff' },
];
