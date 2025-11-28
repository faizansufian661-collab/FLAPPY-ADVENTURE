
import React from 'react';
import { GameSettings, QualityPreset } from '../types';
import { soundManager } from '../utils/sound';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdate: (newSettings: GameSettings) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onUpdate, onClose }) => {
  
  const handleToggleSound = () => {
    soundManager.play('click');
    const newSettings = { ...settings, soundEnabled: !settings.soundEnabled };
    onUpdate(newSettings);
    soundManager.setEnabled(newSettings.soundEnabled);
  };

  const handleQualityChange = (quality: QualityPreset) => {
    soundManager.play('click');
    onUpdate({ ...settings, quality });
  };

  return (
    <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
      <div className="w-full max-w-sm bg-slate-800 border-4 border-slate-600 rounded-2xl p-6 shadow-2xl relative">
        <h2 className="text-3xl font-black text-white text-center mb-6 tracking-wider drop-shadow-md">SETTINGS</h2>
        
        {/* Audio Toggle */}
        <div className="mb-8">
          <p className="text-slate-400 text-xs font-bold uppercase mb-3">Audio</p>
          <button 
            onClick={handleToggleSound}
            className={`w-full py-3 btn-glossy flex items-center justify-center gap-2 ${
              settings.soundEnabled 
              ? 'btn-glossy-green' 
              : '!bg-red-500 !border-red-800'
            }`}
          >
            {settings.soundEnabled ? '🔊 SOUND ON' : '🔇 SOUND OFF'}
          </button>
        </div>

        {/* Quality Selector */}
        <div className="mb-8">
          <p className="text-slate-400 text-xs font-bold uppercase mb-3">Graphics Quality</p>
          <div className="grid grid-cols-2 gap-2">
            {(['240p', '480p', '1080p', '4k'] as QualityPreset[]).map((q) => (
              <button
                key={q}
                onClick={() => handleQualityChange(q)}
                className={`py-2 rounded-lg font-black text-sm transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                  settings.quality === q
                    ? 'bg-sky-500 border-sky-700 text-white shadow-sky-900'
                    : 'bg-slate-700 border-slate-900 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {q.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => { soundManager.play('click'); onClose(); }}
          className="w-full py-3 btn-glossy bg-slate-200 text-slate-800 !border-slate-400"
          style={{ background: '#e2e8f0' }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
