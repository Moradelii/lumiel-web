import React from 'react';
import { Language } from '../types/index.ts';
import { FileSearch, FileCheck2, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

interface HowItWorksSectionProps {
  language: Language;
  onOpenIntake: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  language,
  onOpenIntake,
}) => {
  const isEs = language === 'es';

  const steps = [
    {
      num: '01',
      icon: <FileSearch className="w-5 h-5" />,
      title: { es: 'Seleccione su Trámite', en: 'Select Your Service' },
      desc: {
        es: 'Elija entre nuestras 7 divisiones especializadas y cargue sus documentos en nuestro portal seguro o en persona en Houston.',
        en: 'Choose from our 7 specialized service divisions and upload your files via our secure portal or in person in Houston.',
      },
    },
    {
      num: '02',
      icon: <ShieldCheck className="w-5 h-5" />,
      title: { es: 'Revisión Notarial & Cotización', en: 'Expert Review & Transparent Quote' },
      desc: {
        es: 'Un especialista verifica firmas, sellos y requisitos de la autoridad (Texas SOS, USCIS, DMV) y genera su presupuesto claro.',
        en: 'A specialist verifies seals, state registrar compliance, and requirements before generating an upfront clear quote.',
      },
    },
    {
      num: '03',
      icon: <FileCheck2 className="w-5 h-5" />,
      title: { es: 'Gestión y Radicación Oficial', en: 'Official Processing & Filing' },
      desc: {
        es: 'Tramitamos la apostilla en Austin, ejecutamos la fe notarial o certificamos la traducción con estricta validez jurídica.',
        en: 'We process state apostilles in Austin, execute notarial acts, or certify translations with full statutory adherence.',
      },
    },
    {
      num: '04',
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: { es: 'Entrega Segura o Envío', en: 'Delivery or Pick Up' },
      desc: {
        es: 'Reciba sus documentos originales y apostillados listos para su uso internacional en nuestra oficina de Houston o vía mensajería.',
        en: 'Pick up completed, certified documents at our Houston office or receive them via tracked priority courier.',
      },
    },
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-t border-[#DCC9A7]/40">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono font-bold tracking-widest text-[#887D6B]">
            <span>{isEs ? 'SECCIÓN 31 · CÓMO FUNCIONA' : 'SECTION 31 · HOW IT WORKS'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2747] tracking-tight">
            {isEs ? 'Trámites Complejos Hechos Simples y Seguros' : 'Complex Administrative Processes Made Simple'}
          </h2>
          <p className="text-sm sm:text-base text-[#2E2E2E]/80 leading-relaxed">
            {isEs
              ? 'Nuestro proceso de 4 pasos garantiza que ningún trámite sufra retrasos o rechazos por omisión de requisitos.'
              : 'Our structured 4-step workflow prevents delays and rejections due to missed requirements.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 rounded-2xl bg-[#F8F6F1] border border-[#DCC9A7]/60 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F2747] text-[#C9A96B] flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                  <span className="font-mono text-xl font-bold text-[#DCC9A7]">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0F2747] mb-2">
                  {step.title[language]}
                </h3>

                <p className="text-xs text-[#887D6B] leading-relaxed">
                  {step.desc[language]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCC9A7]/30">
                <span className="text-[10px] uppercase font-bold text-[#8A9A7B] tracking-wider">
                  ✓ {isEs ? 'Supervisión Continua' : 'Continuous Tracking'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA Box */}
        <div className="liquid-glass-dark rounded-2xl p-8 text-center text-white space-y-4 max-w-4xl mx-auto shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F6F1]">
            {isEs ? '¿Listo para iniciar su trámite con nosotros?' : 'Ready to Start Your Request Today?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE3D8] max-w-2xl mx-auto">
            {isEs
              ? 'Complete el formulario en menos de 2 minutos y un asesor de Houston se pondrá en contacto inmediato.'
              : 'Complete our guided intake form in under 2 minutes and a Houston specialist will follow up promptly.'}
          </p>
          <button
            onClick={onOpenIntake}
            className="px-6 py-3 bg-[#C9A96B] hover:bg-[#b89552] text-[#0F2747] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {isEs ? 'SOLICITAR SERVICIO AHORA →' : 'REQUEST SERVICE NOW →'}
          </button>
        </div>
      </div>
    </section>
  );
};
