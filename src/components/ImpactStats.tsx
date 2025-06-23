import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const ImpactStats = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: "📖",
      title: t('impact.book'),
      description: t('impact.bookDesc'),
      color: "bg-blue-100"
    },
    {
      icon: "🎥",
      title: t('impact.video'),
      description: t('impact.videoDesc'),
      color: "bg-green-100"
    },
    {
      icon: "❤️",
      title: t('impact.social'),
      description: t('impact.socialDesc'),
      color: "bg-orange-100"
    },
    {
      icon: "⚡",
      title: t('impact.response'),
      description: t('impact.responseDesc'),
      color: "bg-purple-100"
    }
  ];

  return (
    <section id="impacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('impact.mainTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('impact.mainDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {stat.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional context about social impact */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {t('impact.transformTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                  <span className="text-2xl">🙏</span>
                  {t('impact.strengthTitle')}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('impact.strengthDesc')}
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                  <span className="text-2xl">💫</span>
                  {t('impact.lastingTitle')}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('impact.lastingDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
