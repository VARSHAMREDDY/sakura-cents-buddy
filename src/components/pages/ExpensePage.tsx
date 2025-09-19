import { useState } from 'react';
import { Plus, Target, AlertTriangle } from 'lucide-react';

interface ExpenseEntry {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  budgeted: boolean;
}

interface BudgetLimit {
  category: string;
  limit: number;
  spent: number;
}

export const ExpensePage = () => {
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([
    { id: '1', description: 'Grocery Shopping', amount: 120, category: 'food', date: '2024-01-15', budgeted: true },
    { id: '2', description: 'Cute Top from Zara', amount: 45, category: 'clothes', date: '2024-01-14', budgeted: true },
    { id: '3', description: 'Coffee Date', amount: 15, category: 'food', date: '2024-01-13', budgeted: true },
  ]);

  const [budgets, setBudgets] = useState<BudgetLimit[]>([
    { category: 'food', limit: 500, spent: 135 },
    { category: 'clothes', limit: 300, spent: 45 },
    { category: 'entertainment', limit: 200, spent: 0 },
    { category: 'transport', limit: 150, spent: 0 },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    { id: 'food', label: 'Food & Drinks', emoji: '🍱', color: 'from-orange-400 to-red-400' },
    { id: 'clothes', label: 'Clothes & Fashion', emoji: '👗', color: 'from-pink-400 to-rose-400' },
    { id: 'entertainment', label: 'Entertainment', emoji: '🎉', color: 'from-purple-400 to-violet-400' },
    { id: 'transport', label: 'Transport', emoji: '🚗', color: 'from-blue-400 to-indigo-400' },
    { id: 'health', label: 'Health & Wellness', emoji: '💊', color: 'from-green-400 to-emerald-400' },
    { id: 'other', label: 'Other', emoji: '💸', color: 'from-gray-400 to-slate-400' },
  ];

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense: ExpenseEntry = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        budgeted: true,
      };
      
      setExpenses([...expenses, expense]);
      
      // Update budget spent amount
      setBudgets(budgets.map(budget => 
        budget.category === newExpense.category 
          ? { ...budget, spent: budget.spent + parseFloat(newExpense.amount) }
          : budget
      ));
      
      setNewExpense({
        description: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const setBudgetLimit = (category: string, limit: number) => {
    setBudgets(budgets.map(budget => 
      budget.category === category ? { ...budget, limit } : budget
    ));
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[categories.length - 1];
  };

  const getBudgetStatus = (budget: BudgetLimit) => {
    const percentage = (budget.spent / budget.limit) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'good';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cute font-bold text-primary mb-2">
          🛍️ Daily Expenses Tracker
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Keep track of your spending with style
        </p>
      </div>

      {/* Budget Overview */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6 flex items-center gap-2">
          <Target size={24} className="text-primary" />
          Monthly Budget Limits 🎯
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((budget) => {
            const categoryInfo = getCategoryInfo(budget.category);
            const percentage = (budget.spent / budget.limit) * 100;
            const status = getBudgetStatus(budget);
            
            return (
              <div key={budget.category} className="p-4 rounded-2xl border border-primary/10 bg-gradient-soft">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center text-white text-lg`}>
                    {categoryInfo.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-cute font-semibold text-foreground">{categoryInfo.label}</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={budget.limit}
                        onChange={(e) => setBudgetLimit(budget.category, parseFloat(e.target.value) || 0)}
                        className="input-sakura text-sm w-20"
                        placeholder="Limit"
                      />
                      <span className="text-sm text-muted-foreground">monthly limit</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spent: ${budget.spent}</span>
                    <span className={`font-semibold ${
                      status === 'danger' ? 'text-red-500' : 
                      status === 'warning' ? 'text-amber-500' : 'text-green-500'
                    }`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ease-out rounded-full ${
                        status === 'danger' ? 'bg-gradient-to-r from-red-400 to-red-500' :
                        status === 'warning' ? 'bg-gradient-to-r from-amber-400 to-orange-400' :
                        'bg-gradient-coral'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  
                  {status === 'danger' && (
                    <div className="flex items-center gap-1 text-red-500 text-xs">
                      <AlertTriangle size={12} />
                      Budget exceeded!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Expense */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6 flex items-center gap-2">
          <Plus size={24} className="text-primary" />
          Add New Expense
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Description
            </label>
            <input
              type="text"
              placeholder="What did you buy?"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="input-sakura w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="input-sakura w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Category
            </label>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="input-sakura w-full"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-sakura font-medium text-foreground mb-2">
              Date
            </label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="input-sakura w-full"
            />
          </div>
        </div>
        
        <button
          onClick={handleAddExpense}
          className="btn-sakura mt-6 w-full md:w-auto"
        >
          <Plus size={20} className="mr-2" />
          Add Expense
        </button>
      </div>

      {/* Recent Expenses */}
      <div className="space-y-4">
        <h2 className="text-xl font-cute font-bold text-foreground">Recent Expenses 💸</h2>
        
        {expenses.slice(-5).reverse().map((expense) => {
          const categoryInfo = getCategoryInfo(expense.category);
          
          return (
            <div key={expense.id} className="card-sakura">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center text-white text-lg`}>
                    {categoryInfo.emoji}
                  </div>
                  <div>
                    <h3 className="font-cute font-semibold text-foreground">{expense.description}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{categoryInfo.label}</span>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-primary">
                  -${expense.amount.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};