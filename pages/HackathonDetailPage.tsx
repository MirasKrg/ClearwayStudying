import React, { useState, useEffect } from 'react';
import { BackIcon, ChatIcon } from '../components/icons/Icons';
import ChatWindow from '../components/ChatWindow';

// Временные данные, в будущем будут загружаться по ID
const hackathonData = {
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
};

type Hackathon = typeof hackathonData;

const HackathonDetailCard: React.FC<{ hackathon: Hackathon; onMouseUp: () => void; }> = ({ hackathon, onMouseUp }) => (
  <div onMouseUp={onMouseUp} className="bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-8 animate-fade-in-up h-full overflow-y-auto">
    <h3 className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark mb-2">{hackathon.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6">{hackathon.shortDescription}</p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
        <div className="bg-brand-background-light dark:bg-brand-background-dark p-4 rounded-lg shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">Призовой фонд</p>
            <p className="text-xl font-bold text-brand-primary">{hackathon.prize}</p>
        </div>
        <div className="bg-brand-background-light dark:bg-brand-background-dark p-4 rounded-lg shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">Длительность</p>
            <p className="text-xl font-bold text-brand-primary">{hackathon.duration}</p>
        </div>
        <div className="bg-brand-background-light dark:bg-brand-background-dark p-4 rounded-lg shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">Команды</p>
            <p className="text-xl font-bold text-brand-primary">{hackathon.teamFormat}</p>
        </div>
        <div className="bg-brand-background-light dark:bg-brand-background-dark p-4 rounded-lg shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">Взнос</p>
            <p className="text-xl font-bold text-brand-primary">{hackathon.fee}</p>
        </div>
    </div>

    <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
      <h4 className="font-semibold">О хакатоне</h4>
      <p>{hackathon.fullDescription}</p>
      <p><strong>Формат проведения:</strong> {hackathon.format}</p>
      
      <h4 className="font-semibold">Ключевые даты</h4>
      <ul className="list-disc pl-5">
        {hackathon.dates.map(d => <li key={d.event}><strong>{d.date}:</strong> {d.event}</li>)}
      </ul>

      <h4 className="font-semibold">Обязательное условие</h4>
       <ul className="list-disc pl-5">
        {hackathon.requirements.map(r => <li key={r}>{r}</li>)}
      </ul>
      <p className="mt-4">Все объявления, темы и форма сдачи проектов будут опубликованы в Telegram-канале.</p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      <a href={hackathon.registrationLink} className="w-full sm:w-auto text-center bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">Регистрация</a>
      <a href={hackathon.telegramLink} className="w-full sm:w-auto text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-brand-text-light dark:text-brand-text-dark font-bold py-3 px-8 rounded-lg transition-colors duration-300">Telegram канал</a>
    </div>
  </div>
);

interface HackathonDetailPageProps {
  hackathonId: string;
  onBack: () => void;
}

const HackathonDetailPage: React.FC<HackathonDetailPageProps> = ({ hackathonId, onBack }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [quotedText, setQuotedText] = useState<string | undefined>(undefined);
  
  const hackathon = hackathonData; 

  const handleTextSelection = () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      setQuotedText(selection);
      if (!isChatOpen) {
        setIsChatOpen(true);
      }
    }
  };

  const hackathonContextForAI = `Название: ${hackathon.title}\nОписание: ${hackathon.fullDescription}\nДаты: ${hackathon.dates.map(d => `${d.date}: ${d.event}`).join(', ')}`;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors">
          <BackIcon className="w-5 h-5" />
          <span>Назад к хакатонам</span>
        </button>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primary-dark transition-colors shadow-lg"
        >
          <ChatIcon className="w-5 h-5" />
          <span>{isChatOpen ? 'Закрыть чат' : 'Обсудить с Clearway AI'}</span>
        </button>
      </div>
      
      <div className={`grid gap-8 transition-all duration-500 ${isChatOpen ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
        <div className={`${isChatOpen ? 'lg:col-span-2' : ''}`}>
            <HackathonDetailCard hackathon={hackathon} onMouseUp={handleTextSelection} />
        </div>
        {isChatOpen && (
          <div className="lg:col-span-1 h-[75vh]">
            <ChatWindow 
              onClose={() => setIsChatOpen(false)} 
              hackathonContext={hackathonContextForAI}
              quotedText={quotedText}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonDetailPage;
