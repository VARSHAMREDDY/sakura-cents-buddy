import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
  rotation: number;
  sway: number;
}

export const SakuraTree = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Create MANY more initial petals for a very realistic falling effect
    const initialPetals: Petal[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      sway: 20 + Math.random() * 40,
    }));
    setPetals(initialPetals);

    // Add new petals constantly for continuous realistic falling
    const interval = setInterval(() => {
      setPetals(current => {
        const newPetals: Petal[] = Array.from({ length: 5 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          duration: 8 + Math.random() * 12,
          delay: Math.random() * 2,
          size: 6 + Math.random() * 10,
          rotation: Math.random() * 360,
          sway: 20 + Math.random() * 40,
        }));
        
        // Keep more petals for fuller, more realistic effect
        const recentPetals = current.slice(-50);
        return [...recentPetals, ...newPetals];
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sakura-tree fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* SVG for smooth, natural tree branches */}
      <svg className="absolute bottom-0 left-0 w-[600px] h-[70vh]" viewBox="0 0 600 800" preserveAspectRatio="xMinYMax meet">
        <defs>
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d2817" />
            <stop offset="50%" stopColor="#5c4433" />
            <stop offset="100%" stopColor="#4a3426" />
          </linearGradient>
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5c4433" />
            <stop offset="100%" stopColor="#7d6555" />
          </linearGradient>
          <filter id="treeShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main trunk with natural curve */}
        <path d="M 120 800 Q 120 700, 125 600 Q 130 500, 135 400 Q 140 300, 145 200" 
              stroke="url(#trunkGradient)" strokeWidth="45" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        
        {/* Major branches with natural curves */}
        <path d="M 145 200 Q 180 180, 220 160 Q 260 140, 310 130" 
              stroke="url(#branchGradient)" strokeWidth="18" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 143 230 Q 100 210, 60 195 Q 30 185, 10 180" 
              stroke="url(#branchGradient)" strokeWidth="16" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 147 180 Q 190 150, 240 130 Q 290 110, 350 100" 
              stroke="url(#branchGradient)" strokeWidth="20" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 142 260 Q 95 245, 50 235 Q 20 230, 0 228" 
              stroke="url(#branchGradient)" strokeWidth="15" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 148 150 Q 200 120, 260 100 Q 330 80, 400 70" 
              stroke="url(#branchGradient)" strokeWidth="22" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        
        {/* Secondary branches */}
        <path d="M 220 160 Q 240 145, 265 135 Q 290 125, 320 120" 
              stroke="url(#branchGradient)" strokeWidth="12" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 60 195 Q 40 185, 25 180 Q 15 178, 8 177" 
              stroke="url(#branchGradient)" strokeWidth="10" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 240 130 Q 270 115, 305 105 Q 340 95, 380 90" 
              stroke="url(#branchGradient)" strokeWidth="14" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 50 235 Q 30 228, 15 225 Q 8 223, 3 222" 
              stroke="url(#branchGradient)" strokeWidth="11" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 260 100 Q 300 85, 345 75 Q 390 65, 440 60" 
              stroke="url(#branchGradient)" strokeWidth="16" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        
        {/* Tertiary branches for fullness */}
        <path d="M 265 135 Q 285 125, 310 118" 
              stroke="url(#branchGradient)" strokeWidth="8" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 305 105 Q 330 95, 360 88" 
              stroke="url(#branchGradient)" strokeWidth="9" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
        <path d="M 25 180 Q 15 175, 8 172" 
              stroke="url(#branchGradient)" strokeWidth="7" fill="none" 
              strokeLinecap="round" filter="url(#treeShadow)"/>
      </svg>

      {/* Realistic sakura flowers on branches */}
      {Array.from({ length: 80 }).map((_, i) => {
        const topPos = 10 + Math.random() * 25;
        const leftPos = Math.random() * 50;
        const animDelay = Math.random() * 3;
        const size = 8 + Math.random() * 6;
        const rotation = Math.random() * 360;
        
        return (
          <div 
            key={`flower-${i}`}
            className="absolute animate-bloom"
            style={{ 
              top: `${topPos}vh`, 
              left: `${leftPos}vw`,
              animationDelay: `${animDelay}s`,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
              {/* 5 petals in sakura formation */}
              {[0, 72, 144, 216, 288].map((angle) => (
                <div
                  key={angle}
                  className="absolute rounded-full"
                  style={{
                    width: `${size * 0.55}px`,
                    height: `${size * 0.65}px`,
                    background: 'linear-gradient(135deg, #ffb3d9 0%, #ffc9e3 50%, #ffe0f0 100%)',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateY(-${size * 0.3}px)`,
                    transformOrigin: 'center center',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    boxShadow: '0 1px 3px rgba(255,105,180,0.3)',
                  }}
                />
              ))}
              {/* Flower center */}
              <div 
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  width: `${size * 0.25}px`,
                  height: `${size * 0.25}px`,
                  background: 'radial-gradient(circle, #ff69b4 0%, #ff1493 100%)',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 2px rgba(255,20,147,0.6)',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Realistic falling petals with smooth motion */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}px`,
            top: '-30px',
            animation: `fall ${petal.duration}s ease-in forwards, sway ${petal.duration / 2}s ease-in-out infinite, flutter ${petal.duration / 4}s ease-in-out infinite`,
            animationDelay: `${petal.delay}s`,
            '--sway-distance': `${petal.sway}px`,
          } as React.CSSProperties}
        >
          {/* Single realistic sakura petal */}
          <div 
            className="relative"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size * 1.2}px`,
              background: 'linear-gradient(135deg, #ffb3d9 0%, #ffc9e3 40%, #ffe0f0 100%)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              transform: `rotate(${petal.rotation}deg)`,
              boxShadow: '0 2px 6px rgba(255,105,180,0.3), inset 0 1px 2px rgba(255,255,255,0.5)',
              opacity: 0.95,
            }}
          >
            {/* Petal vein */}
            <div 
              className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-[#ff69b4]/30 to-transparent"
              style={{ transform: 'translateX(-50%)' }}
            />
          </div>
        </div>
      ))}
      
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0.7;
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(calc(var(--sway-distance, 30px) * 0.5));
          }
          75% {
            transform: translateX(var(--sway-distance, 30px));
          }
        }
        
        @keyframes flutter {
          0%, 100% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: rotateX(15deg) rotateY(15deg);
          }
          50% {
            transform: rotateX(-10deg) rotateY(30deg);
          }
          75% {
            transform: rotateX(20deg) rotateY(-15deg);
          }
        }
        
        @keyframes bloom {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
