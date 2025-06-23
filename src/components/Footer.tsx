import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Project Info */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-white">JB</span>
              </div>
              <span className="font-semibold text-lg">{t('header.projectName') as string}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              {t('hero.subtitle') as string}
            </p>
          </div>

          {/* Social Impact */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>💚</span> {t('impact.social') as string}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              {t('impact.socialDesc') as string}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📞</span> {t('footer.contact') as string}
            </h3>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium mb-1">{t('footer.coordination') as string}</h4>
                <p className="text-white/80 text-sm">
                  📧 {t('footer.email') as string}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>© 2024 {t('header.projectName') as string}. {t('footer.rights') as string}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
