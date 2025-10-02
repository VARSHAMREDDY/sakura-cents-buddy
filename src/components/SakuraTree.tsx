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
    <div className="sakura-tree fixed inset-0 pointer-events-none z-0">
      {/* Main trunk starting from bottom left, growing upward */}
      <div className="absolute bottom-0 left-16 w-16 h-[35vh] bg-gradient-to-t from-[#4a3426] via-[#5c4433] to-[#6b5444] rounded-t-3xl shadow-2xl transform origin-bottom" 
           style={{ boxShadow: '0 0 40px rgba(0,0,0,0.3), inset -5px 0 20px rgba(0,0,0,0.2)' }} />
      
      {/* Secondary trunks branching out */}
      <div className="absolute bottom-[25vh] left-20 w-10 h-[20vh] bg-gradient-to-t from-[#5c4433] to-[#6b5444] rounded-t-2xl shadow-xl transform rotate-20 origin-bottom" 
           style={{ boxShadow: '0 0 30px rgba(0,0,0,0.2)' }} />
      <div className="absolute bottom-[28vh] left-12 w-8 h-[18vh] bg-gradient-to-t from-[#5c4433] to-[#6b5444] rounded-t-2xl shadow-xl transform -rotate-15 origin-bottom" 
           style={{ boxShadow: '0 0 30px rgba(0,0,0,0.2)' }} />
      
      {/* Major branches spreading across the top */}
      <div className="absolute top-[15vh] left-24 w-32 h-5 bg-gradient-to-r from-[#6b5444] to-[#7d6555] rounded-full shadow-lg transform -rotate-12" />
      <div className="absolute top-[18vh] left-16 w-40 h-6 bg-gradient-to-r from-[#6b5444] to-[#7d6555] rounded-full shadow-lg transform rotate-8" />
      <div className="absolute top-[12vh] left-28 w-36 h-5 bg-gradient-to-r from-[#6b5444] to-[#7d6555] rounded-full shadow-lg transform -rotate-20" />
      <div className="absolute top-[20vh] left-8 w-44 h-6 bg-gradient-to-r from-[#6b5444] to-[#7d6555] rounded-full shadow-lg transform rotate-15" />
      <div className="absolute top-[10vh] left-20 w-48 h-7 bg-gradient-to-r from-[#6b5444] to-[#7d6555] rounded-full shadow-lg transform -rotate-5" />
      <div className="absolute top-[22vh] left-12 w-40 h-5 bg-gradient-to-r from-[#6b5444] to-[#7d6555] rounded-full shadow-lg transform rotate-18" />
      <div className="absolute top-[8vh] left-32 w-52 h-8 bg-gradient-to-r from-[#6b5444] to-[#7d6555] rounded-full shadow-xl transform -rotate-8" />
      
      {/* Medium branches creating fuller canopy */}
      <div className="absolute top-[14vh] left-36 w-28 h-4 bg-gradient-to-r from-[#7d6555] to-[#8d7565] rounded-full shadow-md transform rotate-25" />
      <div className="absolute top-[16vh] left-4 w-32 h-4 bg-gradient-to-r from-[#7d6555] to-[#8d7565] rounded-full shadow-md transform -rotate-25" />
      <div className="absolute top-[11vh] left-40 w-30 h-4 bg-gradient-to-r from-[#7d6555] to-[#8d7565] rounded-full shadow-md transform rotate-30" />
      <div className="absolute top-[19vh] left-6 w-34 h-4 bg-gradient-to-r from-[#7d6555] to-[#8d7565] rounded-full shadow-md transform -rotate-22" />
      
      {/* Small branches for detail */}
      <div className="absolute top-[13vh] left-44 w-20 h-3 bg-[#8d7565] rounded-full shadow-sm transform rotate-35" />
      <div className="absolute top-[17vh] left-2 w-24 h-3 bg-[#8d7565] rounded-full shadow-sm transform -rotate-28" />
      <div className="absolute top-[9vh] left-48 w-22 h-3 bg-[#8d7565] rounded-full shadow-sm transform rotate-40" />
      <div className="absolute top-[21vh] left-0 w-26 h-3 bg-[#8d7565] rounded-full shadow-sm transform -rotate-30" />

      {/* DENSE cluster of realistic sakura flowers on branches */}
      {Array.from({ length: 40 }).map((_, i) => {
        const topPos = 8 + Math.random() * 15; // Between 8vh and 23vh
        const leftPos = Math.random() * 60; // Spread across left side
        const animDelay = Math.random() * 4;
        const size = 12 + Math.random() * 8;
        
        return (
          <div 
            key={`flower-${i}`}
            className="absolute animate-bloom"
            style={{ 
              top: `${topPos}vh`, 
              left: `${leftPos}vw`,
              animationDelay: `${animDelay}s`,
            }}
          >
            {/* 5-petal sakura flower structure for realism */}
            <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
              {[0, 72, 144, 216, 288].map((angle) => (
                <div
                  key={angle}
                  className="absolute bg-gradient-to-br from-[#ffb3d9] via-[#ffc9e3] to-[#ffe0f0] rounded-full shadow-md"
                  style={{
                    width: `${size * 0.6}px`,
                    height: `${size * 0.6}px`,
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateX(${size * 0.25}px) translateY(-50%)`,
                    transformOrigin: 'left center',
                  }}
                />
              ))}
              {/* Center of flower */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-br from-[#ff69b4] to-[#ff1493] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner" />
            </div>
          </div>
        );
      })}

      {/* Realistic falling petals with complex motion */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}px`,
            top: '-20px',
            animation: `fall ${petal.duration}s linear forwards, sway ${petal.duration / 2}s ease-in-out infinite, spin ${petal.duration / 3}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            '--sway-distance': `${petal.sway}px`,
          } as React.CSSProperties}
        >
          {/* Realistic 5-petal sakura petal */}
          <div 
            className="relative bg-gradient-to-br from-[#ffb3d9] via-[#ffc9e3] to-[#ffe0f0] shadow-lg"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              borderRadius: '50% 0 50% 50%',
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3))',
            }}
          >
            {/* Petal vein detail */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#ff69b4]/20 to-transparent" 
                 style={{ borderRadius: 'inherit' }} />
          </div>
        </div>
      ))}
      
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(var(--sway-distance, 30px));
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bloom {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
