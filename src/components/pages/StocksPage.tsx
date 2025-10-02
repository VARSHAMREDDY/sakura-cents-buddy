import { useState } from 'react';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface StockEntry {
  id: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  type: 'stock' | 'mutual-fund' | 'crypto' | 'gold';
}

export const StocksPage = () => {
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([
    {
      id: '1',
      name: 'Reliance Industries',
      quantity: 10,
      buyPrice: 2500,
      currentPrice: 2650,
      type: 'stock',
    },
    {
      id: '2',
      name: 'SBI Bluechip Fund',
      quantity: 100,
      buyPrice: 50,
      currentPrice: 55,
      type: 'mutual-fund',
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    name: '',
    quantity: '',
    buyPrice: '',
    currentPrice: '',
    type: 'stock' as const,
  });

  const investmentTypes = [
    { id: 'stock', label: '📈 Stocks', emoji: '📈', color: 'from-blue-400 to-indigo-400' },
    { id: 'mutual-fund', label: '💼 Mutual Funds', emoji: '💼', color: 'from-green-400 to-emerald-400' },
    { id: 'crypto', label: '🪙 Cryptocurrency', emoji: '🪙', color: 'from-amber-400 to-orange-400' },
    { id: 'gold', label: '🏆 Gold', emoji: '🏆', color: 'from-yellow-400 to-amber-400' },
  ];

  const handleAddEntry = () => {
    if (newEntry.name && newEntry.quantity && newEntry.buyPrice && newEntry.currentPrice) {
      const entry: StockEntry = {
        id: Date.now().toString(),
        name: newEntry.name,
        quantity: parseFloat(newEntry.quantity),
        buyPrice: parseFloat(newEntry.buyPrice),
        currentPrice: parseFloat(newEntry.currentPrice),
        type: newEntry.type,
      };
      setStockEntries([entry, ...stockEntries]);
      setNewEntry({
        name: '',
        quantity: '',
        buyPrice: '',
        currentPrice: '',
        type: 'stock',
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setStockEntries(stockEntries.filter(entry => entry.id !== id));
  };

  const calculateTotalInvestment = () => {
    return stockEntries.reduce((sum, entry) => sum + (entry.buyPrice * entry.quantity), 0);
  };

  const calculateCurrentValue = () => {
    return stockEntries.reduce((sum, entry) => sum + (entry.currentPrice * entry.quantity), 0);
  };

  const calculateProfitLoss = () => {
    return calculateCurrentValue() - calculateTotalInvestment();
  };

  const profitLoss = calculateProfitLoss();
  const profitLossPercentage = ((profitLoss / calculateTotalInvestment()) * 100).toFixed(2);

  const getTypeInfo = (typeId: string) => {
    return investmentTypes.find(type => type.id === typeId) || investmentTypes[0];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cute font-bold text-primary mb-2">
          📈 Investment Tracker
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Track your investment portfolio and grow your wealth
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-sakura text-center">
          <div className="text-3xl mb-2">💰</div>
          <h2 className="text-sm font-cute font-semibold text-muted-foreground mb-1">
            Total Invested
          </h2>
          <p className="text-2xl font-bold text-primary">
            ₹{calculateTotalInvestment().toLocaleString()}
          </p>
        </div>

        <div className="card-sakura text-center">
          <div className="text-3xl mb-2">📊</div>
          <h2 className="text-sm font-cute font-semibold text-muted-foreground mb-1">
            Current Value
          </h2>
          <p className="text-2xl font-bold text-primary">
            ₹{calculateCurrentValue().toLocaleString()}
          </p>
        </div>

        <div className="card-sakura text-center">
          <div className="text-3xl mb-2">{profitLoss >= 0 ? '📈' : '📉'}</div>
          <h2 className="text-sm font-cute font-semibold text-muted-foreground mb-1">
            Profit/Loss
          </h2>
          <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {profitLoss >= 0 ? '+' : ''}₹{profitLoss.toLocaleString()}
          </p>
          <p className={`text-sm font-sakura ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ({profitLoss >= 0 ? '+' : ''}{profitLossPercentage}%)
          </p>
        </div>
      </div>

      {/* Add New Investment Form */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6 flex items-center gap-2">
          <Plus className="text-primary" size={24} />
          Add New Investment
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Investment Name
            </label>
            <input
              type="text"
              placeholder="e.g., Reliance, SBI MF, Bitcoin"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              className="input-sakura"
            />
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Quantity/Units
            </label>
            <input
              type="number"
              placeholder="0"
              value={newEntry.quantity}
              onChange={(e) => setNewEntry({ ...newEntry, quantity: e.target.value })}
              className="input-sakura"
            />
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Type
            </label>
            <select
              value={newEntry.type}
              onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value as any })}
              className="input-sakura"
            >
              {investmentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Buy Price (₹)
            </label>
            <input
              type="number"
              placeholder="0"
              value={newEntry.buyPrice}
              onChange={(e) => setNewEntry({ ...newEntry, buyPrice: e.target.value })}
              className="input-sakura"
            />
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Current Price (₹)
            </label>
            <input
              type="number"
              placeholder="0"
              value={newEntry.currentPrice}
              onChange={(e) => setNewEntry({ ...newEntry, currentPrice: e.target.value })}
              className="input-sakura"
            />
          </div>
        </div>

        <button
          onClick={handleAddEntry}
          className="btn-sakura w-full mt-6"
        >
          <Plus size={20} />
          Add Investment
        </button>
      </div>

      {/* Investment Type Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {investmentTypes.map(type => {
          const typeTotal = stockEntries
            .filter(entry => entry.type === type.id)
            .reduce((sum, entry) => sum + (entry.currentPrice * entry.quantity), 0);
          
          return (
            <div key={type.id} className="card-sakura text-center">
              <div className="text-3xl mb-2">{type.emoji}</div>
              <h3 className="font-cute font-semibold text-foreground text-sm mb-1">
                {type.label}
              </h3>
              <p className="text-lg font-bold text-primary">₹{typeTotal.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Portfolio List */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6">
          📊 Your Portfolio
        </h2>
        
        <div className="space-y-3">
          {stockEntries.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📈</div>
              <p className="font-sakura text-muted-foreground">
                No investments tracked yet. Start building your portfolio!
              </p>
            </div>
          ) : (
            stockEntries.map(entry => {
              const typeInfo = getTypeInfo(entry.type);
              const investmentValue = entry.buyPrice * entry.quantity;
              const currentValue = entry.currentPrice * entry.quantity;
              const gain = currentValue - investmentValue;
              const gainPercentage = ((gain / investmentValue) * 100).toFixed(2);
              
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-soft hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${typeInfo.color} flex items-center justify-center text-white text-lg`}>
                    {typeInfo.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-cute font-semibold text-foreground">
                      {entry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sakura">
                      {entry.quantity} units × ₹{entry.currentPrice}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ₹{currentValue.toLocaleString()}
                    </p>
                    <div className={`flex items-center gap-1 text-sm font-sakura ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {gain >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {gain >= 0 ? '+' : ''}₹{gain.toFixed(0)} ({gain >= 0 ? '+' : ''}{gainPercentage}%)
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-2 rounded-xl hover:bg-red-100 text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
