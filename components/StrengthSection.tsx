import React from 'react';
import { AiIcon, DiaryIcon, ExperienceIcon } from './icons/Icons';

const StrengthSection: React.FC = () => {
  const features = [
    {
      icon: <AiIcon className="h-10 w-10 text-white" />,
      name: 'Clearway AI',
      description: 'Ваш личный помощник, который по-дружески обсудит каждую "клетку", составит план действий и покажет тенденции вашего прогресса.',
    },
    {
      icon: <DiaryIcon className="h-10 w-10 text-white" />,
      name: 'Дневник',
      description: 'Интерактивная платформа для отслеживания и планирования деятельности в виде таблиц, графиков и блоков. Ваш личный путь к вершинам.',
    },
    {
      icon: <ExperienceIcon className="h-10 w-10 text-white" />,
      name: 'Опыт',
      description: 'План-листы и советы от реальных участников соревнований и программ. Мы предоставляем бесценный опыт, который поможет раскрыть ваши таланты.',
    },
  ];

  return (
    <section id="strength" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-4xl">
            В чем наша сила?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Три кита, на которых строится ваш успех.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-brand-text-light dark:text-brand-text-dark">{feature.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrengthSection;
