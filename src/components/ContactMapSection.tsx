import React from 'react';
import { Language } from '../types/index.ts';
import { COMPANY_INFO } from '../data/servicesData.ts';
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle, ArrowRight } from 'lucide-react';

interface ContactMapSectionProps {
  language: Language;
  onOpenIntake: () => void;
}

export const ContactMapSection: React.FC<ContactMapSectionProps> = ({
  language,
  onOpenIntake,
}) => {
  const isEs = language === 'es';

  return (
    <section id="contacto" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F8F6F1] border-t border-[#DCC9A7]/40">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono font-bold tracking-widest text-[#887D6B]">
            <span>{isEs ? 'SECCIÓN 26 · UBICACIÓN & CONTACTO' : 'SECTION 26 · LOCATION & CONTACT'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2747] tracking-tight">
            {isEs ? 'Visítenos en Houston, Texas' : 'Visit Us in Houston, Texas'}
          </h2>
          <p className="text-sm sm:text-base text-[#2E2E2E]/80 leading-relaxed">
            {isEs
              ? 'Atención personalizada en oficina con estacionamiento disponible o asistencia remota inmediata por WhatsApp y llamada.'
              : 'Convenient office location with free parking, plus direct remote phone and WhatsApp consultations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Business Details & Contact Cards */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#DCC9A7]/70 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96B] font-bold">
                  MULTISERVICIOS LUMIEL
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2747] mt-0.5">
                  {isEs ? 'Sede Corporativa Houston' : 'Houston Corporate Office'}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E]">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] text-[#0F2747] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#C9A96B]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F2747] block">
                      {isEs ? 'Dirección Física' : 'Physical Address'}:
                    </span>
                    <span>{COMPANY_INFO.fullAddress}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] text-[#0F2747] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#C9A96B]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F2747] block">
                      {isEs ? 'Teléfono de Oficina' : 'Office Telephone'}:
                    </span>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-[#0F2747] font-semibold hover:underline">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] text-[#0F2747] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#C9A96B]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F2747] block">
                      {isEs ? 'Correo Electrónico' : 'Email Address'}:
                    </span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0F2747] font-semibold hover:underline break-all">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] text-[#0F2747] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#C9A96B]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F2747] block">
                      {isEs ? 'Horario de Atención' : 'Hours of Operation'}:
                    </span>
                    <span className="text-[#887D6B]">{COMPANY_INFO.hours[language]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="pt-4 border-t border-[#F8F6F1] space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="py-2.5 px-3 rounded-xl bg-[#0F2747] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#16355C] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A96B]" />
                  <span>{isEs ? 'Llamar Ahora' : 'Call Office'}</span>
                </a>

                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#8A9A7B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#778669] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <a
                href="https://maps.google.com/?q=550+Greens+Pkwy+Ste+212B,+Houston,+TX+77067"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#F8F6F1] hover:bg-[#EAE3D8] text-[#0F2747] text-xs font-semibold flex items-center justify-center gap-2 border border-[#DCC9A7] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#0F2747]" />
                <span>{isEs ? 'Cómo llegar (Google Maps)' : 'Get Directions (Google Maps)'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCC9A7]/70 overflow-hidden shadow-sm flex flex-col">
            <div className="bg-[#0F2747] text-white px-4 py-2.5 text-xs font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#DCC9A7]">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96B]" />
                <span>Houston, TX 77067 · Greenspoint District</span>
              </span>
              <span className="text-[10.5px] text-white/60">GPS: 29.9510° N, 95.4215° W</span>
            </div>

            <div className="w-full h-80 sm:h-96 lg:h-full min-h-[340px] relative bg-gray-100">
              <iframe
                title="Multiservicios Lumiel Google Map"
                src={COMPANY_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
