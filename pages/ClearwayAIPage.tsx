import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatIcon } from '../components/icons/ChatIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { SendIcon } from '../components/icons/SendIcon';

const ClearwayAIPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [chats, setChats] = useState<{ id: number; title: string; }[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtherCellsModal, setShowOtherCellsModal] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    setCurrentUser(user);
    if (user) {
      // Mock chat list for logged in user
      setChats([
        { id: 1, title: 'Обсуждение Local Impact Hackathon' },
        { id: 2, title: 'Вопросы по курсу Python' },
      ]);
      setActiveChatId(1);
    }
    
    if (ai) {
      setIsApiConfigured(true);
      // Initialize the chat session
    const hackathonInfo = `
        Информация о соревновании "Local Impact Hackathon 2026":
        Это образовательный стартап-хакатон для школьников, где участники разрабатывают технологические решения для реальных задач Казахстана.
        Призовой фонд: 100 000 ₸
        Длительность: 1 неделя
        Команды: 1-4 человека (8-12 классы и студенты)
        Взнос: 3000 ₸ за команду
      `;

    chatRef.current = ai.chats.create({
      model: "gemini-3.1-pro-preview",
      generationConfig: {
        maxOutputTokens: 1000,
      },
      config: {
        systemInstruction: `Ты Clearway AI, полезный ассистент. Тебе предоставлена следующая информация о хакатоне, используй ее для ответов на вопросы: ${hackathonInfo}`
      }
    });
    } else {
      setIsApiConfigured(false);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' as 'user' }];
    setMessages(newMessages);
    const textToSend = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: textToSend });
      
      if (!response || !response.text) {
        throw new Error("Invalid response from AI");
      }

      const text = response.text;
      
      setMessages([...newMessages, { text, sender: 'ai' as 'ai' }]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setMessages([...newMessages, { text: 'Произошла ошибка. Попробуйте еще раз.', sender: 'ai' as 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderUnauthenticatedView = () => (
    <div className="text-center p-8 bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-brand-text-light dark:text-brand-text-dark mb-4">Зарегистрируйтесь для лучшего опыта</h2>
      <p className="text-brand-text-light dark:text-brand-text-dark/80 mb-6">Войдите в свой аккаунт, чтобы сохранять историю чатов, создавать новые обсуждения и получать персонализированные ответы от Clearway AI.</p>
      <button onClick={() => window.location.href = '/login'} className="px-6 py-3 font-semibold text-white bg-brand-primary rounded-lg hover:bg-brand-primary-dark transition-colors">
        Войти или Зарегистрироваться
      </button>
    </div>
  );

  const renderAuthenticatedView = () => (
    <div className="flex h-full bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-brand-surface-light dark:bg-brand-surface-dark/50 p-4 border-r border-brand-border-light dark:border-brand-border-dark">
        <button 
          onClick={() => setShowOtherCellsModal(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 font-semibold text-white bg-brand-primary rounded-lg hover:bg-brand-primary-dark transition-colors">
          <PlusIcon className="w-5 h-5" />
          Обсудить иные клетки
        </button>
        <h2 className="text-lg font-semibold mb-4 text-brand-text-light dark:text-brand-text-dark">Ваши чаты</h2>
        <ul>
          {chats.map(chat => (
            <li key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <ChatIcon className="w-5 h-5" />
              <span>{chat.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="w-3/4 flex flex-col">
        {!isApiConfigured && (
          <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-center">
            <p className="font-semibold">Конфигурация API отсутствует</p>
            <p className="text-sm">Пожалуйста, установите VITE_GEMINI_API_KEY в переменных окружения, чтобы включить чат.</p>
          </div>
        )}
        
        <div className="flex-grow p-6 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`max-w-lg px-4 py-3 rounded-xl ${msg.sender === 'user' ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-brand-text-light dark:text-brand-text-dark'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-lg px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-brand-text-light dark:text-brand-text-dark">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse mr-2"></div>
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse mr-2 delay-75"></div>
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-brand-border-light dark:border-brand-border-dark">
          <div className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isApiConfigured ? "Спросите что-нибудь о хакатоне..." : "API не настроен"}
              disabled={!isApiConfigured}
              className="w-full pl-4 pr-12 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <button onClick={handleSendMessage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors disabled:bg-gray-400" disabled={isLoading || !userInput.trim()}>
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Other Cells Modal */}
      {showOtherCellsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowOtherCellsModal(false)}>
          <div className="bg-brand-surface-light dark:bg-brand-surface-dark p-8 rounded-xl shadow-lg max-w-lg text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Обсуждение иных клеток</h2>
            <p className="mb-4 text-brand-text-light/80 dark:text-brand-text-dark/80">Чат для обсуждение иных клеток предназначен для тех соревнований и курсов, которых нет на сайте. Все упоминания, ссылки и изображения будут анализироваться и после добавлены на сайт.</p>
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <p className="font-semibold">Данная функция пока не доступна.</p>
              <p className="text-sm">Мы работаем над ее реализацией. Спасибо за ваше терпение!</p>
            </div>
            <button onClick={() => setShowOtherCellsModal(false)} className="mt-6 px-6 py-2 font-semibold text-white bg-brand-primary rounded-lg hover:bg-brand-primary-dark transition-colors">
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentUser ? renderAuthenticatedView() : renderUnauthenticatedView()}
    </div>
  );
};

export default ClearwayAIPage;
