import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section id="start" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-4xl drop-shadow-lg">
          Готовы построить свое будущее?
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 drop-shadow-md">
          Каждая великая история начинается с одного маленького шага. Сделайте свой сегодня.
        </p>
        <div className="mt-8">
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg uppercase shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Начать путь, шагнув в него
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
