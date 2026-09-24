import React from 'react';
import { Language } from '../types/index.ts';
import { X, ShieldCheck, FileText, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'disclaimer' | 'accessibility';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: LegalDocType;
  language: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  documentType,
  language,
}) => {
  if (!isOpen) return null;

  const isEs = language === 'es';

  const contentMap: Record<
    LegalDocType,
    {
      title: { es: string; en: string };
      badge: { es: string; en: string };
      icon: React.ReactNode;
      body: { es: React.ReactNode; en: React.ReactNode };
    }
  > = {
    privacy: {
      title: {
        es: 'Política de Privacidad y Protección de Datos',
        en: 'Privacy Policy & Document Data Protection',
      },
      badge: { es: 'CUMPLIMIENTO DE PRIVACIDAD TEXAS Y FEDERAL', en: 'TEXAS & FEDERAL PRIVACY COMPLIANCE' },
      icon: <ShieldCheck className="w-5 h-5 text-[#C9A96B]" />,
      body: {
        es: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
            <p className="font-semibold text-[#0F2747]">
              Última actualización: Enero 2026 | Multiservicios Lumiel (Houston, TX)
            </p>
            <p>
              En <strong>Multiservicios Lumiel</strong>, ubicada en 550 Greens Pkwy Ste 212B, Houston, TX 77067, la confidencialidad, integridad y seguridad de sus datos personales y documentos oficiales son nuestra máxima prioridad. Esta política detalla cómo recopilamos, resguardamos y utilizamos su información.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747] pt-2">1. Información Recopilada</h4>
            <p>
              Recopilamos únicamente la información estrictamente necesaria para tramitar sus solicitudes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#2E2E2E]/90">
              <li>Datos de identificación personal (Nombres completos, fecha de nacimiento, números de contacto, correo electrónico y dirección postal).</li>
              <li>Documentos fuente cargados o presentados (Actas de nacimiento, certificados matrimoniales, diplomas, sentencias, títulos vehiculares, pasaportes).</li>
              <li>Registros de firmas e identificación oficial válidos ante notario (licencia de conducir de Texas, pasaporte extranjero o matrícula consular).</li>
            </ul>

            <h4 className="font-serif font-bold text-sm text-[#0F2747] pt-2">2. Uso Exclusivo de los Datos</h4>
            <p>
              Sus datos se utilizan exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#2E2E2E]/90">
              <li>La tramitación de apostillas ante la Secretaría de Estado de Texas (Austin, TX) o el Departamento de Estado de EE.UU. (Washington D.C.).</li>
              <li>La ejecución de actos notariales de acuerdo con el Código Gubernamental de Texas (Capítulo 406).</li>
              <li>La elaboración de traducciones certificadas oficiales para USCIS, tribunales e instituciones académicas.</li>
              <li>La comunicación directa con usted sobre el estado y entrega de su expediente.</li>
            </ul>

            <h4 className="font-serif font-bold text-sm text-[#0F2747] pt-2">3. Confidencialidad y No Venta de Información</h4>
            <p>
              <strong>Multiservicios Lumiel NO vende, alquila, transfiere ni comercializa</strong> sus datos personales con terceros para fines comerciales o publicitarios bajo ninguna circunstancia. Toda la información documental se almacena bajo estándares seguros y se destruye o devuelve según los protocolos estipulados por la ley.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747] pt-2">4. Derechos del Titular</h4>
            <p>
              Usted tiene derecho a solicitar una copia de los expedientes archivados a su nombre, solicitar correcciones o la eliminación segura de copias de trabajo una vez concluido y entregado su trámite.
            </p>
          </div>
        ),
        en: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
            <p className="font-semibold text-[#0F2747]">
              Last updated: January 2026 | Multiservicios Lumiel (Houston, TX)
            </p>
            <p>
              At <strong>Multiservicios Lumiel</strong>, located at 550 Greens Pkwy Ste 212B, Houston, TX 77067, maintaining the confidentiality, integrity, and security of your personal data and sensitive official documents is our highest duty.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747] pt-2">1. Information We Collect</h4>
            <p>We only collect data strictly necessary to process your case:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#2E2E2E]/90">
              <li>Identifying details (Full legal name, date of birth, phone numbers, email, and physical address).</li>
              <li>Source documents (Vital certificates, diplomas, affidavits, powers of attorney, titles, passports).</li>
              <li>Government-issued photo identification copies required for notarial record keeping.</li>
            </ul>

            <h4 className="font-serif font-bold text-sm text-[#0F2747] pt-2">2. Strict Purpose &amp; Usage</h4>
            <p>Information is used exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#2E2E2E]/90">
              <li>Filing apostille applications with the Texas Secretary of State or US Department of State.</li>
              <li>Performing official notarial acts pursuant to Texas Government Code Chapter 406.</li>
              <li>Preparing USCIS-compliant certified translations.</li>
              <li>Direct customer communication regarding order completion and collection.</li>
            </ul>

            <h4 className="font-serif font-bold text-sm text-[#0F2747] pt-2">3. Absolute Non-Disclosure &amp; No Sale of Data</h4>
            <p>
              We never sell, rent, or trade your personal records to third parties for marketing purposes. All documents are handled under strict confidentiality protocols.
            </p>
          </div>
        ),
      },
    },
    terms: {
      title: {
        es: 'Términos y Condiciones del Servicio',
        en: 'Terms and Conditions of Service',
      },
      badge: { es: 'ACUERDO DE PRESTACIÓN DE SERVICIOS', en: 'SERVICE ENGAGEMENT AGREEMENT' },
      icon: <FileText className="w-5 h-5 text-[#C9A96B]" />,
      body: {
        es: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
            <p className="font-semibold text-[#0F2747]">
              Condiciones Generales aplicables a contrataciones presenciales y digitales.
            </p>
            <h4 className="font-serif font-bold text-sm text-[#0F2747]">1. Alcance de los Servicios</h4>
            <p>
              Multiservicios Lumiel actúa como centro profesional de tramitación documental, gestoría administrativa y notaría comisionada en el Estado de Texas. Cada servicio se cotiza de manera transparente dividiendo las tarifas gubernamentales oficiales (State filing fees, Austin SOS, Harris County, DMV) de los honorarios profesionales de preparación y radicación.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">2. Responsabilidad sobre Documentos Originales</h4>
            <p>
              El cliente es responsable de la veracidad y legalidad de los documentos aportados. Para trámites de apostilla, las actas y certificados deben cumplir con las directrices del registro estatal (ej. firma válida de Registrador Estatal de Vital Statistics, o sello original del tribunal competente). Si una entidad gubernamental rechaza un documento debido a falsedad documental previa o deterioro físico no imputable a la empresa, las tarifas oficiales estatales devengadas no son reembolsables.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">3. Tiempos de Entrega</h4>
            <p>
              Los plazos estimados (ej. 2 a 5 días para apostillas de Texas, 24-48 horas para traducciones simples) son estimaciones promedio operativas y pueden variar por días festivos, retrasos en dependencias gubernamentales o servicios de mensajería (USPS, FedEx, UPS).
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">4. Políticas de Pago</h4>
            <p>
              Para iniciar cualquier trámite se requiere el abono del anticipo estipulado en la cotización o la liquidación total según corresponda. Los documentos finalizados no serán liberados hasta la cancelación total del saldo pendiente.
            </p>
          </div>
        ),
        en: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
            <p className="font-semibold text-[#0F2747]">
              General Terms for In-Person and Online Document Processing.
            </p>
            <h4 className="font-serif font-bold text-sm text-[#0F2747]">1. Scope of Engagement</h4>
            <p>
              Multiservicios Lumiel provides professional document preparation, courier administrative filing, certified translation, and Texas commissioned notarial services. Quotes distinguish statutory government fees from our processing fees.
            </p>
            <h4 className="font-serif font-bold text-sm text-[#0F2747]">2. Client Responsibility for Authenticity</h4>
            <p>
              The client warrants that all submitted records are authentic and unaltered. Government rejection due to fraudulent antecedents or invalid previous state certifications is not compensable.
            </p>
            <h4 className="font-serif font-bold text-sm text-[#0F2747]">3. Turnaround Times</h4>
            <p>
              Turnaround estimates represent standard agency business days and may fluctuate based on state backlog, official holidays, or third-party courier delivery times.
            </p>
            <h4 className="font-serif font-bold text-sm text-[#0F2747]">4. Payment Terms</h4>
            <p>
              Statutory filing fees and processing retainer must be received prior to agency submission. Final completed documents are released upon full settlement of account balance.
            </p>
          </div>
        ),
      },
    },
    disclaimer: {
      title: {
        es: 'Descargo de Responsabilidad Legal Notarial',
        en: 'Texas Notary Public Legal Disclaimer',
      },
      badge: { es: 'AVISO LEGAL OBLIGATORIO · TEXAS GOV CODE § 406.017', en: 'MANDATORY NOTICE · TEXAS GOV CODE § 406.017' },
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      body: {
        es: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed bg-amber-50/60 p-4 rounded-xl border border-amber-200">
            <div className="p-4 bg-white rounded-lg border border-amber-300 shadow-xs">
              <p className="font-serif font-bold text-sm text-[#0F2747] mb-2">
                AVISO OBLIGATORIO EN ESPAÑOL REQUERIDO POR LA LEY DE TEXAS:
              </p>
              <p className="text-sm font-semibold text-red-900 italic leading-relaxed">
                “NO SOY UN ABOGADO LICENCIADO PARA EJERCER LA ABOGACÍA EN TEXAS Y NO PUEDO DAR ASESORAMIENTO LEGAL NI COBRAR HONORARIOS POR ASESORAMIENTO LEGAL.”
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#2E2E2E]">
              <p>
                <strong>Multiservicios Lumiel</strong> es una entidad de asistencia en trámites administrativos, preparación de documentos, traducción jurada y servicios notariales comisionados bajo las leyes del Estado de Texas.
              </p>
              <p>
                El personal de Multiservicios Lumiel <strong>no presta asesoramiento jurídico</strong>, no interpreta leyes de inmigración, no representa a clientes ante tribunales ni ante USCIS, ni selecciona formatos legales en nombre del cliente. Si requiere orientación legal sobre su situación migratoria, civil o penal, le instamos a consultar con un abogado acreditado ante la Barra de Abogados de Texas (State Bar of Texas).
              </p>
              <p>
                La función notarial en Texas certifica la identidad del firmante, la toma de juramentos o la certificación de copias según lo autorizado por el Código Gubernamental de Texas, no garantizando el contenido o validez sustantiva del contrato privado entre las partes.
              </p>
            </div>
          </div>
        ),
        en: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed bg-amber-50/60 p-4 rounded-xl border border-amber-200">
            <div className="p-4 bg-white rounded-lg border border-amber-300 shadow-xs">
              <p className="font-serif font-bold text-sm text-[#0F2747] mb-2">
                TEXAS STATUTORY NOTICE UNDER TEX. GOV’T CODE § 406.017:
              </p>
              <p className="text-sm font-semibold text-red-900 italic leading-relaxed">
                “I AM NOT AN ATTORNEY LICENSED TO PRACTICE LAW IN TEXAS AND MAY NOT GIVE LEGAL ADVICE OR ACCEPT FEES FOR LEGAL ADVICE.”
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#2E2E2E]">
              <p>
                <strong>Multiservicios Lumiel</strong> provides administrative document assistance, translation certification, courier dispatch, and commissioned notary public acts.
              </p>
              <p>
                Nothing on this website or discussed during customer consultations constitutes legal advice. We cannot advise you on legal rights, visa qualifications, or draft customized legal instruments outside standardized forms. For formal legal representation, please contact an attorney licensed by the State Bar of Texas.
              </p>
            </div>
          </div>
        ),
      },
    },
    accessibility: {
      title: {
        es: 'Declaración de Accesibilidad Digital y Física',
        en: 'Digital & Physical Accessibility Statement',
      },
      badge: { es: 'COMPROMISO DE INCLUSIÓN Y ACCESIBILIDAD UNIVERSAL', en: 'UNIVERSAL ACCESSIBILITY COMMITMENT' },
      icon: <Eye className="w-5 h-5 text-[#8A9A7B]" />,
      body: {
        es: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
            <p className="font-semibold text-[#0F2747]">
              En Multiservicios Lumiel nos comprometemos a garantizar que nuestros servicios sean accesibles para todas las personas, independientemente de sus capacidades físicas, sensoriales o tecnológicas.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">1. Accesibilidad Web (WCAG 2.1 Nivel AA)</h4>
            <p>
              Nuestra plataforma digital ha sido diseñada siguiendo las pautas de accesibilidad para el contenido web (WCAG 2.1 AA), incluyendo:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#2E2E2E]/90">
              <li>Alto contraste cromático legible entre texto y fondo.</li>
              <li>Tipografía optimizada y escalable sin pérdida de contenido.</li>
              <li>Soporte bilingüe integral (Español e Inglés conmutables en 1 clic).</li>
              <li>Navegación amigable para lectores de pantalla y navegación por teclado.</li>
              <li>Formularios claros con validaciones descriptivas y legibles.</li>
            </ul>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">2. Accesibilidad en Nuestras Instalaciones Físicas</h4>
            <p>
              Nuestra sede corporativa en <strong>550 Greens Pkwy Ste 212B, Houston, TX 77067</strong> cuenta con:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#2E2E2E]/90">
              <li>Estacionamiento accesible con rampas ADA.</li>
              <li>Ascensores amplios y puertas de acceso adecuadas para sillas de ruedas.</li>
              <li>Espacios de atención y sala de espera cómodos y libres de barreras arquitectónicas.</li>
            </ul>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">3. Asistencia Personalizada</h4>
            <p>
              Si requiere asistencia adaptada o tiene alguna dificultad para acceder a algún trámite, contáctenos directamente al <a href="tel:+13465210662" className="text-[#0F2747] font-bold underline">+1 (346) 521-0662</a> o vía correo electrónico a <span className="font-mono text-[#0F2747]">multiservicioslumielayi@gmail.com</span>.
            </p>
          </div>
        ),
        en: (
          <div className="space-y-4 text-xs sm:text-sm text-[#2E2E2E] leading-relaxed">
            <p className="font-semibold text-[#0F2747]">
              Multiservicios Lumiel is committed to digital inclusion and physical access for every client.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">1. Digital Accessibility Standards (WCAG 2.1 AA)</h4>
            <p>
              Our web platform integrates responsive typography, high color contrast ratios, keyboard navigability, and clear bilingual options for screen readers.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">2. ADA Physical Facility Access</h4>
            <p>
              Our office at 550 Greens Pkwy Ste 212B in Houston provides ADA ramp-accessible parking, elevator access, and wide corridors to ensure smooth visits for wheelchair users.
            </p>

            <h4 className="font-serif font-bold text-sm text-[#0F2747]">3. Direct Assistance</h4>
            <p>
              If you experience any accessibility barrier, reach us directly at +1 (346) 521-0662 or multiservicioslumielayi@gmail.com for immediate personal assistance.
            </p>
          </div>
        ),
      },
    },
  };

  const currentDoc = contentMap[documentType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#DCC9A7] overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-[#0F2747] text-white p-5 sm:p-6 flex items-start justify-between border-b border-[#C9A96B]/40">
          <div className="space-y-1 pr-4">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase font-mono font-bold tracking-wider text-[#C9A96B]">
              {currentDoc.icon}
              <span>{currentDoc.badge[language]}</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F6F1]">
              {currentDoc.title[language]}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {currentDoc.body[language]}
        </div>

        {/* Footer */}
        <div className="bg-[#F8F6F1] px-6 py-3 border-t border-[#DCC9A7]/40 flex items-center justify-between text-xs text-[#887D6B]">
          <div className="flex items-center gap-1.5 font-semibold text-[#0F2747]">
            <CheckCircle2 className="w-4 h-4 text-[#8A9A7B]" />
            <span>Multiservicios Lumiel · Houston, TX</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0F2747] text-white font-semibold text-xs hover:bg-[#16355C] transition-colors cursor-pointer"
          >
            {isEs ? 'Entendido y Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
