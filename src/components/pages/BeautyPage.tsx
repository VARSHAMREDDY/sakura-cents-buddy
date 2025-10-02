import { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface BeautyEntry {
  id: string;
  product: string;
  amount: number;
  category: 'skincare' | 'haircare' | 'spa' | 'wellness';
  date: string;
}

export const BeautyPage = () => {
  const [beautyEntries, setBeautyEntries] = useState<BeautyEntry[]>([
    {
      id: '1',
      product: 'Facial Treatment',
      amount: 2500,
      category: 'spa',
      date: '2024-01-15',
    },
    {
      id: '2',
      product: 'Hair Serum',
      amount: 800,
      category: 'haircare',
      date: '2024-01-10',
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    product: '',
    amount: '',
    category: 'skincare' as const,
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    { id: 'skincare', label: '✨ Skincare', emoji: '✨', color: 'from-pink-400 to-rose-400' },
    { id: 'haircare', label: '💇 Haircare', emoji: '💇', color: 'from-purple-400 to-violet-400' },
    { id: 'spa', label: '💆 Spa & Massage', emoji: '💆', color: 'from-blue-400 to-indigo-400' },
    { id: 'wellness', label: '🧘 Wellness', emoji: '🧘', color: 'from-green-400 to-emerald-400' },
  ];

  const handleAddEntry = () => {
    if (newEntry.product && newEntry.amount) {
      const entry: BeautyEntry = {
        id: Date.now().toString(),
        product: newEntry.product,
        amount: parseFloat(newEntry.amount),
        category: newEntry.category,
        date: newEntry.date,
      };
      setBeautyEntries([entry, ...beautyEntries]);
      setNewEntry({
        product: '',
        amount: '',
        category: 'skincare',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setBeautyEntries(beautyEntries.filter(entry => entry.id !== id));
  };

  const totalSpent = beautyEntries.reduce((sum, entry) => sum + entry.amount, 0);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cute font-bold text-primary mb-2">
          💆‍♀️ Beauty & Self-care
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Track your wellness and self-care investments
        </p>
      </div>

      {/* Total Spent Summary */}
      <div className="card-sakura text-center">
        <div className="text-4xl mb-2">💖</div>
        <h2 className="text-xl font-cute font-bold text-foreground mb-2">
          Total Beauty Investment
        </h2>
        <p className="text-4xl font-bold text-primary mb-2">
          ₹{totalSpent.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground font-sakura">
          {beautyEntries.length} treatments & products tracked
        </p>
      </div>

      {/* Add New Entry Form */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6 flex items-center gap-2">
          <Plus className="text-primary" size={24} />
          Add New Entry
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Product/Service Name
            </label>
            <input
              type="text"
              placeholder="e.g., Face Cream, Spa Day"
              value={newEntry.product}
              onChange={(e) => setNewEntry({ ...newEntry, product: e.target.value })}
              className="input-sakura"
            />
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="0"
              value={newEntry.amount}
              onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
              className="input-sakura"
            />
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Category
            </label>
            <select
              value={newEntry.category}
              onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value as any })}
              className="input-sakura"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Date
            </label>
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              className="input-sakura"
            />
          </div>
        </div>

        <button
          onClick={handleAddEntry}
          className="btn-sakura w-full mt-6"
        >
          <Plus size={20} />
          Add Entry
        </button>
      </div>

      {/* Category Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(category => {
          const categoryTotal = beautyEntries
            .filter(entry => entry.category === category.id)
            .reduce((sum, entry) => sum + entry.amount, 0);
          
          return (
            <div key={category.id} className="card-sakura text-center">
              <div className="text-3xl mb-2">{category.emoji}</div>
              <h3 className="font-cute font-semibold text-foreground text-sm mb-1">
                {category.label}
              </h3>
              <p className="text-lg font-bold text-primary">₹{categoryTotal}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Entries List */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6">
          📋 Recent Entries
        </h2>
        
        <div className="space-y-3">
          {beautyEntries.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🌸</div>
              <p className="font-sakura text-muted-foreground">
                No entries yet. Start tracking your beauty investments!
              </p>
            </div>
          ) : (
            beautyEntries.map(entry => {
              const categoryInfo = getCategoryInfo(entry.category);
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-soft hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center text-white text-lg`}>
                    {categoryInfo.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-cute font-semibold text-foreground">
                      {entry.product}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-sakura">
                      <Calendar size={14} />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ₹{entry.amount.toLocaleString()}
                    </p>
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
