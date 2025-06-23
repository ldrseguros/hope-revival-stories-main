import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const TestimonyExamples = () => {
  const { t } = useTranslation();

  const examples = [
    {
      title: t('examples.personal.title'),
      content: t('examples.personal.content'),
      duration: t('examples.personal.duration'),
      tone: t('examples.personal.tone'),
      icon: '💡',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: t('examples.colleague.title'),
      content: t('examples.colleague.content'),
      duration: t('examples.colleague.duration'),
      tone: t('examples.colleague.tone'),
      icon: '🎵',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: t('examples.witness.title'),
      content: t('examples.witness.content'),
      duration: t('examples.witness.duration'),
      tone: t('examples.witness.tone'),
      icon: '❤️',
      color: 'from-red-500 to-pink-600'
    }
  ];

  const tips = [
    t('examples.tips.authentic'),
    t('examples.tips.miracle'),
    t('examples.tips.brief'),
    t('examples.tips.environment'),
    t('examples.tips.position'),
    t('examples.tips.camera')
  ];

  return (
    <div className="space-y-8 p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${example.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                {example.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900">{example.title}</h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4 flex-grow">
              <p className="text-gray-700 italic text-sm">{example.content}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {example.duration}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                {example.tone}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🙏 {t('examples.tips.title')}
        </h3>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
              <span className="text-gray-700 text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestimonyExamples;
