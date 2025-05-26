import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center py-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('app.title')}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {t('app.subtitle')}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                aria-label="Select language"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'English' : 'العربية'}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="bg-white">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')}
                className={language === 'en' ? 'bg-gray-100' : ''}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('ar')}
                className={language === 'ar' ? 'bg-gray-100' : ''}
              >
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
