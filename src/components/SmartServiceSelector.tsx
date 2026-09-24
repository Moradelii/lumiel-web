import React from 'react';
import { Language, ServiceDivisionId } from '../types/index.ts';
import { SERVICE_DIVISIONS, COMPANY_INFO } from '../data/servicesData.ts';
import { 
  Stamp, 
  ShieldCheck, 
  Languages as LanguagesIcon, 
  FileText, 
  PlaneTakeoff, 
  Car, 
  Shield, 
  ArrowRight 
} from 'lucide-react';

interface SmartServiceSelectorProps {
  language: Language;
  onSelectCategory: (divisionId: ServiceDivisionId) => void;
  onStartWorkflow: (divisionId: ServiceDivisionId) => void;
}

const getCategoryIcon = (id: ServiceDivisionId) => {
  switch (id) {
    case 'apostille':
      return <Stamp className="w-6 h-6" />;
    case 'notary':
      return <ShieldCheck className="w-6 h-6" />;
    case 'translation':
      return <LanguagesIcon className="w-6 h-6" />;
    case 'vital-records':
      return <FileText className="w-6 h-6" />;
    case 'passport':
      return <PlaneTakeoff className="w-6 h-6" />;
    case 'vehicles':
      return <Car className="w-6 h-6" />;
    case 'insurance':
      return <Shield className="w-6 h-6" />;
    default:
      return <FileText className="w-6 h-6" />;
  }
};

export const SmartServiceSelector: React.FC<SmartServiceSelectorProps> = ({
  language,
  onSelectCategory,
  onStartWorkflow,
}) => {
  const isEs = language === 'es';

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 bg-[#F8F6F1] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono font-bold tracking-widest text-[#887D6B]">
            <span>{isEs ? '04 · ARQUITECTURA DE SERVICIOS' : '04 · MASTER SERVICE ARCHITECTURE'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2747] tracking-tight">
            {isEs ? '¿En qué podemos ayudarte hoy?' : 'What Do You Need Help With?'}
          </h2>

          <p className="text-sm sm:text-base text-[#2E2E2E]/80 leading-relaxed">
            {isEs
              ? 'Seleccione la división de su trámite para iniciar la solicitud inteligente, consultar requisitos o solicitar una cotización inmediata.'
              : 'Select your service category to launch our intelligent intake workflow, verify requirements, or receive a prompt quote.'}
          </p>
        </div>

        {/* 7 Primary Categories Interactive Grid as per Blueprint Section 14 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICE_DIVISIONS.map((division) => (
            <div
              key={division.id}
              className="group liquid-glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-[#DCC9A7]/50 flex flex-col justify-between hover:-translate-y-1 bg-white relative overflow-hidden"
            >
              {/* Subtle top indicator bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#C9A96B] transition-colors" />

              <div>
                {/* Header with Division Code and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F8F6F1] group-hover:bg-[#0F2747] text-[#0F2747] group-hover:text-[#DCC9A7] flex items-center justify-center transition-all duration-300 shadow-inner">
                    {getCategoryIcon(division.id)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#887D6B] bg-[#F8F6F1] px-2.5 py-1 rounded-md">
                    {division.code}
                  </span>
                </div>

                {/* Title and Subtitle */}
                <h3 className="font-serif text-xl font-bold text-[#0F2747] group-hover:text-[#0F2747] mb-2 leading-snug">
                  {division.title[language]}
                </h3>

                <p className="text-xs text-[#887D6B] leading-relaxed mb-4 line-clamp-2 font-normal">
                  {division.subtitle[language]}
                </p>

                {/* Quick sub-services list preview */}
                <div className="space-y-1.5 mb-5">
                  {division.services.slice(0, 3).map((service) => (
                    <div 
                      key={service.id} 
                      className="text-[11.5px] text-[#2E2E2E]/85 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A96B]" />
                      <span className="truncate">{service.name[language]}</span>
                    </div>
                  ))}
                  {division.services.length > 3 && (
                    <div className="text-[10.5px] text-[#887D6B] font-medium pl-2.5">
                      +{division.services.length - 3} {isEs ? 'servicios más...' : 'more services...'}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#F8F6F1] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectCategory(division.id)}
                  className="text-xs font-semibold text-[#0F2747] hover:text-[#C9A96B] transition-colors py-1 cursor-pointer"
                >
                  {isEs ? 'Ver detalles' : 'View details'}
                </button>

                <button
                  onClick={() => onStartWorkflow(division.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F2747] hover:bg-[#16355C] text-white text-xs font-medium group-hover:shadow transition-all cursor-pointer"
                >
                  <span>{isEs ? 'Iniciar' : 'Start'}</span>
                  <ArrowRight className="w-3 h-3 text-[#C9A96B]" />
                </button>
              </div>
            </div>
          ))}

          {/* 8th Card: Direct Houston Office Assistance */}
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1 rounded-2xl p-6 bg-gradient-to-br from-[#0F2747] to-[#16355C] text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9A96B]">
                {isEs ? 'ATENCIÓN PERSONALIZADA' : 'DIRECT CONSULTATION'}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F8F6F1]">
                {isEs ? '¿Tienes un caso especial?' : 'Have a Special Case?'}
              </h3>
              <p className="text-xs text-[#EAE3D8] leading-relaxed">
                {isEs
                  ? 'Si tu trámite involucra múltiples países o necesitas asesoría documental previa, llámanos o visítanos directamente en Houston.'
                  : 'If your case involves multi-jurisdiction apostilles or document questions, contact our Houston specialists directly.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full py-2 bg-[#DCC9A7] hover:bg-[#cbb692] text-[#0F2747] rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>📞 +1 (346) 521-0662</span>
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 border border-white/20 transition-colors"
              >
                <span>💬 WhatsApp Houston</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
