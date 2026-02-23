import React from 'react';
import { MissionIcon, PhilosophyIcon } from './icons/Icons';

const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="min-h-screen py-20 sm:py-28 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-4xl">
                Почему мы это делаем?
            </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="relative bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md p-8 rounded-xl shadow-lg overflow-hidden">
            <MissionIcon className="absolute -bottom-8 -right-8 h-48 w-48 text-gray-200 dark:text-gray-700 opacity-50 blur-sm" />
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 bg-brand-primary/10 p-2 rounded-full">
                        <MissionIcon className="h-8 w-8 text-brand-primary" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-3xl">
                    Наша миссия
                    </h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Мы хотим <b>избавить</b> школьников от неопределенности и бесцельного движения, создав для них стратегический путь. Пользователи <b>отслеживают</b> свой прогресс и строят графики успеваемости в <b>соревнованиях и курсах</b>, обсуждая результаты с Clearway AI. Мы предлагаем им <b>четкий план</b>, чтобы они не упускали возможности.
                </p>
            </div>
          </div>
          <div className="relative bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md p-8 rounded-xl shadow-lg overflow-hidden">
             <PhilosophyIcon className="absolute -bottom-8 -right-8 h-48 w-48 text-gray-200 dark:text-gray-700 opacity-50 blur-sm" />
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 bg-brand-primary/10 p-2 rounded-full">
                        <PhilosophyIcon className="h-8 w-8 text-brand-primary" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-3xl">
                    Наша философия
                    </h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <b>Великое</b> и значимое всегда создается из <b>малого</b>. Мы называем каждое мероприятие и курс специальным термином — <b>"клеткой"</b>. Из накопленного опыта прохождения множества таких "клеток" постепенно формируются по-настоящему сильные, целеустремленные и <b>успешные люди</b>.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
