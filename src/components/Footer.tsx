import React from 'react';
import { Language, ServiceDivisionId } from '../types/index.ts';
import { COMPANY_INFO, SERVICE_DIVISIONS } from '../data/servicesData.ts';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';
import { LegalDocType } from './LegalModal.tsx';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectDivision: (divId: ServiceDivisionId) => void;
  onOpenLegal: (docType: LegalDocType) => void;
  onOpenCrmAuth: () => void;
  onNavigateAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onSelectDivision,
  onOpenLegal,
  onOpenCrmAuth,
  onNavigateAbout,
}) => {
  const isEs = language === 'es';

  return (
    <footer className="bg-[#0F2747] text-[#DCC9A7] pt-16 pb-24 md:pb-16 border-t border-[#C9A96B]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Identity & Summary (Blueprint Section 51) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/logo.png" 
                alt="Multiservicios Lumiel" 
                className="h-11 sm:h-12 w-auto max-h-12 object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith('/logo/icon.png')) {
                    target.src = '/logo/icon.png';
                  }
                }}
              />
            </div>

            <p className="text-xs text-[#EAE3D8] leading-relaxed max-w-sm mt-3">
              {isEs
                ? 'Centro Profesional de Servicios de Documentos y Notaría en Houston, Texas. Apostillas, servicios notariales, traducciones oficiales, actas, pasaportes, vehículos y seguros con atención bilingüe integral.'
                : 'Bilingual Professional Document & Notary Services Center in Houston, TX. Providing apostille, notary, translation, vital records, passport, vehicle and insurance services.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-white/80">{isEs ? 'Idioma' : 'Language'}:</span>
              <div className="inline-flex bg-white/10 rounded-lg p-0.5 border border-[#C9A96B]/30 text-xs">
                <button
                  onClick={() => onLanguageChange('es')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    language === 'es' ? 'bg-[#C9A96B] text-[#0F2747]' : 'text-white hover:text-[#C9A96B]'
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    language === 'en' ? 'bg-[#C9A96B] text-[#0F2747]' : 'text-white hover:text-[#C9A96B]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Services Links (7 Divisions) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {isEs ? 'Divisiones de Servicio' : 'Service Divisions'}
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICE_DIVISIONS.map((div) => (
                <li key={div.id}>
                  <button
                    onClick={() => {
                      onSelectDivision(div.id);
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="text-[#EAE3D8] hover:text-white hover:underline transition-colors text-left cursor-pointer"
                  >
                    {div.title[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links / Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {isEs ? 'Empresa & Guías' : 'Company & Guides'}
            </h4>
            <ul className="space-y-2 text-xs text-[#EAE3D8]">
              <li>
                <a 
                  href="#sobre-nosotros" 
                  onClick={() => onNavigateAbout && onNavigateAbout()} 
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {isEs ? 'Sobre Nosotros' : 'About Us'}
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white hover:underline">
                  {isEs ? 'Cómo Funciona' : 'How It Works'}
                </a>
              </li>
              <li>
                <a href="#guia-documental" className="hover:text-white hover:underline">
                  {isEs ? 'Guía Documental' : 'Document Guide'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:underline">
                  {isEs ? 'Preguntas Frecuentes' : 'FAQ'}
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white hover:underline">
                  {isEs ? 'Ubicación & Mapa' : 'Map & Location'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (Blueprint Section 51) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {isEs ? 'Contacto Directo' : 'Direct Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#EAE3D8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A96B] flex-shrink-0 mt-0.5" />
                <span>550 Greens Pkwy Ste 212B<br />Houston, TX 77067, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A96B] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:underline text-white font-mono">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A96B] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline break-all">
                  {COMPANY_INFO.email}
                </a>
              </div>

              {/* Discreet CRM Staff Access in Footer (Request 5) */}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={onOpenCrmAuth}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#DCC9A7] hover:text-white border border-[#C9A96B]/30 transition-all cursor-pointer"
                  title={isEs ? 'Acceso administrativo seguro al CRM' : 'Secure staff access to CRM'}
                >
                  <Lock className="w-3.5 h-3.5 text-[#C9A96B]" />
                  <span>{isEs ? 'Acceso CRM Staff' : 'Staff CRM Access'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar (Request 3 & Request 4) */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#887D6B]">
          {/* Exact User Request 4: © 2026 Multiservicios Lumiel. Todos los derechos reservados. | By: Mora-Grafic´s Studio */}
          <p className="text-center md:text-left text-[#EAE3D8]/90">
            © 2026 Multiservicios Lumiel. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'} | By:{' '}
            <a
              href="https://mora-grafics-studio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96B] hover:text-white underline underline-offset-2 font-semibold transition-colors"
            >
              Mora-Grafic´s Studio
            </a>
          </p>

          {/* Interactive Legal Modal Triggers (Request 3) */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-xs">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-[#DCC9A7] hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {isEs ? 'Privacidad' : 'Privacy'}
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="text-[#DCC9A7] hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {isEs ? 'Términos' : 'Terms'}
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={() => onOpenLegal('disclaimer')}
              className="text-[#DCC9A7] hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {isEs ? 'Descargo de Responsabilidad' : 'Disclaimer'}
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={() => onOpenLegal('accessibility')}
              className="text-[#DCC9A7] hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {isEs ? 'Accesibilidad' : 'Accessibility'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
