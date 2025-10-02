import { useState } from 'react';
import { 
  Home, 
  DollarSign, 
  ShoppingCart, 
  PieChart, 
  StickyNote, 
  TrendingUp,
  Heart,
  Gift,
  Palette
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-pink-400 to-rose-400' },
  { id: 'income', label: 'Income & Salary', icon: DollarSign, color: 'from-green-400 to-emerald-400' },
  { id: 'expenses', label: 'Daily Expenses', icon: ShoppingCart, color: 'from-purple-400 to-violet-400' },
  { id: 'stocks', label: 'Investments', icon: TrendingUp, color: 'from-blue-400 to-indigo-400' },
  { id: 'beauty', label: 'Beauty & Self-care', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'gifts', label: 'Gifts & Treats', icon: Gift, color: 'from-amber-400 to-orange-400' },
  { id: 'charts', label: 'Analytics', icon: PieChart, color: 'from-teal-400 to-cyan-400' },
  { id: 'notes', label: 'Dream Notes', icon: StickyNote, color: 'from-indigo-400 to-purple-400' },
];

export const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="fixed left-0 top-0 h-full w-72 p-6 z-50">
      <div className="card-sakura h-full flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-cute font-bold text-primary mb-2">
            🌸 Sakura Budget
          </h1>
          <p className="text-sm text-muted-foreground font-sakura">
            Track your dreams with style
          </p>
        </div>
        
        <div className="space-y-2 flex-1 overflow-y-auto pr-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full nav-item font-sakura ${isActive ? 'active' : ''}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                  isActive || isHovered 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  <Icon size={20} />
                </div>
                
                <span className={`font-medium transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-foreground'
                }`}>
                  {item.label}
                </span>
                
                {(isActive || isHovered) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 p-4 rounded-2xl bg-gradient-soft border border-primary/20">
          <div className="text-xs font-cute text-muted-foreground mb-2">
            💡 Tip of the Day
          </div>
          <p className="text-sm font-sakura text-foreground">
            Small savings today bloom into big dreams tomorrow! 🌸
          </p>
        </div>
      </div>
    </nav>
  );
};