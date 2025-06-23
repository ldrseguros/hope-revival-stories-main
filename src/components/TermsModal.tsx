import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  formData: {
    name: string;
    rg: string;
    cpf: string;
    address: string;
    nationality: string;
    maritalStatus: string;
    profession: string;
  };
}

const TermoUsoImagemVoz = ({ formData }: { formData: TermsModalProps["formData"] }) => {
  const { t } = useTranslation();

  const renderText = (key: string, replacements: Record<string, string>) => {
    let text = t(`terms.term_image_voice.${key}`) as string;
    return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
      return acc.replace(`{${placeholder}}`, value || `[${placeholder}]`);
    }, text);
  };

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4">
      <h3 className="font-bold text-lg">{t('terms.term_image_voice.title')}</h3>
      <p>
        {renderText('p1', {
          name: formData.name,
          nationality: formData.nationality,
          maritalStatus: formData.maritalStatus,
          profession: formData.profession,
          rg: formData.rg,
          cpf: formData.cpf,
          address: formData.address
        })}
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
  );
};

const TermoParticipacaoVoluntaria = ({ formData }: { formData: TermsModalProps["formData"] }) => {
  const { t } = useTranslation();

  const renderText = (key: string, replacements: Record<string, string>) => {
    let text = t(`terms.term_voluntary.${key}`) as string;
    return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
      return acc.replace(`{${placeholder}}`, value || `[${placeholder}]`);
    }, text);
  };

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4">
      <h3 className="font-bold text-lg">{t('terms.term_voluntary.title')}</h3>
      <p>
        {renderText('p1', {
          name: formData.name,
          nationality: formData.nationality,
          maritalStatus: formData.maritalStatus,
          profession: formData.profession,
          rg: formData.rg,
          cpf: formData.cpf,
          address: formData.address
        })}
      </p>
      <ol className="list-decimal list-inside space-y-2">
        <li>
          <strong>{t('terms.term_voluntary.list_item1_title')}</strong> {t('terms.term_voluntary.list_item1_content')}
        </li>
        <li>
          <strong>{t('terms.term_voluntary.list_item2_title')}</strong> {t('terms.term_voluntary.list_item2_content')}
        </li>
        <li>
          <strong>{t('terms.term_voluntary.list_item3_title')}</strong> {t('terms.term_voluntary.list_item3_content')}
        </li>
        <li>
          <strong>{t('terms.term_voluntary.list_item4_title')}</strong> {t('terms.term_voluntary.list_item4_content')}
        </li>
        <li>
          <strong>{t('terms.term_voluntary.list_item5_title')}</strong> {t('terms.term_voluntary.list_item5_content')}
        </li>
        <li>
          <strong>{t('terms.term_voluntary.list_item6_title')}</strong> {t('terms.term_voluntary.list_item6_content')}
          <ul className="list-disc list-inside ml-4">
              <li>{t('terms.term_voluntary.sublist_item1')}</li>
              <li>{t('terms.term_voluntary.sublist_item2')}</li>
              <li>{t('terms.term_voluntary.sublist_item3')}</li>
          </ul>
        </li>
        <li>
          <strong>{t('terms.term_voluntary.list_item7_title')}</strong> {t('terms.term_voluntary.list_item7_content')}
        </li>
        <li>
          <strong>{t('terms.term_voluntary.list_item8_title')}</strong> {t('terms.term_voluntary.list_item8_content')}
        </li>
      </ol>
    </div>
  );
};

export function TermsModal({ isOpen, onClose, onAccept, formData }: TermsModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('terms.title')}</DialogTitle>
          <DialogDescription>
            {t('terms.description')}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="uso-imagem-voz">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="uso-imagem-voz">{t('terms.tab_image_voice')}</TabsTrigger>
            <TabsTrigger value="participacao-voluntaria">{t('terms.tab_voluntary')}</TabsTrigger>
          </TabsList>
          <TabsContent value="uso-imagem-voz">
            <TermoUsoImagemVoz formData={formData} />
          </TabsContent>
          <TabsContent value="participacao-voluntaria">
            <TermoParticipacaoVoluntaria formData={formData} />
          </TabsContent>
        </Tabs>
        <DialogFooter>
            <div className="flex flex-col w-full">
                 <p className="text-sm text-gray-500 mb-4 text-center">
                    {t('terms.accept_both_terms_part1')}
                    <strong>{t('terms.accept_both_terms_strong')}</strong>
                    {t('terms.accept_both_terms_part2')}
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        {t('terms.cancel')}
                    </Button>
                    <Button onClick={onAccept}>
                        {t('terms.accept_and_continue')}
                    </Button>
                </div>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 