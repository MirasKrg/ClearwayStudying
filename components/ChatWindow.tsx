import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { SendIcon, CloseIcon, LoadingIcon } from './icons/Icons';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatWindowProps {
  onClose: () => void;
  hackathonContext: string;
  quotedText?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, hackathonContext, quotedText }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (quotedText) {
      setInput(`"${quotedText}"\n\nЧто это значит?`);
    }
  }, [quotedText]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemInstruction = `Ты — Clearway AI, дружелюбный и полезный ИИ-помощник для школьников. Твоя задача — отвечать на вопросы в контексте следующей 'клетки' (хакатона или другого образовательного мероприятия). Будь краток, ясен и поощряй пользователя. Контекст: \n${hackathonContext}`;
      
      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: systemInstruction }] },
          { role: 'model', parts: [] }, // Start with an empty model turn
          { role: 'user', parts: [{ text: userMessage.text }] }
        ]
      });

      let aiResponseText = '';
      for await (const chunk of result) {
        const chunkText = (chunk as GenerateContentResponse).text;
        aiResponseText += chunkText;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.sender === 'ai') {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { ...lastMessage, text: aiResponseText };
            return newMessages;
          } else {
            return [...prev, { sender: 'ai', text: aiResponseText }];
          }
        });
      }

    } catch (error) {
      console.error('Ошибка ответа Gemini:', error);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Произошла ошибка. Попробуйте еще раз.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-brand-surface-light/90 dark:bg-brand-surface-dark/90 backdrop-blur-md rounded-xl shadow-2xl border border-brand-border-light dark:border-brand-border-dark">
      <div className="flex items-center justify-between p-4 border-b border-brand-border-light dark:border-brand-border-dark">
        <h3 className="font-bold text-lg text-brand-text-light dark:text-brand-text-dark">Clearway AI</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-brand-primary dark:hover:text-brand-primary-light">
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-brand-text-light dark:text-brand-text-dark'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 text-brand-text-light dark:text-brand-text-dark flex items-center">
                <LoadingIcon className="w-5 h-5 animate-spin mr-2" />
                <span>Думаю...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-border-light dark:border-brand-border-dark">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e as any);
              }
            }}
            placeholder="Спросите что-нибудь..."
            className="w-full pr-12 pl-4 py-2 rounded-lg bg-brand-background-light dark:bg-brand-background-dark border border-brand-border-light dark:border-brand-border-dark focus:ring-2 focus:ring-brand-primary focus:outline-none resize-none overflow-y-hidden"
            rows={1}
            style={{ maxHeight: '120px' }}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-primary text-white hover:bg-brand-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
