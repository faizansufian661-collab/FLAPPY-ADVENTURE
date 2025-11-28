
import React from 'react';
import { TOTAL_SECTIONS, LEVELS_PER_SECTION } from '../constants';
import { UserData } from '../types';
import { IconBack, IconCoin, IconShop, IconPlay, IconLock, IconStar } from './Icons';

interface LevelMenuProps {
  userData: UserData;
  selectedSection: number | null;
  onSelectSection: (id: number) => void;
  onSelectLevel: (sectionId: number, levelId: number) => void;
  onOpenShop: () => void;
  onBack: () => void;
  username: string;
}

const LevelMenu: React.FC<LevelMenuProps> = ({ 
  userData, 
  selectedSection, 
  onSelectSection, 
  onSelectLevel, 
  onOpenShop,
  onBack,
  username
}) => {
  const sections = Array.from({ length: TOTAL_SECTIONS }, (_, i) => i + 1);

  const isSectionUnlocked = (id: number) => {
    if (id === 1) return true;
    return userData.progress[id - 1] && userData.progress[id - 1][LEVELS_PER_SECTION] === true;
  };

  const isLevelUnlocked = (sectionId: number, levelId: number) => {
    if (levelId === 1) return true;
    return userData.progress[sectionId] && userData.progress[sectionId][levelId - 1] === true;
  };

  if (selectedSection === null) {
    return (
      <div className="w-full h-full bg-slate-900 flex flex-col p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pt-2">
          <div>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500 text-3xl font-black drop-shadow-sm">CHAPTERS</h2>
          </div>
          <div className="flex flex-col items-end gap-1">
             <button onClick={onBack} className="btn-glossy px-3 py-1 text-xs">BACK</button>
             <div className="text-yellow-400 font-bold text-sm flex items-center gap-1">
               <IconCoin className="w-4 h-4" /> {userData.coins}
             </div>
          </div>
        </div>
        
        {/* Shop Banner */}
        <button 
          onClick={onOpenShop}
          className="w-full mb-4 p-4 btn-glossy flex items-center justify-between text-white font-black hover:scale-[1.02] transition-transform"
          style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)', borderColor: '#4c1d95', boxShadow: '0 6px 0 #4c1d95' }}
        >
          <span className="flex items-center gap-2 text-lg"><IconShop className="w-6 h-6" /> SHOP</span>
          <span className="bg-white/20 px-2 py-1 rounded text-xs">SKINS</span>
        </button>

        {/* Section List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {sections.map(id => {
            const unlocked = isSectionUnlocked(id);
            return (
              <button
                key={id}
                disabled={!unlocked}
                onClick={() => onSelectSection(id)}
                className={`w-full p-4 rounded-xl border-4 flex items-center justify-between transition-all ${
                  unlocked 
                    ? 'bg-slate-800 border-sky-600 hover:bg-slate-700 active:scale-95' 
                    : 'bg-slate-900 border-slate-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl border-b-4 ${unlocked ? 'bg-sky-500 text-white border-sky-700' : 'bg-slate-700 text-slate-500 border-slate-800'}`}>
                    {id}
                  </div>
                  <div className="text-left">
                    <div className={`font-black text-lg ${unlocked ? 'text-white' : 'text-slate-500'}`}>
                      CHAPTER {id}
                    </div>
                    <div className="text-xs text-slate-400 font-bold uppercase">
                      {LEVELS_PER_SECTION} Levels
                    </div>
                  </div>
                </div>
                {unlocked && <IconPlay className="w-8 h-8 fill-green-400 stroke-none" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // LEVEL SELECTION VIEW
  const levels = Array.from({ length: LEVELS_PER_SECTION }, (_, i) => i + 1);

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col p-4">
      <div className="flex items-center gap-4 mb-6 pt-2">
        <button 
          onClick={() => onSelectSection(0)} 
          className="btn-glossy btn-glossy-icon w-12 h-12 text-white"
        >
          <IconBack className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-white text-2xl font-black">CHAPTER {selectedSection}</h2>
          <div className="text-yellow-400 font-bold text-xs flex items-center gap-1">
             <IconCoin className="w-4 h-4" /> {userData.coins} Coins
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {levels.map(id => {
          const unlocked = isLevelUnlocked(selectedSection, id);
          const completed = userData.progress[selectedSection] && userData.progress[selectedSection][id];
          
          return (
            <button
              key={id}
              disabled={!unlocked}
              onClick={() => onSelectLevel(selectedSection, id)}
              className={`aspect-square rounded-2xl border-b-8 flex flex-col items-center justify-center relative transition-transform active:translate-y-2 active:border-b-0 ${
                unlocked 
                  ? completed 
                    ? 'bg-green-500 border-green-700 shadow-green-900' 
                    : 'bg-sky-500 border-sky-700 shadow-sky-900'
                  : 'bg-slate-800 border-slate-900'
              }`}
            >
              <span className={`text-5xl font-black drop-shadow-md ${unlocked ? 'text-white' : 'text-slate-600'}`}>
                {id}
              </span>
              {completed && (
                 <div className="absolute top-2 right-2"><IconStar className="w-6 h-6" filled /></div>
              )}
              {!unlocked && (
                 <div className="absolute bottom-4"><IconLock className="w-8 h-8" /></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelMenu;
