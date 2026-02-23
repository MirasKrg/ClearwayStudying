import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import LandingPage from './pages/LandingPage';
import CellsPage from './pages/CellsPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user');
    }
    return null;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('user', username);
    navigate('/profile');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderPage = () => {
    if (currentPath.startsWith('/hackathon/')) {
      if (!currentUser) return <LoginPage onLogin={handleLogin} />;
      const hackathonId = currentPath.split('/')[2];
      return <HackathonDetailPage hackathonId={hackathonId} onBack={() => navigate('/cells')} />;
    }

    switch (currentPath) {
      case '/cells':
        if (!currentUser) return <LoginPage onLogin={handleLogin} />;
        return <CellsPage navigate={navigate} />;
      case '/profile':
        if (!currentUser) return <LoginPage onLogin={handleLogin} />;
        return <ProfilePage username={currentUser} onLogout={handleLogout} />;
      case '/login':
        if (currentUser) {
          navigate('/profile');
          return <ProfilePage username={currentUser} onLogout={handleLogout} />;
        }
        return <LoginPage onLogin={handleLogin} />;
      case '/':
      default:
        return <LandingPage isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className="min-h-screen font-sans relative">
      <AnimatedBackground isDarkMode={isDarkMode} />
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        navigate={navigate} 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />
      <main className="relative z-10 pt-20"> 
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
