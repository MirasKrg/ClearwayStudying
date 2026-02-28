import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, 
  Zap, 
  Shield, 
  Target, 
  Lightbulb, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Sparkles
} from 'lucide-react';

const stages = [
  {
    id: 1,
    title: 'Ядро (Nucleus)',
    description: 'Центр управления. Здесь хранится ваша стратегия и видение проекта.',
    advice: 'На этом этапе важно четко сформулировать проблему, которую вы решаете. Без сильного ядра проект распадется при первых трудностях.',
    strategy: 'Проведите исследование рынка, опросите потенциальных пользователей и создайте Lean Canvas.',
    icon: <Dna className="w-12 h-12 text-blue-500" />,
    color: 'bg-blue-500',
    visual: (
      <div className="relative w-32 h-32 bg-blue-500/20 rounded-full border-4 border-blue-500 flex items-center justify-center animate-pulse">
        <div className="w-16 h-16 bg-blue-500 rounded-full blur-sm opacity-50" />
        <Dna className="w-12 h-12 text-blue-500 absolute" />
      </div>
    )
  },
  {
    id: 2,
    title: 'Митохондрии (Mitochondria)',
    description: 'Энергетическая станция. Ваша команда и ресурсы.',
    advice: 'Энергия проекта — это мотивация команды. Распределите роли так, чтобы каждый занимался тем, что у него получается лучше всего.',
    strategy: 'Соберите команду из 2-4 человек с разными навыками (разработка, дизайн, маркетинг). Установите четкие дедлайны.',
    icon: <Zap className="w-12 h-12 text-yellow-500" />,
    color: 'bg-yellow-500',
    visual: (
      <div className="relative w-48 h-48 bg-yellow-500/10 rounded-full border-2 border-dashed border-yellow-500 flex items-center justify-center">
        <div className="absolute w-24 h-24 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center">
           <Dna className="w-8 h-8 text-blue-500" />
        </div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Zap className="w-8 h-8 text-yellow-500 absolute -top-4 left-1/2 -translate-x-1/2" />
          <Zap className="w-8 h-8 text-yellow-500 absolute -bottom-4 left-1/2 -translate-x-1/2" />
        </motion.div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Мембрана (Membrane)',
    description: 'Защита и интерфейс. Ваш MVP и первые пользователи.',
    advice: 'Мембрана должна быть избирательной. Слушайте обратную связь, но не пытайтесь угодить всем сразу. Сосредоточьтесь на ключевой функции.',
    strategy: 'Разработайте минимально жизнеспособный продукт (MVP). Запустите его среди небольшой группы тестеров.',
    icon: <Shield className="w-12 h-12 text-green-500" />,
    color: 'bg-green-500',
    visual: (
      <div className="relative w-64 h-64 bg-green-500/5 rounded-full border-8 border-green-500/30 flex items-center justify-center">
        <div className="relative w-40 h-40 bg-yellow-500/10 rounded-full border-2 border-dashed border-yellow-500 flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center">
             <Dna className="w-6 h-6 text-blue-500" />
          </div>
          <Zap className="w-6 h-6 text-yellow-500 absolute top-0" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-4 border-green-500"
        />
      </div>
    )
  },
  {
    id: 4,
    title: 'Полноценная Клетка (Full Organism)',
    description: 'Готовый стартап. Масштабирование и рост.',
    advice: 'Теперь вы готовы к делению (росту). Ищите инвестиции или способы монетизации, чтобы проект стал устойчивым.',
    strategy: 'Подготовьте питч-дек, найдите менторов и подайте заявку на акселерацию или грант.',
    icon: <Sparkles className="w-12 h-12 text-purple-500" />,
    color: 'bg-purple-500',
    visual: (
      <div className="relative w-80 h-80 bg-purple-500/5 rounded-full border-8 border-purple-500/20 flex items-center justify-center">
        <div className="relative w-64 h-64 bg-green-500/5 rounded-full border-4 border-green-500/30 flex items-center justify-center">
          <div className="relative w-40 h-40 bg-yellow-500/10 rounded-full border-2 border-dashed border-yellow-500 flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center">
               <Dna className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Sparkles className="w-10 h-10 text-purple-500 absolute top-10 left-10" />
          <Sparkles className="w-10 h-10 text-purple-500 absolute bottom-10 right-10" />
        </motion.div>
      </div>
    )
  }
];

const CellDevelopmentPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showAdvice, setShowAdvice] = useState(false);

  const stage = stages[currentStage];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Развитие Клетки Проекта
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Пройдите путь от идеи до полноценного стартапа, развивая свою "клетку" шаг за шагом.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Representation */}
          <div className="flex flex-col items-center justify-center min-h-[500px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-gray-800 p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-500 to-purple-500" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative z-10"
              >
                {stage.visual}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex gap-4">
              {stages.map((_, i) => (
                <div 
                  key={i}
                  className={`h-2 w-12 rounded-full transition-all duration-500 ${i <= currentStage ? stages[i].color : 'bg-slate-200 dark:bg-gray-800'}`}
                />
              ))}
            </div>
          </div>

          {/* Info & Controls */}
          <div className="space-y-8">
            <motion.div
              key={currentStage + 'info'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${stage.color} text-white shadow-lg`}>
                  {stage.icon}
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Этап {stage.id}</span>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{stage.title}</h2>
                </div>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {stage.description}
              </p>

              <div className="space-y-4">
                <button 
                  onClick={() => setShowAdvice(!showAdvice)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-gray-750 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold">Получить стратегию и советы</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${showAdvice ? 'rotate-90' : ''}`} />
                </button>

                <AnimatePresence>
                  {showAdvice && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 space-y-4">
                        <div>
                          <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                            <Info className="w-4 h-4" />
                            Совет
                          </h4>
                          <p className="text-blue-700 dark:text-blue-400 text-sm">{stage.advice}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4" />
                            Стратегия
                          </h4>
                          <p className="text-blue-700 dark:text-blue-400 text-sm">{stage.strategy}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="flex gap-4">
              <button
                disabled={currentStage === 0}
                onClick={() => { setCurrentStage(currentStage - 1); setShowAdvice(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400 font-bold rounded-2xl border border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
                Назад
              </button>
              <button
                disabled={currentStage === stages.length - 1}
                onClick={() => { setCurrentStage(currentStage + 1); setShowAdvice(false); }}
                className="flex-[2] flex items-center justify-center gap-2 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all disabled:opacity-50"
              >
                Следующий этап
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CellDevelopmentPage;
