import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const ParticipateSection = () => {
  const { t } = useTranslation();
  const items = t('participate.contribute.items') as string[];

  return (
    <section id="participar" className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {t('participate.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            {t('participate.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side - What to contribute */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {t('participate.contribute.title')}
            </h3>
            
            <div className="space-y-4">
              {(items || []).map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Technical specs */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-lg h-full">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {t('participate.specs.title')}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl mb-2">⏱️</div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">{t('specs.duration')}</div>
                  <div className="text-xs md:text-sm text-gray-600">{t('participate.specs.duration')}</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">{t('specs.format')}</div>
                  <div className="text-xs md:text-sm text-gray-600">{t('participate.specs.format')}</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">{t('specs.quality')}</div>
                  <div className="text-xs md:text-sm text-gray-600">{t('participate.specs.quality')}</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">{t('specs.size')}</div>
                  <div className="text-xs md:text-sm text-gray-600">{t('participate.specs.size')}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipateSection;
