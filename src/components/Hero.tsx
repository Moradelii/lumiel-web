import React from 'react';
import { Language, ServiceDivisionId } from '../types/index.ts';
import { COMPANY_INFO } from '../data/servicesData.ts';
import { 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  Lock
} from 'lucide-react';

interface HeroProps {
  language: Language;
  onOpenIntake: (divisionId?: ServiceDivisionId) => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenIntake,
  onExploreServices,
}) => {
  const isEs = language === 'es';

  // Direct URL from public/images
  const heroBgImage = '/images/hero-bg.jpg';

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] w-full flex items-center overflow-hidden bg-[#0F2747] text-white">
      {/* FULL SCREEN BACKGROUND VIDEO WITH IMAGE POSTER FALLBACK */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroBgImage}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Lighter, softer overlay scrim allowing the office image to be luminous and clearly seen */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747]/80 via-[#0F2747]/50 to-[#0F2747]/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/60 via-transparent to-black/20 z-10 pointer-events-none" />

      {/* Subtle warm ambient highlight */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#C9A96B]/15 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Main Content Container: Clean, spacious, uncrowded */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="max-w-2xl space-y-5">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2747]/70 backdrop-blur-md border border-[#C9A96B]/60 text-[#DCC9A7] text-[11px] font-semibold tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C9A96B] animate-pulse" />
            <span>
              {isEs ? 'Centro Profesional de Documentos & Notaría' : 'Professional Document & Notary Center'}
            </span>
          </div>

          {/* H1 Headline (More compact, refined typography: text-2xl sm:text-3xl lg:text-4xl) */}
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug drop-shadow-md">
            {isEs ? (
              <>
                Servicios Profesionales de Documentos y Notaría en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E8D0] via-[#C9A96B] to-[#F8F6F1]">
                  Houston
                </span>
              </>
            ) : (
              <>
                Professional Document &amp; Notary Services in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E8D0] via-[#C9A96B] to-[#F8F6F1]">
                  Houston
                </span>
              </>
            )}
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[#F8F6F1]/90 font-light leading-relaxed max-w-xl drop-shadow-xs">
            {isEs
              ? 'Apostillas, notarización, traducciones oficiales, actas, pasaportes, vehículos y seguros con atención bilingüe personalizada. Gestión rigurosa, ágil y confidencial.'
              : 'Apostille, notarization, official translations, vital records, passports, vehicle registration and insurance with dedicated bilingual assistance.'}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            {/* Primary: Request Service */}
            <button
              onClick={() => onOpenIntake()}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#C9A96B] to-[#DCC9A7] hover:from-[#bfa060] hover:to-[#ceba96] text-[#0F2747] font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{isEs ? 'SOLICITAR SERVICIO' : 'REQUEST A SERVICE'}</span>
              <ArrowRight className="w-4 h-4 text-[#0F2747]" />
            </button>

            {/* Secondary: Call Now */}
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 bg-black/40 hover:bg-black/60 text-[#F8F6F1] font-semibold text-xs sm:text-sm rounded-xl border border-[#DCC9A7]/50 backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-[#C9A96B]" />
              <span>{isEs ? 'LLAMAR AHORA' : 'CALL NOW'}</span>
            </a>

            {/* Tertiary: Explore services */}
            <button
              onClick={onExploreServices}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#DCC9A7] hover:text-white underline-offset-4 hover:underline py-2 transition-colors cursor-pointer"
            >
              <span>{isEs ? 'Conoce nuestros servicios' : 'Explore services'}</span>
              <span>→</span>
            </button>
          </div>

          {/* Clean Trust Badges */}
          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#EAE3D8]">
            <div className="flex items-center gap-2 drop-shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#8A9A7B]" />
              <span>{isEs ? 'Notaría Acreditada en Texas' : 'Texas Commissioned Notary'}</span>
            </div>
            <div className="flex items-center gap-2 drop-shadow-xs">
              <FileCheck2 className="w-4 h-4 text-[#C9A96B]" />
              <span>{isEs ? 'Traducciones USCIS' : 'USCIS Certified Accuracy'}</span>
            </div>
            <div className="flex items-center gap-2 drop-shadow-xs">
              <Lock className="w-4 h-4 text-[#8EA2B6]" />
              <span>{isEs ? 'Custodia Segura' : 'Confidential Handling'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
