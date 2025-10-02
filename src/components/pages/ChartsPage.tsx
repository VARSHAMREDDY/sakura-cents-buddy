import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export const ChartsPage = () => {
  // Sample data for charts
  const expenseData = [
    { name: 'Food & Drinks', value: 800, color: '#ff6b6b' },
    { name: 'Beauty & Self-care', value: 600, color: '#ff8cc8' },
    { name: 'Clothes', value: 450, color: '#a8e6cf' },
    { name: 'Entertainment', value: 300, color: '#87ceeb' },
    { name: 'Transport', value: 200, color: '#dda0dd' },
    { name: 'Other', value: 150, color: '#f0e68c' },
  ];

  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3200, savings: 1800 },
    { month: 'Feb', income: 5200, expenses: 3100, savings: 2100 },
    { month: 'Mar', income: 4800, expenses: 3400, savings: 1400 },
    { month: 'Apr', income: 5300, expenses: 3000, savings: 2300 },
    { month: 'May', income: 5100, expenses: 3300, savings: 1800 },
    { month: 'Jun', income: 5400, expenses: 3100, savings: 2300 },
  ];

  const savingsGrowth = [
    { month: 'Jan', savings: 1800 },
    { month: 'Feb', savings: 3900 },
    { month: 'Mar', savings: 5300 },
    { month: 'Apr', savings: 7600 },
    { month: 'May', savings: 9400 },
    { month: 'Jun', savings: 11700 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-primary/20">
          <p className="font-cute font-semibold text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-sakura" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cute font-bold text-primary mb-2">
          📊 Financial Analytics
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Beautiful insights into your spending patterns
        </p>
      </div>

      {/* Expense Categories Pie Chart */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6">
          🥧 Spending by Category
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                content={({ payload }) => {
                  if (payload && payload[0]) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-primary/20">
                        <p className="font-cute font-semibold text-foreground">{payload[0].name}</p>
                        <p className="font-sakura text-primary">₹{payload[0].value?.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {expenseData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="font-sakura text-sm text-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Income vs Expenses */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6">
          📈 Monthly Income vs Expenses
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fontFamily: 'Quicksand' }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12, fontFamily: 'Quicksand' }}
                stroke="#666"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontFamily: 'Quicksand', fontSize: '14px' }} />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#f97316" name="Expenses" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" fill="#ec4899" name="Savings" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Savings Growth Trend */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-6">
          💰 Savings Growth Trend
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fontFamily: 'Quicksand' }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12, fontFamily: 'Quicksand' }}
                stroke="#666"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2, r: 6 }}
                name="Total Savings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-sakura text-center">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-cute font-bold text-lg text-foreground">Savings Rate</h3>
          <p className="text-2xl font-bold text-primary">36%</p>
          <p className="text-sm text-muted-foreground font-sakura">Above average!</p>
        </div>
        
        <div className="card-sakura text-center">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-cute font-bold text-lg text-foreground">Top Category</h3>
          <p className="text-2xl font-bold text-primary">Food</p>
          <p className="text-sm text-muted-foreground font-sakura">₹800 this month</p>
        </div>
        
        <div className="card-sakura text-center">
          <div className="text-3xl mb-2">🌟</div>
          <h3 className="font-cute font-bold text-lg text-foreground">Goal Progress</h3>
          <p className="text-2xl font-bold text-primary">90%</p>
          <p className="text-sm text-muted-foreground font-sakura">Almost there!</p>
        </div>
      </div>
    </div>
  );
};