import React, { useState, useEffect } from 'react';
import { Language, ServiceDivisionId, ClientRecord, CrmStatus, PriorityLevel, PaymentStatus } from '../types/index.ts';
import { SERVICE_DIVISIONS } from '../data/servicesData.ts';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Trash2, 
  Lock, 
  AlertCircle 
} from 'lucide-react';

interface UniversalIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialDivisionId?: ServiceDivisionId;
  onSubmitSuccess: (newClient: ClientRecord) => void;
}

export const UniversalIntakeModal: React.FC<UniversalIntakeModalProps> = ({
  isOpen,
  onClose,
  language,
  initialDivisionId,
  onSubmitSuccess,
}) => {
  const isEs = language === 'es';

  // Wizard Steps: 1: Service Selection, 2: Specific Flow Questions, 3: Customer Details, 4: Document Upload, 5: Confirmation
  const [step, setStep] = useState<number>(1);
  const [division, setDivision] = useState<ServiceDivisionId>(initialDivisionId || 'apostille');
  const [serviceId, setServiceId] = useState<string>('');

  // Flow specific fields
  const [flowData, setFlowData] = useState({
    // Apostille
    countryOfUse: 'México',
    issuingState: 'Texas',
    needsTranslation: true,
    deliveryMethod: 'pickup',
    // Notary
    numSigners: '1',
    witnessRequired: 'no',
    hasNotaryDraft: 'yes',
    // Translation
    sourceLang: 'Español',
    targetLang: 'English',
    numPages: '1',
    translationPurpose: 'USCIS Inmigración',
    // Vital Records
    recordType: 'birth',
    stateOfRecord: 'Texas',
    relationship: 'Titular / Self',
    // Passport
    passportType: 'renewal',
    passportAge: 'adult',
    needsPhotos: true,
    // Vehicles
    vehicleYear: '2022',
    vehicleMake: 'Toyota',
    vehicleModel: 'RAV4',
    vin: '',
    // Insurance
    insuranceType: 'Auto Personal',
    estimatedValue: '',
  });

  // Customer Information (Section 16)
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    preferredLanguage: language,
    preferredContactMethod: 'whatsapp' as 'whatsapp' | 'phone' | 'email',
    notes: '',
  });

  // Uploaded Files (Section 17)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; type: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedCaseNumber, setGeneratedCaseNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialDivisionId) {
      setDivision(initialDivisionId);
      const divObj = SERVICE_DIVISIONS.find((d) => d.id === initialDivisionId);
      if (divObj && divObj.services.length > 0) {
        setServiceId(divObj.services[0].id);
      }
    } else {
      const defaultDiv = SERVICE_DIVISIONS[0];
      setDivision(defaultDiv.id);
      setServiceId(defaultDiv.services[0].id);
    }
  }, [initialDivisionId, isOpen]);

  if (!isOpen) return null;

  const currentDivisionObj = SERVICE_DIVISIONS.find((d) => d.id === division) || SERVICE_DIVISIONS[0];
  const currentServiceObj = currentDivisionObj.services.find((s) => s.id === serviceId) || currentDivisionObj.services[0];

  const handleDivisionChange = (newDiv: ServiceDivisionId) => {
    setDivision(newDiv);
    const targetDiv = SERVICE_DIVISIONS.find((d) => d.id === newDiv);
    if (targetDiv && targetDiv.services.length > 0) {
      setServiceId(targetDiv.services[0].id);
    }
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newFiles = files.map((file) => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type || 'application/pdf',
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!customer.firstName.trim() || !customer.phone.trim()) {
      setErrorMessage(isEs ? 'Por favor ingrese al menos su Nombre y Teléfono.' : 'Please enter at least First Name and Phone.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const newCaseId = `LUM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedCaseNumber(newCaseId);

      const newRecord: ClientRecord = {
        id: `cli-${Date.now()}`,
        caseNumber: newCaseId,
        firstName: customer.firstName.trim(),
        lastName: customer.lastName.trim(),
        phone: customer.phone.trim(),
        email: customer.email.trim() || 'cliente@lumiel.com',
        address: customer.address.trim(),
        preferredLanguage: customer.preferredLanguage,
        preferredContactMethod: customer.preferredContactMethod,
        division: division,
        serviceId: serviceId || currentServiceObj.id,
        serviceName: currentServiceObj ? currentServiceObj.name[language] : division,
        status: 'NEW' as CrmStatus,
        priority: 'normal' as PriorityLevel,
        paymentStatus: 'pending' as PaymentStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: `${customer.notes} [Detalles específicos: ${JSON.stringify(flowData)}]`,
        assignedTo: 'Mesa de Entrada Lumiel',
        documents: uploadedFiles.map((file, idx) => ({
          id: `doc-up-${idx}-${Date.now()}`,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString().split('T')[0],
          type: file.type,
          status: 'pending',
          notes: 'Documento cargado desde portal web de autoservicio',
        })),
        activityLogs: [
          {
            id: `log-${Date.now()}`,
            timestamp: new Date().toLocaleString(),
            author: 'Portal Web Inteligente',
            action: `Expediente generado con ${uploadedFiles.length} documento(s) adjuntos`,
          },
        ],
      };

      onSubmitSuccess(newRecord);
      setIsSubmitting(false);
      setStep(5); // Show Confirmation
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F8F6F1] rounded-2xl shadow-2xl border border-[#DCC9A7] overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-[#0F2747] text-white px-6 py-4 flex items-center justify-between border-b border-[#C9A96B]/30">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96B]">
              MULTISERVICIOS LUMIEL · HOUSTON, TX
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F6F1]">
              {isEs ? 'Formulario Universal de Solicitud' : 'Universal Service Request'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        {step < 5 && (
          <div className="bg-[#EAE3D8] px-6 py-2.5 flex items-center justify-between text-xs text-[#887D6B] border-b border-[#DCC9A7]/40">
            <span className="font-semibold text-[#0F2747]">
              {isEs ? `Paso ${step} de 4` : `Step ${step} of 4`}
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <span
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === step
                      ? 'w-6 bg-[#0F2747]'
                      : s < step
                      ? 'w-2 bg-[#8A9A7B]'
                      : 'w-2 bg-[#DCC9A7]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: SERVICE CATEGORY SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0F2747]">
                  {isEs ? '1. ¿Qué servicio necesita?' : '1. What service do you need?'}
                </h4>
                <p className="text-xs text-[#887D6B]">
                  {isEs
                    ? 'Seleccione la categoría principal y el trámite correspondiente.'
                    : 'Select the primary division and specific service.'}
                </p>
              </div>

              {/* Division Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SERVICE_DIVISIONS.map((div) => (
                  <button
                    key={div.id}
                    onClick={() => handleDivisionChange(div.id)}
                    className={`p-2.5 rounded-xl text-xs text-left transition-all border ${
                      division === div.id
                        ? 'bg-[#0F2747] text-white border-[#0F2747] shadow-sm font-semibold'
                        : 'bg-white text-[#2E2E2E] border-[#DCC9A7]/60 hover:bg-[#F8F6F1]'
                    }`}
                  >
                    <span className="block font-mono text-[9px] text-[#C9A96B] mb-0.5">{div.code}</span>
                    <span className="line-clamp-1">{div.title[language]}</span>
                  </button>
                ))}
              </div>

              {/* Specific Sub-service Selector */}
              <div className="pt-3">
                <label className="block text-xs font-bold text-[#0F2747] mb-2 uppercase tracking-wider">
                  {isEs ? 'Trámite Específico' : 'Specific Service'}
                </label>
                <div className="space-y-2">
                  {currentDivisionObj.services.map((serv) => (
                    <label
                      key={serv.id}
                      onClick={() => setServiceId(serv.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        serviceId === serv.id
                          ? 'bg-white border-[#0F2747] shadow-xs ring-1 ring-[#0F2747]'
                          : 'bg-white/60 border-[#DCC9A7]/50 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="subservice"
                        checked={serviceId === serv.id}
                        onChange={() => setServiceId(serv.id)}
                        className="mt-0.5 text-[#0F2747] focus:ring-[#C9A96B]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[#0F2747]">
                            {serv.name[language]}
                          </span>
                          <span className="text-[10px] font-mono text-[#887D6B]">
                            {serv.estimatedDays}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#887D6B] mt-0.5">
                          {serv.shortDesc[language]}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DYNAMIC FLOW QUESTIONS */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0F2747]">
                  {isEs ? '2. Detalles del Trámite' : '2. Service Requirements'}
                </h4>
                <p className="text-xs text-[#887D6B]">
                  {currentServiceObj.name[language]} · {currentDivisionObj.title[language]}
                </p>
              </div>

              {/* DYNAMIC FORM PER DIVISION */}
              {division === 'apostille' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'País de Destino (Donde surtirá efecto)' : 'Country of Use'}
                    </label>
                    <input
                      type="text"
                      value={flowData.countryOfUse}
                      onChange={(e) => setFlowData({ ...flowData, countryOfUse: e.target.value })}
                      placeholder="Ej. México, Colombia, España"
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Estado Emisor del Documento' : 'Issuing State / Jurisdiction'}
                    </label>
                    <select
                      value={flowData.issuingState}
                      onChange={(e) => setFlowData({ ...flowData, issuingState: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                    >
                      <option value="Texas">Texas (Houston / Austin)</option>
                      <option value="California">California</option>
                      <option value="Florida">Florida</option>
                      <option value="New York">New York</option>
                      <option value="Otro Estado">Otro Estado de EE. UU.</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer p-3 bg-white rounded-xl border border-[#DCC9A7]">
                      <input
                        type="checkbox"
                        checked={flowData.needsTranslation}
                        onChange={(e) => setFlowData({ ...flowData, needsTranslation: e.target.checked })}
                        className="rounded text-[#0F2747] focus:ring-[#C9A96B]"
                      />
                      <span className="text-xs text-[#2E2E2E]">
                        {isEs
                          ? '¿Requiere además traducción certificada del documento apostillado?'
                          : 'Do you also require certified translation of the apostilled record?'}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {division === 'notary' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Número de Firmantes Presenciales' : 'Number of Signers'}
                    </label>
                    <select
                      value={flowData.numSigners}
                      onChange={(e) => setFlowData({ ...flowData, numSigners: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    >
                      <option value="1">1 Persona</option>
                      <option value="2">2 Personas</option>
                      <option value="3+">3 o más personas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? '¿Requiere Testigos?' : 'Witness Requirements'}
                    </label>
                    <select
                      value={flowData.witnessRequired}
                      onChange={(e) => setFlowData({ ...flowData, witnessRequired: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    >
                      <option value="no">No, sólo comparecientes</option>
                      <option value="yes">Sí, traeré mis testigos</option>
                      <option value="lumiel_witness">Sí, requiero testigos de Lumiel</option>
                    </select>
                  </div>
                </div>
              )}

              {division === 'translation' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Idioma Origen' : 'Source Language'}
                    </label>
                    <input
                      type="text"
                      value={flowData.sourceLang}
                      onChange={(e) => setFlowData({ ...flowData, sourceLang: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Idioma Destino' : 'Target Language'}
                    </label>
                    <input
                      type="text"
                      value={flowData.targetLang}
                      onChange={(e) => setFlowData({ ...flowData, targetLang: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Número Estimado de Páginas' : 'Estimated Page Count'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={flowData.numPages}
                      onChange={(e) => setFlowData({ ...flowData, numPages: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Propósito de la Traducción' : 'Purpose'}
                    </label>
                    <select
                      value={flowData.translationPurpose}
                      onChange={(e) => setFlowData({ ...flowData, translationPurpose: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    >
                      <option value="USCIS Inmigración">USCIS / Inmigración</option>
                      <option value="Corte / Juicio">Corte / Juzgado</option>
                      <option value="Universidad">Universidad / Homologación</option>
                      <option value="Consulado">Consulado / Embajada</option>
                    </select>
                  </div>
                </div>
              )}

              {division === 'vehicles' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Año, Marca y Modelo' : 'Year, Make, Model'}
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 2020 Honda Accord"
                      value={`${flowData.vehicleYear} ${flowData.vehicleMake} ${flowData.vehicleModel}`}
                      onChange={(e) => setFlowData({ ...flowData, vehicleModel: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Número de Serie (VIN - 17 dígitos)' : 'VIN (17 digits)'}
                    </label>
                    <input
                      type="text"
                      maxLength={17}
                      placeholder="1HGCR..."
                      value={flowData.vin}
                      onChange={(e) => setFlowData({ ...flowData, vin: e.target.value.toUpperCase() })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] font-mono"
                    />
                  </div>
                </div>
              )}

              {division === 'vital-records' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Tipo de Registro' : 'Record Type'}
                    </label>
                    <select
                      value={flowData.recordType}
                      onChange={(e) => setFlowData({ ...flowData, recordType: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    >
                      <option value="birth">{isEs ? 'Nacimiento' : 'Birth'}</option>
                      <option value="marriage">{isEs ? 'Matrimonio' : 'Marriage'}</option>
                      <option value="death">{isEs ? 'Defunción' : 'Death'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Parentesco con el Titular' : 'Relationship to Subject'}
                    </label>
                    <input
                      type="text"
                      value={flowData.relationship}
                      onChange={(e) => setFlowData({ ...flowData, relationship: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    />
                  </div>
                </div>
              )}

              {division === 'passport' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Tipo de Trámite' : 'Application Type'}
                    </label>
                    <select
                      value={flowData.passportType}
                      onChange={(e) => setFlowData({ ...flowData, passportType: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    >
                      <option value="renewal">{isEs ? 'Renovación de Pasaporte' : 'Passport Renewal'}</option>
                      <option value="first_time">{isEs ? 'Primera Vez (DS-11)' : 'First Time (DS-11)'}</option>
                      <option value="minor">{isEs ? 'Pasaporte para Menor' : 'Child Passport'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? '¿Requiere Fotos Biométricas 2x2?' : 'Need 2x2 Passport Photos?'}
                    </label>
                    <select
                      value={flowData.needsPhotos ? 'yes' : 'no'}
                      onChange={(e) => setFlowData({ ...flowData, needsPhotos: e.target.value === 'yes' })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    >
                      <option value="yes">{isEs ? 'Sí, en oficina Houston' : 'Yes, at Houston office'}</option>
                      <option value="no">{isEs ? 'Ya las tengo' : 'I have them already'}</option>
                    </select>
                  </div>
                </div>
              )}

              {division === 'insurance' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Ramo de Seguro' : 'Insurance Category'}
                    </label>
                    <select
                      value={flowData.insuranceType}
                      onChange={(e) => setFlowData({ ...flowData, insuranceType: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    >
                      <option value="Auto Personal">Auto Personal</option>
                      <option value="Home / Casa">Home / Propietario</option>
                      <option value="Renters / Inquilinos">Renters / Inquilinos</option>
                      <option value="General Liability">General Liability (Responsabilidad Civil)</option>
                      <option value="Commercial Business">Negocios / Comercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                      {isEs ? 'Cobertura Deseada' : 'Desired Coverage'}
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Full Coverage, $1M Límites..."
                      value={flowData.estimatedValue}
                      onChange={(e) => setFlowData({ ...flowData, estimatedValue: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                    />
                  </div>
                </div>
              )}

              {/* Requirement Checklist Helper */}
              <div className="p-3 bg-white rounded-xl border border-[#DCC9A7]/50 text-xs">
                <span className="font-semibold text-[#0F2747] block mb-1">
                  {isEs ? 'Requisitos recomendados para este trámite:' : 'Requirements checklist for this service:'}
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[#887D6B] text-[11px]">
                  {currentServiceObj.requirements[language].map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER INFORMATION (Section 16) */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0F2747]">
                  {isEs ? '3. Información del Solicitante' : '3. Applicant Contact Details'}
                </h4>
                <p className="text-xs text-[#887D6B]">
                  {isEs
                    ? 'Datos protegidos con estricta confidencialidad para coordinar su expediente.'
                    : 'Confidential client information to track and process your case.'}
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Nombre(s) *' : 'First Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.firstName}
                    onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                    placeholder="Ej. María"
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Apellido(s) *' : 'Last Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.lastName}
                    onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                    placeholder="Ej. Morales"
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Teléfono móvil / WhatsApp *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+1 (832) 000-0000"
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Correo Electrónico' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Dirección en Houston / Texas (Opcional)' : 'Address (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Calle, número, código postal..."
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Canal de Contacto Preferido' : 'Preferred Contact Channel'}
                  </label>
                  <select
                    value={customer.preferredContactMethod}
                    onChange={(e) => setCustomer({ ...customer, preferredContactMethod: e.target.value as any })}
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">{isEs ? 'Llamada Telefónica' : 'Phone Call'}</option>
                    <option value="email">{isEs ? 'Correo Electrónico' : 'Email'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Idioma de Preferencia' : 'Preferred Language'}
                  </label>
                  <select
                    value={customer.preferredLanguage}
                    onChange={(e) => setCustomer({ ...customer, preferredLanguage: e.target.value as Language })}
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7]"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0F2747] mb-1">
                    {isEs ? 'Notas Adicionales / Instrucciones' : 'Additional Notes / Questions'}
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder={isEs ? 'Especifique si tiene fecha límite o algún requerimiento especial...' : 'Any deadlines or particular instructions...'}
                    className="w-full text-xs p-2.5 bg-white rounded-lg border border-[#DCC9A7] focus:border-[#0F2747] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DOCUMENT UPLOAD & SECURITY (Sections 17 & 18) */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0F2747]">
                  {isEs ? '4. Carga Segura de Documentos' : '4. Secure Document Upload'}
                </h4>
                <p className="text-xs text-[#887D6B]">
                  {isEs
                    ? 'Formatos aceptados: PDF, JPG, JPEG, PNG. Sus archivos se transmiten bajo cifrado seguro (Blueprint Sec. 18).'
                    : 'Accepted formats: PDF, JPG, JPEG, PNG. Stored with private encrypted access control.'}
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-[#C9A96B] rounded-2xl p-6 text-center bg-white/70 hover:bg-white transition-colors cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleSimulatedFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-10 h-10 text-[#0F2747] mx-auto mb-2" />
                <span className="text-xs font-bold text-[#0F2747] block mb-1">
                  {isEs ? 'Haga clic para seleccionar o arrastre sus documentos aquí' : 'Click to select or drag & drop files here'}
                </span>
                <span className="text-[11px] text-[#887D6B] block">
                  PDF, JPG, PNG (Hasta 25 MB por archivo)
                </span>
              </div>

              {/* Uploaded Documents List as per Blueprint Section 17 */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#0F2747] uppercase tracking-wider block">
                    {isEs ? 'Documentos Adjuntados' : 'Attached Documents'}:
                  </span>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white rounded-xl border border-[#8A9A7B]/60 flex items-center justify-between shadow-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#8A9A7B] flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-[#0F2747]">{file.name}</div>
                          <div className="text-[10px] text-[#887D6B] font-mono">
                            {isEs ? 'DOCUMENTO' : 'DOCUMENT'} 0{index + 1} · {file.size} · ✓ {isEs ? 'Subido' : 'Uploaded'}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title={isEs ? 'Eliminar' : 'Remove'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Blueprint Section 18 Security Notice */}
              <div className="p-3.5 bg-[#0F2747]/5 rounded-xl border border-[#DCC9A7] flex items-start gap-2.5 text-xs text-[#2E2E2E]">
                <Lock className="w-4 h-4 text-[#C9A96B] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0F2747] block mb-0.5">
                    {isEs ? 'Almacenamiento Privado y Cifrado (Private Storage)' : 'Private Storage & Encryption Guaranteed'}
                  </span>
                  <p className="text-[11px] text-[#887D6B] leading-tight">
                    {isEs
                      ? 'Sus documentos personales nunca son públicos. Se almacenan bajo protocolos de validación, URLs firmadas y acceso restringido exclusivo para el personal notarial.'
                      : 'Client documents are never stored publicly. Handled under role-based authorization, signed URLs, and strict confidentiality.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: OFFICIAL CONFIRMATION (Section 19) */}
          {step === 5 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8A9A7B]/20 text-[#8A9A7B] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              {/* Exact copy from Master Blueprint Section 19 */}
              {isEs ? (
                <>
                  <h4 className="font-serif text-2xl font-bold text-[#0F2747]">
                    Gracias — Hemos Recibido Su Solicitud
                  </h4>
                  <p className="text-sm text-[#2E2E2E] max-w-md mx-auto leading-relaxed">
                    Su solicitud de servicio ha sido recibida correctamente. Un miembro de Multiservicios Lumiel revisará la información proporcionada y se comunicará con usted sobre los siguientes pasos.
                  </p>
                </>
              ) : (
                <>
                  <h4 className="font-serif text-2xl font-bold text-[#0F2747]">
                    Thank You — We Received Your Request
                  </h4>
                  <p className="text-sm text-[#2E2E2E] max-w-md mx-auto leading-relaxed">
                    Your service request has been successfully submitted. A member of Multiservicios Lumiel will review the information provided and contact you regarding the next steps.
                  </p>
                </>
              )}

              {/* Case Reference Card */}
              <div className="p-4 bg-white rounded-xl border border-[#C9A96B] max-w-md mx-auto text-left shadow-md">
                <div className="flex justify-between items-center border-b border-[#F8F6F1] pb-2 mb-2">
                  <span className="text-xs font-medium text-[#887D6B]">{isEs ? 'Número de Expediente' : 'Case Number'}:</span>
                  <span className="font-mono text-sm font-bold text-[#0F2747]">{generatedCaseNumber}</span>
                </div>
                <div className="flex justify-between items-center text-xs py-1">
                  <span className="text-[#887D6B]">{isEs ? 'Trámite' : 'Service'}:</span>
                  <span className="font-semibold text-[#2E2E2E]">{currentServiceObj.name[language]}</span>
                </div>
                <div className="flex justify-between items-center text-xs py-1">
                  <span className="text-[#887D6B]">{isEs ? 'Solicitante' : 'Client'}:</span>
                  <span className="font-semibold text-[#2E2E2E]">{customer.firstName} {customer.lastName}</span>
                </div>
                <div className="flex justify-between items-center text-xs py-1">
                  <span className="text-[#887D6B]">{isEs ? 'Estado Inicial' : 'Status'}:</span>
                  <span className="font-semibold text-[#8A9A7B]">NUEVO (NEW) · En revisión</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0F2747] text-white rounded-xl text-xs font-semibold hover:bg-[#16355C] transition-colors cursor-pointer"
                >
                  {isEs ? 'Cerrar y Volver al Portal' : 'Close and Return'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="bg-white px-6 py-3.5 border-t border-[#DCC9A7]/50 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0F2747] hover:bg-[#F8F6F1] rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isEs ? 'Atrás' : 'Back'}</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#887D6B] hover:text-[#2E2E2E] cursor-pointer"
              >
                {isEs ? 'Cancelar' : 'Cancel'}
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => {
                  setStep(step + 1);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0F2747] hover:bg-[#16355C] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>{isEs ? 'Continuar' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A96B]" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-[#0F2747] bg-[#C9A96B] hover:bg-[#b89552] rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{isEs ? 'Transmitiendo...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4 text-[#0F2747]" />
                    <span>{isEs ? 'Enviar Solicitud' : 'Submit Service Request'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
