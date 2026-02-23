import React from 'react';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, isLast = false }) => {
  return (
    <div className="relative pl-12">
      {!isLast && <div className="absolute left-4 top-4 h-full w-0.5 bg-brand-primary/30"></div>}
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary">
        <span className="font-bold text-white">{step}</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-brand-text-light dark:text-brand-text-dark drop-shadow-md">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 drop-shadow-sm">{description}</p>
    </div>
  );
};


const PathSection: React.FC = () => {
  return (
    <section id="path" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-4xl drop-shadow-lg">
            Ваш путь на нашем сайте
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 drop-shadow-md">
            Три простых шага к вашей победе
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
            <div className="space-y-12">
                <StepCard 
                    step="1"
                    title="Выберите 'клетку' и изучите её с ИИ"
                    description="Найдите в нашем каталоге интересное соревнование, курс или программу. Наш ИИ-помощник предоставит всю необходимую информацию и ответит на любые вопросы."
                />
                 <StepCard 
                    step="2"
                    title="Создайте страницу в Дневнике"
                    description="Добавьте 'клетку' в свой личный Дневник. Здесь вы будете отслеживать прогресс, анализировать результаты и планировать следующие шаги, опираясь на советы и опыт других участников."
                />
                 <StepCard 
                    step="3"
                    title="Получите опыт и станьте сильнее"
                    description="Победа или поражение — не главное. Главное — это опыт, который вы получаете. С каждым шагом вы становитесь мудрее, сильнее и ближе к своей настоящей цели."
                    isLast={true}
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default PathSection;
