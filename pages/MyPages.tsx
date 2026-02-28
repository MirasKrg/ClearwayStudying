import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  CheckSquare, 
  Table as TableIcon, 
  BarChart2, 
  Settings, 
  Search, 
  Plus, 
  MoreHorizontal,
  ChevronRight,
  Layout,
  Target,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Пн', progress: 20 },
  { name: 'Вт', progress: 45 },
  { name: 'Ср', progress: 30 },
  { name: 'Чт', progress: 70 },
  { name: 'Пт', progress: 85 },
  { name: 'Сб', progress: 60 },
  { name: 'Вс', progress: 95 },
];

const MyPages: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить основы React Hooks', completed: true },
    { id: 2, text: 'Написать первую статью в дневник', completed: false },
    { id: 3, text: 'Разобраться с API Gemini', completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#d4d4d4] font-sans overflow-hidden">
      {/* Notion-style Sidebar */}
      <aside className="w-64 bg-[#fbfbfa] dark:bg-[#202020] border-r border-[#e9e9e7] dark:border-[#2f2f2f] flex flex-col">
        <div className="p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-primary rounded flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-semibold text-sm truncate">Clearway Workspace</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className="px-2 py-4 space-y-1">
          <div className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer group">
            <Search className="w-4 h-4 text-gray-400" />
            <span>Поиск</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
            <Zap className="w-4 h-4 text-gray-400" />
            <span>Обновления</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Настройки</span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-2 py-4">
          <p className="px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Мои страницы</p>
          <div 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer ${activeTab === 'overview' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Layout className="w-4 h-4" />
            <span>Дашборд прогресса</span>
          </div>
          <div 
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer ${activeTab === 'tasks' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Планирование задач</span>
          </div>
          <div 
            onClick={() => setActiveTab('data')}
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer ${activeTab === 'data' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Таблица достижений</span>
          </div>
        </div>

        <div className="p-4 border-t border-[#e9e9e7] dark:border-[#2f2f2f]">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <Plus className="w-4 h-4" />
            Новая страница
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto">
        <header className="sticky top-0 bg-white/80 dark:bg-[#191919]/80 backdrop-blur-md z-10 px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Clearway Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-600 dark:text-gray-200">
              {activeTab === 'overview' ? 'Дашборд прогресса' : activeTab === 'tasks' ? 'Планирование задач' : 'Таблица достижений'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">Изменено 2 мин назад</span>
            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-16 py-12">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <>
                <h1 className="text-4xl font-bold mb-8 flex items-center gap-4">
                  🚀 Дашборд прогресса
                </h1>
                
                <div className="prose dark:prose-invert max-w-none mb-12">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Добро пожаловать в ваш центр управления обучением. Здесь вы можете отслеживать, как быстро вы растете и какие вершины покоряете.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="p-6 bg-[#fbfbfa] dark:bg-[#202020] rounded-xl border border-[#e9e9e7] dark:border-[#2f2f2f]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4" />
                      Активность за неделю
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9e9e7" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#202020', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#7c3aed' }}
                          />
                          <Area type="monotone" dataKey="progress" stroke="#7c3aed" fillOpacity={1} fill="url(#colorProgress)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="p-6 bg-[#fbfbfa] dark:bg-[#202020] rounded-xl border border-[#e9e9e7] dark:border-[#2f2f2f]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Текущие цели
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Python Core', progress: 75 },
                        { label: 'UI/UX Design', progress: 40 },
                        { label: 'Soft Skills', progress: 90 },
                      ].map((goal, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{goal.label}</span>
                            <span className="font-bold">{goal.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${goal.progress}%` }}
                              className="h-full bg-brand-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    💡 Совет дня
                  </h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    Регулярность важнее интенсивности. Даже 15 минут занятий каждый день дадут больший результат в долгосрочной перспективе, чем 5 часов раз в неделю.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'tasks' && (
              <>
                <h1 className="text-4xl font-bold mb-8">📝 Планирование задач</h1>
                <div className="space-y-2">
                  {todos.map(todo => (
                    <div 
                      key={todo.id}
                      onClick={() => toggleTodo(todo.id)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded cursor-pointer group"
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${todo.completed ? 'bg-brand-primary border-brand-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                        {todo.completed && <Plus className="w-3 h-3 text-white rotate-45" />}
                      </div>
                      <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                        {todo.text}
                      </span>
                    </div>
                  ))}
                  <button className="flex items-center gap-2 p-2 text-gray-400 hover:text-gray-600 transition-colors mt-4">
                    <Plus className="w-4 h-4" />
                    Добавить задачу
                  </button>
                </div>
              </>
            )}

            {activeTab === 'data' && (
              <>
                <h1 className="text-4xl font-bold mb-8">📊 Таблица достижений</h1>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Дата</th>
                        <th className="py-3 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Навык</th>
                        <th className="py-3 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Статус</th>
                        <th className="py-3 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Результат</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: '24.02.2026', skill: 'Python Functions', status: 'Завершено', result: '95/100' },
                        { date: '25.02.2026', skill: 'Tailwind CSS', status: 'В процессе', result: '-' },
                        { date: '26.02.2026', skill: 'Git Workflow', status: 'Завершено', result: '100/100' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 px-4 text-sm">{row.date}</td>
                          <td className="py-4 px-4 text-sm font-semibold">{row.skill}</td>
                          <td className="py-4 px-4 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Завершено' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm font-mono">{row.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MyPages;
