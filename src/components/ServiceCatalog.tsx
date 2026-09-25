import React, { useState } from 'react';
import { Language, ServiceDivisionId, ServiceItem } from '../types/index.ts';
import { SERVICE_DIVISIONS } from '../data/servicesData.ts';
import { 
  Check, 
  Clock, 
  ArrowRight, 
  Share2, 
  FileCheck2, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink 
} from 'lucide-react';

interface ServiceCatalogProps {
  language: Language;
  selectedDivisionId?: ServiceDivisionId;
  onOpenIntake: (divisionId?: ServiceDivisionId) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  language,
  selectedDivisionId,
  onOpenIntake,
}) => {
  const isEs = language === 'es';
  const [activeTab, setActiveTab] = useState<ServiceDivisionId>(selectedDivisionId || 'apostille');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedDivisionId) {
      setActiveTab(selectedDivisionId);
    }
  }, [selectedDivisionId]);

  const currentDivision = SERVICE_DIVISIONS.find((d) => d.id === activeTab) || SERVICE_DIVISIONS[0];

  return (
    <section id="servicios" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-t border-[#DCC9A7]/40">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono font-bold tracking-widest text-[#887D6B]">
            <span>{isEs ? 'CATÁLOGO MAESTRO DE TRÁMITES' : 'MASTER SERVICE DIRECTORY'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2747] tracking-tight">
            {isEs ? 'Servicios Oficiales y Requisitos' : 'Official Services & Prerequisites'}
          </h2>
          <p className="text-sm sm:text-base text-[#2E2E2E]/80 leading-relaxed">
            {isEs
              ? 'Consulte cada división para conocer los documentos necesarios, tiempos estimados y el flujo de legalización.'
              : 'Browse each division to review necessary documents, turnaround timeframes, and validation workflows.'}
          </p>
        </div>

        {/* Division Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {SERVICE_DIVISIONS.map((div) => {
            const isActive = activeTab === div.id;
            return (
              <button
                key={div.id}
                onClick={() => {
                  setActiveTab(div.id);
                  setExpandedServiceId(null);
                }}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? 'bg-[#0F2747] text-white border-[#0F2747] shadow-md scale-[1.02]'
                    : 'bg-[#F8F6F1] text-[#2E2E2E] border-[#DCC9A7]/60 hover:bg-[#EAE3D8] hover:border-[#C9A96B]/50'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                  isActive ? 'bg-[#C9A96B] text-[#0F2747]' : 'bg-[#EAE3D8] text-[#887D6B]'
                }`}>
                  {div.code}
                </span>
                <span>{div.title[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Division Overview Card */}
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 border border-[#DCC9A7]/70 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCC9A7]/50 pb-6">
            <div>
              <span className="text-[10.5px] font-mono tracking-wider uppercase font-bold text-[#887D6B] block">
                {isEs ? `DIVISIÓN ${currentDivision.code} · REGULADO EN TEXAS` : `DIVISION ${currentDivision.code} · TEXAS COMPLIANT`}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2747] mt-1">
                {currentDivision.title[language]}
              </h3>
              <p className="text-xs sm:text-sm text-[#2E2E2E]/80 mt-1 max-w-3xl">
                {currentDivision.description[language]}
              </p>
            </div>

            <button
              onClick={() => onOpenIntake(currentDivision.id)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F2747] hover:bg-[#16355C] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all self-start cursor-pointer"
            >
              <span>{isEs ? 'Iniciar Trámite de esta División' : 'Start Request in this Division'}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A96B]" />
            </button>
          </div>

          {/* Sub-services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDivision.services.map((service) => {
              const isExpanded = expandedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl border border-[#DCC9A7]/60 p-5 shadow-xs hover:border-[#0F2747]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#0F2747] leading-snug">
                        {service.name[language]}
                      </h4>
                      {service.popular && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#C9A96B]/20 text-[#0F2747] border border-[#C9A96B]/40 whitespace-nowrap">
                          {isEs ? 'Popular' : 'Frequent'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#887D6B] mb-3 leading-relaxed">
                      {service.shortDesc[language]}
                    </p>

                    {/* Collapsible Requirements Details */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-[#F8F6F1] space-y-2 animate-in fade-in duration-150">
                        <p className="text-xs text-[#2E2E2E] leading-relaxed">
                          {service.fullDesc[language]}
                        </p>
                        <div className="bg-[#F8F6F1] p-3 rounded-lg border border-[#DCC9A7]/40">
                          <span className="text-[11px] font-bold text-[#0F2747] block mb-1">
                            {isEs ? 'Documentación Requerida:' : 'Required Documentation:'}
                          </span>
                          <ul className="space-y-1 text-[11px] text-[#2E2E2E]">
                            {service.requirements[language].map((req, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-[#8A9A7B] flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Footer */}
                  <div className="mt-4 pt-3 border-t border-[#F8F6F1] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#887D6B] font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96B]" />
                      <span>{service.estimatedDays}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                        className="text-xs font-semibold text-[#887D6B] hover:text-[#0F2747] flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>{isExpanded ? (isEs ? 'Menos' : 'Less') : (isEs ? 'Requisitos' : 'Details')}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      <button
                        onClick={() => onOpenIntake(currentDivision.id)}
                        className="px-3 py-1 bg-[#0F2747] text-white rounded-lg text-xs font-semibold hover:bg-[#16355C] transition-colors cursor-pointer"
                      >
                        {isEs ? 'Solicitar' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Semantic Service Interlinking Bar (Blueprint Section 30 & 55) */}
          <div className="p-4 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-[#887D6B]">
              <strong className="text-[#0F2747]">{isEs ? '¿Combina trámites?' : 'Need Combined Services?'}</strong>{' '}
              {isEs
                ? 'Conectamos automáticamente su apostilla con traducción jurada o firma notarial previa en el mismo expediente.'
                : 'We cross-coordinate apostilles, certified translations, and notary signings under a single Houston case.'}
            </span>
            <button
              onClick={() => onOpenIntake('apostille')}
              className="font-bold text-[#0F2747] hover:text-[#C9A96B] flex items-center gap-1 whitespace-nowrap"
            >
              <span>{isEs ? 'Cotizar combo integral' : 'Quote combo bundle'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
