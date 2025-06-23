import React from 'react';
import { TFunction } from 'i18next';

interface TermsPDFContentProps {
  t: TFunction;
  formData: {
    fullName: string;
    email: string;
    phone: string;
    rg: string;
    cpf: string;
    address: string;
    nationality: string;
    maritalStatus: string;
    profession: string;
  };
}

export const TermsPDFContent: React.FC<TermsPDFContentProps> = ({ t, formData }) => {
  return (
    <div className="p-8 bg-white text-gray-900" style={{ width: '210mm', fontSize: '12px' }}>
      <div className="space-y-6">
        {/* Termo de Uso de Imagem e Voz */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl mb-4 text-center">{t('terms.term_image_voice.title')}</h3>
          <p>
            Eu, <strong>{formData.fullName || '[Nome Completo]'}</strong>, nacionalidade <strong>{formData.nationality || '[Nacionalidade]'}</strong>, estado civil <strong>{formData.maritalStatus || '[Estado Civil]'}</strong>, profissão <strong>{formData.profession || '[Profissão]'}</strong>, portador(a) do RG nº <strong>{formData.rg || '[RG]'}</strong> e do CPF nº <strong>{formData.cpf || '[CPF]'}</strong>, residente e domiciliado(a) em <strong>{formData.address || '[Endereço]'}</strong>, doravante denominado(a) CEDENTE.
          </p>
          <p>{t('terms.term_image_voice.p2')}</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>{t('terms.term_image_voice.list_item1_title')}</strong> {t('terms.term_image_voice.list_item1_content')}
            </li>
            <li>
              <strong>{t('terms.term_image_voice.list_item2_title')}</strong> {t('terms.term_image_voice.list_item2_content')}
            </li>
            <li>
              <strong>{t('terms.term_image_voice.list_item3_title')}</strong> {t('terms.term_image_voice.list_item3_content')}
            </li>
          </ol>
          <p>{t('terms.term_image_voice.p3')}</p>
          <p>{t('terms.term_image_voice.p4')}</p>
          <p>{t('terms.term_image_voice.p5')}</p>
          <p>{t('terms.term_image_voice.p6')}</p>
        </div>

        {/* Termo de Participação Voluntária */}
        <div className="space-y-4 pt-8" style={{ pageBreakBefore: 'always' }}>
          <h3 className="font-bold text-xl mb-4 text-center">{t('terms.term_voluntary.title')}</h3>
          <p>
             Eu, <strong>{formData.fullName || '[Nome Completo]'}</strong>, nacionalidade <strong>{formData.nationality || '[Nacionalidade]'}</strong>, estado civil <strong>{formData.maritalStatus || '[Estado Civil]'}</strong>, profissão <strong>{formData.profession || '[Profissão]'}</strong>, portador(a) do RG nº <strong>{formData.rg || '[RG]'}</strong> e do CPF nº <strong>{formData.cpf || '[CPF]'}</strong>, residente e domiciliado(a) em <strong>{formData.address || '[Endereço]'}</strong>, doravante denominado(a) VOLUNTÁRIO(A).
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>{t('terms.term_voluntary.list_item1_title')}</strong> {t('terms.term_voluntary.list_item1_content')}</li>
            <li><strong>{t('terms.term_voluntary.list_item2_title')}</strong> {t('terms.term_voluntary.list_item2_content')}</li>
            <li><strong>{t('terms.term_voluntary.list_item3_title')}</strong> {t('terms.term_voluntary.list_item3_content')}</li>
            <li><strong>{t('terms.term_voluntary.list_item4_title')}</strong> {t('terms.term_voluntary.list_item4_content')}</li>
            <li><strong>{t('terms.term_voluntary.list_item5_title')}</strong> {t('terms.term_voluntary.list_item5_content')}</li>
            <li>
              <strong>{t('terms.term_voluntary.list_item6_title')}</strong> {t('terms.term_voluntary.list_item6_content')}
              <ul className="list-disc list-inside ml-4">
                <li>{t('terms.term_voluntary.sublist_item1')}</li>
                <li>{t('terms.term_voluntary.sublist_item2')}</li>
                <li>{t('terms.term_voluntary.sublist_item3')}</li>
              </ul>
            </li>
            <li><strong>{t('terms.term_voluntary.list_item7_title')}</strong> {t('terms.term_voluntary.list_item7_content')}</li>
            <li><strong>{t('terms.term_voluntary.list_item8_title')}</strong> {t('terms.term_voluntary.list_item8_content')}</li>
          </ol>
        </div>
        
        <div className="pt-12 text-center">
          <p>Li e estou de acordo com os termos acima.</p>
          <p>Data do Aceite: {new Date().toLocaleDateString('pt-BR')}</p>
          <div className="pt-16">
              <p className="border-t-2 border-gray-900 w-64 mx-auto"></p>
              <p className="mt-2">{formData.fullName || '[Nome Completo]'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 