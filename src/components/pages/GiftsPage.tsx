import { useState } from 'react';
import { Plus, Trash2, Calendar, Heart } from 'lucide-react';

interface GiftEntry {
  id: string;
  recipient: string;
  gift: string;
  amount: number;
  occasion: 'birthday' | 'anniversary' | 'holiday' | 'justbecause';
  date: string;
}

export const GiftsPage = () => {
  const [giftEntries, setGiftEntries] = useState<GiftEntry[]>([
    {
      id: '1',
      recipient: 'Mom',
      gift: 'Perfume Set',
      amount: 3500,
      occasion: 'birthday',
      date: '2024-01-20',
    },
    {
      id: '2',
      recipient: 'Best Friend',
      gift: 'Jewelry',
      amount: 2000,
      occasion: 'justbecause',
      date: '2024-01-12',
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    recipient: '',
    gift: '',
    amount: '',
    occasion: 'birthday' as const,
    date: new Date().toISOString().split('T')[0],
  });

  const occasions = [
    { id: 'birthday', label: '🎂 Birthday', emoji: '🎂', color: 'from-pink-400 to-rose-400' },
    { id: 'anniversary', label: '💕 Anniversary', emoji: '💕', color: 'from-red-400 to-pink-400' },
    { id: 'holiday', label: '🎄 Holiday', emoji: '🎄', color: 'from-green-400 to-emerald-400' },
    { id: 'justbecause', label: '✨ Just Because', emoji: '✨', color: 'from-purple-400 to-violet-400' },
  ];

  const handleAddEntry = () => {
    if (newEntry.recipient && newEntry.gift && newEntry.amount) {
      const entry: GiftEntry = {
        id: Date.now().toString(),
        recipient: newEntry.recipient,
        gift: newEntry.gift,
        amount: parseFloat(newEntry.amount),
        occasion: newEntry.occasion,
        date: newEntry.date,
      };
      setGiftEntries([entry, ...giftEntries]);
      setNewEntry({
        recipient: '',
        gift: '',
        amount: '',
        occasion: 'birthday',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setGiftEntries(giftEntries.filter(entry => entry.id !== id));
  };

  const totalSpent = giftEntries.reduce((sum, entry) => sum + entry.amount, 0);

  const getOccasionInfo = (occasionId: string) => {
    return occasions.find(occ => occ.id === occasionId) || occasions[0];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cute font-bold text-primary mb-2">
          🎁 Gifts & Treats
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Keep track of gifts for loved ones and special treats
        </p>
      </div>

      {/* Total Spent Summary */}
      <div className="card-sakura text-center">
        <div className="text-4xl mb-2">💝</div>
        <h2 className="text-xl font-cute font-bold text-foreground mb-2">
          Total Gift Spending
        </h2>
        <p className="text-4xl font-bold text-primary mb-2">
          ₹{totalSpent.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground font-sakura">
          {giftEntries.length} gifts given with love
        </p>
      </div>

      {/* Add New Gift Form */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6 flex items-center gap-2">
          <Plus className="text-primary" size={24} />
          Add New Gift
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Recipient
            </label>
            <input
              type="text"
              placeholder="Who is this gift for?"
              value={newEntry.recipient}
              onChange={(e) => setNewEntry({ ...newEntry, recipient: e.target.value })}
              className="input-sakura"
            />
          </div>

          <div>
            <label className="block text-sm font-sakura font-semibold text-foreground mb-2">
              Gift Description
            </label>
            <input
              type="text"
              placeholder="What did you give?"
              value={newEntry.gift}
              onChange={(e) => setNewEntry({ ...newEntry, gift: e.target.value })}
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
              Occasion
            </label>
            <select
              value={newEntry.occasion}
              onChange={(e) => setNewEntry({ ...newEntry, occasion: e.target.value as any })}
              className="input-sakura"
            >
              {occasions.map(occ => (
                <option key={occ.id} value={occ.id}>{occ.label}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
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
          Add Gift
        </button>
      </div>

      {/* Occasion Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {occasions.map(occasion => {
          const occasionTotal = giftEntries
            .filter(entry => entry.occasion === occasion.id)
            .reduce((sum, entry) => sum + entry.amount, 0);
          
          return (
            <div key={occasion.id} className="card-sakura text-center">
              <div className="text-3xl mb-2">{occasion.emoji}</div>
              <h3 className="font-cute font-semibold text-foreground text-sm mb-1">
                {occasion.label}
              </h3>
              <p className="text-lg font-bold text-primary">₹{occasionTotal}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Gifts List */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6">
          📋 Gift History
        </h2>
        
        <div className="space-y-3">
          {giftEntries.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎀</div>
              <p className="font-sakura text-muted-foreground">
                No gifts recorded yet. Start tracking your generous moments!
              </p>
            </div>
          ) : (
            giftEntries.map(entry => {
              const occasionInfo = getOccasionInfo(entry.occasion);
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-soft hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${occasionInfo.color} flex items-center justify-center text-white text-lg`}>
                    {occasionInfo.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-cute font-semibold text-foreground flex items-center gap-2">
                      {entry.gift}
                      <Heart size={14} className="text-red-400" />
                    </h3>
                    <p className="text-sm text-muted-foreground font-sakura">
                      For {entry.recipient}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-sakura mt-1">
                      <Calendar size={12} />
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
