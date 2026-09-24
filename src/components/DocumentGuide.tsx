import React, { useState } from 'react';
import { Language } from '../types/index.ts';
import { BookOpen, ChevronRight, CheckCircle, Info, ShieldAlert } from 'lucide-react';

interface DocumentGuideProps {
  language: Language;
}

export const DocumentGuide: React.FC<DocumentGuideProps> = ({ language }) => {
  const isEs = language === 'es';
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const guides = [
    {
      title: {
        es: 'Guía de Apostillas (Convenio de La Haya)',
        en: 'Apostille Comprehensive Guide',
      },
      badge: { es: 'Legalización Internacional', en: 'International Legalization' },
      content: {
        es: [
          '¿Qué es una apostilla? Es una certificación emitida por la Secretaría de Estado que autentica el origen de un documento público para que surta plenos efectos jurídicos en los países suscritos al Convenio de La Haya de 1961.',
          'Documentos comunes que requieren apostilla: Actas de nacimiento, matrimonio o defunción de Texas; diplomas o transcripts universitarios; poderes notariales para trámites en México, Colombia, Venezuela u otros países.',
          'Importante: La apostilla certifica la autenticidad de la firma y sello del funcionario o notario público que expidió o autorizó el documento, no la veracidad de su contenido.',
        ],
        en: [
          'What is an Apostille? It is an official certificate issued by the Secretary of State that authenticates the origin of a public document for legal recognition in member countries of the 1961 Hague Convention.',
          'Common documents requiring apostilles: Texas birth, marriage, or death records; university transcripts and diplomas; powers of attorney for legal use in Latin America or Europe.',
          'Important notice: An apostille verifies the authenticity of the signature and seal of the official or notary public, not the factual content of the underlying instrument.',
        ],
      },
    },
    {
      title: {
        es: 'Guía Notarial en el Estado de Texas',
        en: 'Texas Notary Guidelines & Clarification',
      },
      badge: { es: 'Derecho Comparado', en: 'Notary Public Standards' },
      content: {
        es: [
          'Diferencia fundamental: En Texas y en los Estados Unidos, un "Notary Public" es un funcionario facultado para dar fe de la identidad de los firmantes y tomar juramentos. No es un abogado ni tiene las facultades de un "Notario de Derecho Latino" (Civil Law Notary).',
          'Requisitos obligatorios para firmar: Los otorgantes deben presentarse físicamente con una identificación gubernamental vigente con fotografía (licencia de conducir, pasaporte, Real ID o matrícula consular).',
          'No se permite asesoría legal no autorizada: Multiservicios Lumiel presta servicios notariales y de preparación documental, no asesoría jurídica reservada a abogados colegiados.',
        ],
        en: [
          'Fundamental distinction: In Texas, a Notary Public is authorized to verify identities, witness signatures, and administer oaths. A Texas notary is not an attorney and does not practice law.',
          'Mandatory signing prerequisites: All signers must physically appear and produce unexpired government photo identification (Texas DL, Passport, Real ID).',
          'Anti-unauthorized legal advice compliance: Multiservicios Lumiel provides commissioned notarial services and administrative document preparation, not legal advice.',
        ],
      },
    },
    {
      title: {
        es: 'Guía de Traducción Certificada USCIS',
        en: 'USCIS Certified Translation Standards',
      },
      badge: { es: 'Estándar 8 CFR 1003.33', en: '8 CFR 1003.33 Compliance' },
      content: {
        es: [
          '¿Qué exige Inmigración (USCIS)? Cualquier documento redactado en un idioma distinto al inglés presentado en un expediente migratorio debe acompañarse de una traducción completa y certificada al inglés.',
          'Certificado de exactitud (Certificate of Accuracy): Debe incluir la declaración formal del traductor acreditando que domina ambos idiomas y que la traducción es un reflejo exacto y fiel del documento original.',
          'Sellos y marginalias: Se traducen sellos oficiales, firmas, notas al margen y números de folio para evitar Request for Evidence (RFE).',
        ],
        en: [
          'What does USCIS require? Any foreign language document submitted to immigration must be accompanied by a complete English translation and a signed certification of competence.',
          'Certificate of Accuracy requirement: The translator must certify that they are competent in both languages and that the translation is accurate and complete.',
          'Full document scope: All stamps, watermarks, seals, marginal notes, and registrar numbers must be included to avoid Requests for Evidence (RFEs).',
        ],
      },
    },
    {
      title: {
        es: 'Guía de Trámites Vehiculares en Houston',
        en: 'Vehicle Title Transfer & DMV Guide',
      },
      badge: { es: 'TxDMV & Harris County', en: 'Texas DMV Procedures' },
      content: {
        es: [
          'Transferencia de título tras una compra: En Texas, el comprador tiene un plazo de 30 días posteriores a la fecha de compra para transferir el título y pagar los impuestos sobre venta (Form 130-U) para evitar multas estatales.',
          'Venta segura (Vehicle Transfer Notification): Cuando usted vende un vehículo, es fundamental radicar la notificación de venta para liberarse de cualquier multa de peajes o infracciones cometidas por el comprador.',
          'Títulos extraviados o con tachaduras: Si compró un auto sin título o el documento tiene correcciones no autorizadas, le asistimos con el proceso de Título con Fianza (Bonded Title).',
        ],
        en: [
          'Private party title transfer: Buyers in Texas must submit the title application and pay sales tax within 30 days of purchase (Form 130-U) to avoid penalties.',
          'Vehicle Transfer Notification: Sellers should always file an official transfer notice to avoid liability for tolls or infractions committed by the new owner.',
          'Lost or damaged titles: If you purchased a vehicle without a clean title or there are unapproved alterations, we assist with Texas Bonded Title proceedings.',
        ],
      },
    },
  ];

  return (
    <section id="guia-documental" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono font-bold tracking-widest text-[#887D6B]">
            <span>{isEs ? 'AUTORIDAD DE CONTENIDO · GUÍA LUMIEL' : 'CONTENT AUTHORITY · LUMIEL GUIDE'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2747] tracking-tight">
            {isEs ? 'Guía Documental y Respuestas Claras' : 'Lumiel Document Guide'}
          </h2>
          <p className="text-sm sm:text-base text-[#2E2E2E]/80 leading-relaxed">
            {isEs
              ? 'Información práctica y transparente sobre normativas, requerimientos y buenas prácticas para sus trámites.'
              : 'Practical, transparent answers on requirements, statutory guidelines, and procedural best practices.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Guide Topic Selectors */}
          <div className="lg:col-span-4 space-y-2">
            {guides.map((g, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTopic(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all border cursor-pointer ${
                  selectedTopic === idx
                    ? 'bg-[#0F2747] text-white border-[#0F2747] shadow-md'
                    : 'bg-white text-[#2E2E2E] border-[#DCC9A7]/60 hover:bg-[#EAE3D8]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase font-bold ${selectedTopic === idx ? 'text-[#C9A96B]' : 'text-[#887D6B]'}`}>
                    {g.badge[language]}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${selectedTopic === idx ? 'text-[#C9A96B]' : 'text-gray-300'}`} />
                </div>
                <h4 className="font-serif text-sm sm:text-base font-bold mt-1 leading-snug">
                  {g.title[language]}
                </h4>
              </button>
            ))}
          </div>

          {/* Guide Article Content */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#DCC9A7]/70 shadow-sm space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C9A96B] uppercase mb-2">
                <BookOpen className="w-4 h-4 text-[#0F2747]" />
                <span>{guides[selectedTopic].badge[language]}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0F2747] mb-4">
                {guides[selectedTopic].title[language]}
              </h3>

              <div className="space-y-3.5">
                {guides[selectedTopic].content[language].map((paragraph, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[#8A9A7B] flex-shrink-0 mt-0.5" />
                    <span>{paragraph}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer from Blueprint Section 01 & 49 */}
            <div className="mt-6 pt-4 border-t border-[#F8F6F1] flex items-start gap-2.5 text-[11px] text-[#887D6B] bg-[#F8F6F1] p-3 rounded-xl">
              <Info className="w-4 h-4 text-[#C9A96B] flex-shrink-0 mt-0.5" />
              <span>
                {isEs
                  ? 'Aviso legal: Multiservicios Lumiel es un centro privado de servicios de documentos y notaría en Houston, TX. La información proporcionada tiene fines educativos y no constituye asesoramiento legal.'
                  : 'Notice: Multiservicios Lumiel is a private document and notary service center in Houston, TX. Information provided is for educational purposes and does not constitute formal legal counsel.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
