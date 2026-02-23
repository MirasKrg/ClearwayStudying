import React from 'react';
import { ChevronDownIcon } from './icons/Icons';

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-brand-text-light dark:text-white overflow-hidden">
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight animate-fade-in-down">
          Clearway Studying - let’s do study simply
        </h1>
        <a
            href="#start"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-full text-lg uppercase shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
        >
            Начать путь, шагнув в него
        </a>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <a href="#mission" aria-label="Scroll down">
          <ChevronDownIcon className="h-8 w-8 text-white/50 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
