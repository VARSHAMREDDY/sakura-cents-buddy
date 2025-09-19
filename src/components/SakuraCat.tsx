import { useState, useEffect } from 'react';

interface SakuraCatProps {
  currentPage?: string;
}

export const SakuraCat = ({ currentPage = 'dashboard' }: SakuraCatProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [catExpression, setCatExpression] = useState('normal');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Change cat expression based on current page
    const expressions = {
      dashboard: 'happy',
      income: 'excited',
      expenses: 'concerned',
      charts: 'curious',
      notes: 'sleepy',
    };
    setCatExpression(expressions[currentPage as keyof typeof expressions] || 'normal');
  }, [currentPage]);

  const handleCatClick = () => {
    setIsPlaying(true);
    // Add some fun interactions
    const sounds = ['meow', 'purr', 'chirp'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    console.log(`🐱 *${randomSound}*`);
    
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const getCatFace = () => {
    switch (catExpression) {
      case 'happy': return '◕   ◕';
      case 'excited': return '★   ★';
      case 'concerned': return '°   °';
      case 'curious': return '◉   ◉';
      case 'sleepy': return '-   -';
      default: return '•   •';
    }
  };

  return (
    <div 
      className={`sakura-cat ${isPlaying ? 'animate-bounce' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCatClick}
      style={{
        transform: isHovered 
          ? 'translateX(-50%) scale(1.15) rotate(-2deg)' 
          : 'translateX(-50%) scale(1)',
      }}
    >
      {/* Cat ears */}
      <div className="cat-ears left" />
      <div className="cat-ears right" />
      
      {/* Skull flower on head */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-6 h-6 flex items-center justify-center">
        <div className="relative">
          {/* Flower petals */}
          <div className="absolute w-3 h-3 bg-sakura-flower rounded-full -top-1 left-1.5 animate-bloom opacity-90" />
          <div className="absolute w-3 h-3 bg-sakura-petal rounded-full top-0 -left-0.5 animate-bloom opacity-85" style={{ animationDelay: '0.5s' }} />
          <div className="absolute w-3 h-3 bg-sakura-flower rounded-full top-0 left-2.5 animate-bloom opacity-90" style={{ animationDelay: '1s' }} />
          <div className="absolute w-3 h-3 bg-sakura-petal rounded-full top-1.5 left-1.5 animate-bloom opacity-85" style={{ animationDelay: '1.5s' }} />
          <div className="absolute w-3 h-3 bg-sakura-flower rounded-full top-1 -left-1 animate-bloom opacity-80" style={{ animationDelay: '2s' }} />
          <div className="absolute w-3 h-3 bg-sakura-petal rounded-full top-1 left-3 animate-bloom opacity-80" style={{ animationDelay: '2.5s' }} />
          {/* Small skull center */}
          <div className="w-2 h-2 bg-foreground/30 rounded-sm relative top-0.5 left-1 shadow-sm">
            <div className="absolute w-0.5 h-0.5 bg-foreground/60 rounded-full top-0 left-0.5" />
            <div className="absolute w-0.5 h-0.5 bg-foreground/60 rounded-full top-0 right-0.5" />
            <div className="absolute w-1 h-0.5 bg-foreground/40 bottom-0 left-0.5 rounded-b-sm" />
          </div>
        </div>
      </div>
      
      {/* Cat face - eyes */}
      <div 
        className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-cute text-primary-foreground"
        style={{ fontSize: '8px', letterSpacing: '2px' }}
      >
        {getCatFace()}
      </div>
      
      {/* Cat nose */}
      <div className="cat-face" />
      
      {/* Cat mouth - changes based on expression */}
      <div 
        className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-1 text-xs text-primary-foreground"
        style={{ fontSize: '6px' }}
      >
        {catExpression === 'happy' ? '𝜔' : catExpression === 'excited' ? 'ᵕ' : '‿'}
      </div>
      
      {/* Cat whiskers */}
      <div className="cat-whiskers left1" />
      <div className="cat-whiskers left2" />
      <div className="cat-whiskers right1" />
      <div className="cat-whiskers right2" />
      
      {/* Cat tail */}
      <div className="cat-tail" />
      
      {/* Cat paws */}
      <div className="absolute bottom-1 left-2 w-2 h-1 bg-gradient-cat rounded-full opacity-80" />
      <div className="absolute bottom-1 right-2 w-2 h-1 bg-gradient-cat rounded-full opacity-80" />
      
      {/* Speech bubble when clicked */}
      {isPlaying && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white rounded-lg text-xs font-cute text-primary shadow-lg animate-bounce">
          {catExpression === 'happy' ? 'Nya~!' : 
           catExpression === 'excited' ? 'Money!' : 
           catExpression === 'concerned' ? 'Careful!' : 
           catExpression === 'curious' ? 'Hmm?' : 
           'Zzz...'}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white" />
        </div>
      )}
    </div>
  );
};