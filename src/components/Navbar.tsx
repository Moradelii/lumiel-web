import React, { useState } from 'react';
import { Language, ServiceDivisionId } from '../types/index.ts';
import { SERVICE_DIVISIONS, COMPANY_INFO } from '../data/servicesData.ts';
import { 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  Menu, 
  X, 
  MapPin, 
  ShieldCheck,
  Building
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenIntake: (divisionId?: ServiceDivisionId) => void;
  onSelectDivision: (divisionId: ServiceDivisionId) => void;
  onNavigateAbout?: () => void;
  onNavigatePortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenIntake,
  onSelectDivision,
  onNavigateAbout,
  onNavigatePortal,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    services: language === 'es' ? 'Servicios' : 'Services',
    about: language === 'es' ? 'Sobre Nosotros' : 'About Us',
    howItWorks: language === 'es' ? 'Cómo Funciona' : 'How It Works',
    guide: language === 'es' ? 'Guía Documental' : 'Document Guide',
    faq: language === 'es' ? 'Preguntas' : 'FAQ',
    contact: language === 'es' ? 'Contacto' : 'Contact',
    requestService: language === 'es' ? 'Solicitar Trámite' : 'Request Service',
    callNow: language === 'es' ? 'Llamar' : 'Call Now',
  };

  const handleNavClick = (callback?: () => void) => {
    setMobileMenuOpen(false);
    if (callback) callback();
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar (CRM button removed as per User Request 5) */}
      <div className="bg-[#0F2747] text-[#DCC9A7] text-xs py-1.5 px-4 sm:px-8 border-b border-[#C9A96B]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C9A96B]" />
              <span className="hidden sm:inline">550 Greens Pkwy Ste 212B, Houston, TX 77067</span>
              <span className="sm:hidden">Houston, TX 77067</span>
            </span>
            <span className="hidden md:inline text-[#DCC9A7]/40">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96B]" />
              {language === 'es' ? 'Centro Notarial Acreditado en Texas' : 'Commissioned Texas Notarial Services'}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/60 hidden sm:inline">
              {language === 'es' ? 'Idioma:' : 'Language:'}
            </span>
            <div className="flex items-center text-xs font-semibold bg-white/10 rounded-lg px-2 py-0.5 border border-white/10">
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  language === 'es' ? 'text-[#C9A96B] font-bold underline decoration-[#C9A96B]' : 'text-white/70 hover:text-white'
                }`}
              >
                ES
              </button>
              <span className="text-white/30 px-0.5">/</span>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  language === 'en' ? 'text-[#C9A96B] font-bold underline decoration-[#C9A96B]' : 'text-white/70 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="liquid-glass border-b border-[#DCC9A7]/40 px-4 sm:px-8 py-3 transition-colors bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official Logo */}
          <div 
            onClick={() => {
              if (onNavigatePortal) onNavigatePortal();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer transition-transform hover:scale-[1.01] flex items-center"
          >
            <img 
              src="/logo/logo.png" 
              alt="Multiservicios Lumiel" 
              className="h-10 sm:h-12 w-auto max-h-12 object-contain"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.endsWith('/logo/icon.png')) {
                  target.src = '/logo/icon.png';
                }
              }}
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Services Dropdown */}
            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(!servicesOpen)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F2747] hover:text-[#C9A96B] transition-colors py-2 cursor-pointer"
              >
                <span>{t.services}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180 text-[#C9A96B]' : ''}`} />
              </button>

              {servicesOpen && (
                <div 
                  className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-[#DCC9A7]/60 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setServicesOpen(true)}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#887D6B] px-3 py-1.5 border-b border-[#F8F6F1]">
                    {language === 'es' ? '7 Divisiones Especializadas' : '7 Specialized Divisions'}
                  </div>
                  <div className="py-1">
                    {SERVICE_DIVISIONS.map((div) => (
                      <button
                        key={div.id}
                        onClick={() => {
                          onSelectDivision(div.id);
                          setServicesOpen(false);
                          if (onNavigatePortal) onNavigatePortal();
                          const el = document.getElementById('servicios');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-[#F8F6F1] flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div>
                          <span className="font-semibold text-[#0F2747] group-hover:text-[#C9A96B] block">
                            {div.title[language]}
                          </span>
                          <span className="text-[11px] text-[#887D6B] line-clamp-1">
                            {div.subtitle[language]}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#DCC9A7] font-semibold">
                          {div.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sobre Nosotros / About Us (Request 7) */}
            <a
              href="#sobre-nosotros"
              onClick={() => {
                if (onNavigatePortal) onNavigatePortal();
                if (onNavigateAbout) onNavigateAbout();
              }}
              className="text-sm font-medium text-[#0F2747] hover:text-[#C9A96B] transition-colors"
            >
              {t.about}
            </a>

            <a
              href="#como-funciona"
              onClick={() => onNavigatePortal && onNavigatePortal()}
              className="text-sm font-medium text-[#0F2747] hover:text-[#C9A96B] transition-colors"
            >
              {t.howItWorks}
            </a>

            <a
              href="#guia-documental"
              onClick={() => onNavigatePortal && onNavigatePortal()}
              className="text-sm font-medium text-[#0F2747] hover:text-[#C9A96B] transition-colors"
            >
              {t.guide}
            </a>

            <a
              href="#faq"
              onClick={() => onNavigatePortal && onNavigatePortal()}
              className="text-sm font-medium text-[#0F2747] hover:text-[#C9A96B] transition-colors"
            >
              {t.faq}
            </a>

            <a
              href="#contacto"
              onClick={() => onNavigatePortal && onNavigatePortal()}
              className="text-sm font-medium text-[#0F2747] hover:text-[#C9A96B] transition-colors"
            >
              {t.contact}
            </a>
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct WhatsApp */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0F2747] border border-[#DCC9A7] hover:border-[#C9A96B] hover:bg-white rounded-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#8A9A7B]" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenIntake()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0F2747] hover:bg-[#16355C] active:scale-[0.98] rounded-lg shadow-sm hover:shadow-md transition-all border border-[#C9A96B]/40 cursor-pointer"
            >
              <span>{t.requestService}</span>
              <span className="text-[#C9A96B]">→</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0F2747] hover:bg-[#DCC9A7]/20 transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#DCC9A7]/40 space-y-3 pb-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              <a
                href="#sobre-nosotros"
                onClick={() => handleNavClick(onNavigateAbout)}
                className="block px-3 py-2 text-sm font-semibold text-[#0F2747] hover:bg-[#F8F6F1] rounded-lg"
              >
                {t.about}
              </a>

              <a
                href="#servicios"
                onClick={() => handleNavClick()}
                className="block px-3 py-2 text-sm font-semibold text-[#0F2747] hover:bg-[#F8F6F1] rounded-lg"
              >
                {t.services}
              </a>

              <a
                href="#como-funciona"
                onClick={() => handleNavClick()}
                className="block px-3 py-2 text-sm font-semibold text-[#0F2747] hover:bg-[#F8F6F1] rounded-lg"
              >
                {t.howItWorks}
              </a>

              <a
                href="#guia-documental"
                onClick={() => handleNavClick()}
                className="block px-3 py-2 text-sm font-semibold text-[#0F2747] hover:bg-[#F8F6F1] rounded-lg"
              >
                {t.guide}
              </a>

              <a
                href="#contacto"
                onClick={() => handleNavClick()}
                className="block px-3 py-2 text-sm font-semibold text-[#0F2747] hover:bg-[#F8F6F1] rounded-lg"
              >
                {t.contact}
              </a>
            </div>

            <div className="pt-2 border-t border-[#DCC9A7]/30 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenIntake();
                }}
                className="w-full py-2.5 bg-[#0F2747] text-white text-xs font-bold rounded-xl text-center shadow-xs"
              >
                {t.requestService} →
              </button>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#8A9A7B]/15 text-[#0F2747] text-xs font-bold rounded-xl text-center border border-[#8A9A7B]/40 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#8A9A7B]" />
                <span>WhatsApp Houston ({COMPANY_INFO.phone})</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
