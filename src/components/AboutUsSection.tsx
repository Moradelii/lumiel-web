import React from 'react';
import { Language } from '../types/index.ts';
import { COMPANY_INFO } from '../data/servicesData.ts';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Building2, 
  Clock, 
  ArrowRight,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

// Imported generated images
import officeImg from '../assets/images/about_lumiel_office_1790225820016.jpg';
import teamImg from '../assets/images/about_lumiel_team_1790225831629.jpg';

interface AboutUsSectionProps {
  language: Language;
  onOpenIntake: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  language,
  onOpenIntake,
}) => {
  const isEs = language === 'es';

  return (
    <section id="sobre-nosotros" className="py-20 bg-white border-t border-[#DCC9A7]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#C9A96B] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEs ? 'CONÓCENOS · HOUSTON, TEXAS' : 'ABOUT US · HOUSTON, TEXAS'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2747] tracking-tight">
            {isEs ? (
              <>
                Compromiso, Integridad y Certeza en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F2747] via-[#C9A96B] to-[#0F2747]">
                  Cada Documento
                </span>
              </>
            ) : (
              <>
                Integrity, Precision, and Legal Trust in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F2747] via-[#C9A96B] to-[#0F2747]">
                  Every Document
                </span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-[#2E2E2E]/80 leading-relaxed font-light">
            {isEs
              ? 'Multiservicios Lumiel nació con una misión inquebrantable: brindar a la comunidad hispana e internacional en Houston un respaldo profesional, riguroso y transparente en todos sus trámites documentales y notariales.'
              : 'Multiservicios Lumiel was founded with a dedicated mission: to empower the Houston community with uncompromising accuracy, confidentiality, and bilingual expertise in official document administration and notarial services.'}
          </p>
        </div>

        {/* First Showcase Block: Image 1 & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image 1 Container */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#DCC9A7] group">
              <img
                src={officeImg}
                alt="Oficinas de Multiservicios Lumiel en Houston"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl backdrop-blur-md bg-black/40 border border-white/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#DCC9A7] block font-bold">
                  {isEs ? 'SEDE CORPORATIVA' : 'CORPORATE HEADQUARTERS'}
                </span>
                <p className="font-serif text-sm font-semibold text-[#F8F6F1]">
                  Alaniss Antúnez
                </p>
              </div>
            </div>
            {/* Decorative Gold Float Card */}
            <div className="hidden sm:flex absolute -top-5 -left-5 p-3.5 bg-[#0F2747] text-[#DCC9A7] rounded-xl shadow-xl border border-[#C9A96B]/60 items-center gap-3 max-w-xs">
              <Building2 className="w-6 h-6 text-[#C9A96B] flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">
                  {isEs ? 'Atención en Houston' : 'Houston Location'}
                </span>
                <span className="text-[11px] text-[#DCC9A7]">
                  {isEs ? 'Instalaciones modernas y accesibles' : 'Modern & fully accessible office'}
                </span>
              </div>
            </div>
          </div>

          {/* Descriptive Content 1 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F8F6F1] border border-[#DCC9A7] text-[#0F2747] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C9A96B]" />
              <span>{isEs ? 'NUESTRA HISTORIA & PROPÓSITO' : 'OUR HERITAGE & PURPOSE'}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2747]">
              {isEs
                ? 'Conectando sus planes con el mundo desde el corazón de Texas'
                : 'Connecting your life ambitions with the world from the heart of Texas'}
            </h3>

            <p className="text-xs sm:text-sm text-[#2E2E2E]/85 leading-relaxed">
              {isEs
                ? 'Sabemos que detrás de cada documento —sea una apostilla de matrimonio para tramitar una ciudadanía en el extranjero, la traducción de un título profesional para USCIS, o una carta notariada para proteger a su familia— hay sueños, esfuerzo y metas de vida que no pueden quedar a merced del error o la improvisación.'
                : 'Behind every document—whether an apostille for international dual citizenship, a certified translation for USCIS immigration petitions, or a notarial power of attorney—lies personal dedication, hard work, and milestones that require total compliance and reliability.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#DCC9A7]/60">
                <span className="font-mono text-2xl font-bold text-[#0F2747] block">+10</span>
                <span className="text-xs text-[#887D6B] font-semibold">
                  {isEs ? 'Años de Experiencia' : 'Years of Experience'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#DCC9A7]/60">
                <span className="font-mono text-2xl font-bold text-[#C9A96B] block">100%</span>
                <span className="text-xs text-[#887D6B] font-semibold">
                  {isEs ? 'Aceptación USCIS' : 'USCIS Acceptance'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Showcase Block: Image 2 & Team Excellence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Descriptive Content 2 */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F8F6F1] border border-[#DCC9A7] text-[#0F2747] text-xs font-semibold">
              <Award className="w-4 h-4 text-[#8A9A7B]" />
              <span>{isEs ? 'NOTARÍA Y GESTIÓN RIGUROSA' : 'COMMISSIONED INTEGRITY & EXPERTISE'}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2747]">
              {isEs
                ? 'Profesionales Acreditados con Vocación Humana'
                : 'Accredited Specialists with Warm, Personal Attention'}
            </h3>

            <p className="text-xs sm:text-sm text-[#2E2E2E]/85 leading-relaxed">
              {isEs
                ? 'Nuestro equipo está conformado por notarios públicos comisionados en el Estado de Texas, traductores certificados con acreditación jurídica y especialistas con conocimiento exhaustivo de las exigencias del Convenio de La Haya y los consulados de Latinoamérica, Europa y el Caribe.'
                : 'Our multidisciplinary team comprises commissioned Texas Notaries Public, sworn legal translators, and document logistics managers deeply versed in the requirements of the Hague Apostille Convention, Texas Secretary of State guidelines, and foreign consulates.'}
            </p>

            {/* Core Values Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A7B] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#0F2747]">
                    {isEs ? 'Bilingüismo Fluido (Español & English):' : 'Bilingual Fluency (Spanish & English):'}
                  </span>
                  <span className="text-[#887D6B] ml-1">
                    {isEs
                      ? 'Sin confusiones técnicas. Le explicamos cada paso en su propio idioma.'
                      : 'No jargon barriers. Clear explanations in your preferred language.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A7B] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#0F2747]">
                    {isEs ? 'Transparencia de Tarifas:' : 'Transparent Pricing Policy:'}
                  </span>
                  <span className="text-[#887D6B] ml-1">
                    {isEs
                      ? 'Cotizaciones claras y por escrito que desglosan aranceles estatales y honorarios.'
                      : 'Upfront breakdown distinguishing official state fees from service processing.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8A9A7B] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#0F2747]">
                    {isEs ? 'Confidencialidad Rigurosa:' : 'Strict Document Security:'}
                  </span>
                  <span className="text-[#887D6B] ml-1">
                    {isEs
                      ? 'Trato reservado y custodia segura de documentos originales y copias digitales.'
                      : 'High-security handling and custody protocols for all your original records.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenIntake}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F2747] hover:bg-[#16355C] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>{isEs ? 'INICIAR MI TRÁMITE CON LUMIEL' : 'START YOUR SERVICE WITH US'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A96B]" />
              </button>
            </div>
          </div>

          {/* Image 2 Container */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#DCC9A7] group">
              <img
                src={teamImg}
                alt="Especialista Notarial de Multiservicios Lumiel revisando documentos"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl backdrop-blur-md bg-black/40 border border-white/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A96B] block font-bold">
                  {isEs ? 'NOTARÍA Y GESTORÍA OFICIAL' : 'OFFICIAL NOTARIAL & FILING'}
                </span>
                <p className="font-serif text-sm font-semibold text-[#F8F6F1]">
                  {isEs ? 'Revisión minuciosa y apego a las normas de Texas' : 'Meticulous review adhering to Texas statutory law'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
