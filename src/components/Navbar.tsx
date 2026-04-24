import { useState, useEffect } from 'react';
import { PRODUCT_NAME, COMPANY_NAME } from '@/config/site';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0">
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-blue-600">
                  {PRODUCT_NAME}
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  Powered by {COMPANY_NAME}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1.5 sm:px-6 sm:py-2 bg-blue-600 text-white text-sm sm:text-base rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md"
            >
              Solicitar Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
