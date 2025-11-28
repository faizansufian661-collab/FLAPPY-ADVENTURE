
import React, { useState } from 'react';
import { UserData } from '../types';

interface AuthProps {
  onLogin: (username: string, data: UserData) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('flappy_users') || '{}');

    if (isLogin) {
      if (storedUsers[username] && storedUsers[username].password === password) {
        const data = storedUsers[username];
        if (!data.coins) data.coins = 0;
        if (data.lifetimeCoins === undefined) data.lifetimeCoins = data.coins || 0;
        if (!data.unlockedSkins) data.unlockedSkins = ['default'];
        if (!data.selectedSkin) data.selectedSkin = 'default';
        if (!data.unlockedCoinSkins) data.unlockedCoinSkins = ['default'];
        if (!data.selectedCoinSkin) data.selectedCoinSkin = 'default';
        
        onLogin(username, data);
      } else {
        setError('Invalid nickname or password');
      }
    } else {
      if (storedUsers[username]) {
        setError('Nickname already exists');
      } else {
        const newUser: UserData = {
          password,
          progress: { 1: { 0: true } }, 
          coins: 0,
          lifetimeCoins: 0,
          unlockedSkins: ['default'],
          selectedSkin: 'default',
          unlockedCoinSkins: ['default'],
          selectedCoinSkin: 'default'
        };
        storedUsers[username] = newUser;
        localStorage.setItem('flappy_users', JSON.stringify(storedUsers));
        onLogin(username, newUser);
      }
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-sm bg-slate-800 border-4 border-slate-700 rounded-3xl shadow-2xl p-8 z-10 relative">
        <h1 className="text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500 mb-2 drop-shadow-md stroke-white">
          FLAPPY<br/>ADVENTURE
        </h1>
        <p className="text-center text-slate-400 mb-8 text-sm uppercase tracking-widest font-bold">
          Made By <span className="text-sky-400">Faizan</span>
        </p>

        <div className="flex w-full mb-6 bg-slate-900 rounded-xl p-1 border-2 border-slate-700">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 text-sm font-black rounded-lg transition ${isLogin ? 'bg-sky-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
          >
            LOGIN
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 text-sm font-black rounded-lg transition ${!isLogin ? 'bg-green-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
          >
            SIGNUP
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-black text-slate-400 mb-1 uppercase">Nickname</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition font-bold"
              placeholder="Enter your nickname"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 mb-1 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition font-bold"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm font-black text-center animate-pulse">{error}</p>}

          <button
            type="submit"
            className={`w-full py-4 mt-4 btn-glossy text-xl ${isLogin ? 'btn-glossy-blue' : 'btn-glossy-green'}`}
          >
            {isLogin ? 'START PLAYING' : 'CREATE ACCOUNT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
