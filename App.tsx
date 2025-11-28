
import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import Auth from './components/Auth';
import LevelMenu from './components/LevelMenu';
import MainMenu from './components/MainMenu';
import SettingsModal from './components/SettingsModal';
import Shop from './components/Shop';
import DailyRewardModal from './components/DailyRewardModal';
import Bird from './components/Bird';
import { UserData, Screen, LevelConfig, GameSettings, WeatherType } from './types';
import { BASE_GAP, GAME_WIDTH, GAME_HEIGHT } from './constants';
import { soundManager } from './utils/sound';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('SPLASH');
  const [splashPhase, setSplashPhase] = useState<'INTRO' | 'LOADING'>('INTRO');
  const [username, setUsername] = useState<string>('');
  
  const [userData, setUserData] = useState<UserData>({
    progress: {},
    coins: 0,
    lifetimeCoins: 0,
    unlockedSkins: ['default'],
    selectedSkin: 'default',
    unlockedCoinSkins: ['default'],
    selectedCoinSkin: 'default',
    lastDailyReward: 0
  });
  
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [currentLevelConfig, setCurrentLevelConfig] = useState<LevelConfig | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false);

  const [settings, setSettings] = useState<GameSettings>(() => {
    const saved = localStorage.getItem('flappy_settings');
    return saved ? JSON.parse(saved) : { soundEnabled: true, quality: '1080p' };
  });

  const [scale, setScale] = useState(1);

  // Responsive Scaling Logic
  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / GAME_WIDTH;
      const scaleY = window.innerHeight / GAME_HEIGHT;
      // Maintain aspect ratio but fit within screen
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale < 1 ? newScale : Math.min(newScale, 1.2)); // Cap max scale for desktop
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    soundManager.setEnabled(settings.soundEnabled);
    localStorage.setItem('flappy_settings', JSON.stringify(settings));
  }, [settings]);

  // Cinematic Splash Screen Logic
  useEffect(() => {
    if (screen === 'SPLASH') {
      const introTimer = setTimeout(() => {
        setSplashPhase('LOADING');
      }, 2500);

      const loadTimer = setTimeout(() => {
        const savedSessionUser = localStorage.getItem('flappy_current_session');
        const storedUsers = JSON.parse(localStorage.getItem('flappy_users') || '{}');

        if (savedSessionUser && storedUsers[savedSessionUser]) {
          setUsername(savedSessionUser);
          const u = storedUsers[savedSessionUser];
          setUserData({
             progress: u.progress || {},
             coins: u.coins || 0,
             lifetimeCoins: u.lifetimeCoins || u.coins || 0,
             unlockedSkins: u.unlockedSkins || ['default'],
             selectedSkin: u.selectedSkin || 'default',
             unlockedCoinSkins: u.unlockedCoinSkins || ['default'],
             selectedCoinSkin: u.selectedCoinSkin || 'default',
             lastDailyReward: u.lastDailyReward || 0
          });
          setScreen('MAIN_MENU');
        } else {
          setScreen('AUTH');
        }
      }, 5500);

      return () => {
        clearTimeout(introTimer);
        clearTimeout(loadTimer);
      };
    }
  }, [screen]);

  const saveUserData = (user: string, data: UserData) => {
    const storedUsers = JSON.parse(localStorage.getItem('flappy_users') || '{}');
    if (storedUsers[user]) {
      storedUsers[user] = { ...storedUsers[user], ...data };
      localStorage.setItem('flappy_users', JSON.stringify(storedUsers));
    }
  };

  const handleLogin = (user: string, data: UserData) => {
    soundManager.play('win');
    localStorage.setItem('flappy_current_session', user);
    setUsername(user);
    setUserData(data);
    setScreen('MAIN_MENU');
  };

  const handleLogout = () => {
    soundManager.play('click');
    localStorage.removeItem('flappy_current_session');
    setUsername('');
    setUserData({ 
      progress: {}, 
      coins: 0, 
      lifetimeCoins: 0,
      unlockedSkins: ['default'], 
      selectedSkin: 'default',
      unlockedCoinSkins: ['default'],
      selectedCoinSkin: 'default',
      lastDailyReward: 0
    });
    setSelectedSection(null);
    setScreen('AUTH');
  };

  const handleClaimDailyReward = () => {
    const rewardAmount = 100;
    const newData = {
        ...userData,
        coins: userData.coins + rewardAmount,
        lastDailyReward: Date.now()
    };
    setUserData(newData);
    saveUserData(username, newData);
    setShowDailyReward(false);
  };

  // Check if reward is available (24 hours)
  const isRewardAvailable = () => {
      const now = Date.now();
      const last = userData.lastDailyReward || 0;
      return (now - last) > (24 * 60 * 60 * 1000);
  };

  const generateLevelConfig = (sectionId: number, levelId: number): LevelConfig => {
    const targetScore = 10 + Math.floor((sectionId - 1) * 0.8) + (levelId * 2);
    const pipeSpeed = Math.min(6, 2.8 + (sectionId * 0.08));
    const pipeGap = Math.max(120, BASE_GAP - (sectionId * 1.8));

    const themes: { bg: string; weather: WeatherType; pipeColor: string }[] = [
        { bg: 'linear-gradient(to bottom, #7dd3fc, #bae6fd)', weather: 'CLEAR', pipeColor: '#22c55e' }, 
        { bg: 'linear-gradient(to bottom, #fca5a5, #fdba74)', weather: 'CLOUDY', pipeColor: '#ea580c' },
        { bg: 'linear-gradient(to bottom, #1e1b4b, #312e81)', weather: 'CLEAR', pipeColor: '#6366f1' },
        { bg: 'linear-gradient(to bottom, #14532d, #166534)', weather: 'RAIN', pipeColor: '#14532d' },
        { bg: 'linear-gradient(to bottom, #fef08a, #fde047)', weather: 'CLEAR', pipeColor: '#ca8a04' },
    ];
    // Pattern repeater
    while (themes.length < 50) {
        themes.push(themes[themes.length % 5]);
    }

    const themeIndex = Math.min(themes.length - 1, Math.max(0, sectionId - 1));
    const theme = themes[themeIndex];

    return {
      sectionId,
      levelId,
      targetScore,
      pipeSpeed,
      pipeGap,
      bgGradient: theme.bg,
      weather: theme.weather,
      pipeColor: theme.pipeColor
    };
  };

  const handleSelectLevel = (sectionId: number, levelId: number) => {
    soundManager.play('click');
    const config = generateLevelConfig(sectionId, levelId);
    setCurrentLevelConfig(config);
    setScreen('GAME');
  };

  const handleLevelComplete = (coinsEarnedInLevel: number) => {
    if (!currentLevelConfig) return;
    
    const newProgress = { ...userData.progress };
    if (!newProgress[currentLevelConfig.sectionId]) {
      newProgress[currentLevelConfig.sectionId] = {};
    }
    newProgress[currentLevelConfig.sectionId][currentLevelConfig.levelId] = true;
    
    const newData = { ...userData, progress: newProgress };
    setUserData(newData);
    saveUserData(username, newData);
    setScreen('SECTIONS'); 
  };

  const handleCollectCoin = () => {
    setUserData(prev => {
      const newData = { 
        ...prev, 
        coins: prev.coins + 1,
        lifetimeCoins: (prev.lifetimeCoins || prev.coins) + 1
      };
      saveUserData(username, newData); 
      return newData;
    });
  };

  const handleExitGame = () => {
    soundManager.play('click');
    setScreen('SECTIONS');
  };

  const handleBuySkin = (skinId: string, cost: number) => {
    if (userData.coins >= cost) {
      const newUnlocked = [...userData.unlockedSkins, skinId];
      const newCoins = userData.coins - cost;
      const newData = { ...userData, coins: newCoins, unlockedSkins: newUnlocked, selectedSkin: skinId };
      setUserData(newData);
      saveUserData(username, newData);
      soundManager.play('buy');
    }
  };

  const handleSelectSkin = (skinId: string) => {
    const newData = { ...userData, selectedSkin: skinId };
    setUserData(newData);
    saveUserData(username, newData);
  };

  const handleSelectCoinSkin = (skinId: string) => {
    const newData = { ...userData, selectedCoinSkin: skinId };
    setUserData(newData);
    saveUserData(username, newData);
  };

  const getQualityStyles = () => {
    switch (settings.quality) {
      case '240p': return { filter: 'blur(0.5px) contrast(1.2)', imageRendering: 'pixelated' as const };
      case '480p': return { filter: 'contrast(0.9)' };
      case '1080p': return { filter: 'none' };
      case '2k': return { filter: 'saturate(1.1) contrast(1.05)' };
      case '4k': return { filter: 'saturate(1.2) contrast(1.1) drop-shadow(0 0 1px rgba(255,255,255,0.2))' };
      default: return {};
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden font-sans relative">
      
      {/* DYNAMIC BACKGROUND FOR RESPONSIVENESS */}
      <div 
        className="absolute inset-0 z-0 opacity-50 blur-3xl scale-110"
        style={{ 
            background: currentLevelConfig ? currentLevelConfig.bgGradient : 'linear-gradient(to bottom, #1e293b, #0f172a)'
        }}
      ></div>

      <div 
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          transform: `scale(${scale})`,
          ...getQualityStyles()
        }}
        className="relative z-10 overflow-hidden shadow-2xl origin-center transition-all duration-300"
      >
        <div className="w-full h-full rounded-xl overflow-hidden bg-slate-800 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-slate-700">
          
          {showSettings && (
            <SettingsModal 
              settings={settings}
              onUpdate={setSettings}
              onClose={() => setShowSettings(false)}
            />
          )}

          {showDailyReward && (
            <DailyRewardModal 
                onClaim={handleClaimDailyReward}
                onClose={() => setShowDailyReward(false)}
            />
          )}

          {screen === 'SPLASH' && (
            <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
               <style>{`
                @keyframes fillBar { 0% { width: 0%; } 100% { width: 100%; } }
                @keyframes flyRight { 0% { left: 0%; } 100% { left: 95%; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
                
                .anim-presenting { animation: fadeInUp 0.8s ease-out forwards; animation-delay: 0.2s; opacity: 0; }
                .anim-title { animation: scaleIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; animation-delay: 0.8s; opacity: 0; }
                .anim-footer { animation: fadeInUp 0.8s ease-out forwards; animation-delay: 1.5s; opacity: 0; }
                .loading-fill { animation: fillBar 3s linear forwards; }
                .loading-bird { animation: flyRight 3s linear forwards; }
              `}</style>
              
              {splashPhase === 'INTRO' && (
                <div className="flex flex-col items-center justify-center h-full pb-20">
                  <p className="text-slate-400 text-sm tracking-[0.2em] uppercase anim-presenting font-bold mb-4">Presenting</p>
                  <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 drop-shadow-lg anim-title leading-tight mb-8">
                    FLAPPY<br/>ADVENTURE
                  </h1>
                   <div className="anim-footer">
                    <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
                      Made By <span className="text-white">Faizan</span>
                    </p>
                  </div>
                </div>
              )}

              {splashPhase === 'LOADING' && (
                <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-500 w-full px-10">
                   <h1 className="text-4xl font-black text-white mb-12 drop-shadow-lg">LOADING...</h1>
                   
                   <div className="w-full h-4 bg-slate-800 rounded-full mb-4 relative border-2 border-slate-600">
                     <div className="h-full bg-sky-500 loading-fill shadow-[0_0_15px_#0ea5e9] rounded-full"></div>
                     <div className="absolute top-1/2 -mt-4 loading-bird" style={{ transform: 'translateY(-50%)' }}>
                        <div className="scale-75">
                           <Bird y={-10} x={0} rotation={-20} skinId={userData.selectedSkin} />
                        </div>
                     </div>
                   </div>
                   
                   <p className="text-sky-500 text-xs font-mono animate-pulse mt-4">INITIALIZING ASSETS...</p>
                </div>
              )}
            </div>
          )}

          {screen === 'AUTH' && <Auth onLogin={handleLogin} />}

          {screen === 'MAIN_MENU' && (
            <MainMenu 
              username={username}
              coins={userData.coins}
              hasDailyReward={isRewardAvailable()}
              onPlay={() => setScreen('SECTIONS')}
              onSettings={() => setShowSettings(true)}
              onLogout={handleLogout}
              onDailyReward={() => setShowDailyReward(true)}
            />
          )}

          {screen === 'SECTIONS' && (
            <LevelMenu 
              username={username}
              userData={userData}
              selectedSection={selectedSection}
              onSelectSection={(id) => { soundManager.play('click'); setSelectedSection(id === 0 ? null : id); }}
              onSelectLevel={handleSelectLevel}
              onOpenShop={() => setScreen('SHOP')}
              onBack={() => setScreen('MAIN_MENU')}
            />
          )}

          {screen === 'SHOP' && (
            <Shop 
              coins={userData.coins}
              lifetimeCoins={userData.lifetimeCoins}
              unlockedSkins={userData.unlockedSkins}
              selectedSkin={userData.selectedSkin}
              unlockedCoinSkins={userData.unlockedCoinSkins}
              selectedCoinSkin={userData.selectedCoinSkin}
              onBuy={handleBuySkin}
              onSelect={handleSelectSkin}
              onSelectCoinSkin={handleSelectCoinSkin}
              onClose={() => setScreen('SECTIONS')}
            />
          )}

          {screen === 'GAME' && currentLevelConfig && (
            <Game 
              levelConfig={currentLevelConfig}
              selectedSkin={userData.selectedSkin}
              selectedCoinSkin={userData.selectedCoinSkin}
              onComplete={handleLevelComplete}
              onExit={handleExitGame}
              onCollectCoin={handleCollectCoin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
