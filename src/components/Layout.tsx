import React from 'react';
import Header from './Header';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
            © 2025 Government Social Support Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
