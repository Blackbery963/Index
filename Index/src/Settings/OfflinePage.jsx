import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  WifiOff, RefreshCw, Trophy, ChevronLeft, ChevronRight, Play, Zap 
} from 'lucide-react';

// --- Game Constants ---
const GAME_SPEED = 12; 
const SPAWN_RATE = 45;

const OfflinePage = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerLane, setPlayerLane] = useState(1);
  const [items, setItems] = useState([]);
  
  // Refs
  const requestRef = useRef();
  const scoreRef = useRef(0);
  const frameCountRef = useRef(0);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('offlineHighScore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // --- Logic ---
  const moveLeft = useCallback(() => {
    if (gameState !== 'playing') return;
    setPlayerLane((prev) => Math.max(0, prev - 1));
  }, [gameState]);

  const moveRight = useCallback(() => {
    if (gameState !== 'playing') return;
    setPlayerLane((prev) => Math.min(2, prev + 1));
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    setItems([]);
    frameCountRef.current = 0;
    setPlayerLane(1);
  };

  // --- Controls ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'playing') {
        if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
        if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
      }
      if (e.code === 'Space' || e.key === 'Enter') {
        if (gameState === 'menu' || gameState === 'gameover') startGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, moveLeft, moveRight]);

  const handleTouchStart = (e) => {
    if (gameState !== 'playing') return;
    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;
    if (touchX < screenWidth / 2) moveLeft();
    else moveRight();
  };

  // --- Game Loop ---
  const gameTick = useCallback(() => {
    if (gameState !== 'playing') return;

    setItems((prevItems) => {
      const nextItems = prevItems
        .map(item => ({ ...item, y: item.y + 1.2 })) 
        .filter(item => item.y < 120);

      const playerYTop = 82;
      const playerYBottom = 92;
      let collision = false;
      let pointsGained = 0;

      const survivingItems = nextItems.filter(item => {
        const inHitBox = item.y > playerYTop && item.y < playerYBottom;
        const inLane = item.lane === playerLane;

        if (inHitBox && inLane) {
          if (item.type === 'obstacle') {
            collision = true;
          } else if (item.type === 'coin') {
            pointsGained += 10;
            return false;
          }
        }
        return true;
      });

      if (collision) {
        setGameState('gameover');
        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current);
          localStorage.setItem('offlineHighScore', scoreRef.current);
        }
        return survivingItems;
      }

      if (pointsGained > 0) {
        scoreRef.current += pointsGained;
        setScore(scoreRef.current);
      }
      
      if (frameCountRef.current % 10 === 0) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      return survivingItems;
    });

    frameCountRef.current += 1;
    if (frameCountRef.current % SPAWN_RATE === 0) {
      const lane = Math.floor(Math.random() * 3);
      const type = Math.random() > 0.25 ? 'obstacle' : 'coin';
      setItems(prev => [...prev, { id: Date.now(), lane, y: -10, type }]);
    }

    requestRef.current = setTimeout(gameTick, GAME_SPEED);
  }, [gameState, playerLane, highScore]);

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = setTimeout(gameTick, GAME_SPEED);
    }
    return () => clearTimeout(requestRef.current);
  }, [gameState, gameTick]);

  const getLaneLeftPos = (laneIndex) => {
    if (laneIndex === 0) return '16.66%';
    if (laneIndex === 1) return '50%';
    return '83.33%';
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 text-zinc-100 font-sans flex flex-col items-center justify-center p-6 select-none">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#27272a_0%,_#09090b_100%)] pointer-events-none" />
      
      {/* --- Header Section --- */}
      <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 ease-in-out ${gameState === 'playing' ? 'opacity-0 -translate-y-10 h-0 overflow-hidden' : 'opacity-100 mb-8'}`}>
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-2xl border border-white/5">
          <WifiOff size={32} className="text-zinc-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
          System Offline
        </h1>
        
        <p className="text-zinc-400 text-sm md:text-base max-w-sm leading-relaxed">
          Looks like you aren't connected to the internet. 
          <br className="hidden md:block"/> Check your connection or disable airplane mode.
        </p>

        <div className="mt-6 px-4 py-2 bg-white/5 rounded-full border border-white/5">
          <p className="text-zinc-500 text-xs font-medium tracking-wide">
             Enjoy this game while you wait
          </p>
        </div>
      </div>

      {/* --- Game Container --- */}
      <div className={`
        relative z-20 w-full max-w-sm aspect-[3/4] md:aspect-[4/5] 
        bg-zinc-900/80 backdrop-blur-2xl 
        rounded-[32px] border border-white/10 shadow-2xl 
        overflow-hidden flex flex-col
        transition-all duration-500 ease-out
        ${gameState === 'playing' ? 'scale-100' : 'scale-95 hover:scale-[0.97]'}
      `}>
        
        {/* Top HUD */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Score</span>
            <span className="text-2xl font-mono font-medium text-white">{score.toString().padStart(4, '0')}</span>
          </div>
          {highScore > 0 && (
             <div className="flex flex-col items-end">
               <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Best</span>
               <div className="flex items-center gap-1.5">
                  <Trophy size={14} className="text-yellow-500" />
                  <span className="text-xl font-mono font-medium text-white">{highScore}</span>
               </div>
             </div>
          )}
        </div>

        {/* --- Game Area --- */}
        <div 
          ref={gameAreaRef} 
          className="flex-1 relative"
          onTouchStart={handleTouchStart}
        >
          {/* Subtle Lane Guides */}
          <div className="absolute inset-0 flex pointer-events-none opacity-20">
             <div className="flex-1 border-r border-dashed border-white/10" />
             <div className="flex-1 border-r border-dashed border-white/10" />
             <div className="flex-1" />
          </div>

          {/* Starry Background Moving */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 2 + 1}s`
                }}
              />
            ))}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_80px] animate-[slideDown_3s_linear_infinite]" />
             <style>{`@keyframes slideDown { from { background-position: 0 0; } to { background-position: 0 80px; } }`}</style>
          </div>

          {/* Player (Paper Plane) */}
          <div 
             className="absolute bottom-[10%] w-10 h-10 transition-all duration-150 ease-out z-10"
             style={{ left: getLaneLeftPos(playerLane), transform: 'translateX(-50%)' }}
          >
             {/* Minimalist Triangle Shape */}
             <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
          </div>

          {/* Items */}
          {items.map(item => (
             <div
               key={item.id}
               className="absolute w-10 h-10 flex items-center justify-center transition-none z-10"
               style={{ left: getLaneLeftPos(item.lane), top: `${item.y}%`, transform: 'translateX(-50%)' }}
             >
               {item.type === 'obstacle' ? (
                 // Soft Red Square for Obstacle
                 <div className="w-8 h-8 bg-red-500/80 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.4)]" />
               ) : (
                 // Soft Gold Circle for Coin
                 <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.6)] flex items-center justify-center">
                    <Zap size={12} className="text-yellow-900 fill-current" />
                 </div>
               )}
             </div>
          ))}
        </div>

        {/* --- Menus / Overlays --- */}

        {/* Start Menu */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
             <button 
                onClick={startGame}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-white/20"
             >
                <Play size={20} fill="currentColor" />
                Start Game
             </button>
             <div className="mt-8 text-zinc-500 text-xs tracking-wider uppercase flex gap-6">
                <span>Tap Left</span> • <span>Tap Right</span>
             </div>
          </div>
        )}

        {/* Game Over */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md z-30 flex flex-col items-center justify-center animate-in fade-in duration-300">
             <h2 className="text-2xl font-bold text-white mb-1">Game Over</h2>
             <p className="text-zinc-400 text-sm mb-6">You hit an obstacle</p>
             
             <div className="flex gap-8 mb-8">
               <div className="text-center">
                 <div className="text-[10px] text-zinc-500 uppercase font-bold">Score</div>
                 <div className="text-2xl font-mono text-white">{score}</div>
               </div>
               <div className="text-center">
                 <div className="text-[10px] text-zinc-500 uppercase font-bold">Best</div>
                 <div className="text-2xl font-mono text-yellow-500">{highScore}</div>
               </div>
             </div>

             <button 
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-full font-bold hover:bg-zinc-200 transition-colors"
             >
                <RefreshCw size={18} /> Play Again
             </button>
          </div>
        )}

        {/* Desktop Controls (Subtle) */}
        {gameState === 'playing' && (
          <div className="absolute inset-x-0 bottom-6 px-6 flex justify-between pointer-events-none z-30 opacity-0 md:opacity-100 transition-opacity hover:opacity-100">
             <button 
               onClick={(e) => { e.stopPropagation(); moveLeft(); }}
               className="pointer-events-auto w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 text-white/50 hover:text-white transition-all active:scale-95"
             >
                <ChevronLeft size={24} />
             </button>
             <button 
               onClick={(e) => { e.stopPropagation(); moveRight(); }}
               className="pointer-events-auto w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 text-white/50 hover:text-white transition-all active:scale-95"
             >
                <ChevronRight size={24} />
             </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default OfflinePage;