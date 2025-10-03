import { useState, useEffect } from 'react';

interface SakuraCatProps {
  currentPage?: string;
}

export const SakuraCat = ({ currentPage = 'dashboard' }: SakuraCatProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [catExpression, setCatExpression] = useState('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 90 });
  const [isWalking, setIsWalking] = useState(false);
  const [tailWag, setTailWag] = useState(0);
  const [earTwitch, setEarTwitch] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Change cat expression based on current page
    const expressions = {
      dashboard: 'happy',
      income: 'excited',
      expenses: 'concerned',
      stocks: 'curious',
      charts: 'curious',
      notes: 'sleepy',
      beauty: 'happy',
      gifts: 'excited',
    };
    setCatExpression(expressions[currentPage as keyof typeof expressions] || 'normal');
  }, [currentPage]);

  // Autonomous tail wagging
  useEffect(() => {
    const wagInterval = setInterval(() => {
      setTailWag(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(wagInterval);
  }, []);

  // Random ear twitches
  useEffect(() => {
    const twitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setEarTwitch(true);
        setTimeout(() => setEarTwitch(false), 200);
      }
    }, 3000);
    return () => clearInterval(twitchInterval);
  }, []);

  // Random autonomous movements
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (Math.random() > 0.6 && !isWalking) {
        setIsWalking(true);
        const newX = 20 + Math.random() * 60;
        const newY = 80 + Math.random() * 15;
        setPosition({ x: newX, y: newY });
        
        setTimeout(() => setIsWalking(false), 2000);
      }
    }, 8000);
    return () => clearInterval(moveInterval);
  }, [isWalking]);

  const handleCatClick = () => {
    setIsPlaying(true);
    setShowHearts(true);
    
    // Fun interactions with sounds
    const sounds = ['Nya~! 😺', 'Meow! 🐱', 'Purr~ ❤️', '*chirp* 🎵'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    console.log(`🐱 ${randomSound}`);
    
    // Make cat jump when clicked
    setPosition(prev => ({ ...prev, y: prev.y - 5 }));
    setTimeout(() => setPosition(prev => ({ ...prev, y: prev.y + 5 })), 300);
    
    setTimeout(() => {
      setIsPlaying(false);
      setShowHearts(false);
    }, 1500);
  };

  const handleCatDoubleClick = () => {
    // Cat does a spin!
    setIsPlaying(true);
    const spinAnimation = document.querySelector('.sakura-cat');
    if (spinAnimation) {
      (spinAnimation as HTMLElement).style.animation = 'spin 0.5s ease-in-out';
      setTimeout(() => {
        (spinAnimation as HTMLElement).style.animation = '';
      }, 500);
    }
    setTimeout(() => setIsPlaying(false), 500);
  };

  const getCatFace = () => {
    if (isPlaying) return '⌒   ⌒'; // Happy closed eyes
    switch (catExpression) {
      case 'happy': return '◕ ω ◕';
      case 'excited': return '★ ▽ ★';
      case 'concerned': return '° ﹏ °';
      case 'curious': return '◉ ‿ ◉';
      case 'sleepy': return '- ‿ -';
      default: return '• ω •';
    }
  };

  const getPawAnimation = () => {
    return isWalking ? 'animate-bounce' : '';
  };

  return (
    <>
      <div 
        className={`sakura-cat ${isPlaying ? 'animate-bounce' : ''} ${isWalking ? 'transition-all duration-2000 ease-in-out' : ''}`}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowHearts(true);
          setTimeout(() => setShowHearts(false), 1000);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCatClick}
        onDoubleClick={handleCatDoubleClick}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: isHovered 
            ? 'translate(-50%, -50%) scale(1.2) rotate(-3deg)' 
            : 'translate(-50%, -50%) scale(1)',
          cursor: 'pointer',
          transition: isWalking ? 'all 2s ease-in-out' : 'transform 0.3s ease',
        }}
      >
        {/* Cat ears with twitch animation */}
        <div className={`cat-ears left ${earTwitch ? 'animate-pulse' : ''}`} />
        <div className={`cat-ears right ${earTwitch ? 'animate-pulse' : ''}`} />
        
        {/* Sakura flower crown on head */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          {/* Beautiful sakura flower crown */}
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <div
              key={angle}
              className="absolute"
              style={{
                transform: `rotate(${angle}deg) translateY(-6px)`,
              }}
            >
              {/* Individual flower */}
              <div className="relative w-3 h-3">
                {[0, 72, 144, 216, 288].map((petalAngle) => (
                  <div
                    key={petalAngle}
                    className="absolute"
                    style={{
                      width: '5px',
                      height: '6px',
                      background: 'linear-gradient(135deg, #ffb3d9 0%, #ffc9e3 50%, #ffe0f0 100%)',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${petalAngle}deg) translateY(-2px)`,
                      transformOrigin: 'center center',
                      boxShadow: '0 1px 2px rgba(255,105,180,0.3)',
                    }}
                  />
                ))}
                {/* Flower center */}
                <div 
                  className="absolute top-1/2 left-1/2 rounded-full"
                  style={{
                    width: '2px',
                    height: '2px',
                    background: '#ff69b4',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
            </div>
          ))}
          {/* Crown center jewel */}
          <div className="w-2 h-2 bg-gradient-to-br from-[#ff69b4] to-[#ff1493] rounded-full shadow-md animate-pulse" />
        </div>
        
        {/* Floating hearts when loved */}
        {showHearts && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute text-2xl animate-float-up"
                style={{
                  left: `${(i - 1) * 20}px`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                💗
              </div>
            ))}
          </div>
        )}
        
        {/* Cat face - eyes with expression */}
        <div 
          className="absolute top-3 left-1/2 transform -translate-x-1/2 text-sm font-cute text-primary-foreground whitespace-nowrap"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          {getCatFace()}
        </div>
        
        {/* Cat nose */}
        <div className="cat-face" />
        
        {/* Cat mouth - animated based on state */}
        <div 
          className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-primary-foreground"
          style={{ fontSize: '8px' }}
        >
          {catExpression === 'happy' || isPlaying ? 'ᵕ' : 
           catExpression === 'excited' ? '𝜔' : 
           catExpression === 'concerned' ? '︵' : '‿'}
        </div>
        
        {/* Cat whiskers - animated */}
        <div className="cat-whiskers left1 animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="cat-whiskers left2 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
        <div className="cat-whiskers right1 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.2s' }} />
        <div className="cat-whiskers right2 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        
        {/* Cat tail - constantly wagging */}
        <div 
          className="cat-tail"
          style={{
            transform: `rotate(${Math.sin(tailWag * 0.1) * 20}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        
        {/* Cat paws - animated when walking */}
        <div className={`absolute bottom-2 left-2 w-3 h-2 bg-gradient-cat rounded-full opacity-80 ${getPawAnimation()}`} 
             style={{ animationDelay: '0s' }} />
        <div className={`absolute bottom-2 right-2 w-3 h-2 bg-gradient-cat rounded-full opacity-80 ${getPawAnimation()}`}
             style={{ animationDelay: '0.15s' }} />
        
        {/* Interactive speech bubble */}
        {isPlaying && (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white rounded-2xl text-sm font-cute text-primary shadow-2xl animate-bounce whitespace-nowrap">
            {catExpression === 'happy' ? 'Nya~! So happy! 😺' : 
             catExpression === 'excited' ? 'Yay! Money! 💰' : 
             catExpression === 'concerned' ? 'Be careful~ 😿' : 
             catExpression === 'curious' ? 'Hmm? What\'s this? 🤔' : 
             'Zzz... sleepy... 😴'}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
          </div>
        )}
        
        {/* Sparkles around cat when hovered */}
        {isHovered && (
          <>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <div
                key={angle}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translateX(30px)`,
                  animationDelay: `${idx * 0.1}s`,
                }}
              />
            ))}
          </>
        )}
      </div>
      
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        .animate-float-up {
          animation: float-up 1.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};
