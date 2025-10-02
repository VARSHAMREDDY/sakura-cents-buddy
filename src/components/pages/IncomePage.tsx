import { useState } from 'react';
import { Plus, DollarSign, Briefcase, Calendar } from 'lucide-react';

interface IncomeEntry {
  id: string;
  source: string;
  amount: number;
  type: 'salary' | 'freelance' | 'investment' | 'other';
  date: string;
  recurring: boolean;
}

export const IncomePage = () => {
  const [incomes, setIncomes] = useState<IncomeEntry[]>([
    {
      id: '1',
      source: 'Main Salary',
      amount: 4200,
      type: 'salary',
      date: '2024-01-01',
      recurring: true,
    },
    {
      id: '2',
      source: 'Freelance Project',
      amount: 800,
      type: 'freelance',
      date: '2024-01-15',
      recurring: false,
    },
  ]);

  const [newIncome, setNewIncome] = useState({
    source: '',
    amount: '',
    type: 'salary' as const,
    date: new Date().toISOString().split('T')[0],
    recurring: false,
  });

  const handleAddIncome = () => {
    if (newIncome.source && newIncome.amount) {
      const income: IncomeEntry = {
        id: Date.now().toString(),
        source: newIncome.source,
        amount: parseFloat(newIncome.amount),
        type: newIncome.type,
        date: newIncome.date,
        recurring: newIncome.recurring,
      };
      
      setIncomes([...incomes, income]);
      setNewIncome({
        source: '',
        amount: '',
        type: 'salary',
        date: new Date().toISOString().split('T')[0],
        recurring: false,
      });
    }
  };

  const totalMonthlyIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'salary': return '💼';
      case 'freelance': return '✨';
      case 'investment': return '📈';
      default: return '💰';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'salary': return 'from-blue-400 to-indigo-400';
      case 'freelance': return 'from-purple-400 to-violet-400';
      case 'investment': return 'from-green-400 to-emerald-400';
      default: return 'from-gray-400 to-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cute font-bold text-primary mb-2">
          💰 Income & Salary Tracker
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Track all your beautiful income sources
        </p>
      </div>

      {/* Monthly Summary */}
      <div className="card-sakura">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-white">
            <DollarSign size={24} />
          </div>
          <div>
            <h2 className="text-xl font-cute font-bold text-foreground">Monthly Total</h2>
            <p className="text-sm text-muted-foreground">All income sources combined</p>
          </div>
        </div>
        <div className="text-4xl font-bold text-primary mb-2">
          ₹{totalMonthlyIncome.toLocaleString()}
        </div>
        <p className="text-muted-foreground font-sakura">
          From {incomes.length} income source{incomes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Add New Income */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6 flex items-center gap-2">
          <Plus size={24} className="text-primary" />
          Add New Income Source
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Income Source
            </label>
            <input
              type="text"
              placeholder="e.g., Main Job, Side Hustle..."
              value={newIncome.source}
              onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
              className="input-sakura w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={newIncome.amount}
              onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              className="input-sakura w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Type
            </label>
            <select
              value={newIncome.type}
              onChange={(e) => setNewIncome({ ...newIncome, type: e.target.value as any })}
              className="input-sakura w-full"
            >
              <option value="salary">💼 Salary</option>
              <option value="freelance">✨ Freelance</option>
              <option value="investment">📈 Investment</option>
              <option value="other">💰 Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Date
            </label>
            <input
              type="date"
              value={newIncome.date}
              onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
              className="input-sakura w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="recurring"
            checked={newIncome.recurring}
            onChange={(e) => setNewIncome({ ...newIncome, recurring: e.target.checked })}
            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <label htmlFor="recurring" className="text-sm font-sakura text-foreground">
            This is a recurring monthly income
          </label>
        </div>
        
        <button
          onClick={handleAddIncome}
          className="btn-sakura mt-6 w-full md:w-auto"
        >
          <Plus size={20} className="mr-2" />
          Add Income Source
        </button>
      </div>

      {/* Income List */}
      <div className="space-y-4">
        <h2 className="text-xl font-cute font-bold text-foreground">Your Income Sources 🌟</h2>
        
        {incomes.map((income) => (
          <div key={income.id} className="card-sakura">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${getTypeColor(income.type)} flex items-center justify-center text-white text-lg`}>
                  {getTypeIcon(income.type)}
                </div>
                <div>
                  <h3 className="font-cute font-semibold text-foreground">{income.source}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(income.date).toLocaleDateString()}
                    </span>
                    {income.recurring && (
                      <span className="flex items-center gap-1 text-primary">
                        <Briefcase size={14} />
                        Recurring
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ₹{income.amount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {income.type}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};