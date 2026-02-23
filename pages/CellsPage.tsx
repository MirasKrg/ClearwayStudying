import React, { useState } from 'react';
import {
  HackathonIcon, ScienceIcon, SportsIcon, OlympiadIcon, CoursesIcon,
  MarathonIcon, SummerIcon, UniversityIcon, BackIcon, EmptyStateIcon
} from '../components/icons/Icons';

interface Category {
  id: string;
  name: string;
  icon: React.ReactElement;
}

const categories: Category[] = [
  { id: 'hackathons', name: 'Хакатоны', icon: <HackathonIcon className="h-12 w-12" /> },
  { id: 'science', name: 'Научные хакатоны', icon: <ScienceIcon className="h-12 w-12" /> },
  { id: 'sports', name: 'Спортивные соревнования', icon: <SportsIcon className="h-12 w-12" /> },
  { id: 'olympiads', name: 'Олимпиады', icon: <OlympiadIcon className="h-12 w-12" /> },
  { id: 'courses', name: 'Курсы', icon: <CoursesIcon className="h-12 w-12" /> },
  { id: 'marathons', name: 'Академические марафоны', icon: <MarathonIcon className="h-12 w-12" /> },
  { id: 'summer', name: 'Летние программы', icon: <SummerIcon className="h-12 w-12" /> },
  { id: 'university', name: 'Колледжи/Университеты', icon: <UniversityIcon className="h-12 w-12" /> },
];

const CategoryCard: React.FC<{ category: Category; onClick: () => void }> = ({ category, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer p-6 bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center"
  >
    <div className="text-brand-primary group-hover:text-brand-primary-light transition-colors duration-300 mb-4">
      {category.icon}
    </div>
    <h3 className="text-lg font-semibold text-brand-text-light dark:text-brand-text-dark">{category.name}</h3>
  </div>
);


const hackathonData = [
  {
    id: 'local-impact-2026',
    title: 'Local Impact Hackathon 2026',
    shortDescription: 'Образовательный стартап-хакатон для школьников, где участники разрабатывают технологические решения для реальных задач Казахстана.',
    prize: '100 000 ₸',
    duration: '1 неделя',
    teamFormat: '1-4 человека (8-12 классы и студенты)',
    fee: '3000 ₸ за команду',
    fullDescription: 'Стартап-ориентированный образовательный хакатон для школьников и студентов, направленный на разработку технологических решений реальных проблем Казахстана. Цель хакатона - предоставить участникам практический опыт создания и тестирования инновационных решений (MVP/прототипов), развития предпринимательских навыков и публичной защиты проектов перед экспертным жюри.',
    format: 'Онлайн-этап разработки + офлайн-финал в г. Астана.',
    dates: [
      { date: '5 февраля', event: 'Старт регистрации' },
      { date: 'до 16 февраля (23:59)', event: 'Конец регистрации' },
      { date: '17 февраля', event: 'Анонс тем (в Telegram)' },
      { date: '17–24 февраля', event: 'Работа над проектами' },
      { date: 'Будет анонсировано', event: 'Финал (оффлайн / онлайн)' },
    ],
    requirements: [
      'Подписка на Instagram: Local Impact Hackathon & Powerpuffgirls',
    ],
    registrationSteps: ['Регистрация команды', 'Оплата участия', 'Подтверждение и старт работы'],
    registrationLink: '#',
    telegramLink: '#',
  }
];

const HackathonBlock: React.FC<{ hackathon: typeof hackathonData[0]; onClick: () => void }> = ({ hackathon, onClick }) => (
  <div 
    onClick={onClick}
    className="group cursor-pointer p-6 bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
  >
    <div>
      <h3 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark mb-2 group-hover:text-brand-primary transition-colors duration-300">{hackathon.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{hackathon.shortDescription}</p>
    </div>
    <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="bg-brand-primary/10 text-brand-primary-dark font-semibold px-2 py-1 rounded-full">{hackathon.prize}</span>
        <span className="bg-gray-500/10 text-gray-800 dark:text-gray-300 font-semibold px-2 py-1 rounded-full">{hackathon.duration}</span>
        <span className="bg-gray-500/10 text-gray-800 dark:text-gray-300 font-semibold px-2 py-1 rounded-full">{hackathon.teamFormat}</span>
    </div>
  </div>
);

const CellsListView: React.FC<{ category: Category; onBack: () => void; navigate: (path: string) => void; }> = ({ category, onBack, navigate }) => {
  const FilterGroup: React.FC<{ title: string; options: string[] }> = ({ title, options }) => (
    <div>
      <h4 className="font-semibold mb-2 text-brand-text-light dark:text-brand-text-dark">{title}</h4>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary-dark" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center gap-2 mb-8 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors">
        <BackIcon className="w-5 h-5" />
        <span>Назад к категориям</span>
      </button>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-6 h-fit">
          <h3 className="text-xl font-bold mb-6 text-brand-text-light dark:text-brand-text-dark">Фильтры</h3>
          <div className="space-y-6">
            <FilterGroup title="Класс" options={['5-7', '8-9', '10-11']} />
            <FilterGroup title="Формат" options={['Онлайн', 'Оффлайн']} />
            <FilterGroup title="Предмет" options={['Математика', 'Физика', 'IT']} />
          </div>
        </aside>

        {/* Cells List */}
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-4xl mb-6 drop-shadow-lg">{category.name}</h2>
          <div className="space-y-6">
            {category.id === 'hackathons' ? (
              <div className="grid md:grid-cols-2 gap-6">
                {hackathonData.map(hackathon => (
                  <HackathonBlock key={hackathon.id} hackathon={hackathon} onClick={() => navigate(`/hackathon/${hackathon.id}`)} />
                ))}
              </div>
            ) : (
              <div className="bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <EmptyStateIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
                    <h3 className="mt-4 text-lg font-medium text-brand-text-light dark:text-brand-text-dark">Ой, походу клетки не зародились здесь</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Попробуйте зайти позже или выберите другую категорию.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CellsPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  if (selectedCategory) {
    return <CellsListView category={selectedCategory} onBack={() => setSelectedCategory(null)} navigate={navigate} />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-5xl drop-shadow-lg">
          Найдите свою клетку
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 drop-shadow-md">
          Выберите категорию, чтобы начать поиск возможностей для вашего роста.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} onClick={() => setSelectedCategory(cat)} />
        ))}
      </div>
    </div>
  );
};

export default CellsPage;
