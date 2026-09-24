import { ServiceDivision } from '../types/index.ts';

export const SERVICE_DIVISIONS: ServiceDivision[] = [
  {
    id: 'apostille',
    code: '01',
    title: {
      es: 'Servicios de Apostilla',
      en: 'Apostille Services',
    },
    subtitle: {
      es: 'Legalización internacional de documentos para uso en el extranjero',
      en: 'International document authentication for foreign legal use',
    },
    description: {
      es: 'Asistencia profesional para documentos que requieren apostilla conforme al Convenio de La Haya. Tramitamos actas, certificados y poderes en Texas y todos los estados de EE. UU.',
      en: 'Professional assistance for documents requiring Hague Convention apostille certification. Handling vital records, diplomas, and notarized affidavits in Texas and nationwide.',
    },
    iconName: 'Stamp',
    services: [
      {
        id: 'apostille-birth',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Actas de Nacimiento',
          en: 'Birth Certificate Apostille',
        },
        shortDesc: {
          es: 'Apostilla oficial para actas de nacimiento emitidas en Texas u otros estados.',
          en: 'Official apostille certification for state-issued birth certificates.',
        },
        fullDesc: {
          es: 'Gestión completa ante la Secretaría de Estado (Texas Secretary of State o entidad estatal correspondiente). Verificamos que el documento cuente con el sello original y firma de la autoridad facultada.',
          en: 'Complete handling with the Secretary of State. We verify certified vital records contain required state registrar signatures before apostille submission.',
        },
        requirements: {
          es: ['Copia certificada emitida por el Registro Civil / Vital Statistics', 'Identificación oficial del solicitante', 'País de destino del trámite'],
          en: ['State certified copy from Department of State Health Services', 'Government issued photo ID', 'Destination country of use'],
        },
        estimatedDays: '3 - 7 días hábiles',
        popular: true,
        relatedServices: ['trans-birth', 'vital-birth'],
      },
      {
        id: 'apostille-marriage',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Actas de Matrimonio',
          en: 'Marriage Certificate Apostille',
        },
        shortDesc: {
          es: 'Legalización internacional de actas de matrimonio para registros consulares y ciudadanía.',
          en: 'International legalization of marriage certificates for dual citizenship and foreign registries.',
        },
        fullDesc: {
          es: 'Trámite especializado para actas de matrimonio otorgadas en cualquier condado o estado. Ideal para convalidaciones de matrimonio en consulados y trámites de residencia.',
          en: 'Certified county clerk marriage certificates apostilled with expedited state filing for embassy or consular recognition.',
        },
        requirements: {
          es: ['Acta certificada original emitida por el County Clerk', 'País receptor', 'Copia de identificación'],
          en: ['Certified marriage certificate issued by county clerk', 'Country of destination', 'ID copy of petitioner'],
        },
        estimatedDays: '3 - 7 días hábiles',
        relatedServices: ['trans-marriage', 'vital-marriage'],
      },
      {
        id: 'apostille-death',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Actas de Defunción',
          en: 'Death Certificate Apostille',
        },
        shortDesc: {
          es: 'Legalización para trámites sucesorios, pensiones y repatriación de bienes.',
          en: 'Apostille for estate proceedings, overseas pensions, and foreign probate.',
        },
        fullDesc: {
          es: 'Apostilla expedita de actas de defunción para tramitar herencias internacionales, seguros o traslados en el exterior.',
          en: 'Fast-track apostille processing for certified death certificates used in foreign inheritance or insurance settlements.',
        },
        requirements: {
          es: ['Certificado de defunción oficial certificado', 'Datos del país destino'],
          en: ['Official certified death certificate', 'Target foreign jurisdiction'],
        },
        estimatedDays: '4 - 8 días hábiles',
        relatedServices: ['trans-death', 'vital-death'],
      },
      {
        id: 'apostille-poa',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Poderes Notariales',
          en: 'Power of Attorney Apostille',
        },
        shortDesc: {
          es: 'Validación internacional de poderes para compraventa, pleitos y cobranzas fuera de EE. UU.',
          en: 'International validation of POA documents for property sales and foreign legal representation.',
        },
        fullDesc: {
          es: 'Apostillamos poderes redactados en español o inglés que hayan sido notarizados correctamente conforme a la ley de Texas u otros estados.',
          en: 'Complete apostille processing of general or special powers of attorney after compliant notarial execution.',
        },
        requirements: {
          es: ['Poder original con certificación notarial vigente', 'Nombre del apoderado y poderdante', 'País de destino'],
          en: ['Original document with active notary acknowledgement', 'Grantor and agent details', 'Target country'],
        },
        estimatedDays: '2 - 5 días hábiles',
        popular: true,
        relatedServices: ['notary-poa', 'trans-poa'],
      },
      {
        id: 'apostille-notarial',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Documentos Notariales',
          en: 'Notarial Document Apostille',
        },
        shortDesc: {
          es: 'Apostillado de cartas responsivas, declaraciones juradas y acuerdos privados.',
          en: 'Apostille certification for affidavits, statutory declarations, and notarized contracts.',
        },
        fullDesc: {
          es: 'Certificación ante el Secretario de Estado de cualquier instrumento público autorizado por Notario Público debidamente acreditado.',
          en: 'State verification and apostille attachment on any acknowledged or jurat notarial instrument.',
        },
        requirements: {
          es: ['Instrumento notarial original', 'Sello y comisión notarial legible'],
          en: ['Original notarized instrument', 'Clear notary seal and commission expiration'],
        },
        estimatedDays: '3 - 6 días hábiles',
        relatedServices: ['notary-affidavits', 'notary-signing'],
      },
      {
        id: 'apostille-school',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Documentos Escolares y Diplomas',
          en: 'School Document & Diploma Apostille',
        },
        shortDesc: {
          es: 'Validez internacional para títulos universitarios, transcripts y certificados de estudio.',
          en: 'Apostille validation for university degrees, transcripts, and high school diplomas.',
        },
        fullDesc: {
          es: 'Trámite indispensable para estudiar, convalidar carreras o ejercer profesionalmente en el extranjero. Coordinamos la certificación del registrador escolar (School Registrar) y la apostilla oficial.',
          en: 'Essential for study abroad, professional licensure, or homologation. We coordinate registrar certification and state apostille.',
        },
        requirements: {
          es: ['Diploma o transcript sellado y notarizado por la institución educativa', 'País donde se presentará'],
          en: ['Notarized university or school records by official registrar', 'Recipient country'],
        },
        estimatedDays: '5 - 10 días hábiles',
        relatedServices: ['trans-school', 'trans-diploma'],
      },
      {
        id: 'apostille-texas',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Documentos Emitidos en Texas',
          en: 'Apostille for Documents Issued in Texas',
        },
        shortDesc: {
          es: 'Trámite directo ante la oficina de la Secretaría de Estado de Texas en Austin.',
          en: 'Direct submission to the Texas Secretary of State office in Austin.',
        },
        fullDesc: {
          es: 'Servicio local prioritario en Houston con conexión diaria para entrega ante la Secretaría de Estado en Austin.',
          en: 'Priority Houston-based courier and processing with the Texas Secretary of State in Austin.',
        },
        requirements: {
          es: ['Documento original emitido en el estado de Texas', 'Identificación oficial'],
          en: ['Original Texas state/county document', 'Client identification'],
        },
        estimatedDays: '2 - 5 días hábiles',
        popular: true,
      },
      {
        id: 'apostille-other-states',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla de Documentos Emitidos en Otros Estados',
          en: 'Apostille for Documents Issued in Other States',
        },
        shortDesc: {
          es: 'Gestión de apostillas para California, Florida, New York y los 50 estados.',
          en: 'Multi-state apostille management across all 50 US states and federal agencies.',
        },
        fullDesc: {
          es: 'Canalizamos sus documentos ante las Secretarías de Estado correspondientes sin que usted tenga que viajar ni realizar trámites por correo.',
          en: 'Turnkey routing through state capitals across the United States with full tracking.',
        },
        requirements: {
          es: ['Documento certificado original del estado emisor', 'Especificar país receptor'],
          en: ['Certified record from issuing state', 'Target country details'],
        },
        estimatedDays: '7 - 15 días hábiles',
      },
      {
        id: 'apostille-translation-bundle',
        divisionId: 'apostille',
        name: {
          es: 'Apostilla + Traducción Certificada',
          en: 'Apostille + Translation Combo Package',
        },
        shortDesc: {
          es: 'Solución integral: tramitamos la apostilla y traducimos con certificación oficial.',
          en: 'End-to-end package combining official apostille and certified multilingual translation.',
        },
        fullDesc: {
          es: 'Paquete de alta eficiencia que conecta el flujo de apostillado con la traducción jurada requerida por embajadas y ministerios del país receptor.',
          en: 'Complete synchronized workflow ensuring both state apostille and certified translated copies are prepared flawlessly.',
        },
        requirements: {
          es: ['Documento a apostillar', 'Idioma de traducción requerido (Español/Inglés/Otros)'],
          en: ['Document for apostille', 'Target language requirement (English/Spanish/Others)'],
        },
        estimatedDays: '4 - 8 días hábiles',
        popular: true,
        relatedServices: ['trans-official', 'notary-signing'],
      },
    ],
  },
  {
    id: 'notary',
    code: '02',
    title: {
      es: 'Servicios Notariales',
      en: 'Notary Services',
    },
    subtitle: {
      es: 'Fe pública, notarizaciones bilingües y actos jurídicos en Houston',
      en: 'Commissioned Texas notary public services with bilingual document execution',
    },
    description: {
      es: 'Servicio notarial profesional en Houston, TX. Certificamos firmas, declaraciones juradas, poderes y cartas de viaje con estricto apego a las leyes notariales del Estado de Texas.',
      en: 'Professional notary services in Houston, TX. Acknowledging signatures, administering oaths, affidavits, travel authorizations, and legal declarations in English and Spanish.',
    },
    iconName: 'ShieldCheck',
    services: [
      {
        id: 'notary-poa',
        divisionId: 'notary',
        name: {
          es: 'Poder Notarial (Power of Attorney)',
          en: 'Power of Attorney Execution',
        },
        shortDesc: {
          es: 'Redacción y notarización de poderes especiales, médicos o financieros.',
          en: 'Drafting assistance and official notarization of general, special, or healthcare POAs.',
        },
        fullDesc: {
          es: 'Firma presencial y verificación de identidad para otorgar facultades legales a familiares o representantes.',
          en: 'In-person verification of identity and mental capacity for delegating legal authority.',
        },
        requirements: {
          es: ['Identificación oficial vigente con fotografía (Pasaporte, Real ID, Licencia)', 'Presencia de los otorgantes'],
          en: ['Valid government-issued photo ID (Driver license, Passport, State ID)', 'Physical presence of grantors'],
        },
        estimatedDays: 'Mismo día / Inmediato',
        popular: true,
        relatedServices: ['apostille-poa', 'trans-poa'],
      },
      {
        id: 'notary-auth-letters',
        divisionId: 'notary',
        name: {
          es: 'Cartas de Autorización',
          en: 'Authorization Letters',
        },
        shortDesc: {
          es: 'Cartas para trámites bancarios, educativos, escolares y retiro de bienes.',
          en: 'Notarized authorization letters for banking, schools, property retrieval, and administrative matters.',
        },
        fullDesc: {
          es: 'Redactamos y certificamos cartas en español o inglés autorizando a terceros para realizar gestiones en su nombre.',
          en: 'Bilingual drafting and swearing of formal authorization letters.',
        },
        requirements: {
          es: ['Identificación vigente del autorizante', 'Datos del representante autorizado'],
          en: ['Valid identification of authorizing individual', 'Details of authorized representative'],
        },
        estimatedDays: 'Mismo día',
      },
      {
        id: 'notary-travel',
        divisionId: 'notary',
        name: {
          es: 'Autorización de Viaje para Menores',
          en: 'Minor Travel Authorization',
        },
        shortDesc: {
          es: 'Permiso notarial obligatorio para menores que viajan sin uno o ambos padres.',
          en: 'Mandatory notarized parental consent letter for minors traveling internationally.',
        },
        fullDesc: {
          es: 'Documento exigido por aerolíneas, agentes aduanales (CBP) y autoridades migratorias de México, Centroamérica y Sudamérica.',
          en: 'Formally drafted consent document compliant with airlines and international border control authorities.',
        },
        requirements: {
          es: ['Acta de nacimiento del menor', 'Identificación de los padres', 'Itinerario y datos del acompañante'],
          en: ['Child birth certificate', 'Parents photo IDs', 'Travel itinerary & flight details'],
        },
        estimatedDays: 'Mismo día',
        popular: true,
      },
      {
        id: 'notary-affidavits',
        divisionId: 'notary',
        name: {
          es: 'Declaraciones Juradas (Affidavits)',
          en: 'Affidavits & Jurats',
        },
        shortDesc: {
          es: 'Testimonios escritos bajo juramento para cortes, empleo, ingresos o vivienda.',
          en: 'Sworn written statements for court, employment verification, income proof, or residency.',
        },
        fullDesc: {
          es: 'Administración formal de juramento o afirmación con firma y sello notarial registrado.',
          en: 'Formal administration of oath or affirmation with registered notary seal and certificate.',
        },
        requirements: {
          es: ['Identificación con foto', 'Borrador o datos precisos de la declaración'],
          en: ['Government issued photo ID', 'Statement text / facts to be affirmed'],
        },
        estimatedDays: 'Mismo día',
      },
      {
        id: 'notary-letters',
        divisionId: 'notary',
        name: {
          es: 'Cartas Notariales y Certificaciones',
          en: 'Notarial Letters & Certifications',
        },
        shortDesc: {
          es: 'Certificación notarial de hechos, copias de documentos y correspondencia formal.',
          en: 'Certified copies of eligible records, factual certifications, and formal letters.',
        },
        fullDesc: {
          es: 'Instrumentación con fe notarial para instituciones gubernamentales, empleadores y aseguradoras.',
          en: 'Attestation of copies and formal correspondence for official entities.',
        },
        requirements: {
          es: ['Documento original a certificar', 'Identificación oficial'],
          en: ['Original document to be attested', 'Valid government ID'],
        },
        estimatedDays: 'Mismo día',
      },
      {
        id: 'notary-signing',
        divisionId: 'notary',
        name: {
          es: 'Firma y Notarización de Documentos',
          en: 'Document Signing & Notarization',
        },
        shortDesc: {
          es: 'Atención personalizada para firmas de contratos, títulos, fideicomisos y actas.',
          en: 'General acknowledgment service for contracts, deeds, trusts, and commercial papers.',
        },
        fullDesc: {
          es: 'Sesiones de firma en nuestra oficina de Houston (550 Greens Pkwy) con cumplimiento estricto de la ley de Texas.',
          en: 'Convenient signing sessions at our Houston office adhering strictly to Texas administrative code.',
        },
        requirements: {
          es: ['Documento completo sin firmar previamente', 'Identificación válida de todos los firmantes'],
          en: ['Unsigned documents ready for signature', 'Valid photo ID for all signers'],
        },
        estimatedDays: 'Inmediato con cita',
        popular: true,
      },
    ],
  },
  {
    id: 'translation',
    code: '03',
    title: {
      es: 'Servicios de Traducción',
      en: 'Translation Services',
    },
    subtitle: {
      es: 'Traducciones certificadas y notarizadas válidas ante USCIS, cortes y consulados',
      en: 'USCIS-certified and notarized translations accepted by courts, embassies, and academic boards',
    },
    description: {
      es: 'Traducciones profesionales Inglés ⇄ Español con certificación de fidelidad y exactitud. Aceptadas al 100% por USCIS (Inmigración), universidades, consulados y juzgados.',
      en: 'Professional certified translations in English ⇄ Spanish with certificates of accuracy. 100% accepted by USCIS, NVC, universities, embassies, and courts.',
    },
    iconName: 'Languages',
    services: [
      {
        id: 'trans-birth',
        divisionId: 'translation',
        name: {
          es: 'Traducción de Actas de Nacimiento',
          en: 'Birth Certificate Translation',
        },
        shortDesc: {
          es: 'Formato fiel al original con certificación oficial para trámites migratorios.',
          en: 'Word-for-word certified translation for USCIS immigration and green card applications.',
        },
        fullDesc: {
          es: 'Traducción íntegra con membrete oficial, declaración jurada del traductor y sello de validez legal.',
          en: 'Complete formatted translation including marginal notes, stamps, and certification statement.',
        },
        requirements: {
          es: ['Foto legible o escaneo claro del acta completa (ambos lados si aplica)'],
          en: ['Clear scan or high-resolution photo of full certificate (both sides)'],
        },
        estimatedDays: '24 a 48 horas',
        popular: true,
        relatedServices: ['apostille-birth', 'vital-birth'],
      },
      {
        id: 'trans-marriage',
        divisionId: 'translation',
        name: {
          es: 'Traducción de Actas de Matrimonio',
          en: 'Marriage Certificate Translation',
        },
        shortDesc: {
          es: 'Traducción jurada para peticiones familiares, visas y doble nacionalidad.',
          en: 'Certified translation for spousal petitions, visas, and legal status changes.',
        },
        fullDesc: {
          es: 'Precisión legal garantizada con todas las anotaciones y sellos notariales o del registro civil.',
          en: 'Accurate translation including witness signatures, marriage license numbers, and registry books.',
        },
        requirements: {
          es: ['Copia digital del acta de matrimonio'],
          en: ['Digital copy of marriage license/record'],
        },
        estimatedDays: '24 a 48 horas',
        relatedServices: ['apostille-marriage'],
      },
      {
        id: 'trans-death',
        divisionId: 'translation',
        name: {
          es: 'Traducción de Actas de Defunción',
          en: 'Death Certificate Translation',
        },
        shortDesc: {
          es: 'Para reclamación de seguros, jubilaciones y liquidación de herencias.',
          en: 'Certified translation for overseas insurance claims, pensions, and inheritance.',
        },
        fullDesc: {
          es: 'Cumplimiento estricto con los requerimientos del Consulado y aseguradoras internacionales.',
          en: 'Translation with medical/legal accuracy adhering to foreign insurance and embassy mandates.',
        },
        requirements: {
          es: ['Escaneo legible del certificado de defunción'],
          en: ['Legible scan of death certificate'],
        },
        estimatedDays: '24 a 48 horas',
      },
      {
        id: 'trans-poa',
        divisionId: 'translation',
        name: {
          es: 'Traducción de Poderes Notariales',
          en: 'Power of Attorney Translation',
        },
        shortDesc: {
          es: 'Traducción jurídica exacta de mandatos y poderes para su uso en EE. UU. o el exterior.',
          en: 'Legal translation of powers of attorney, procurations, and mandates.',
        },
        fullDesc: {
          es: 'Traducción por especialistas en derecho civil y comparado para garantizar la plena validez de facultades.',
          en: 'Expert juridical phrasing preserving legal force across civil law and common law systems.',
        },
        requirements: {
          es: ['Documento del poder completo en PDF'],
          en: ['Complete power of attorney document in PDF'],
        },
        estimatedDays: '2 - 3 días hábiles',
        relatedServices: ['notary-poa', 'apostille-poa'],
      },
      {
        id: 'trans-school',
        divisionId: 'translation',
        name: {
          es: 'Traducción de Documentos Escolares y Transcripts',
          en: 'School Records & Transcripts Translation',
        },
        shortDesc: {
          es: 'Para admisiones en colegios, universidades y evaluación de créditos extranjeros.',
          en: 'For school enrollments, university admissions, and credential evaluators.',
        },
        fullDesc: {
          es: 'Mantiene la escala de calificaciones y desglose de materias según el original.',
          en: 'Clear formatting of grading systems, course titles, credits, and hours.',
        },
        requirements: {
          es: ['Copia de la boleta o certificado de calificaciones'],
          en: ['Copy of transcript or report cards'],
        },
        estimatedDays: '2 - 4 días hábiles',
      },
      {
        id: 'trans-diploma',
        divisionId: 'translation',
        name: {
          es: 'Traducción de Diplomas y Títulos Universitarios',
          en: 'Diplomas & Degree Certificates Translation',
        },
        shortDesc: {
          es: 'Certificación académica para convalidación profesional y visas de trabajo.',
          en: 'Certified academic translation for work visas, licensure boards, and evaluations.',
        },
        fullDesc: {
          es: 'Traducción respetando los títulos nobiliarios, distinciones y leyendas de seguridad.',
          en: 'Includes honors, degree distinctions, and institution signatures.',
        },
        requirements: {
          es: ['Fotografía nítida o escaneo del diploma'],
          en: ['Clear scan or photo of degree diploma'],
        },
        estimatedDays: '24 a 48 horas',
      },
      {
        id: 'trans-official',
        divisionId: 'translation',
        name: {
          es: 'Traducción Oficial Certificada (Documentos Jurídicos)',
          en: 'Official Certified Document Translation',
        },
        shortDesc: {
          es: 'Sentencias de divorcio, antecedentes no penales, títulos de propiedad y contratos.',
          en: 'Divorce decrees, criminal background checks, title deeds, and corporate contracts.',
        },
        fullDesc: {
          es: 'Certificación firmada y sellada con declaración de competencia lingüística conforme a 8 CFR 1003.33.',
          en: 'Certified and stamped with translator affidavit of competency compliant with 8 CFR 1003.33.',
        },
        requirements: {
          es: ['Archivo digital del documento completo', 'Indicar si requiere copia física o digital'],
          en: ['Complete digital file', 'Specify if physical hard copy is required'],
        },
        estimatedDays: '2 - 3 días hábiles',
        popular: true,
      },
    ],
  },
  {
    id: 'vital-records',
    code: '04',
    title: {
      es: 'Actas y Documentos Vitales',
      en: 'Vital Records & Documents',
    },
    subtitle: {
      es: 'Asistencia para la obtención y corrección de certificados de registro civil',
      en: 'Assistance requesting certified vital statistics and civil registry records',
    },
    description: {
      es: 'Le asistimos paso a paso en la solicitud de actas oficiales de nacimiento, matrimonio y defunción en Texas y México/Latinoamérica. (Nota: Multiservicios Lumiel asiste en la gestión ante las entidades gubernamentales emisoras oficiales).',
      en: 'Step-by-step assistance in requesting official vital records, birth certificates, corrections, and certified copies in Texas and foreign jurisdictions.',
    },
    iconName: 'FileText',
    services: [
      {
        id: 'vital-birth',
        divisionId: 'vital-records',
        name: {
          es: 'Actas de Nacimiento (Texas y Otros Estados)',
          en: 'Birth Certificate Assistance',
        },
        shortDesc: {
          es: 'Gestión y solicitud de copias certificadas ante departamentos de salud y registros civiles.',
          en: 'Expedited application assistance for certified birth record requests.',
        },
        fullDesc: {
          es: 'Llenado de formularios oficiales, verificación de requisitos de elegibilidad y seguimiento del expediente.',
          en: 'Preparation of state vital statistics applications and verification of applicant entitlement.',
        },
        requirements: {
          es: ['Nombre completo registrado', 'Fecha y lugar de nacimiento', 'Nombres de los padres', 'ID válida'],
          en: ['Full registered name', 'Date and place of birth', 'Parents full names', 'Valid ID'],
        },
        estimatedDays: '1 - 3 semanas según jurisdicción',
        popular: true,
        relatedServices: ['apostille-birth', 'trans-birth'],
      },
      {
        id: 'vital-marriage',
        divisionId: 'vital-records',
        name: {
          es: 'Actas de Matrimonio',
          en: 'Marriage Certificates',
        },
        shortDesc: {
          es: 'Búsqueda y solicitud de actas de matrimonio en archivos de condados.',
          en: 'Search and issuance assistance for recorded county marriage certificates.',
        },
        fullDesc: {
          es: 'Localización del registro en el condado correspondiente (Harris County, Fort Bend, Montgomery, etc.) o en el extranjero.',
          en: 'County clerk record location and certified copy retrieval across Texas and other states.',
        },
        requirements: {
          es: ['Nombres de los cónyuges', 'Fecha y condado de la ceremonia'],
          en: ['Full names of spouses', 'Date and county of marriage'],
        },
        estimatedDays: '5 - 10 días hábiles',
        relatedServices: ['apostille-marriage'],
      },
      {
        id: 'vital-corrections',
        divisionId: 'vital-records',
        name: {
          es: 'Correcciones de Actas (Vital Record Corrections)',
          en: 'Vital Record Corrections',
        },
        shortDesc: {
          es: 'Enmiendas de nombres, apellidos, fechas o errores tipográficos en actas de Texas.',
          en: 'Amending misspelled names, birth dates, or factual clerical errors on records.',
        },
        fullDesc: {
          es: 'Armado del expediente probatorio (Evidentiary packet) exigido por Texas Vital Statistics para enmendar registros civiles.',
          en: 'Preparation of documentary evidence and statutory petitions required by Texas State Health Services.',
        },
        requirements: {
          es: ['Acta actual con error', 'Documentos probatorios primarios (fe de bautismo, récord escolar, censo, etc.)'],
          en: ['Current certificate with error', 'Primary supporting evidentiary records'],
        },
        estimatedDays: '4 - 8 semanas',
      },
      {
        id: 'vital-certified-copies',
        divisionId: 'vital-records',
        name: {
          es: 'Solicitud de Copias Certificadas Adicionales',
          en: 'Certified Copies Requests',
        },
        shortDesc: {
          es: 'Juegos adicionales de actas con sellos en relieve para trámites consulares.',
          en: 'Additional embossed certified copies for multiple simultaneous legal petitions.',
        },
        fullDesc: {
          es: 'Optimice sus trámites solicitando múltiples copias certificadas originales directamente de la entidad registral.',
          en: 'Streamlined multi-copy procurement directly from official government registrars.',
        },
        requirements: {
          es: ['Identificación oficial vigente del solicitante calificado'],
          en: ['Valid government identification of qualified immediate family applicant'],
        },
        estimatedDays: '3 - 7 días hábiles',
      },
    ],
  },
  {
    id: 'passport',
    code: '05',
    title: {
      es: 'Servicios de Pasaporte',
      en: 'Passport Services',
    },
    subtitle: {
      es: 'Asistencia integral en trámites de pasaportes, formularios y citas',
      en: 'Form preparation, application review, photos, and passport appointment assistance',
    },
    description: {
      es: 'Asesoría para solicitudes de pasaporte de EE. UU. y pasaportes consulares. Revisión minuciosa de documentación para evitar rechazos o retrasos. (Multiservicios Lumiel es un centro privado de preparación de documentos).',
      en: 'Private professional document assistance for US passports and consular travel document renewals. Avoiding delays with verified forms and biometric photos.',
    },
    iconName: 'PlaneTakeoff',
    services: [
      {
        id: 'pass-form',
        divisionId: 'passport',
        name: {
          es: 'Preparación de Formularios de Pasaporte (DS-11 / DS-82)',
          en: 'Passport Form Preparation (DS-11 / DS-82)',
        },
        shortDesc: {
          es: 'Llenado profesional sin errores de los formularios oficiales del Departamento de Estado.',
          en: 'Accurate form completion for first-time or renewal state department applications.',
        },
        fullDesc: {
          es: 'Revisión exhaustiva de historial migratorio, datos de padres y domicilio para asegurar aprobación ágil.',
          en: 'Comprehensive validation of pedigree information, parental history, and eligibility prerequisites.',
        },
        requirements: {
          es: ['Datos de ciudadanía previa o naturalización', 'Identificación oficial'],
          en: ['Proof of US citizenship (birth cert / naturalization)', 'Valid government ID'],
        },
        estimatedDays: 'Mismo día',
        popular: true,
      },
      {
        id: 'pass-renewals',
        divisionId: 'passport',
        name: {
          es: 'Renovaciones de Pasaporte (Adultos)',
          en: 'Passport Renewals Assistance',
        },
        shortDesc: {
          es: 'Trámite de renovación por correo con paquete listo para envío y fotos reglamentarias.',
          en: 'Renewal package preparation by mail including certified photos and shipping labels.',
        },
        fullDesc: {
          es: 'Verificamos si su pasaporte califica para renovación simple por correo y armamos el sobre oficial certificado.',
          en: 'Determine qualification criteria for mail renewals and compile expedited transmission packet.',
        },
        requirements: {
          es: ['Pasaporte vencido o por vencer (emitido hace menos de 15 años)', 'Fotografía reciente'],
          en: ['Current/expired passport issued within last 15 years', 'Compliant color photograph'],
        },
        estimatedDays: 'Mismo día en oficina',
        popular: true,
      },
      {
        id: 'pass-photos',
        divisionId: 'passport',
        name: {
          es: 'Fotografías de Pasaporte Biométricas',
          en: 'Passport Photos',
        },
        shortDesc: {
          es: 'Fotografías 2x2 pulgadas con fondo blanco y estándares biométricos oficiales.',
          en: 'Standard 2x2 inch biometric photos meeting Department of State compliance.',
        },
        fullDesc: {
          es: 'Tomadas e impresas en el acto en nuestra sucursal de Houston con iluminación y proporciones exactas.',
          en: 'Printed on the spot at our Houston office with calibrated studio lighting and zero glare.',
        },
        requirements: {
          es: ['Ropa de color oscuro preferente (no blanca, sin gafas ni sombreros)'],
          en: ['Dark colored clothing recommended (no white tops, no glasses, no headwear)'],
        },
        estimatedDays: '10 minutos en oficina',
      },
      {
        id: 'pass-appointment',
        divisionId: 'passport',
        name: {
          es: 'Citas y Preparación de Expediente',
          en: 'Passport Appointment & Checklist Preparation',
        },
        shortDesc: {
          es: 'Agendamiento en oficinas postales y armado del folder de documentos obligatorios.',
          en: 'USPS acceptance facility scheduling and organized folder preparation.',
        },
        fullDesc: {
          es: 'Organizamos su expediente en carpetas etiquetadas para que su cita ante el agente de aceptación sea rápida y sin contratiempos.',
          en: 'Complete document dossier organized in priority order for seamless submission.',
        },
        requirements: {
          es: ['Fechas estimadas de viaje', 'Comprobante de domicilio'],
          en: ['Intended travel dates', 'Proof of Texas residency'],
        },
        estimatedDays: '1 - 2 días',
      },
    ],
  },
  {
    id: 'vehicles',
    code: '06',
    title: {
      es: 'Servicios de Vehículos',
      en: 'Vehicle Services',
    },
    subtitle: {
      es: 'Transferencias de título, placas y registro automotriz en Texas',
      en: 'Texas DMV vehicle title transfers, registration renewals, plates and auto documentation',
    },
    description: {
      es: 'Gestión vehicular rápida en Houston y el Condado de Harris. Evite largas filas en la oficina de impuestos (Tax Assessor-Collector) para títulos, registros y placas.',
      en: 'Vehicle title transfers, registration stickers, license plates, and bond titles in Houston and Harris County. Skip the lines with authorized document assistance.',
    },
    iconName: 'Car',
    services: [
      {
        id: 'veh-title-transfer',
        divisionId: 'vehicles',
        name: {
          es: 'Transferencia de Título de Vehículo (Title Transfer)',
          en: 'Vehicle Title Transfer',
        },
        shortDesc: {
          es: 'Cambio de propietario tras compra, venta, donación o herencia.',
          en: 'Title transfer after private sale, family gift, trade, or estate inheritance.',
        },
        fullDesc: {
          es: 'Llenado de Formulario 130-U, cálculo de impuestos sobre venta y trámite ante la oficina del recaudador de impuestos.',
          en: 'Application for Texas Title (Form 130-U), sales tax calculation, and submission to the Tax Office.',
        },
        requirements: {
          es: ['Título original firmado por vendedor y comprador', 'Identificación de Texas del comprador', 'Inspección vehicular vigente'],
          en: ['Original blue Texas title signed by seller and buyer', 'Buyer valid Texas ID/DL', 'Passing vehicle inspection'],
        },
        estimatedDays: '1 - 3 días hábiles',
        popular: true,
      },
      {
        id: 'veh-registration-renewal',
        divisionId: 'vehicles',
        name: {
          es: 'Renovación de Registro y Sticker',
          en: 'Vehicle Registration Renewal',
        },
        shortDesc: {
          es: 'Obtenga su sticker de registro de Texas al instante sin complicaciones.',
          en: 'Renew your Texas registration sticker fast without waiting for state mail.',
        },
        fullDesc: {
          es: 'Verificamos en el sistema del Estado de Texas su inspección técnica y seguro vigente para emitir su renovación.',
          en: 'Direct verification with TxDMV databases with immediate renewal submission.',
        },
        requirements: {
          es: ['Número de placa o VIN', 'Comprobante de seguro automotriz vigente', 'Inspección técnica al día'],
          en: ['License plate or VIN', 'Proof of active Texas auto insurance', 'Passing state inspection'],
        },
        estimatedDays: 'Mismo día',
        popular: true,
      },
      {
        id: 'veh-plates',
        divisionId: 'vehicles',
        name: {
          es: 'Placas Nuevas y Reemplazo de Stickers',
          en: 'Vehicle Plates & Sticker Replacement',
        },
        shortDesc: {
          es: 'Reposición de placas dañadas, robadas o placas nuevas para vehículos foráneos.',
          en: 'Replacement of lost/damaged plates and new Texas plates for out-of-state cars.',
        },
        fullDesc: {
          es: 'Emisión de placas regulares, placas de camión y reposición de calcomanías extraviadas.',
          en: 'Procurement of replacement license plates and verification of duplicate title records.',
        },
        requirements: {
          es: ['Registro del vehículo o título', 'Reporte policial si fueron robadas', 'ID del dueño'],
          en: ['Vehicle registration or title', 'Police report if stolen', 'Owner identification'],
        },
        estimatedDays: '1 - 2 días hábiles',
      },
      {
        id: 'veh-purchase-sale',
        divisionId: 'vehicles',
        name: {
          es: 'Asistencia en Compra y Venta de Vehículos (Bill of Sale)',
          en: 'Vehicle Purchase & Sale Agreement (Bill of Sale)',
        },
        shortDesc: {
          es: 'Elaboración y certificación de contratos de compraventa y liberación de responsabilidad.',
          en: 'Drafting of binding Bill of Sale and TxDMV vehicle transfer notification.',
        },
        fullDesc: {
          es: 'Proteja sus derechos legales al vender su auto para no recibir multas o infracciones del nuevo comprador.',
          en: 'Protect seller liability by recording official vehicle transfer notification immediately upon transaction.',
        },
        requirements: {
          es: ['Datos del comprador y vendedor', 'VIN y odómetro exacto', 'Precio acordado'],
          en: ['Buyer and seller information', 'VIN and exact odometer reading', 'Agreed sales price'],
        },
        estimatedDays: 'Mismo día',
      },
      {
        id: 'veh-corrections',
        divisionId: 'vehicles',
        name: {
          es: 'Correcciones de Documentos y Título con Fianza (Bonded Title)',
          en: 'Vehicle Document Corrections & Bonded Titles',
        },
        shortDesc: {
          es: 'Solución cuando no tiene el título original o contiene tachaduras o errores.',
          en: 'Resolving lost titles, erasures on titles, or unreleased liens via bonded title.',
        },
        fullDesc: {
          es: 'Tramitamos la fianza con aseguradora y el expediente ante TxDMV para recuperar el título legal de su vehículo.',
          en: 'Assistance obtaining surety bonds and DMV statement of facts for establishing legal ownership.',
        },
        requirements: {
          es: ['Inspección física del vehículo', 'Comprobante de compra o posesión', 'Historial del VIN'],
          en: ['Law enforcement physical inspection', 'Bill of sale or proof of possession', 'VIN history'],
        },
        estimatedDays: '2 - 3 semanas',
      },
    ],
  },
  {
    id: 'insurance',
    code: '07',
    title: {
      es: 'Servicios de Seguros',
      en: 'Insurance Services',
    },
    subtitle: {
      es: 'Pólizas de auto, hogar, inquilinos, negocios y responsabilidad civil',
      en: 'Personal and commercial auto, home, renters, and general liability insurance coverage',
    },
    description: {
      es: 'Cotizaciones competitivas y cobertura a su medida en Houston y todo Texas. Le ayudamos a encontrar las tarifas más accesibles con aseguradoras autorizadas.',
      en: 'Competitive personalized insurance quotes in Houston and across Texas. Partnered with licensed insurance providers to protect your family, car, and business assets.',
    },
    iconName: 'Shield',
    services: [
      {
        id: 'ins-auto',
        divisionId: 'insurance',
        name: {
          es: 'Seguro de Automóvil (Auto Insurance)',
          en: 'Auto Insurance Coverage',
        },
        shortDesc: {
          es: 'Responsabilidad civil obligatoria de Texas, Full Coverage y SR-22.',
          en: 'Texas state minimum liability, full coverage, collision, and SR-22 certificates.',
        },
        fullDesc: {
          es: 'Aceptamos licencia de Texas, de otros países o pasaporte. Coberturas flexibles con pagos mensuales accesibles.',
          en: 'Accepted with Texas DL, international licenses, or passport. Low down payments and customizable deductibles.',
        },
        requirements: {
          es: ['Año, marca, modelo y VIN del vehículo', 'Licencia de conducir o identificación', 'Historial de conductores'],
          en: ['Vehicle Year, Make, Model, and VIN', 'Driver license or ID of all drivers', 'Driving record summary'],
        },
        estimatedDays: 'Cotización en minutos',
        popular: true,
      },
      {
        id: 'ins-home',
        divisionId: 'insurance',
        name: {
          es: 'Seguro de Casa (Homeowners Insurance)',
          en: 'Homeowners Insurance',
        },
        shortDesc: {
          es: 'Protección para su vivienda contra tormentas, incendios, robos y daños estructurales.',
          en: 'Property protection against hurricane windstorms, fire, hail, and structural hazards.',
        },
        fullDesc: {
          es: 'Pólizas completas requeridas por prestamistas hipotecarios que protegen su patrimonio familiar.',
          en: 'Lender-approved insurance packages covering dwelling, other structures, and personal property.',
        },
        requirements: {
          es: ['Dirección exacta de la propiedad', 'Año de construcción y metros cuadrados', 'Tipo de techo'],
          en: ['Property address', 'Year built and square footage', 'Roof age and structural details'],
        },
        estimatedDays: '24 horas',
      },
      {
        id: 'ins-renters',
        divisionId: 'insurance',
        name: {
          es: 'Seguro de Renta (Renters Insurance)',
          en: 'Renters Insurance',
        },
        shortDesc: {
          es: 'Protege sus pertenencias personales y brinda responsabilidad civil al arrendar departamento o casa.',
          en: 'Affordable coverage for personal belongings and liability required by apartment complexes.',
        },
        fullDesc: {
          es: 'Cumple al 100% con los requerimientos de los complejos departamentales en Houston con costo desde $15/mes.',
          en: 'Complies with Houston apartment lease stipulations starting as low as $15/month.',
        },
        requirements: {
          es: ['Dirección del apartamento arrendado', 'Valor estimado de sus muebles y electrónicos'],
          en: ['Rental address and unit number', 'Estimated value of furniture and personal effects'],
        },
        estimatedDays: 'Mismo día',
      },
      {
        id: 'ins-business',
        divisionId: 'insurance',
        name: {
          es: 'Seguro para Negocios (Commercial Insurance)',
          en: 'Commercial Business Insurance',
        },
        shortDesc: {
          es: 'Cobertura para locales comerciales, inventario, contratistas y vehículos de trabajo.',
          en: 'Tailored protection for commercial premises, equipment, contractors, and fleet vehicles.',
        },
        fullDesc: {
          es: 'Diseñado especialmente para pequeños empresarios hispanos en Houston: talleres, restaurantes, tiendas y oficinas.',
          en: 'Engineered for small business owners: retail shops, contractors, restaurants, and professional offices.',
        },
        requirements: {
          es: ['Giro o actividad del negocio', 'Número de empleados', 'Ubicación física'],
          en: ['Business classification / trade', 'Number of employees', 'Physical premises details'],
        },
        estimatedDays: '1 - 2 días hábiles',
      },
      {
        id: 'ins-general-liability',
        divisionId: 'insurance',
        name: {
          es: 'Seguro de Responsabilidad Civil (General Liability)',
          en: 'General Liability Insurance',
        },
        shortDesc: {
          es: 'Certificados COI para subcontratistas, electricistas, pintores y construcción.',
          en: 'Certificates of Insurance (COI) for construction, roofers, painters, and tradesmen.',
        },
        fullDesc: {
          es: 'Emisión rápida de certificados para presentar ante contratistas generales y entrar a obras o condominios.',
          en: 'Rapid COI turnaround demanded by general contractors and municipal permitting offices.',
        },
        requirements: {
          es: ['Nombre de la empresa o DBA', 'Límites de cobertura solicitados ($1M / $2M)'],
          en: ['Legal entity or DBA name', 'Requested policy limits ($1M / $2M aggregate)'],
        },
        estimatedDays: '24 a 48 horas',
        popular: true,
      },
    ],
  },
];

export const COMPANY_INFO = {
  name: 'Multiservicios Lumiel',
  tagline: {
    es: 'Centro Profesional de Servicios de Documentos y Notaría',
    en: 'Professional Document & Notary Services Center',
  },
  address: '550 Greens Pkwy Ste 212B',
  cityStateZip: 'Houston, TX 77067',
  fullAddress: '550 Greens Pkwy Ste 212B, Houston, TX 77067, USA',
  phone: '+1 (346) 521-0662',
  phoneRaw: '13465210662',
  email: 'multiservicioslumielayi@gmail.com',
  whatsappUrl: 'https://wa.me/13465210662?text=Hola%20Multiservicios%20Lumiel,%20deseo%20consultar%20sobre%20un%20trámite.',
  hours: {
    es: 'Lunes a Viernes: 9:00 AM – 6:00 PM | Sábados: 10:00 AM – 2:00 PM',
    en: 'Monday to Friday: 9:00 AM – 6:00 PM | Saturday: 10:00 AM – 2:00 PM',
  },
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.578667554587!2d-95.42410942369688!3d29.951015674972186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640ca9d666244f7%3A0xc67f7bbffceaa4c4!2s550%20Greens%20Pkwy%20%23212b%2C%20Houston%2C%20TX%2077067!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus',
};
