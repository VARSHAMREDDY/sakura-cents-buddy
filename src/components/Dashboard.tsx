import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, Target, Sparkles } from 'lucide-react';

interface BudgetData {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  budgetGoals: number;
  categories: {
    food: number;
    beauty: number;
    entertainment: number;
    investments: number;
  };
}

export const Dashboard = () => {
  const [budgetData, setBudgetData] = useState<BudgetData>({
    totalIncome: 5000,
    totalExpenses: 3200,
    savings: 1800,
    budgetGoals: 2000,
    categories: {
      food: 800,
      beauty: 600,
      entertainment: 400,
      investments: 1200,
    }
  });

  const [animatedValues, setAnimatedValues] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
  });

  useEffect(() => {
    // Animate numbers on load
    const animateNumber = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 30);
    };

    animateNumber(budgetData.totalIncome, (value) => 
      setAnimatedValues(prev => ({ ...prev, income: value }))
    );
    animateNumber(budgetData.totalExpenses, (value) => 
      setAnimatedValues(prev => ({ ...prev, expenses: value }))
    );
    animateNumber(budgetData.savings, (value) => 
      setAnimatedValues(prev => ({ ...prev, savings: value }))
    );
  }, [budgetData]);

  const savingsRate = ((budgetData.savings / budgetData.totalIncome) * 100).toFixed(1);
  const goalProgress = ((budgetData.savings / budgetData.budgetGoals) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cute font-bold text-primary mb-4">
          Welcome back, Dream Saver! 🌸
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Let's see how your financial garden is blooming today
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Income */}
        <div className="card-sakura group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-white">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="font-cute font-semibold text-foreground">Total Income</h3>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            ${animatedValues.income.toLocaleString()}
          </div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            +12% from last month
          </div>
        </div>

        {/* Total Expenses */}
        <div className="card-sakura group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-400 to-violet-400 flex items-center justify-center text-white">
                <Wallet size={24} />
              </div>
              <div>
                <h3 className="font-cute font-semibold text-foreground">Total Expenses</h3>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            ${animatedValues.expenses.toLocaleString()}
          </div>
          <div className="flex items-center text-sm text-red-500">
            <TrendingDown size={16} className="mr-1" />
            +5% from last month
          </div>
        </div>

        {/* Savings */}
        <div className="card-sakura group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-cute font-semibold text-foreground">Savings</h3>
                <p className="text-sm text-muted-foreground">{savingsRate}% saved</p>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            ${animatedValues.savings.toLocaleString()}
          </div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            Great progress! 🌟
          </div>
        </div>
      </div>

      {/* Budget Goals Section */}
      <div className="card-sakura">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center text-white">
            <Target size={20} />
          </div>
          <h2 className="text-xl font-cute font-bold text-foreground">Monthly Goals 🎯</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-sakura text-foreground">Savings Goal</span>
              <span className="font-bold text-primary">${budgetData.savings} / ${budgetData.budgetGoals}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-coral transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${Math.min(parseFloat(goalProgress), 100)}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{goalProgress}% complete</p>
          </div>
        </div>
      </div>

      {/* Category Spending Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(budgetData.categories).map(([category, amount]) => (
          <div key={category} className="card-sakura text-center">
            <div className="text-2xl mb-2">
              {category === 'food' ? '🍱' : 
               category === 'beauty' ? '💄' : 
               category === 'entertainment' ? '🎉' : '📈'}
            </div>
            <h3 className="font-cute font-semibold text-foreground capitalize">{category}</h3>
            <p className="text-lg font-bold text-primary">${amount}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-4">Quick Actions ✨</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-sakura">Add Income 💰</button>
          <button className="btn-sakura">Log Expense 🛍️</button>
          <button className="btn-sakura">Set Budget 🎯</button>
        </div>
      </div>
    </div>
  );
};