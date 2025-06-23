import React, { useState, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';
import TestimonyExamples from './TestimonyExamples';
import FAQ from './FAQ';
import { TermsModal } from './TermsModal';
import { Checkbox } from '@/components/ui/checkbox';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TermsPDFContent } from './TermsPDFContent';

const TestimonyForm = () => {
  const { t } = useTranslation();
  const [showExamples, setShowExamples] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rg: '',
    cpf: '',
    address: '',
    nationality: '',
    maritalStatus: '',
    profession: '',
    relationship: '',
    description: '',
    video: null,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [formErrors, setFormErrors] = useState({ termsAccepted: '' });
  const termsRef = useRef<HTMLDivElement>(null);

  const cpfMask = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .substring(0, 14);
  };

  const handleInputChange = (field: string, value: any) => {
    if (field === 'cpf') {
      value = cpfMask(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      handleInputChange('video', file);
    }
  };

  const handleAcceptTerms = () => {
    setAreTermsAccepted(true);
    setIsTermsModalOpen(false);
  };

  const generatePdf = async () => {
    if (!termsRef.current) return null;

    const canvas = await html2canvas(termsRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const imgHeightOnPdf = pdfWidth / ratio;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeightOnPdf);
    
    return pdf.output('blob');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert('Por favor, selecione um vídeo.');
      return;
    }
    if (!areTermsAccepted) {
      alert('Você precisa ler e aceitar os termos de uso e participação.');
      return;
    }
    setIsSubmitting(true);

    const pdfBlob = await generatePdf();
    if (!pdfBlob) {
      alert('Erro ao gerar o termo de consentimento em PDF.');
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    if (videoFile) {
      formDataToSend.append('video', videoFile);
    }
    formDataToSend.append('terms', pdfBlob, 'termos_de_uso.pdf');
    formDataToSend.append('nome', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telefone', formData.phone);
    formDataToSend.append('rg', formData.rg);
    formDataToSend.append('cpf', formData.cpf);
    formDataToSend.append('endereco', formData.address);
    formDataToSend.append('nacionalidade', formData.nationality);
    formDataToSend.append('estadoCivil', formData.maritalStatus);
    formDataToSend.append('profissao', formData.profession);
    formDataToSend.append('relacao', formData.relationship);
    formDataToSend.append('descricao', formData.description);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formDataToSend,
      });
      if (response.ok) {
        alert('Depoimento enviado com sucesso!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          rg: '',
          cpf: '',
          address: '',
          nationality: '',
          maritalStatus: '',
          profession: '',
          relationship: '',
          description: '',
          video: null,
        });
        setVideoFile(null);
        setVideoPreview(null);
        setAreTermsAccepted(false);
      } else {
        alert('Erro ao enviar depoimento.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hidden div for PDF generation */}
      <div className="absolute -z-10 -left-[9999px]">
        <div ref={termsRef}>
          <TermsPDFContent t={(key: string) => t(key) as string} formData={formData} />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {t('form.title') as string}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('form.subtitle') as string}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 font-medium">
                    {t('form.fullName') as string} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    {t('form.email') as string} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              {/* New Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="nationality" className="text-gray-700 font-medium">
                    Nacionalidade <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                 <div>
                  <Label htmlFor="maritalStatus" className="text-gray-700 font-medium">
                    Estado Civil <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                 <div>
                  <Label htmlFor="profession" className="text-gray-700 font-medium">
                    Profissão <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              {/* Document Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <Label htmlFor="rg" className="text-gray-700 font-medium">
                      RG <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="rg"
                    value={formData.rg}
                    onChange={(e) => handleInputChange('rg', e.target.value)}
                    className="mt-2"
                    maxLength={15}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf" className="text-gray-700 font-medium">
                      CPF <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    className="mt-2"
                    maxLength={14}
                    required
                  />
                </div>
              </div>
              
              <div>
                  <Label htmlFor="address" className="text-gray-700 font-medium">
                      Endereço Completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2"
                    required
                  />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    {t('form.phone') as string}
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship" className="text-gray-700 font-medium">
                    {t('form.relationship') as string}
                  </Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => handleInputChange('relationship', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={t('form.selectRelation') as string} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">{t('form.relations.family') as string}</SelectItem>
                      <SelectItem value="friend">{t('form.relations.friend') as string}</SelectItem>
                      <SelectItem value="colleague">{t('form.relations.colleague') as string}</SelectItem>
                      <SelectItem value="musician">{t('form.relations.musician') as string}</SelectItem>
                      <SelectItem value="witness">{t('form.relations.witness') as string}</SelectItem>
                      <SelectItem value="other">{t('form.relations.other') as string}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-gray-700 font-medium">
                  {t('form.description') as string}
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-2"
                  placeholder={t('form.placeholder') as string}
                />
              </div>
            </div>

            {/* Participate Card */}
            <Card className="rounded-xl border bg-slate-50 p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl md:text-2xl">{t('participate.title')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  {t('participate.sidebar_description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={() => setShowExamples(true)} type="button" className="w-full sm:w-auto bg-white">
                    {t('participate.sidebar_examples_button')}
                  </Button>
                  <Button variant="outline" onClick={() => setShowFAQ(true)} type="button" className="w-full sm:w-auto bg-white">
                    {t('participate.sidebar_faq_button')}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              {/* Video Upload */}
              <div>
                <Label className="text-gray-700 font-medium text-base md:text-lg">
                  {t('form.videoUpload') as string} <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-yellow-500" />
                  <p className="mt-2 text-sm text-gray-600">{t('form.verticalWarning') as string}</p>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 mt-4">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl">📤</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{t('form.dragDrop') as string}</p>
                    <Button variant="outline" onClick={() => document.getElementById('video-upload')?.click()} type="button">
                      {t('form.selectFile') as string}
                    </Button>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoChange}
                    />
                  </div>
                </div>
                {videoPreview && (
                  <div className="mt-4 text-center">
                    <p className="text-gray-700 font-medium mb-2">Arquivo selecionado:</p>
                    <p className="text-gray-600">{videoFile?.name}</p>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={areTermsAccepted}
                    onCheckedChange={(checked) => setAreTermsAccepted(Boolean(checked))}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <button
                      type="button"
                      className="text-amber-600 hover:underline"
                      onClick={() => setIsTermsModalOpen(true)}
                    >
                      {t('form.readAndAcceptTerms')}
                    </button>
                  </label>
                </div>
                {formErrors.termsAccepted && <p className="text-red-500 text-sm mt-1">{formErrors.termsAccepted}</p>}
                {areTermsAccepted && !formErrors.termsAccepted && (
                  <p className="text-green-600 text-sm mt-2">{t('form.termsAccepted')}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button type="submit" size="lg" disabled={isSubmitting || !areTermsAccepted} className="w-full">
                  {isSubmitting ? 'Enviando...' : t('form.submit') as string}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Modals */}
      <Dialog open={showExamples} onOpenChange={setShowExamples}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('examples.title')}</DialogTitle>
          </DialogHeader>
          <TestimonyExamples />
        </DialogContent>
      </Dialog>
      <Dialog open={showFAQ} onOpenChange={setShowFAQ}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('faq.title')}</DialogTitle>
          </DialogHeader>
          <FAQ />
        </DialogContent>
      </Dialog>
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={handleAcceptTerms}
        formData={{
          name: formData.fullName,
          rg: formData.rg,
          cpf: formData.cpf,
          address: formData.address,
          nationality: formData.nationality,
          maritalStatus: formData.maritalStatus,
          profession: formData.profession,
        }}
      />
    </section>
  );
};

export default TestimonyForm; 