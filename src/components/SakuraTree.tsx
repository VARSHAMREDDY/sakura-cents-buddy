import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
}

export const SakuraTree = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Create initial petals
    const initialPetals: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5,
      size: 6 + Math.random() * 6,
    }));
    setPetals(initialPetals);

    // Add new petals periodically
    const interval = setInterval(() => {
      setPetals(current => {
        const newPetal: Petal = {
          id: Date.now(),
          x: Math.random() * 300,
          duration: 8 + Math.random() * 4,
          delay: 0,
          size: 6 + Math.random() * 6,
        };
        
        // Keep only recent petals to avoid memory issues
        const recentPetals = current.slice(-10);
        return [...recentPetals, newPetal];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sakura-tree">
      {/* Tree trunk and branches */}
      <div className="absolute bottom-0 right-16 w-4 h-32 bg-sakura-bark rounded-t-lg" />
      <div className="absolute bottom-20 right-20 w-3 h-24 bg-sakura-bark rounded-t-lg transform rotate-12 origin-bottom" />
      <div className="absolute bottom-24 right-12 w-2 h-20 bg-sakura-bark rounded-t-lg transform -rotate-12 origin-bottom" />
      
      {/* Main branches */}
      <div className="absolute bottom-32 right-8 w-8 h-2 bg-sakura-bark rounded-full transform -rotate-12" />
      <div className="absolute bottom-36 right-20 w-12 h-2 bg-sakura-bark rounded-full transform rotate-12" />
      <div className="absolute bottom-40 right-4 w-10 h-2 bg-sakura-bark rounded-full transform -rotate-20" />
      <div className="absolute bottom-44 right-16 w-14 h-2 bg-sakura-bark rounded-full transform rotate-8" />
      <div className="absolute bottom-48 right-2 w-8 h-2 bg-sakura-bark rounded-full transform -rotate-25" />

      {/* Sakura flowers on branches */}
      <div className="sakura-flower" style={{ bottom: '35%', right: '15%' }} />
      <div className="sakura-flower" style={{ bottom: '40%', right: '25%', animationDelay: '1s' }} />
      <div className="sakura-flower" style={{ bottom: '45%', right: '10%', animationDelay: '2s' }} />
      <div className="sakura-flower" style={{ bottom: '50%', right: '20%', animationDelay: '0.5s' }} />
      <div className="sakura-flower" style={{ bottom: '55%', right: '8%', animationDelay: '1.5s' }} />
      <div className="sakura-flower" style={{ bottom: '42%', right: '5%', animationDelay: '2.5s' }} />
      <div className="sakura-flower" style={{ bottom: '38%', right: '30%', animationDelay: '3s' }} />
      <div className="sakura-flower" style={{ bottom: '52%', right: '18%', animationDelay: '0.8s' }} />

      {/* Falling petals */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.x}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
          }}
        />
      ))}
      
      {/* Additional scattered petals for ambiance */}
      <div className="sakura-petal" style={{ left: '50px', animationDuration: '10s', animationDelay: '2s' }} />
      <div className="sakura-petal" style={{ left: '120px', animationDuration: '12s', animationDelay: '4s' }} />
      <div className="sakura-petal" style={{ left: '200px', animationDuration: '9s', animationDelay: '1s' }} />
      <div className="sakura-petal" style={{ left: '80px', animationDuration: '11s', animationDelay: '3s' }} />
      <div className="sakura-petal" style={{ left: '180px', animationDuration: '8s', animationDelay: '5s' }} />
    </div>
  );
};
