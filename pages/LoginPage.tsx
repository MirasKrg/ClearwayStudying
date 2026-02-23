import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      onLogin(username);
    } else {
      setError('Пожалуйста, введите логин и пароль');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-brand-text-light dark:text-brand-text-dark">Вход</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-brand-text-light dark:text-brand-text-dark">Логин</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-brand-text-light dark:text-brand-text-dark bg-brand-background-light dark:bg-brand-background-dark border border-brand-border-light dark:border-brand-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-brand-text-light dark:text-brand-text-dark">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-brand-text-light dark:text-brand-text-dark bg-brand-background-light dark:bg-brand-background-dark border border-brand-border-light dark:border-brand-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
