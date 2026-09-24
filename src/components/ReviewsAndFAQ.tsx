import React, { useState } from 'react';
import { Language } from '../types/index.ts';
import { Star, ChevronDown, ChevronUp, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

interface ReviewsAndFAQProps {
  language: Language;
}

export const ReviewsAndFAQ: React.FC<ReviewsAndFAQProps> = ({ language }) => {
  const isEs = language === 'es';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const reviews = [
    {
      author: 'Eduardo Santillán',
      location: 'Houston (Greenspoint Area)',
      rating: 5,
      service: { es: 'Apostilla de Acta de Nacimiento', en: 'Birth Certificate Apostille' },
      text: {
        es: 'Excelente servicio con la apostilla de Texas para el consulado español. Me guiaron con la versión correcta del acta y me entregaron antes de la fecha prometida. Muy profesionales y confiables.',
        en: 'Outstanding service apostilling my Texas vital record for the Spanish consulate. Guided me through the correct registrar version and delivered early. Highly professional.',
      },
      date: 'Septiembre 2026',
    },
    {
      author: 'Carolina & Roberto Méndez',
      location: 'Spring, TX',
      rating: 5,
      service: { es: 'Poder Notarial y Permiso de Viaje', en: 'Power of Attorney & Minor Travel' },
      text: {
        es: 'El Lic. Carlos nos redactó la autorización notariada de viaje para nuestra hija a El Salvador. Tuvimos cero problemas en el aeropuerto y la aerolínea felicitó lo claro que estaba el documento.',
        en: 'The notary executed our minor travel authorization letter to El Salvador. Zero issues at airport customs and airline check-in. Seamless execution.',
      },
      date: 'Agosto 2026',
    },
    {
      author: 'David Harrison',
      location: 'Houston (North Fwy)',
      rating: 5,
      service: { es: 'Traducción Certificada USCIS', en: 'Certified USCIS Translation' },
      text: {
        es: 'Requirieron la traducción de 4 actas y títulos universitarios para mi ajuste migratorio. Todo aceptado al primer intento por USCIS sin ningún requerimiento adicional. 100% recomendado.',
        en: 'USCIS certified translation for 4 vital records and degrees. Approved on first submission without any RFEs. Highly transparent pricing.',
      },
      date: 'Septiembre 2026',
    },
  ];

  const faqs = [
    {
      question: {
        es: '¿Qué servicios prestan en Multiservicios Lumiel?',
        en: 'What services does Multiservicios Lumiel provide?',
      },
      answer: {
        es: 'Somos un centro integral bilingüe en Houston especializado en 7 divisiones: Apostillas de documentos, Notaría Pública autorizada de Texas, Traducciones certificadas Inglés/Español, Actas y registros vitales, Pasaportes, Trámites vehiculares (títulos y placas) y Seguros comerciales y personales.',
        en: 'We are a bilingual Houston document and notary center operating across 7 core divisions: Apostille services, Texas commissioned notary, USCIS certified translations, Vital records assistance, Passports, Texas vehicle titles/plates, and Personal & commercial insurance.',
      },
    },
    {
      question: {
        es: '¿Ofrecen atención completa en español e inglés?',
        en: 'Do you provide services in both Spanish and English?',
      },
      answer: {
        es: 'Sí, absolutamente. Todo nuestro personal y notarios son 100% bilingües. Atendemos en su idioma de preferencia tanto en nuestra sucursal de Houston como a través de WhatsApp, teléfono y nuestro portal digital.',
        en: 'Yes, absolutely. Our entire staff and commissioned notaries are fluent in English and Spanish, providing seamless bilingual service in person and online.',
      },
    },
    {
      question: {
        es: '¿Dónde están ubicados físicamente en Houston?',
        en: 'Where are you physically located in Houston?',
      },
      answer: {
        es: 'Nuestra oficina está ubicada en 550 Greens Pkwy Ste 212B, Houston, TX 77067 (zona Greenspoint / North Houston, de fácil acceso desde I-45 Norte y Beltway 8). Contamos con estacionamiento gratuito para clientes.',
        en: 'Our office is located at 550 Greens Pkwy Ste 212B, Houston, TX 77067 with easy access from I-45 North and Beltway 8. Free client parking is available.',
      },
    },
    {
      question: {
        es: '¿Puedo subir mis documentos en línea sin tener que ir a la oficina?',
        en: 'Can I upload documents online without visiting the office?',
      },
      answer: {
        es: 'Sí. Puede enviar sus archivos en formato PDF o fotografía a través de nuestro Formulario Universal Inteligente. Revisamos sus documentos, generamos su cotización y coordinamos la entrega por correo o recojo en oficina según su preferencia.',
        en: 'Yes. You can upload PDF scans or high-res photos via our Universal Smart Intake form. We review, quote, and coordinate delivery via tracked courier or office pickup.',
      },
    },
    {
      question: {
        es: '¿Qué diferencia hay entre la asistencia que brindan y las agencias de gobierno?',
        en: 'How does your assistance differ from actual government agencies?',
      },
      answer: {
        es: 'Multiservicios Lumiel es una empresa privada de asistencia profesional y preparación documental. No somos una dependencia del gobierno ni un bufete de abogados; actuamos como su gestor y asesor documental privado para asegurar que sus solicitudes se presenten correctamente ante la Secretaría de Estado, DMV, Condados o USCIS.',
        en: 'Multiservicios Lumiel is a private professional document and notary services company. We are not a government agency or law firm; we serve as your document preparation provider ensuring compliance with State, County, and Federal authorities.',
      },
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-t border-[#DCC9A7]/40">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* REVIEWS SECTION (Blueprint Section 27) */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#887D6B]">
              {isEs ? 'OPINIONES DE NUESTROS CLIENTES' : 'CLIENT REVIEWS & TESTIMONIALS'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F2747]">
              {isEs ? 'La Confianza de Familias y Negocios en Houston' : 'Trusted by Houston Families & Businesses'}
            </h2>
            <div className="flex items-center justify-center gap-1 text-[#C9A96B] pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-[#0F2747] ml-2">5.0 / 5.0 Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8F6F1] border border-[#DCC9A7]/60 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C9A96B] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#2E2E2E] leading-relaxed italic mb-4">
                    “{rev.text[language]}”
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCC9A7]/40 text-xs">
                  <div className="font-bold text-[#0F2747]">{rev.author}</div>
                  <div className="text-[11px] text-[#887D6B]">{rev.location}</div>
                  <div className="text-[10px] font-mono text-[#8A9A7B] mt-0.5">
                    ✓ {rev.service[language]} · {rev.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GLOBAL FAQ SECTION (Blueprint Section 39) */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#887D6B]">
              {isEs ? 'RESOLVEMOS SUS DUDAS' : 'FREQUENTLY ASKED QUESTIONS'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2747]">
              {isEs ? 'Preguntas Frecuentes Globales' : 'Global Frequently Asked Questions'}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#DCC9A7]/60 bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4.5 flex items-center justify-between gap-4 hover:bg-[#F8F6F1]/50 cursor-pointer"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-[#0F2747]">
                      {faq.question[language]}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#F8F6F1] flex items-center justify-center text-[#0F2747] flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4 pt-1 text-xs text-[#2E2E2E] leading-relaxed border-t border-[#F8F6F1] bg-[#F8F6F1]/30">
                      {faq.answer[language]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
