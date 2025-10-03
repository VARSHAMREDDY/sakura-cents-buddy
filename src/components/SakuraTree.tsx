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
      {/* Horizontal branches spreading across the top */}
      {/* Left section */}
      <div 
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: '15vw',
          height: '6px',
          background: 'linear-gradient(to right, transparent, #6b5444, #8d7565)',
          transform: 'translateY(40px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: '20vw',
          height: '5px',
          background: 'linear-gradient(to right, transparent, #7d6555, #9d8575)',
          transform: 'translateY(60px)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />
      
      {/* Left-center section */}
      <div 
        className="absolute top-0 left-[15vw] rounded-full"
        style={{
          width: '15vw',
          height: '7px',
          background: 'linear-gradient(to right, #8d7565, #6b5444, #8d7565)',
          transform: 'translateY(30px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute top-0 left-[18vw] rounded-full"
        style={{
          width: '12vw',
          height: '5px',
          background: 'linear-gradient(to right, #9d8575, #7d6555, #9d8575)',
          transform: 'translateY(50px)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />

      {/* Center section */}
      <div 
        className="absolute top-0 left-[30vw] rounded-full"
        style={{
          width: '18vw',
          height: '8px',
          background: 'linear-gradient(to right, #8d7565, #6b5444, #8d7565)',
          transform: 'translateY(20px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute top-0 left-[32vw] rounded-full"
        style={{
          width: '16vw',
          height: '6px',
          background: 'linear-gradient(to right, #9d8575, #7d6555, #9d8575)',
          transform: 'translateY(45px)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />

      {/* Right-center section */}
      <div 
        className="absolute top-0 left-[48vw] rounded-full"
        style={{
          width: '15vw',
          height: '7px',
          background: 'linear-gradient(to right, #8d7565, #6b5444, #8d7565)',
          transform: 'translateY(35px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute top-0 left-[50vw] rounded-full"
        style={{
          width: '13vw',
          height: '5px',
          background: 'linear-gradient(to right, #9d8575, #7d6555, #9d8575)',
          transform: 'translateY(55px)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />

      {/* Right section */}
      <div 
        className="absolute top-0 left-[63vw] rounded-full"
        style={{
          width: '18vw',
          height: '7px',
          background: 'linear-gradient(to right, #8d7565, #6b5444, #8d7565)',
          transform: 'translateY(25px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div 
        className="absolute top-0 left-[70vw] rounded-full"
        style={{
          width: '15vw',
          height: '5px',
          background: 'linear-gradient(to right, #9d8575, #7d6555, #9d8575)',
          transform: 'translateY(50px)',
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)'
        }}
      />

      {/* Far right section */}
      <div 
        className="absolute top-0 right-0 rounded-full"
        style={{
          width: '15vw',
          height: '6px',
          background: 'linear-gradient(to left, transparent, #6b5444, #8d7565)',
          transform: 'translateY(40px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />

      {/* Beautiful sakura flower clusters on branches - spread across entire width */}
      {Array.from({ length: 150 }).map((_, i) => {
        const topPos = 20 + Math.random() * 40;
        const leftPos = Math.random() * 100;
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
