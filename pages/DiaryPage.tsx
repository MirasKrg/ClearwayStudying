import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Plus, 
  Calendar, 
  Tag, 
  Trash2, 
  ChevronRight, 
  Smile, 
  Frown, 
  Meh,
  Save,
  X,
  Layout,
  FileText,
  Sparkles
} from 'lucide-react';

interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad';
  tags: string[];
}

interface DiaryPageProps {
  navigate: (path: string) => void;
}

const DiaryPage: React.FC<DiaryPageProps> = ({ navigate }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem('diary_entries');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        date: new Date().toISOString(),
        title: 'Начало пути в Clearway Studying',
        content: 'Сегодня я начал изучать основы Python. Очень интересно, но местами сложно. Clearway AI помог разобраться с циклами!',
        mood: 'happy',
        tags: ['Python', 'Начало']
      }
    ];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<DiaryEntry>>({
    title: '',
    content: '',
    mood: 'neutral',
    tags: []
  });

  useEffect(() => {
    localStorage.setItem('diary_entries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title: newEntry.title!,
      content: newEntry.content!,
      mood: (newEntry.mood as any) || 'neutral',
      tags: newEntry.tags || []
    };

    setEntries([entry, ...entries]);
    setIsAdding(false);
    setNewEntry({ title: '', content: '', mood: 'neutral', tags: [] });
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-5 h-5 text-green-500" />;
      case 'sad': return <Frown className="w-5 h-5 text-red-500" />;
      default: return <Meh className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Navigation Block */}
        <div className="mb-12 p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-primary/20 rounded-2xl">
              <Layout className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Рабочее пространство</h3>
              <p className="text-sm text-brand-text-light/60 dark:text-brand-text-dark/60">Управляйте своим прогрессом и развитием</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => navigate('/my-pages')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-brand-text-light dark:text-brand-text-dark font-bold rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
            >
              <FileText className="w-5 h-5" />
              Мои страницы
            </button>
            <button 
              onClick={() => navigate('/cell-development')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Развитие клетки
            </button>
          </div>
        </div>

        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-brand-text-light dark:text-brand-text-dark flex items-center gap-3">
              <Book className="w-10 h-10 text-brand-primary" />
              Дневник обучения
            </h1>
            <p className="mt-2 text-brand-text-light/60 dark:text-brand-text-dark/60">
              Записывайте свои успехи, мысли и идеи каждый день.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary-dark transition-all shadow-lg shadow-brand-primary/20"
          >
            <Plus className="w-5 h-5" />
            Новая запись
          </button>
        </header>

        {/* Stats / Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-sm">
            <p className="text-sm text-brand-text-light/60 dark:text-brand-text-dark/60 uppercase tracking-wider font-semibold">Всего записей</p>
            <p className="text-3xl font-bold text-brand-text-light dark:text-brand-text-dark mt-1">{entries.length}</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-sm">
            <p className="text-sm text-brand-text-light/60 dark:text-brand-text-dark/60 uppercase tracking-wider font-semibold">Дней подряд</p>
            <p className="text-3xl font-bold text-brand-text-light dark:text-brand-text-dark mt-1">3</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-sm">
            <p className="text-sm text-brand-text-light/60 dark:text-brand-text-dark/60 uppercase tracking-wider font-semibold">Настроение</p>
            <div className="flex items-center gap-2 mt-1">
              <Smile className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark">Отличное</span>
            </div>
          </div>
        </div>

        {/* Add Entry Modal/Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-brand-primary/20 shadow-2xl mb-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark">Новая запись</h2>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-text-light/60 dark:text-brand-text-dark/60 uppercase mb-2">Заголовок</label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    placeholder="О чем сегодня напишем?"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-text-light/60 dark:text-brand-text-dark/60 uppercase mb-2">Настроение</label>
                  <div className="flex gap-4">
                    {(['happy', 'neutral', 'sad'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setNewEntry({ ...newEntry, mood: m })}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          newEntry.mood === m 
                            ? 'border-brand-primary bg-brand-primary/5' 
                            : 'border-gray-100 dark:border-gray-700 hover:border-brand-primary/30'
                        }`}
                      >
                        {getMoodIcon(m)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-text-light/60 dark:text-brand-text-dark/60 uppercase mb-2">Содержание</label>
                  <textarea
                    rows={6}
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    placeholder="Ваши мысли, достижения, трудности..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setIsAdding(false)}
                    className="px-6 py-3 text-gray-500 font-semibold hover:text-gray-700 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleAddEntry}
                    className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary-dark transition-all shadow-lg shadow-brand-primary/20"
                  >
                    <Save className="w-5 h-5" />
                    Сохранить запись
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries List */}
        <div className="space-y-8">
          {entries.length === 0 ? (
            <div className="text-center py-20 bg-white/40 dark:bg-gray-800/40 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
              <Book className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-500 dark:text-gray-400">Пока нет ни одной записи. Начните свой дневник!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-primary/10 rounded-2xl">
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark">{entry.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-brand-text-light/40 dark:text-brand-text-dark/40 mt-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-brand-text-light/80 dark:text-brand-text-dark/80 leading-relaxed text-lg mb-6">
                  {entry.content}
                </p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full uppercase tracking-wider">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
