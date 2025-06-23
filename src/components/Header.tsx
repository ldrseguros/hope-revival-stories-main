import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 to-blue-900/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JB</span>
            </div>
            <span className="text-white font-semibold text-lg">
              {t('header.projectName')}
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-white/80 hover:text-white transition-colors">
              {t('header.home')}
            </a>
            <a href="#projeto" className="text-white/80 hover:text-white transition-colors">
              {t('header.project')}
            </a>
            <a href="#participar" className="text-white/80 hover:text-white transition-colors">
              {t('header.participate')}
            </a>
          </nav>

          <LanguageSelector 
            currentLanguage={language} 
            onLanguageChange={(newLanguage) => setLanguage(newLanguage as 'pt' | 'es' | 'en')} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
