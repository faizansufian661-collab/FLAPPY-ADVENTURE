
import React, { useState } from 'react';
import { BIRD_SKINS, COIN_SKINS } from '../constants';
import Bird from './Bird';
import Coin from './Coin';
import { soundManager } from '../utils/sound';
import { IconCoin } from './Icons';

interface ShopProps {
  coins: number;
  lifetimeCoins: number;
  unlockedSkins: string[];
  selectedSkin: string;
  unlockedCoinSkins: string[]; 
  selectedCoinSkin: string;
  onBuy: (skinId: string, cost: number) => void;
  onSelect: (skinId: string) => void;
  onSelectCoinSkin: (skinId: string) => void;
  onClose: () => void;
}

const Shop: React.FC<ShopProps> = ({ 
  coins, 
  lifetimeCoins,
  unlockedSkins, 
  selectedSkin, 
  selectedCoinSkin,
  onBuy, 
  onSelect, 
  onSelectCoinSkin,
  onClose 
}) => {
  const [tab, setTab] = useState<'birds' | 'coins'>('birds');

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col p-4 animate-in fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-black text-white drop-shadow-md">SHOP</h2>
          <div className="flex flex-col">
             <div className="flex items-center gap-2 text-yellow-400 font-bold">
               <IconCoin className="w-5 h-5" /> {coins}
             </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="btn-glossy px-4 py-2 text-sm"
        >
          CLOSE
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 bg-slate-800 p-1 rounded-xl">
        <button 
          onClick={() => { soundManager.play('click'); setTab('birds'); }}
          className={`flex-1 py-3 rounded-lg font-black text-sm transition uppercase ${tab === 'birds' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          🐦 BIRDS
        </button>
        <button 
          onClick={() => { soundManager.play('click'); setTab('coins'); }}
          className={`flex-1 py-3 rounded-lg font-black text-sm transition uppercase flex items-center justify-center gap-2 ${tab === 'coins' ? 'bg-yellow-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <IconCoin className="w-4 h-4" /> COINS
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-20 custom-scrollbar">
        
        {/* BIRD SHOP */}
        {tab === 'birds' && BIRD_SKINS.map((skin) => {
          const isUnlocked = unlockedSkins.includes(skin.id);
          const isSelected = selectedSkin === skin.id;
          const canAfford = coins >= skin.cost;

          return (
            <div 
              key={skin.id}
              className={`relative p-3 rounded-xl border-4 flex flex-col items-center gap-2 transition-all ${
                isSelected 
                  ? 'bg-sky-900/50 border-sky-500' 
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className="relative w-16 h-12 mb-2 scale-110">
                <Bird y={0} x={10} rotation={0} skinId={skin.id} />
              </div>
              
              <div className="text-center">
                <p className="font-bold text-white text-sm">{skin.name}</p>
                <p className="text-xs text-slate-400 leading-tight mb-2">{skin.description}</p>
              </div>

              {isUnlocked ? (
                <button
                  onClick={() => {
                    soundManager.play('click');
                    onSelect(skin.id);
                  }}
                  disabled={isSelected}
                  className={`w-full py-2 rounded-lg font-bold text-xs uppercase ${
                    isSelected 
                      ? 'bg-green-500 text-white cursor-default shadow-none' 
                      : 'btn-glossy-blue btn-glossy text-white !py-2 !text-xs !border-2'
                  }`}
                >
                  {isSelected ? 'EQUIPPED' : 'SELECT'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (canAfford) {
                      soundManager.play('buy');
                      onBuy(skin.id, skin.cost);
                    }
                  }}
                  disabled={!canAfford}
                  className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 ${
                    canAfford 
                      ? 'btn-glossy !py-2 !text-xs !border-2' 
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed border-2 border-slate-600'
                  }`}
                >
                  <IconCoin className="w-3 h-3" /> {skin.cost}
                </button>
              )}
            </div>
          );
        })}

        {/* COIN SHOP */}
        {tab === 'coins' && COIN_SKINS.map((skin) => {
          const isUnlocked = lifetimeCoins >= skin.unlockThreshold;
          const isSelected = selectedCoinSkin === skin.id;
          const needed = skin.unlockThreshold - lifetimeCoins;

          return (
            <div 
              key={skin.id}
              className={`relative p-3 rounded-xl border-4 flex flex-col items-center gap-2 transition-all ${
                isSelected 
                  ? 'bg-yellow-900/30 border-yellow-500' 
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className="relative w-12 h-12 mb-2">
                <Coin y={0} x={0} skinId={skin.id} />
              </div>
              
              <div className="text-center">
                <p className="font-bold text-white text-sm">{skin.name}</p>
                {!isUnlocked && (
                  <p className="text-[10px] text-red-400 leading-tight mb-2 font-bold">
                     NEED {needed} MORE
                  </p>
                )}
                {isUnlocked && (
                   <p className="text-[10px] text-green-400 leading-tight mb-2 font-bold">
                     UNLOCKED
                   </p>
                )}
              </div>

              {isUnlocked ? (
                <button
                  onClick={() => {
                    soundManager.play('click');
                    onSelectCoinSkin(skin.id);
                  }}
                  disabled={isSelected}
                  className={`w-full py-2 rounded-lg font-bold text-xs uppercase ${
                    isSelected 
                      ? 'bg-green-500 text-white cursor-default' 
                      : 'btn-glossy-blue btn-glossy text-white !py-2 !text-xs !border-2'
                  }`}
                >
                  {isSelected ? 'EQUIPPED' : 'SELECT'}
                </button>
              ) : (
                 <div className="w-full py-2 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center gap-1 opacity-50">
                    <span className="text-[10px] font-bold text-slate-400">UNLOCK AT {skin.unlockThreshold}</span>
                 </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Shop;
