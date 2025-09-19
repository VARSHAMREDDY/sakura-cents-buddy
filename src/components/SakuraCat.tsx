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