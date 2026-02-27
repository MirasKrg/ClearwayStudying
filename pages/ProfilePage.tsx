import React from 'react';

interface ProfilePageProps {
  username: string;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username, onLogout }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="max-w-2xl mx-auto bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-6">
          <img 
            className="w-24 h-24 rounded-full object-cover border-4 border-brand-primary"
            src={`https://i.pravatar.cc/150?u=${username}`}
            alt="User avatar"
          />
          <div>
            <h1 className="text-3xl font-bold text-brand-text-light dark:text-brand-text-dark">{username}</h1>
            <p className="text-gray-500 dark:text-gray-400">Ученик</p>
          </div>
        </div>
        <div className="mt-8 border-t border-brand-border-light dark:border-brand-border-dark pt-8">
          <h2 className="text-xl font-semibold mb-4 text-brand-text-light dark:text-brand-text-dark">Информация</h2>
          <p className="text-gray-600 dark:text-gray-300">Здесь будет отображаться информация о пользователе, его достижениях и прогрессе.</p>
        </div>
        <div className="mt-8">
          <button 
            onClick={onLogout}
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
