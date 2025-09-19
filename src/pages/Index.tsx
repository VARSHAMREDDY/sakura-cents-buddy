import { useState } from 'react';
import { SakuraTree } from '@/components/SakuraTree';
import { SakuraCat } from '@/components/SakuraCat';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { IncomePage } from '@/components/pages/IncomePage';
import { ExpensePage } from '@/components/pages/ExpensePage';
import { ChartsPage } from '@/components/pages/ChartsPage';
import { NotesPage } from '@/components/pages/NotesPage';

// Import other page components for the additional categories
const StocksPage = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-3xl font-cute font-bold text-primary mb-2">
        📈 Investment Tracker
      </h1>
      <p className="text-lg font-sakura text-muted-foreground">
        Track your investment portfolio and stock purchases
      </p>
    </div>
    <div className="card-sakura">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-xl font-cute font-bold text-foreground mb-2">Coming Soon!</h2>
        <p className="font-sakura text-muted-foreground">
          This beautiful feature is blooming and will be ready soon! 🌸
        </p>
      </div>
    </div>
  </div>
);

const BeautyPage = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-3xl font-cute font-bold text-primary mb-2">
        💆‍♀️ Beauty & Self-care
      </h1>
      <p className="text-lg font-sakura text-muted-foreground">
        Track your wellness and self-care investments
      </p>
    </div>
    <div className="card-sakura">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌸</div>
        <h2 className="text-xl font-cute font-bold text-foreground mb-2">Blooming Soon!</h2>
        <p className="font-sakura text-muted-foreground">
          Self-care tracking is growing and will bloom beautifully! ✨
        </p>
      </div>
    </div>
  </div>
);

const GiftsPage = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-3xl font-cute font-bold text-primary mb-2">
        🎁 Gifts & Treats
      </h1>
      <p className="text-lg font-sakura text-muted-foreground">
        Keep track of gifts for loved ones and special treats
      </p>
    </div>
    <div className="card-sakura">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎀</div>
        <h2 className="text-xl font-cute font-bold text-foreground mb-2">Gift Wrapping Soon!</h2>
        <p className="font-sakura text-muted-foreground">
          This sweet feature is being carefully wrapped with love! 💝
        </p>
      </div>
    </div>
  </div>
);

const MakeupPage = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-3xl font-cute font-bold text-primary mb-2">
        💄 Makeup & Skincare
      </h1>
      <p className="text-lg font-sakura text-muted-foreground">
        Track your beauty collection and skincare routine expenses
      </p>
    </div>
    <div className="card-sakura">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-xl font-cute font-bold text-foreground mb-2">Getting Glam!</h2>
        <p className="font-sakura text-muted-foreground">
          This gorgeous feature is getting ready and will be stunning! 💋
        </p>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'income':
        return <IncomePage />;
      case 'expenses':
        return <ExpensePage />;
      case 'stocks':
        return <StocksPage />;
      case 'beauty':
        return <BeautyPage />;
      case 'gifts':
        return <GiftsPage />;
      case 'makeup':
        return <MakeupPage />;
      case 'charts':
        return <ChartsPage />;
      case 'notes':
        return <NotesPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen font-sakura" style={{ fontFamily: '"Quicksand", sans-serif' }}>
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-sakura" />
      
      {/* Sakura Tree Animation */}
      <SakuraTree />
      
      {/* Navigation */}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Main Content */}
      <main className="ml-72 p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {renderCurrentPage()}
        </div>
      </main>
      
      {/* Interactive Cat */}
      <SakuraCat currentPage={currentPage} />
      
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Additional floating sakura petals */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sakura-petal rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 left-3/4 w-3 h-3 bg-sakura-flower rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-sakura-petal rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }} />
        
        {/* Sparkle effects */}
        <div className="absolute top-1/5 right-1/4 w-1 h-1 bg-primary rounded-full animate-pulse opacity-30" />
        <div className="absolute top-3/5 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default Index;