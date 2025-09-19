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
    // Create initial petals - many more for constant falling effect
    const initialPetals: Petal[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 8,
      size: 4 + Math.random() * 8,
    }));
    setPetals(initialPetals);

    // Add new petals constantly for realistic effect
    const interval = setInterval(() => {
      setPetals(current => {
        const newPetals: Petal[] = Array.from({ length: 3 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          duration: 6 + Math.random() * 8,
          delay: Math.random() * 2,
          size: 4 + Math.random() * 8,
        }));
        
        // Keep more petals for fuller effect
        const recentPetals = current.slice(-25);
        return [...recentPetals, ...newPetals];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sakura-tree fixed inset-0 pointer-events-none z-0">
      {/* Large realistic tree trunk */}
      <div className="absolute bottom-0 right-20 w-8 h-40 bg-sakura-bark rounded-t-2xl shadow-lg" />
      <div className="absolute bottom-24 right-24 w-6 h-32 bg-sakura-bark rounded-t-xl transform rotate-15 origin-bottom shadow-md" />
      <div className="absolute bottom-32 right-16 w-5 h-28 bg-sakura-bark rounded-t-xl transform -rotate-15 origin-bottom shadow-md" />
      <div className="absolute bottom-28 right-12 w-4 h-24 bg-sakura-bark rounded-t-lg transform -rotate-25 origin-bottom" />
      
      {/* Extended branch system */}
      <div className="absolute bottom-40 right-8 w-12 h-3 bg-sakura-bark rounded-full transform -rotate-15 shadow-sm" />
      <div className="absolute bottom-44 right-28 w-16 h-3 bg-sakura-bark rounded-full transform rotate-15 shadow-sm" />
      <div className="absolute bottom-48 right-4 w-14 h-2 bg-sakura-bark rounded-full transform -rotate-25" />
      <div className="absolute bottom-52 right-20 w-18 h-3 bg-sakura-bark rounded-full transform rotate-10 shadow-sm" />
      <div className="absolute bottom-56 right-0 w-10 h-2 bg-sakura-bark rounded-full transform -rotate-30" />
      <div className="absolute bottom-60 right-16 w-20 h-3 bg-sakura-bark rounded-full transform rotate-5 shadow-sm" />
      <div className="absolute bottom-64 right-32 w-12 h-2 bg-sakura-bark rounded-full transform rotate-20" />
      <div className="absolute bottom-68 right-8 w-8 h-2 bg-sakura-bark rounded-full transform -rotate-35" />

      {/* Dense sakura flowers on branches for realism */}
      <div className="sakura-flower" style={{ bottom: '42%', right: '18%' }} />
      <div className="sakura-flower" style={{ bottom: '46%', right: '28%', animationDelay: '1s' }} />
      <div className="sakura-flower" style={{ bottom: '50%', right: '12%', animationDelay: '2s' }} />
      <div className="sakura-flower" style={{ bottom: '54%', right: '22%', animationDelay: '0.5s' }} />
      <div className="sakura-flower" style={{ bottom: '58%', right: '8%', animationDelay: '1.5s' }} />
      <div className="sakura-flower" style={{ bottom: '48%', right: '5%', animationDelay: '2.5s' }} />
      <div className="sakura-flower" style={{ bottom: '44%', right: '32%', animationDelay: '3s' }} />
      <div className="sakura-flower" style={{ bottom: '56%', right: '20%', animationDelay: '0.8s' }} />
      <div className="sakura-flower" style={{ bottom: '62%', right: '16%', animationDelay: '1.2s' }} />
      <div className="sakura-flower" style={{ bottom: '52%', right: '35%', animationDelay: '2.8s' }} />
      <div className="sakura-flower" style={{ bottom: '66%', right: '12%', animationDelay: '0.3s' }} />
      <div className="sakura-flower" style={{ bottom: '60%', right: '25%', animationDelay: '1.8s' }} />
      <div className="sakura-flower" style={{ bottom: '70%', right: '18%', animationDelay: '2.2s' }} />

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
      
      {/* Additional scattered petals across the entire screen */}
      <div className="sakura-petal" style={{ left: '10%', animationDuration: '10s', animationDelay: '2s' }} />
      <div className="sakura-petal" style={{ left: '25%', animationDuration: '12s', animationDelay: '4s' }} />
      <div className="sakura-petal" style={{ left: '40%', animationDuration: '9s', animationDelay: '1s' }} />
      <div className="sakura-petal" style={{ left: '15%', animationDuration: '11s', animationDelay: '3s' }} />
      <div className="sakura-petal" style={{ left: '35%', animationDuration: '8s', animationDelay: '5s' }} />
      <div className="sakura-petal" style={{ left: '60%', animationDuration: '13s', animationDelay: '0.5s' }} />
      <div className="sakura-petal" style={{ left: '75%', animationDuration: '7s', animationDelay: '6s' }} />
      <div className="sakura-petal" style={{ left: '85%', animationDuration: '14s', animationDelay: '2.5s' }} />
      <div className="sakura-petal" style={{ left: '5%', animationDuration: '9.5s', animationDelay: '4.5s' }} />
      <div className="sakura-petal" style={{ left: '90%', animationDuration: '10.5s', animationDelay: '1.5s' }} />
    </div>
  );
};
