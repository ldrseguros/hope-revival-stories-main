import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const MiracleStory = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '🙏',
      title: t('miracle.hope'),
      description: t('miracle.hopeDesc'),
      color: 'from-purple-500 to-blue-600'
    },
    {
      icon: '💝',
      title: t('miracle.faith'),
      description: t('miracle.faithDesc'),
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: '✨',
      title: t('miracle.purpose'),
      description: t('miracle.purposeDesc'),
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('miracle.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            {t('miracle.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 text-2xl`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiracleStory;
