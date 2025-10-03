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
      {/* Main trunk - elegant and natural */}
      <div 
        className="absolute bottom-0 left-12 w-12 rounded-t-full"
        style={{
          height: '40vh',
          background: 'linear-gradient(to top, #3d2817 0%, #5c4433 50%, #6b5444 100%)',
          boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.3), 2px 0 15px rgba(0,0,0,0.2)'
        }}
      />

      {/* Primary branches - spreading across the screen */}
      {/* Left side branches */}
      <div 
        className="absolute left-16 rounded-full origin-left"
        style={{
          bottom: '35vh',
          width: '35vw',
          height: '8px',
          background: 'linear-gradient(to right, #6b5444, #8d7565, transparent)',
          transform: 'rotate(-20deg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute left-16 rounded-full origin-left"
        style={{
          bottom: '30vh',
          width: '38vw',
          height: '7px',
          background: 'linear-gradient(to right, #6b5444, #8d7565, transparent)',
          transform: 'rotate(-10deg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute left-16 rounded-full origin-left"
        style={{
          bottom: '25vh',
          width: '42vw',
          height: '7px',
          background: 'linear-gradient(to right, #6b5444, #8d7565, transparent)',
          transform: 'rotate(-5deg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      
      {/* Right side branches */}
      <div 
        className="absolute left-16 rounded-full origin-left"
        style={{
          bottom: '33vh',
          width: '45vw',
          height: '8px',
          background: 'linear-gradient(to right, #6b5444, #8d7565, transparent)',
          transform: 'rotate(5deg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute left-16 rounded-full origin-left"
        style={{
          bottom: '28vh',
          width: '48vw',
          height: '7px',
          background: 'linear-gradient(to right, #6b5444, #8d7565, transparent)',
          transform: 'rotate(12deg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute left-16 rounded-full origin-left"
        style={{
          bottom: '23vh',
          width: '50vw',
          height: '7px',
          background: 'linear-gradient(to right, #6b5444, #8d7565, transparent)',
          transform: 'rotate(8deg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />

      {/* Secondary branches for fullness */}
      <div 
        className="absolute left-20 rounded-full origin-left"
        style={{
          bottom: '32vh',
          width: '30vw',
          height: '5px',
          background: 'linear-gradient(to right, #7d6555, #9d8575, transparent)',
          transform: 'rotate(-25deg)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />
      <div 
        className="absolute left-20 rounded-full origin-left"
        style={{
          bottom: '27vh',
          width: '35vw',
          height: '5px',
          background: 'linear-gradient(to right, #7d6555, #9d8575, transparent)',
          transform: 'rotate(15deg)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />
      <div 
        className="absolute left-20 rounded-full origin-left"
        style={{
          bottom: '24vh',
          width: '32vw',
          height: '5px',
          background: 'linear-gradient(to right, #7d6555, #9d8575, transparent)',
          transform: 'rotate(-15deg)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />
      <div 
        className="absolute left-20 rounded-full origin-left"
        style={{
          bottom: '21vh',
          width: '38vw',
          height: '4px',
          background: 'linear-gradient(to right, #7d6555, #9d8575, transparent)',
          transform: 'rotate(18deg)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />

      {/* Beautiful sakura flower clusters on branches */}
      {Array.from({ length: 80 }).map((_, i) => {
        const topPos = 18 + Math.random() * 20;
        const leftPos = 8 + Math.random() * 60;
        const size = 10 + Math.random() * 6;
        const delay = Math.random() * 2;
        
        return (
          <div 
            key={`flower-${i}`}
            className="absolute animate-bloom"
            style={{ 
              top: `${topPos}vh`, 
              left: `${leftPos}vw`,
              animationDelay: `${delay}s`,
            }}
          >
            {/* 5-petal sakura flower */}
            <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
              {[0, 72, 144, 216, 288].map((angle) => (
                <div
                  key={angle}
                  className="absolute"
                  style={{
                    width: `${size * 0.5}px`,
                    height: `${size * 0.6}px`,
                    background: 'linear-gradient(to bottom, #ffb3d9 0%, #ffc9e3 50%, #ffe0f0 100%)',
                    borderRadius: '50% 50% 50% 0%',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateY(-${size * 0.25}px)`,
                    transformOrigin: 'center bottom',
                    boxShadow: '0 1px 3px rgba(255,105,180,0.3)',
                  }}
                />
              ))}
              {/* Flower center */}
              <div 
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${size * 0.2}px`,
                  height: `${size * 0.2}px`,
                  background: 'radial-gradient(circle, #ffe066 0%, #ffb347 100%)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 2px rgba(255,179,0,0.6)',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Gracefully falling sakura petals */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}px`,
            top: '-20px',
            animation: `fall ${petal.duration}s ease-in forwards, sway ${petal.duration / 2}s ease-in-out infinite, rotate ${petal.duration / 3}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            '--sway-distance': `${petal.sway}px`,
          } as React.CSSProperties}
        >
          {/* Single sakura petal - teardrop shape */}
          <div 
            style={{
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              background: 'linear-gradient(to bottom, #ffb3d9 0%, #ffc9e3 50%, #ffe0f0 100%)',
              borderRadius: '50% 50% 50% 0%',
              transform: `rotate(${petal.rotation}deg)`,
              boxShadow: '0 2px 4px rgba(255,105,180,0.25), inset -1px -1px 2px rgba(255,255,255,0.4)',
              opacity: 0.9,
            }}
          />
        </div>
      ))}
      
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0.5;
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
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bloom {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
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
