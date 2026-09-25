import React, { useState, useMemo } from 'react';
import { 
  Language, 
  ClientRecord, 
  CrmStatus, 
  ServiceDivisionId, 
  PriorityLevel, 
  PaymentStatus, 
  CrmFilterState,
  CrmUser
} from '../../types/index.ts';
import { SERVICE_DIVISIONS } from '../../data/servicesData.ts';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Printer, 
  RotateCcw, 
  Eye, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  UploadCloud, 
  Send,
  Layers,
  ArrowUpDown,
  Tag,
  BarChart2,
  BarChart3,
  Users as UsersIcon,
  ArrowLeft,
  Trash2,
  Edit3,
  ExternalLink,
  Globe,
  MapPin,
  Sparkles,
  Check
} from 'lucide-react';
import { CrmMonthlySummaryChart } from './CrmMonthlySummaryChart.tsx';
import { CrmUserManager } from './CrmUserManager.tsx';

interface CrmDashboardProps {
  language: Language;
  clients: ClientRecord[];
  onUpdateClient: (updated: ClientRecord) => void;
  onCreateClient: (newClient: ClientRecord) => void;
  onDeleteClient?: (clientId: string) => void;
  users: CrmUser[];
  onUpdateUsers: (users: CrmUser[]) => void;
  onExitToPortal?: () => void;
}

export interface ParsedCaseDetails {
  customerNotes: string;
  specificDetails: Record<string, any> | null;
  apostilleDetails: {
    modalidad?: string;
    plazo?: string;
    precioBase?: string;
    traduccion?: string;
    totalEstimado?: string;
    destinoCorreo?: string;
    documentoOriginalRequerido?: string;
  } | null;
  emailSentTo: string | null;
}

export const parseCaseInstructions = (rawNotes: string = '', division: ServiceDivisionId): ParsedCaseDetails => {
  if (!rawNotes) {
    return {
      customerNotes: '',
      specificDetails: null,
      apostilleDetails: null,
      emailSentTo: null,
    };
  }

  let text = rawNotes;
  let specificDetails: Record<string, any> | null = null;
  let apostilleDetails: any = null;
  let emailSentTo: string | null = null;

  // 1. Extract [Apostillado: {...}]
  const apostilleMatch = text.match(/\[Apostillado:\s*(\{.*?\})\]/);
  if (apostilleMatch) {
    try {
      apostilleDetails = JSON.parse(apostilleMatch[1]);
    } catch (e) {
      console.warn('Error parsing apostille json:', e);
    }
    text = text.replace(apostilleMatch[0], '');
  }

  // 2. Extract [Detalles específicos: {...}]
  const specificMatch = text.match(/\[Detalles específicos:\s*(\{.*?\})\]/);
  if (specificMatch) {
    try {
      const parsed = JSON.parse(specificMatch[1]);
      // Filter keys relevant to the division to eliminate accidental pollution from other services
      const relevantKeysByDivision: Record<string, string[]> = {
        'apostille': ['countryOfUse', 'issuingState', 'apostilleUrgency', 'needsTranslation', 'deliveryMethod', 'acknowledgedOriginalRequired'],
        'notary': ['numSigners', 'witnessRequired', 'hasNotaryDraft'],
        'translation': ['sourceLang', 'targetLang', 'numPages', 'translationPurpose'],
        'vital-records': ['recordType', 'stateOfRecord', 'relationship'],
        'vital_records': ['recordType', 'stateOfRecord', 'relationship'],
        'passport': ['passportType', 'passportAge', 'needsPhotos'],
        'passports': ['passportType', 'passportAge', 'needsPhotos'],
        'vehicles': ['vehicleYear', 'vehicleMake', 'vehicleModel', 'vin', 'insuranceType', 'estimatedValue'],
        'insurance': ['vehicleYear', 'vehicleMake', 'vehicleModel', 'vin', 'insuranceType', 'estimatedValue'],
        'auto_insurance': ['vehicleYear', 'vehicleMake', 'vehicleModel', 'vin', 'insuranceType', 'estimatedValue'],
      };

      const allowedKeys = relevantKeysByDivision[division] || Object.keys(parsed);
      const filtered: Record<string, any> = {};
      for (const k of allowedKeys) {
        if (parsed[k] !== undefined && parsed[k] !== '') {
          filtered[k] = parsed[k];
        }
      }
      specificDetails = Object.keys(filtered).length > 0 ? filtered : parsed;
    } catch (e) {
      console.warn('Error parsing specific json:', e);
    }
    text = text.replace(specificMatch[0], '');
  }

  // 3. Extract [Documentación enviada a ...]
  const emailMatch = text.match(/\[Documentación enviada a\s*([^\]]+)\]/);
  if (emailMatch) {
    emailSentTo = emailMatch[1].trim();
    text = text.replace(emailMatch[0], '');
  }

  const customerNotes = text.trim();

  return {
    customerNotes,
    specificDetails,
    apostilleDetails,
    emailSentTo,
  };
};

export const SPECIFIC_FIELD_LABELS: Record<string, { es: string; en: string }> = {
  countryOfUse: { es: 'País de Uso / Destino', en: 'Country of Destination' },
  issuingState: { es: 'Estado Emisor del Documento', en: 'Document Issuing State' },
  apostilleUrgency: { es: 'Urgencia del Trámite', en: 'Processing Urgency' },
  needsTranslation: { es: 'Traducción Certificada', en: 'Certified Translation' },
  deliveryMethod: { es: 'Método de Entrega', en: 'Delivery Method' },
  acknowledgedOriginalRequired: { es: 'Aceptación de Documento Físico', en: 'Original Physical Document Ack' },
  numSigners: { es: 'Número de Firmantes', en: 'Number of Signers' },
  witnessRequired: { es: 'Testigos Requeridos', en: 'Witnesses Required' },
  hasNotaryDraft: { es: 'Borrador / Minuta Lista', en: 'Draft Document Ready' },
  sourceLang: { es: 'Idioma de Origen', en: 'Source Language' },
  targetLang: { es: 'Idioma de Destino', en: 'Target Language' },
  numPages: { es: 'Número de Páginas', en: 'Number of Pages' },
  translationPurpose: { es: 'Propósito de la Traducción', en: 'Translation Purpose' },
  recordType: { es: 'Tipo de Acta / Registro', en: 'Record Type' },
  stateOfRecord: { es: 'Estado del Registro', en: 'State of Record' },
  relationship: { es: 'Parentesco / Titular', en: 'Relationship / Applicant' },
  passportType: { es: 'Tipo de Trámite', en: 'Passport Service Type' },
  passportAge: { es: 'Categoría de Edad', en: 'Age Category' },
  needsPhotos: { es: 'Fotografías de Pasaporte', en: 'Passport Photos Included' },
  vehicleYear: { es: 'Año del Vehículo', en: 'Vehicle Year' },
  vehicleMake: { es: 'Marca del Vehículo', en: 'Vehicle Make' },
  vehicleModel: { es: 'Modelo del Vehículo', en: 'Vehicle Model' },
  vin: { es: 'Número de VIN', en: 'VIN' },
  insuranceType: { es: 'Tipo de Póliza', en: 'Insurance Policy Type' },
  estimatedValue: { es: 'Valor Estimado', en: 'Estimated Value' },
};

export const formatSpecificValue = (key: string, val: any, isEs: boolean) => {
  if (typeof val === 'boolean') {
    return val ? (isEs ? 'Sí' : 'Yes') : (isEs ? 'No' : 'No');
  }
  if (key === 'apostilleUrgency') {
    if (val === 'express') return isEs ? '⚡ Express en 24 horas ($700 USD)' : '⚡ Express 24 hours ($700 USD)';
    if (val === 'fast') return isEs ? '🚀 Rápido en 1 semana ($550 USD)' : '🚀 Fast 1 week ($550 USD)';
    return isEs ? '📋 Regular 2 a 3 semanas ($150 USD)' : '📋 Regular 2 to 3 weeks ($150 USD)';
  }
  if (key === 'deliveryMethod') {
    if (val === 'pickup') return isEs ? 'Retiro presencial en oficina Houston' : 'In-person pickup at Houston office';
    if (val === 'mail') return isEs ? 'Envío postal certificado a domicilio' : 'Certified mail delivery';
  }
  if (key === 'needsTranslation') {
    return val ? (isEs ? 'Sí (+ $120 USD)' : 'Yes (+ $120 USD)') : (isEs ? 'No requerida' : 'Not required');
  }
  if (key === 'acknowledgedOriginalRequired') {
    return val ? (isEs ? '✓ Confirmado original físico' : '✓ Physical original confirmed') : (isEs ? 'Pendiente de entrega física' : 'Pending physical delivery');
  }
  return String(val);
};

export const CRM_STATUS_FLOW: { id: CrmStatus; label: { es: string; en: string }; color: string }[] = [
  { id: 'NEW', label: { es: 'Nuevo', en: 'New' }, color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'CONTACTED', label: { es: 'Contactado', en: 'Contacted' }, color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { id: 'DOCUMENT_REVIEW', label: { es: 'Revisión Documental', en: 'Document Review' }, color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'QUOTE_REQUIRED', label: { es: 'Requiere Cotización', en: 'Quote Required' }, color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'QUOTE_SENT', label: { es: 'Cotización Enviada', en: 'Quote Sent' }, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { id: 'PAYMENT_PENDING', label: { es: 'Pago Pendiente', en: 'Payment Pending' }, color: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'PAYMENT_RECEIVED', label: { es: 'Pago Recibido', en: 'Payment Received' }, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'PROCESSING', label: { es: 'En Proceso / Trámite', en: 'Processing' }, color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'READY', label: { es: 'Listo para Entrega', en: 'Ready for Pickup' }, color: 'bg-teal-100 text-teal-800 border-teal-300' },
  { id: 'COMPLETED', label: { es: 'Completado', en: 'Completed' }, color: 'bg-green-100 text-green-800 border-green-300' },
  { id: 'FOLLOW_UP', label: { es: 'Seguimiento', en: 'Follow-up' }, color: 'bg-sky-100 text-sky-800 border-sky-300' },
  { id: 'CLOSED', label: { es: 'Cerrado / Archivado', en: 'Closed' }, color: 'bg-gray-100 text-gray-800 border-gray-300' },
];

export const CrmDashboard: React.FC<CrmDashboardProps> = ({
  language,
  clients,
  onUpdateClient,
  onCreateClient,
  onDeleteClient,
  users,
  onUpdateUsers,
  onExitToPortal,
}) => {
  const isEs = language === 'es';

  // Search & Multi-Criteria Filter State
  const [filters, setFilters] = useState<CrmFilterState>({
    searchQuery: '',
    division: 'all',
    status: 'all',
    priority: 'all',
    paymentStatus: 'all',
    hasDocuments: 'all',
    language: 'all',
    dateRange: 'all',
    sortBy: 'date_desc',
  });

  const [viewMode, setViewMode] = useState<'table' | 'kanban' | 'analytics' | 'users'>('table');

  const [showMonthlyAnalytics, setShowMonthlyAnalytics] = useState<boolean>(true);
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<ClientRecord | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedStaffNote, setEditedStaffNote] = useState('');
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [newLogText, setNewLogText] = useState('');

  const handleOpenDossier = (client: ClientRecord) => {
    setSelectedClient(client);
    setShowDeleteConfirm(false);
    setIsEditingNotes(false);
    const parsed = parseCaseInstructions(client.notes, client.division);
    setEditedStaffNote(parsed.customerNotes);
  };

  const handleSaveStaffNotes = (client: ClientRecord) => {
    const parsed = parseCaseInstructions(client.notes, client.division);
    const metadataParts: string[] = [];
    if (parsed.specificDetails && Object.keys(parsed.specificDetails).length > 0) {
      metadataParts.push(`[Detalles específicos: ${JSON.stringify(parsed.specificDetails)}]`);
    }
    if (parsed.apostilleDetails) {
      metadataParts.push(`[Apostillado: ${JSON.stringify(parsed.apostilleDetails)}]`);
    }
    if (parsed.emailSentTo) {
      metadataParts.push(`[Documentación enviada a ${parsed.emailSentTo}]`);
    }

    const updatedNotes = [editedStaffNote.trim(), ...metadataParts].filter(Boolean).join(' ');
    const updatedClient: ClientRecord = {
      ...client,
      notes: updatedNotes,
      updatedAt: new Date().toISOString(),
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          author: 'Staff CRM',
          action: isEs ? 'Instrucciones y observaciones del expediente actualizadas.' : 'Case instructions and notes updated.',
        },
        ...client.activityLogs,
      ],
    };

    onUpdateClient(updatedClient);
    setSelectedClient(updatedClient);
    setIsEditingNotes(false);
  };

  // Filtering Logic
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      // 1. Text Search across name, caseNumber, phone, email, notes, service
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
        const matchesQuery = 
          fullName.includes(query) ||
          client.caseNumber.toLowerCase().includes(query) ||
          client.phone.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.serviceName.toLowerCase().includes(query) ||
          client.notes.toLowerCase().includes(query);

        if (!matchesQuery) return false;
      }

      // 2. Division filter
      if (filters.division !== 'all' && client.division !== filters.division) {
        return false;
      }

      // 3. Status filter
      if (filters.status !== 'all' && client.status !== filters.status) {
        return false;
      }

      // 4. Priority filter
      if (filters.priority !== 'all' && client.priority !== filters.priority) {
        return false;
      }

      // 5. Payment Status filter
      if (filters.paymentStatus !== 'all' && client.paymentStatus !== filters.paymentStatus) {
        return false;
      }

      // 6. Documents filter
      if (filters.hasDocuments === 'with_docs' && (!client.documents || client.documents.length === 0)) {
        return false;
      }
      if (filters.hasDocuments === 'no_docs' && client.documents && client.documents.length > 0) {
        return false;
      }
      if (filters.hasDocuments === 'pending_review' && (!client.documents || !client.documents.some((d) => d.status === 'pending'))) {
        return false;
      }

      // 7. Language filter
      if (filters.language !== 'all' && client.preferredLanguage !== filters.language) {
        return false;
      }

      // 8. Date range filter
      if (filters.dateRange !== 'all') {
        const clientDate = new Date(client.createdAt).getTime();
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        if (filters.dateRange === 'today' && now - clientDate > oneDay) {
          return false;
        }
        if (filters.dateRange === 'last_7_days' && now - clientDate > 7 * oneDay) {
          return false;
        }
        if (filters.dateRange === 'this_month' && now - clientDate > 30 * oneDay) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'date_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (filters.sortBy === 'name') {
        return a.lastName.localeCompare(b.lastName);
      }
      if (filters.sortBy === 'priority') {
        const score = { urgente: 3, alta: 2, normal: 1 };
        return score[b.priority] - score[a.priority];
      }
      return 0;
    });
  }, [clients, filters]);

  // KPIs
  const stats = useMemo(() => {
    return {
      total: clients.length,
      newRequests: clients.filter((c) => c.status === 'NEW').length,
      inReview: clients.filter((c) => c.status === 'DOCUMENT_REVIEW' || c.status === 'CONTACTED').length,
      processing: clients.filter((c) => c.status === 'PROCESSING').length,
      ready: clients.filter((c) => c.status === 'READY').length,
      completed: clients.filter((c) => c.status === 'COMPLETED').length,
    };
  }, [clients]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.division !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.priority !== 'all') count++;
    if (filters.paymentStatus !== 'all') count++;
    if (filters.hasDocuments !== 'all') count++;
    if (filters.language !== 'all') count++;
    if (filters.dateRange !== 'all') count++;
    return count;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      division: 'all',
      status: 'all',
      priority: 'all',
      paymentStatus: 'all',
      hasDocuments: 'all',
      language: 'all',
      dateRange: 'all',
      sortBy: 'date_desc',
    });
  };

  // Status advancement helper
  const handleAdvanceStatus = (client: ClientRecord, newStatus: CrmStatus) => {
    const updated: ClientRecord = {
      ...client,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          author: 'Mesa Notarial Lumiel',
          action: `Estado actualizado a: ${newStatus}`,
        },
        ...client.activityLogs,
      ],
    };
    onUpdateClient(updated);
    setSelectedClient(updated);
  };

  // Add communication log
  const handleAddLog = (client: ClientRecord) => {
    if (!newLogText.trim()) return;
    const updated: ClientRecord = {
      ...client,
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          author: 'Agente Lumiel',
          action: newLogText.trim(),
        },
        ...client.activityLogs,
      ],
      updatedAt: new Date().toISOString(),
    };
    onUpdateClient(updated);
    setSelectedClient(updated);
    setNewLogText('');
  };

  // Payment status toggle
  const handleTogglePayment = (client: ClientRecord, newPaymentStatus: PaymentStatus) => {
    const updated: ClientRecord = {
      ...client,
      paymentStatus: newPaymentStatus,
      status: newPaymentStatus === 'paid_in_full' ? 'PROCESSING' : client.status,
      updatedAt: new Date().toISOString(),
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          author: 'Centro de Pagos Lumiel',
          action: `Estado de pago actualizado a: ${newPaymentStatus.toUpperCase()}`,
        },
        ...client.activityLogs,
      ],
    };
    onUpdateClient(updated);
    setSelectedClient(updated);
  };

  // Helper function to safely format values for RFC 4180 CSV compliance
  const escapeCsvCell = (value: unknown): string => {
    if (value === null || value === undefined) {
      return '""';
    }
    const cleanString = String(value)
      // Replace hard line breaks with a space to prevent multi-line row shifting in spreadsheet parsers
      .replace(/[\r\n]+/g, ' ')
      // Escape inner double quotes by doubling them according to RFC 4180
      .replace(/"/g, '""')
      .trim();

    return `"${cleanString}"`;
  };

  // Export Customer Data Matrix to CSV
  const handleExportCSV = () => {
    // 1. Defined column headers matrix
    const headers = [
      isEs ? 'Expediente' : 'Case Number',
      isEs ? 'Nombre' : 'First Name',
      isEs ? 'Apellido' : 'Last Name',
      isEs ? 'Nombre Completo' : 'Full Name',
      isEs ? 'Teléfono' : 'Phone',
      isEs ? 'Correo Electrónico' : 'Email',
      isEs ? 'Idioma' : 'Preferred Language',
      isEs ? 'Método Contacto' : 'Contact Method',
      isEs ? 'Dirección' : 'Address',
      isEs ? 'Ciudad' : 'City',
      isEs ? 'División de Servicio' : 'Service Division',
      isEs ? 'Trámite Solicitado' : 'Service Name',
      isEs ? 'Estado del Trámite' : 'Status',
      isEs ? 'Prioridad' : 'Priority',
      isEs ? 'Estado de Pago' : 'Payment Status',
      isEs ? 'Total Cotizado ($)' : 'Quoted Amount ($)',
      isEs ? 'Asignado A' : 'Assigned To',
      isEs ? 'Entrega Estimada' : 'Estimated Delivery',
      isEs ? 'Notas / Observaciones' : 'Notes & Requirements',
      isEs ? 'Fecha Creación' : 'Created Date',
      isEs ? 'Última Actualización' : 'Last Updated Date'
    ];

    // 2. Select target dataset (filtered view if active, otherwise all clients)
    const records = filteredClients.length > 0 ? filteredClients : clients;

    // 3. Format each data point into its strictly mapped row cell
    const rows = records.map((c) => [
      c.caseNumber || '',
      c.firstName || '',
      c.lastName || '',
      `${c.firstName || ''} ${c.lastName || ''}`.trim(),
      c.phone || '',
      c.email || '',
      c.preferredLanguage === 'es' ? 'Español' : 'English',
      c.preferredContactMethod || 'phone',
      c.address || '',
      c.city || 'Houston, TX',
      c.division || '',
      c.serviceName || '',
      c.status || '',
      c.priority || '',
      c.paymentStatus || '',
      c.quote?.total !== undefined ? c.quote.total.toFixed(2) : '0.00',
      c.assignedTo || 'Sin Asignar',
      c.estimatedDelivery || '',
      c.notes || '',
      c.createdAt || '',
      c.updatedAt || ''
    ]);

    // 4. Construct well-structured CSV string using semicolon (;) delimiter and CRLF row separators
    const delimiter = ';';
    const headerRow = headers.map(escapeCsvCell).join(delimiter);
    const dataRows = rows.map((row) => row.map(escapeCsvCell).join(delimiter));

    // Prepend 'sep=;' on the very first line so Excel automatically recognizes the semicolon delimiter
    const sepDirective = `sep=${delimiter}\r\n`;
    const csvMatrix = sepDirective + [headerRow, ...dataRows].join('\r\n');

    // 5. Prepend UTF-8 BOM (\uFEFF) to guarantee Excel / spreadsheet apps render accents, ñ and symbols natively
    const UTF8_BOM = '\uFEFF';
    const blob = new Blob([UTF8_BOM + csvMatrix], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = URL.createObjectURL(blob);

    const now = new Date();
    const dateStamp = now.toISOString().split('T')[0];
    const fileName = `lumiel_matriz_clientes_${dateStamp}.csv`;

    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = blobUrl;
    downloadAnchor.setAttribute('download', fileName);
    downloadAnchor.style.display = 'none';
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();

    setTimeout(() => {
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(blobUrl);
    }, 150);
  };

  // Print client table with printer-friendly formatting
  const handlePrintTable = () => {
    // Ensure table view is active so the table is rendered
    if (viewMode !== 'table') {
      setViewMode('table');
    }
    // Close drawer and modal to ensure clean output
    setSelectedClient(null);
    setIsNewClientModalOpen(false);

    // Allow state to settle before triggering native print dialog
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DCC9A7]/60 shadow-sm print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8A9A7B]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#887D6B] uppercase">
              {isEs ? 'SISTEMA OPERATIVO DE GESTIÓN · LUMIEL OS' : 'CLIENT OPERATIONS OS · LUMIEL'}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2747] mt-1">
            {isEs ? 'Panel de Gestión de Clientes y Expedientes' : 'Client & Case Management System'}
          </h1>
          <p className="text-xs text-[#887D6B] mt-0.5">
            {isEs
              ? 'Administración centralizada de trámites notariales, apostillas, traducciones y seguimiento de clientes en Houston, TX.'
              : 'Centralized administration for notary, apostilles, certified translations and Houston client records.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {onExitToPortal && (
            <button
              onClick={onExitToPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0F2747] bg-[#F8F6F1] hover:bg-[#EAE3D8] border border-[#DCC9A7] transition-colors cursor-pointer"
              title={isEs ? 'Regresar al portal principal' : 'Return to main portal'}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C9A96B]" />
              <span className="hidden sm:inline">{isEs ? 'Portal Público' : 'Public Site'}</span>
            </button>
          )}

          {/* Toggle Analytics Chart Button */}
          <button
            onClick={() => setShowMonthlyAnalytics(!showMonthlyAnalytics)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              showMonthlyAnalytics
                ? 'bg-[#0F2747] text-white border-[#0F2747] shadow-xs'
                : 'bg-[#F8F6F1] text-[#0F2747] hover:bg-[#EAE3D8] border-[#DCC9A7]'
            }`}
            title={isEs ? 'Alternar gráfico de analítica mensual' : 'Toggle monthly analytics chart'}
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#C9A96B]" />
            <span className="hidden sm:inline">
              {isEs 
                ? (showMonthlyAnalytics ? 'Ocultar Analítica' : 'Analítica Mensual') 
                : (showMonthlyAnalytics ? 'Hide Analytics' : 'Monthly Analytics')}
            </span>
          </button>

          {/* Export to CSV Button */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0F2747] bg-[#F8F6F1] hover:bg-[#EAE3D8] border border-[#DCC9A7] transition-all cursor-pointer shadow-xs"
            title={isEs ? 'Exportar matriz de clientes a CSV (UTF-8 / Excel)' : 'Export customer data matrix to CSV (UTF-8 / Excel)'}
          >
            <Download className="w-3.5 h-3.5 text-[#C9A96B]" />
            <span className="hidden sm:inline">{isEs ? 'Exportar CSV' : 'Export CSV'}</span>
          </button>

          {/* Print Table Button */}
          <button
            onClick={handlePrintTable}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0F2747] bg-[#F8F6F1] hover:bg-[#EAE3D8] border border-[#DCC9A7] transition-all cursor-pointer shadow-xs"
            title={isEs ? 'Imprimir tabla de expedientes (formato optimizado para impresora)' : 'Print client table (printer-friendly)'}
          >
            <Printer className="w-3.5 h-3.5 text-[#C9A96B]" />
            <span className="hidden sm:inline">{isEs ? 'Imprimir' : 'Print'}</span>
          </button>

          {/* New Case Button */}
          <button
            onClick={() => setIsNewClientModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0F2747] bg-gradient-to-r from-[#C9A96B] to-[#DCC9A7] hover:from-[#bda061] hover:to-[#ceba96] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0F2747]" />
            <span>{isEs ? 'Nuevo Expediente' : 'New Client Case'}</span>
          </button>
        </div>
      </div>

      {/* KPI Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 print:hidden">
        <div className="p-3.5 bg-white rounded-xl border border-[#DCC9A7]/50 shadow-xs">
          <span className="text-[10.5px] uppercase font-bold text-[#887D6B] block">
            {isEs ? 'Total Casos' : 'Total Cases'}
          </span>
          <span className="text-2xl font-serif font-bold text-[#0F2747] mt-1 block">
            {stats.total}
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-blue-200 shadow-xs">
          <span className="text-[10.5px] uppercase font-bold text-blue-700 block">
            {isEs ? 'Nuevos' : 'New Requests'}
          </span>
          <span className="text-2xl font-serif font-bold text-blue-900 mt-1 block">
            {stats.newRequests}
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs">
          <span className="text-[10.5px] uppercase font-bold text-amber-700 block">
            {isEs ? 'En Revisión' : 'In Review'}
          </span>
          <span className="text-2xl font-serif font-bold text-amber-900 mt-1 block">
            {stats.inReview}
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-purple-200 shadow-xs">
          <span className="text-[10.5px] uppercase font-bold text-purple-700 block">
            {isEs ? 'En Trámite' : 'Processing'}
          </span>
          <span className="text-2xl font-serif font-bold text-purple-900 mt-1 block">
            {stats.processing}
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-teal-200 shadow-xs">
          <span className="text-[10.5px] uppercase font-bold text-teal-700 block">
            {isEs ? 'Listos' : 'Ready'}
          </span>
          <span className="text-2xl font-serif font-bold text-teal-900 mt-1 block">
            {stats.ready}
          </span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-xs">
          <span className="text-[10.5px] uppercase font-bold text-emerald-700 block">
            {isEs ? 'Completados' : 'Completed'}
          </span>
          <span className="text-2xl font-serif font-bold text-emerald-900 mt-1 block">
            {stats.completed}
          </span>
        </div>
      </div>

      {/* Monthly Summary Recharts Sub-Component */}
      {showMonthlyAnalytics && (
        <div className="print:hidden">
          <CrmMonthlySummaryChart clients={clients} language={language} />
        </div>
      )}

      {/* ADVANCED MULTI-CRITERIA SEARCH & FILTER ENGINE */}
      <div className="bg-white p-5 rounded-2xl border border-[#DCC9A7]/70 shadow-sm space-y-4 print:hidden">
        {/* Main Search Input & View Toggle */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887D6B]" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder={
                isEs
                  ? 'Buscar por nombre, expediente (LUM-...), teléfono, email o palabra clave...'
                  : 'Search by client name, case ID (LUM-...), phone, email, notes...'
              }
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F8F6F1] rounded-xl border border-[#DCC9A7] focus:border-[#0F2747] focus:bg-white focus:outline-hidden transition-all text-[#2E2E2E]"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* View Switcher: Table vs Pipeline vs Analytics */}
            <div className="flex items-center bg-[#F8F6F1] p-1 rounded-xl border border-[#DCC9A7]/50">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-[#0F2747] text-white shadow-xs' : 'text-[#887D6B]'
                }`}
              >
                {isEs ? 'Tabla' : 'Table'}
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  viewMode === 'kanban' ? 'bg-[#0F2747] text-white shadow-xs' : 'text-[#887D6B]'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Pipeline</span>
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  viewMode === 'analytics' ? 'bg-[#0F2747] text-white shadow-xs' : 'text-[#887D6B]'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>{isEs ? 'Analítica' : 'Analytics'}</span>
              </button>
              <button
                onClick={() => setViewMode('users')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  viewMode === 'users' ? 'bg-[#0F2747] text-white shadow-xs' : 'text-[#887D6B]'
                }`}
              >
                <UsersIcon className="w-3 h-3" />
                <span>{isEs ? 'Usuarios' : 'Users'}</span>
              </button>
            </div>


            {/* Reset Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isEs ? 'Limpiar filtros' : 'Reset filters'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi-Criteria Selectors Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 border-t border-[#F8F6F1]">
          {/* Criterion 1: Division */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#887D6B] mb-1">
              {isEs ? 'División' : 'Division'}
            </label>
            <select
              value={filters.division}
              onChange={(e) => setFilters({ ...filters, division: e.target.value as any })}
              className="w-full text-xs p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]/60 text-[#0F2747] font-medium"
            >
              <option value="all">{isEs ? 'Todas las Divisiones' : 'All Divisions'}</option>
              {SERVICE_DIVISIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Criterion 2: Status */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#887D6B] mb-1">
              {isEs ? 'Estado CRM' : 'CRM Status'}
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
              className="w-full text-xs p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]/60 text-[#0F2747] font-medium"
            >
              <option value="all">{isEs ? 'Todos los Estados' : 'All Statuses'}</option>
              {CRM_STATUS_FLOW.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Criterion 3: Priority */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#887D6B] mb-1">
              {isEs ? 'Prioridad' : 'Priority'}
            </label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value as any })}
              className="w-full text-xs p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]/60 text-[#0F2747] font-medium"
            >
              <option value="all">{isEs ? 'Todas' : 'All'}</option>
              <option value="urgente">🔥 {isEs ? 'Urgente' : 'Urgent'}</option>
              <option value="alta">⚡ {isEs ? 'Alta' : 'High'}</option>
              <option value="normal">⚪ {isEs ? 'Normal' : 'Normal'}</option>
            </select>
          </div>

          {/* Criterion 4: Payment Status */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#887D6B] mb-1">
              {isEs ? 'Estado de Pago' : 'Payment Status'}
            </label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value as any })}
              className="w-full text-xs p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]/60 text-[#0F2747] font-medium"
            >
              <option value="all">{isEs ? 'Todos los Pagos' : 'All Payments'}</option>
              <option value="pending">{isEs ? 'Pendiente' : 'Pending'}</option>
              <option value="paid_in_full">{isEs ? 'Pagado Total' : 'Paid in Full'}</option>
              <option value="deposit_paid">{isEs ? 'Anticipo Pagado' : 'Deposit Paid'}</option>
              <option value="quote_sent">{isEs ? 'Cotización Enviada' : 'Quote Sent'}</option>
            </select>
          </div>

          {/* Criterion 5: Documents Status */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#887D6B] mb-1">
              {isEs ? 'Documentos' : 'Documents'}
            </label>
            <select
              value={filters.hasDocuments}
              onChange={(e) => setFilters({ ...filters, hasDocuments: e.target.value as any })}
              className="w-full text-xs p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]/60 text-[#0F2747] font-medium"
            >
              <option value="all">{isEs ? 'Cualquier estado' : 'Any state'}</option>
              <option value="with_docs">{isEs ? 'Con Archivos' : 'With Files'}</option>
              <option value="pending_review">{isEs ? 'En Revisión' : 'Pending Review'}</option>
              <option value="no_docs">{isEs ? 'Sin Archivos' : 'No Files'}</option>
            </select>
          </div>

          {/* Criterion 6: Order / Sort */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#887D6B] mb-1">
              {isEs ? 'Ordenar Por' : 'Sort By'}
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="w-full text-xs p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]/60 text-[#0F2747] font-medium"
            >
              <option value="date_desc">{isEs ? 'Más Recientes' : 'Newest First'}</option>
              <option value="date_asc">{isEs ? 'Más Antiguos' : 'Oldest First'}</option>
              <option value="priority">{isEs ? 'Mayor Prioridad' : 'Highest Priority'}</option>
              <option value="name">{isEs ? 'Nombre A-Z' : 'Client Name A-Z'}</option>
            </select>
          </div>
        </div>

        {/* Results summary bar with active chips */}
        <div className="flex items-center justify-between text-xs text-[#887D6B] pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              {isEs 
                ? `Mostrando ${filteredClients.length} de ${clients.length} registros`
                : `Showing ${filteredClients.length} of ${clients.length} records`}
            </span>
            {filters.division !== 'all' && (
              <span className="px-2 py-0.5 bg-[#0F2747]/10 text-[#0F2747] rounded-md text-[11px] font-medium flex items-center gap-1">
                <span>Div: {filters.division}</span>
                <button onClick={() => setFilters({ ...filters, division: 'all' })}>×</button>
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="px-2 py-0.5 bg-[#0F2747]/10 text-[#0F2747] rounded-md text-[11px] font-medium flex items-center gap-1">
                <span>Est: {filters.status}</span>
                <button onClick={() => setFilters({ ...filters, status: 'all' })}>×</button>
              </span>
            )}
            {filters.priority !== 'all' && (
              <span className="px-2 py-0.5 bg-[#0F2747]/10 text-[#0F2747] rounded-md text-[11px] font-medium flex items-center gap-1">
                <span>Prio: {filters.priority}</span>
                <button onClick={() => setFilters({ ...filters, priority: 'all' })}>×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          {/* Printable Official Header (Omitted on screen, visible only when printed) */}
          <div className="hidden print:block pb-3 mb-2 border-b-2 border-black">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xl font-bold font-serif tracking-wide text-black uppercase">
                  Multiservicios Lumiel
                </div>
                <p className="text-xs text-gray-700">
                  550 Greens Pkwy Ste 212B, Houston, TX 77067 • Tel: (409) 800-3993 • multiservicioslumielayi@gmail.com
                </p>
                <h2 className="text-sm font-semibold text-black mt-1 uppercase tracking-wider">
                  {isEs ? 'Reporte Oficial de Expedientes y Clientes' : 'Official Case & Client Records Report'}
                </h2>
              </div>
              <div className="text-right text-xs text-gray-800 space-y-0.5">
                <p><strong>{isEs ? 'Fecha de Emisión:' : 'Issued Date:'}</strong> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>{isEs ? 'Total Registros:' : 'Total Records:'}</strong> {filteredClients.length}</p>
                <p className="text-[10px] text-gray-500 font-mono">Confidencial · Uso Exclusivo Mesa Notarial</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#DCC9A7]/70 shadow-sm overflow-hidden print:border-none print:shadow-none print:rounded-none">
            <div className="overflow-x-auto print:overflow-visible">
              <table className="w-full text-left border-collapse print:text-[11px] print:w-full">
                <thead>
                  <tr className="bg-[#0F2747] text-[#DCC9A7] text-[11px] uppercase tracking-wider font-semibold print:bg-gray-100 print:text-black print:border-b-2 print:border-black">
                    <th className="py-3 px-4 print:py-2 print:px-2">{isEs ? 'Expediente' : 'Case'}</th>
                    <th className="py-3 px-4 print:py-2 print:px-2">{isEs ? 'Cliente' : 'Client'}</th>
                    <th className="py-3 px-4 print:py-2 print:px-2">{isEs ? 'División / Trámite' : 'Division / Service'}</th>
                    <th className="py-3 px-4 print:py-2 print:px-2">{isEs ? 'Estado CRM' : 'CRM Status'}</th>
                    <th className="py-3 px-4 print:py-2 print:px-2">{isEs ? 'Pago' : 'Payment'}</th>
                    <th className="py-3 px-4 print:py-2 print:px-2">{isEs ? 'Docs' : 'Docs'}</th>
                    <th className="py-3 px-4 print:py-2 print:px-2">{isEs ? 'Fecha' : 'Date'}</th>
                    <th className="py-3 px-4 text-right print:hidden">{isEs ? 'Acción' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F6F1] print:divide-gray-300 text-xs text-[#2E2E2E]">
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-[#887D6B]">
                        <AlertCircle className="w-8 h-8 text-[#C9A96B] mx-auto mb-2" />
                        <p className="font-semibold text-sm text-[#0F2747]">
                          {isEs ? 'No se encontraron expedientes con los criterios seleccionados' : 'No records match the selected criteria'}
                        </p>
                        <button
                          onClick={handleResetFilters}
                          className="mt-2 text-xs text-[#0F2747] underline font-medium"
                        >
                          {isEs ? 'Restablecer todos los filtros' : 'Reset all filters'}
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => {
                      const statusObj = CRM_STATUS_FLOW.find((s) => s.id === client.status) || CRM_STATUS_FLOW[0];
                      return (
                        <tr
                          key={client.id}
                          className="hover:bg-[#F8F6F1]/80 transition-colors cursor-pointer group print:hover:bg-transparent print:border-b print:border-gray-200"
                          onClick={() => handleOpenDossier(client)}
                        >
                          {/* Case Number & Priority */}
                          <td className="py-3.5 px-4 print:py-2 print:px-2">
                            <div className="font-mono font-bold text-[#0F2747] text-xs print:text-black">
                              {client.caseNumber}
                            </div>
                            <div className="text-[10px] mt-0.5 print:text-[9px]">
                              {client.priority === 'urgente' && (
                                <span className="text-red-700 font-bold print:text-black">⚠️ {isEs ? 'URGENTE' : 'URGENT'}</span>
                              )}
                              {client.priority === 'alta' && (
                                <span className="text-amber-700 font-semibold print:text-black">⚡ {isEs ? 'Alta' : 'High'}</span>
                              )}
                              {client.priority === 'normal' && (
                                <span className="text-[#887D6B] print:text-gray-600">{isEs ? 'Normal' : 'Normal'}</span>
                              )}
                            </div>
                          </td>

                          {/* Client details */}
                          <td className="py-3.5 px-4 print:py-2 print:px-2">
                            <div className="font-bold text-[#0F2747] print:text-black">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="text-[11px] text-[#887D6B] font-mono print:text-gray-800">
                              {client.phone}
                            </div>
                            <div className="text-[10px] text-gray-400 truncate max-w-[150px] print:text-gray-600">
                              {client.email}
                            </div>
                          </td>

                          {/* Division / Service */}
                          <td className="py-3.5 px-4 max-w-[200px] print:py-2 print:px-2">
                            <div className="font-semibold text-[#0F2747] truncate print:text-black">
                              {client.serviceName}
                            </div>
                            <div className="text-[10px] uppercase font-mono tracking-wider text-[#887D6B] print:text-gray-600">
                              {client.division}
                            </div>
                          </td>

                          {/* Status badge */}
                          <td className="py-3.5 px-4 print:py-2 print:px-2">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusObj.color} print:border-gray-400 print:bg-transparent print:text-black print:px-1.5 print:py-0.5 print:text-[10px]`}
                            >
                              {statusObj.label[language]}
                            </span>
                          </td>

                          {/* Payment */}
                          <td className="py-3.5 px-4 print:py-2 print:px-2">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                client.paymentStatus === 'paid_in_full'
                                  ? 'bg-green-100 text-green-800'
                                  : client.paymentStatus === 'deposit_paid'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-100 text-gray-700'
                              } print:bg-white print:border print:border-gray-400 print:text-black`}
                            >
                              {client.paymentStatus === 'paid_in_full' && (isEs ? 'Liquidado' : 'Paid')}
                              {client.paymentStatus === 'deposit_paid' && (isEs ? 'Anticipo' : 'Deposit')}
                              {client.paymentStatus === 'pending' && (isEs ? 'Pendiente' : 'Pending')}
                              {client.paymentStatus === 'quote_sent' && (isEs ? 'Cotizado' : 'Quoted')}
                            </span>
                            {client.quote && (
                              <div className="text-[10.5px] font-mono text-[#887D6B] mt-0.5 print:text-black">
                                ${client.quote.total} USD
                              </div>
                            )}
                          </td>

                          {/* Documents Count */}
                          <td className="py-3.5 px-4 print:py-2 print:px-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0F2747] print:text-black">
                              <FileText className="w-3.5 h-3.5 text-[#C9A96B] print:hidden" />
                              <span>{client.documents?.length || 0} docs</span>
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-[11px] text-[#887D6B] whitespace-nowrap print:py-2 print:px-2 print:text-black">
                            {new Date(client.createdAt).toLocaleDateString()}
                          </td>

                          {/* Action (Hidden in Print) */}
                          <td className="py-3.5 px-4 text-right print:hidden">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDossier(client);
                                }}
                                className="p-1.5 rounded-lg bg-[#F8F6F1] text-[#0F2747] hover:bg-[#0F2747] hover:text-white transition-colors cursor-pointer"
                                title={isEs ? 'Ver expediente completo' : 'View dossier'}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setClientToDelete(client);
                                }}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                                title={isEs ? 'Eliminar expediente' : 'Delete case'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Printable Official Footer */}
            <div className="hidden print:flex items-center justify-between text-[10px] text-gray-600 pt-4 border-t border-gray-400 mt-4">
              <span>Multiservicios Lumiel · Documentos y Notaría en Houston, TX</span>
              <span>Firma Autorizada: ___________________________</span>
            </div>
          </div>
        </div>
      )}

      {/* PIPELINE / KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4 print:hidden">
          <div className="flex gap-4 min-w-[1200px]">
            {CRM_STATUS_FLOW.slice(0, 8).map((col) => {
              const colClients = filteredClients.filter((c) => c.status === col.id);
              return (
                <div
                  key={col.id}
                  className="w-72 flex-shrink-0 bg-[#F8F6F1] rounded-2xl border border-[#DCC9A7]/60 p-3 flex flex-col max-h-[650px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DCC9A7]/40">
                    <span className="text-xs font-bold text-[#0F2747]">
                      {col.label[language]}
                    </span>
                    <span className="text-[11px] font-mono font-semibold bg-white px-2 py-0.5 rounded-full text-[#887D6B] border">
                      {colClients.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                    {colClients.map((client) => (
                      <div
                        key={client.id}
                        onClick={() => handleOpenDossier(client)}
                        className="p-3 bg-white rounded-xl border border-[#DCC9A7]/50 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-mono text-[11px] font-bold text-[#0F2747]">
                            {client.caseNumber}
                          </span>
                          {client.priority === 'urgente' && (
                            <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                              URGENTE
                            </span>
                          )}
                        </div>

                        <div className="font-bold text-xs text-[#0F2747] group-hover:text-[#C9A96B] transition-colors">
                          {client.firstName} {client.lastName}
                        </div>

                        <div className="text-[11px] text-[#887D6B] line-clamp-1 mt-0.5">
                          {client.serviceName}
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-[#887D6B]">
                          <span className="font-mono">{client.phone}</span>
                          <span className="flex items-center gap-1 font-semibold text-[#0F2747]">
                            <FileText className="w-3 h-3 text-[#C9A96B]" />
                            {client.documents?.length || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DEDICATED ANALYTICS DEEP DIVE VIEW */}
      {viewMode === 'analytics' && (
        <div className="space-y-6 print:hidden">
          <div className="bg-white rounded-2xl border border-[#DCC9A7]/70 p-6 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#0F2747] mb-2">
              {isEs ? 'Rendimiento y Balance por División Operativa' : 'Performance Breakdown by Service Division'}
            </h3>
            <p className="text-xs text-[#887D6B] mb-5">
              {isEs
                ? 'Monitoreo de carga de trabajo, tiempos de procesamiento y concentración de volumen por cada una de las 7 divisiones.'
                : 'Workload distribution, processing cycles, and intake volume concentration across all 7 divisions.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {SERVICE_DIVISIONS.map((division) => {
                const divClients = clients.filter((c) => c.division === division.id);
                const activeCases = divClients.filter((c) => c.status !== 'COMPLETED' && c.status !== 'CLOSED').length;
                const completedCases = divClients.filter((c) => c.status === 'COMPLETED').length;
                const totalIncome = divClients.reduce((sum, c) => sum + (c.quote?.total || 0), 0);

                return (
                  <div
                    key={division.id}
                    className="p-4 rounded-xl bg-[#F8F6F1] border border-[#DCC9A7]/60 hover:border-[#0F2747] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif font-bold text-sm text-[#0F2747]">
                          {division.title[language]}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#C9A96B] bg-white px-2 py-0.5 rounded-md border border-[#DCC9A7]">
                          {divClients.length} {isEs ? 'casos' : 'cases'}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-[#887D6B] mt-3">
                        <div className="flex justify-between">
                          <span>{isEs ? 'Casos Activos:' : 'Active Cases:'}</span>
                          <span className="font-mono font-bold text-[#0F2747]">{activeCases}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isEs ? 'Completados:' : 'Completed:'}</span>
                          <span className="font-mono font-bold text-emerald-700">{completedCases}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isEs ? 'Volumen Cotizado:' : 'Total Quoted:'}</span>
                          <span className="font-mono font-bold text-[#0F2747]">${totalIncome.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setFilters({ ...filters, division: division.id });
                        setViewMode('table');
                      }}
                      className="mt-4 pt-2.5 border-t border-[#DCC9A7]/40 text-left text-[11px] font-bold text-[#0F2747] hover:text-[#C9A96B] flex items-center justify-between cursor-pointer"
                    >
                      <span>{isEs ? 'Filtrar casos en tabla' : 'View records in table'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED USERS & ACCESS MANAGEMENT VIEW (Request 6) */}
      {viewMode === 'users' && (
        <div className="print:hidden">
          <CrmUserManager
            language={language}
            users={users}
            onUsersChange={onUpdateUsers}
          />
        </div>
      )}


      {/* CLIENT DOSSIER DETAIL MODAL / DRAWER (Section 22 & 23) */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200 print:hidden">
          <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#DCC9A7] overflow-hidden my-auto h-[95vh] max-h-[96vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#0F2747] text-white px-6 py-4 flex items-center justify-between border-b border-[#C9A96B]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#16355C] border border-[#C9A96B]/40 flex items-center justify-center font-serif font-bold text-[#DCC9A7]">
                  {selectedClient.firstName.charAt(0)}{selectedClient.lastName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#C9A96B]">
                      {selectedClient.caseNumber}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-xs uppercase tracking-wider text-[#DCC9A7]">
                      {selectedClient.division}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F6F1]">
                    {selectedClient.firstName} {selectedClient.lastName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 hover:text-white border border-rose-400/30 flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer"
                  title={isEs ? 'Eliminar expediente' : 'Delete case'}
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                  <span className="hidden sm:inline">{isEs ? 'Eliminar Expediente' : 'Delete Case'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedClient(null);
                    setShowDeleteConfirm(false);
                    setIsEditingNotes(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stepper Status Bar (Blueprint Section 21) */}
            <div className="bg-[#F8F6F1] px-6 py-3 border-b border-[#DCC9A7]/50 overflow-x-auto">
              <div className="text-[10.5px] uppercase font-bold text-[#887D6B] mb-2 flex items-center justify-between">
                <span>{isEs ? 'Flujo de Estado del Trámite (Haga clic para avanzar):' : 'Case Lifecycle Status (Click to advance):'}</span>
                <span className="font-mono text-[#0F2747]">{selectedClient.status}</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-[700px]">
                {CRM_STATUS_FLOW.map((s, idx) => {
                  const isCurrent = selectedClient.status === s.id;
                  const currentIndex = CRM_STATUS_FLOW.findIndex((item) => item.id === selectedClient.status);
                  const isPast = idx < currentIndex;

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleAdvanceStatus(selectedClient, s.id)}
                      className={`px-2.5 py-1 text-[10.5px] font-semibold rounded-lg transition-all border ${
                        isCurrent
                          ? 'bg-[#0F2747] text-white border-[#0F2747] shadow-sm ring-2 ring-[#C9A96B]'
                          : isPast
                          ? 'bg-[#8A9A7B]/20 text-[#2E2E2E] border-[#8A9A7B]/40 hover:bg-[#8A9A7B]/30'
                          : 'bg-white text-[#887D6B] border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {s.label[language]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Body with 2-Column Tabs */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Client Info & Documents Vault */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Contact Card & Quick Communication */}
                  <div className="p-4 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/60 space-y-3">
                    <span className="text-xs font-bold text-[#0F2747] uppercase tracking-wider block">
                      {isEs ? 'Información de Contacto & Canales Directos' : 'Contact Details & Direct Actions'}
                    </span>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#887D6B] block">{isEs ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}:</span>
                        <span className="font-semibold text-[#0F2747] font-mono">{selectedClient.phone}</span>
                      </div>
                      <div>
                        <span className="text-[#887D6B] block">{isEs ? 'Correo' : 'Email'}:</span>
                        <span className="font-semibold text-[#0F2747] truncate block">{selectedClient.email}</span>
                      </div>
                      <div>
                        <span className="text-[#887D6B] block">{isEs ? 'Dirección' : 'Address'}:</span>
                        <span className="font-medium text-[#2E2E2E]">{selectedClient.address || 'Houston, TX'}</span>
                      </div>
                      <div>
                        <span className="text-[#887D6B] block">{isEs ? 'Idioma Preferido' : 'Preferred Language'}:</span>
                        <span className="font-medium text-[#2E2E2E] uppercase">{selectedClient.preferredLanguage}</span>
                      </div>
                    </div>

                    {/* Direct Contact Buttons */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      <a
                        href={`tel:${selectedClient.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F2747] text-white rounded-lg text-xs font-semibold hover:bg-[#16355C]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C9A96B]" />
                        <span>{isEs ? 'Llamar' : 'Call'}</span>
                      </a>
                      <a
                        href={`https://wa.me/${selectedClient.phone.replace(/[^0-9]/g, '')}?text=Estimado%20${encodeURIComponent(selectedClient.firstName)},%20le%20escribimos%20de%20Multiservicios%20Lumiel%20sobre%20su%20expediente%20${selectedClient.caseNumber}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8A9A7B] text-white rounded-lg text-xs font-semibold hover:bg-[#778669]"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:${selectedClient.email}?subject=Expediente%20${selectedClient.caseNumber}%20-%20Multiservicios%20Lumiel`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0F2747] border border-[#DCC9A7] rounded-lg text-xs font-semibold hover:bg-gray-50"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#887D6B]" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>

                  {/* Document Vault (Blueprint Section 17 & 18) */}
                  <div className="p-4 bg-white rounded-xl border border-[#DCC9A7]/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F2747] uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#C9A96B]" />
                        <span>{isEs ? 'Bóveda de Documentos Protegida' : 'Secure Document Vault'}</span>
                      </span>
                      <span className="text-[10.5px] font-mono text-[#8A9A7B] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {isEs ? 'Cifrado Activo' : 'Encrypted'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {selectedClient.documents && selectedClient.documents.length > 0 ? (
                        selectedClient.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="p-2.5 rounded-lg bg-[#F8F6F1] border border-[#DCC9A7]/50 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#0F2747]" />
                              <div>
                                <span className="font-semibold text-[#0F2747] block truncate max-w-[220px]">
                                  {doc.name}
                                </span>
                                <span className="text-[10px] text-[#887D6B] font-mono">
                                  {doc.size} · {doc.uploadedAt} ·{' '}
                                  <span className={doc.status === 'verified' ? 'text-green-600 font-bold' : 'text-amber-600'}>
                                    {doc.status === 'verified' ? '✓ Verificado' : 'Pendiente'}
                                  </span>
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                const updatedDocs = selectedClient.documents.map((d) =>
                                  d.id === doc.id
                                    ? { ...d, status: (d.status === 'verified' ? 'pending' : 'verified') as any }
                                    : d
                                );
                                const updated = { ...selectedClient, documents: updatedDocs };
                                onUpdateClient(updated);
                                setSelectedClient(updated);
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                                doc.status === 'verified'
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : 'bg-[#DCC9A7] text-[#0F2747] border-[#C9A96B]'
                              }`}
                            >
                              {doc.status === 'verified' ? (isEs ? 'Verificado' : 'Verified') : (isEs ? 'Aprobar' : 'Approve')}
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="py-4 text-center text-xs text-[#887D6B] bg-[#F8F6F1] rounded-lg border border-dashed border-[#DCC9A7]">
                          {isEs ? 'No se han adjuntado documentos aún' : 'No documents attached yet'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Repaired Notes & Specific Details (Prompt 1.c) */}
                  {(() => {
                    const parsedNotes = parseCaseInstructions(selectedClient.notes, selectedClient.division);
                    const isApostille = selectedClient.division === 'apostille' || !!parsedNotes.apostilleDetails;

                    return (
                      <div className="p-4 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/60 space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0F2747] text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-[#C9A96B]" />
                            <span>{isEs ? 'Instrucciones y Observaciones del Caso' : 'Case Notes & Instructions'}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              if (!isEditingNotes) {
                                setEditedStaffNote(parsedNotes.customerNotes);
                              }
                              setIsEditingNotes(!isEditingNotes);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-white hover:bg-gray-50 text-[#0F2747] border border-[#DCC9A7] transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3 text-[#C9A96B]" />
                            <span>{isEditingNotes ? (isEs ? 'Cancelar' : 'Cancel') : (isEs ? 'Editar / Añadir nota' : 'Edit notes')}</span>
                          </button>
                        </div>

                        {/* Customer Notes / Staff Editable Form */}
                        {isEditingNotes ? (
                          <div className="bg-white p-3 rounded-lg border border-[#C9A96B] space-y-2">
                            <label className="text-[10.5px] font-bold uppercase text-[#887D6B] block">
                              {isEs ? 'Editar Observaciones e Instrucciones Internas:' : 'Edit Notes & Internal Instructions:'}
                            </label>
                            <textarea
                              value={editedStaffNote}
                              onChange={(e) => setEditedStaffNote(e.target.value)}
                              rows={3}
                              className="w-full text-xs p-2 rounded-lg border border-[#DCC9A7] focus:outline-none focus:ring-1 focus:ring-[#0F2747] bg-[#F8F6F1]/50 text-[#2E2E2E]"
                              placeholder={isEs ? 'Escriba notas internas o instrucciones del cliente...' : 'Enter client instructions or internal remarks...'}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingNotes(false)}
                                className="px-3 py-1 rounded-md text-[11px] font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer"
                              >
                                {isEs ? 'Cancelar' : 'Cancel'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveStaffNotes(selectedClient)}
                                className="px-3 py-1 rounded-md text-[11px] font-bold bg-[#0F2747] hover:bg-[#16355C] text-white cursor-pointer shadow-xs"
                              >
                                {isEs ? 'Guardar Cambios' : 'Save Notes'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white p-3 rounded-lg border border-[#DCC9A7]/50 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#887D6B] block">
                              {isEs ? 'Observaciones Registradas por el Solicitante:' : 'Applicant Case Remarks:'}
                            </span>
                            <p className="text-xs text-[#2E2E2E] leading-relaxed">
                              {parsedNotes.customerNotes || (isEs ? 'Sin observaciones adicionales registradas por el cliente.' : 'No additional applicant remarks.')}
                            </p>
                          </div>
                        )}

                        {/* Resumen Oficial de Apostillado (Si aplica) */}
                        {isApostille && (
                          <div className="p-3.5 bg-gradient-to-br from-[#0F2747]/5 to-[#C9A96B]/10 rounded-xl border border-[#C9A96B]/50 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#0F2747] uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#C9A96B]" />
                                <span>{isEs ? 'Resumen Oficial de Apostillado & Costos' : 'Official Apostille Summary & Rates'}</span>
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0F2747] text-[#DCC9A7] font-semibold">
                                {parsedNotes.apostilleDetails?.modalidad || (selectedClient.priority === 'urgente' ? 'Express 24h' : 'Trámite Regular')}
                              </span>
                            </div>

                            {/* Tarifa y tiempos oficiales */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                              <div className="p-2 rounded-lg bg-white border border-[#DCC9A7]/50">
                                <span className="text-[10px] text-[#887D6B] block font-medium">{isEs ? 'Modalidad' : 'Mode'}</span>
                                <span className="font-bold text-[#0F2747] text-[11px] truncate block">
                                  {parsedNotes.apostilleDetails?.modalidad || (selectedClient.priority === 'urgente' ? 'Express en 24h' : 'Regular 2-3 semanas')}
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-white border border-[#DCC9A7]/50">
                                <span className="text-[10px] text-[#887D6B] block font-medium flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-[#C9A96B]" />
                                  <span>{isEs ? 'Plazo' : 'Turnaround'}</span>
                                </span>
                                <span className="font-bold text-[#0F2747] text-[11px]">
                                  {parsedNotes.apostilleDetails?.plazo || (selectedClient.priority === 'urgente' ? '24 horas' : '2 a 3 semanas')}
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-white border border-[#DCC9A7]/50">
                                <span className="text-[10px] text-[#887D6B] block font-medium">{isEs ? 'Traducción' : 'Translation'}</span>
                                <span className="font-semibold text-[#0F2747] text-[11px]">
                                  {parsedNotes.apostilleDetails?.traduccion || 'No requerida'}
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-white border border-[#C9A96B] shadow-2xs">
                                <span className="text-[10px] text-[#887D6B] block font-medium">{isEs ? 'Total Estimado' : 'Est. Total'}</span>
                                <span className="font-bold font-serif text-[#0F2747] text-xs">
                                  {parsedNotes.apostilleDetails?.totalEstimado || (selectedClient.priority === 'urgente' ? '$700 USD' : '$150 USD')}
                                </span>
                              </div>
                            </div>

                            {/* #Nota Indispensable: Documento Físico Original */}
                            <div className="p-3 bg-amber-50/95 border border-amber-300 rounded-xl space-y-1.5 text-amber-950">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-[11px] text-amber-950 block leading-snug">
                                    #Nota: Una fotografía o copia del documento no es suficiente para realizar el apostillado. Es necesario recibir el documento original antes de iniciar el trámite.
                                  </span>
                                  <p className="text-[10.5px] text-amber-900/90 leading-relaxed mt-1">
                                    Para realizar cualquier trámite de apostillado, es indispensable contar con el documento original, ya que el proceso se realiza de manera presencial. El adjuntar una imagen o PDF del documento únicamente es para agilizar el trámite mientras llegan los documentos originales.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Specific parameters (Cleaned & Filtered) */}
                        {parsedNotes.specificDetails && Object.keys(parsedNotes.specificDetails).length > 0 && (
                          <div className="bg-white p-3 rounded-lg border border-[#DCC9A7]/50 space-y-2">
                            <span className="text-[10px] uppercase font-bold text-[#0F2747] block tracking-wide">
                              {isEs ? 'Detalles Específicos del Trámite:' : 'Specific Case Parameters:'}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {Object.entries(parsedNotes.specificDetails).map(([key, val]) => {
                                const label = SPECIFIC_FIELD_LABELS[key]?.[language] || key;
                                const formatted = formatSpecificValue(key, val, isEs);
                                return (
                                  <div key={key} className="p-2 rounded-md bg-[#F8F6F1]/80 border border-[#DCC9A7]/40 flex items-start justify-between gap-2">
                                    <span className="text-[10.5px] text-[#887D6B] font-medium block">{label}:</span>
                                    <span className="font-semibold text-[#0F2747] text-[11px] text-right">{formatted}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Canal oficial de documentación y correo */}
                        <div className="p-3 bg-sky-50/90 border border-sky-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-950">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-sky-700 shrink-0" />
                            <div>
                              <span className="font-bold block text-[11px]">
                                {isEs ? 'Toda documentación canalizada al correo oficial:' : 'All documentation routed to official email:'}
                              </span>
                              <span className="font-mono text-sky-800 text-[10.5px]">
                                {parsedNotes.emailSentTo || 'multiservicioslumielayi@gmail.com'}
                              </span>
                            </div>
                          </div>
                          <a
                            href={`mailto:${parsedNotes.emailSentTo || 'multiservicioslumielayi@gmail.com'}?subject=Expediente%20${selectedClient.caseNumber}%20-%20${encodeURIComponent(selectedClient.firstName + ' ' + selectedClient.lastName)}`}
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#0F2747] hover:bg-[#16355C] text-white rounded-lg text-[10.5px] font-semibold transition-colors cursor-pointer self-start sm:self-auto"
                          >
                            <span>{isEs ? 'Abrir Correo' : 'Compose'}</span>
                            <ExternalLink className="w-3 h-3 text-[#C9A96B]" />
                          </a>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Right Column: Quote & Payment Center + Activity Log */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Quote & Payment Box (Blueprint Section 23) */}
                  <div className="p-4 bg-white rounded-xl border border-[#C9A96B] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F2747] uppercase tracking-wider flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-[#C9A96B]" />
                        <span>{isEs ? 'Centro de Pagos y Cotización' : 'Quote & Payment Center'}</span>
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          selectedClient.paymentStatus === 'paid_in_full'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {selectedClient.paymentStatus.toUpperCase()}
                      </span>
                    </div>

                    {selectedClient.quote ? (
                      <div className="space-y-2 text-xs">
                        <div className="text-[11px] font-mono text-[#887D6B] flex justify-between border-b pb-1">
                          <span>{selectedClient.quote.quoteNumber}</span>
                          <span>{selectedClient.quote.createdAt}</span>
                        </div>
                        {selectedClient.quote.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs py-0.5">
                            <span className="text-[#2E2E2E] truncate max-w-[180px]">{item.description}</span>
                            <span className="font-mono text-[#0F2747]">${item.unitPrice * item.quantity} USD</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-[#DCC9A7]/50 flex justify-between font-bold text-sm text-[#0F2747]">
                          <span>Total:</span>
                          <span className="font-serif">${selectedClient.quote.total} USD</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-[#887D6B] italic py-2">
                        {isEs ? 'No se ha generado cotización formal aún.' : 'No formal quote generated yet.'}
                      </div>
                    )}

                    {/* Payment Action Buttons */}
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => handleTogglePayment(selectedClient, 'paid_in_full')}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-colors cursor-pointer"
                      >
                        ✓ {isEs ? 'Marcar Pagado' : 'Mark Paid'}
                      </button>
                      <button
                        onClick={() => handleTogglePayment(selectedClient, 'deposit_paid')}
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-[#DCC9A7] hover:bg-[#c9b48c] text-[#0F2747] transition-colors cursor-pointer"
                      >
                        {isEs ? 'Registrar Anticipo' : 'Record Deposit'}
                      </button>
                    </div>
                  </div>

                  {/* Activity History & Communications Timeline (Blueprint Section 22) */}
                  <div className="p-4 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/60 space-y-3">
                    <span className="text-xs font-bold text-[#0F2747] uppercase tracking-wider block">
                      {isEs ? 'Bitácora de Actividades y Auditoría' : 'Audit Trail & Activity Log'}
                    </span>

                    {/* New Note Form */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newLogText}
                        onChange={(e) => setNewLogText(e.target.value)}
                        placeholder={isEs ? 'Registrar llamada, nota interna...' : 'Add log note or call summary...'}
                        className="flex-1 text-xs p-2 bg-white rounded-lg border border-[#DCC9A7]"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddLog(selectedClient)}
                      />
                      <button
                        onClick={() => handleAddLog(selectedClient)}
                        className="p-2 bg-[#0F2747] text-white rounded-lg hover:bg-[#16355C]"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Timeline entries */}
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedClient.activityLogs.map((log) => (
                        <div key={log.id} className="text-[11px] p-2 bg-white rounded-lg border border-[#DCC9A7]/40">
                          <div className="flex justify-between font-mono text-[9.5px] text-[#887D6B] mb-0.5">
                            <span className="font-bold text-[#0F2747]">{log.author}</span>
                            <span>{log.timestamp}</span>
                          </div>
                          <p className="text-[#2E2E2E]">{log.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#F8F6F1] px-6 py-3 border-t border-[#DCC9A7]/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Eliminar Expediente' : 'Delete Case'}</span>
                </button>
                <span className="text-xs text-[#887D6B] font-mono hidden md:inline">
                  {isEs ? 'Responsable' : 'Assigned to'}: {selectedClient.assignedTo}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedClient(null);
                  setShowDeleteConfirm(false);
                  setIsEditingNotes(false);
                }}
                className="px-5 py-2 bg-[#0F2747] text-white rounded-xl text-xs font-semibold hover:bg-[#16355C] transition-colors cursor-pointer shadow-xs"
              >
                {isEs ? 'Guardar y Cerrar' : 'Done / Close'}
              </button>
            </div>

            {/* In-Modal Delete Confirmation Overlay */}
            {showDeleteConfirm && (
              <div className="absolute inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-rose-200 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="font-serif font-bold text-lg text-[#0F2747]">
                      {isEs ? '¿Eliminar este Expediente?' : 'Delete this Case File?'}
                    </h4>
                    <p className="text-xs text-[#887D6B] leading-relaxed">
                      {isEs 
                        ? `Se eliminará permanentemente el expediente ${selectedClient.caseNumber} a nombre de ${selectedClient.firstName} ${selectedClient.lastName}, incluyendo sus documentos asociados y bitácora.`
                        : `Case ${selectedClient.caseNumber} for ${selectedClient.firstName} ${selectedClient.lastName} will be permanently removed along with its documents and logs.`
                      }
                    </p>
                    <p className="text-[11px] font-semibold text-rose-600 pt-1">
                      {isEs ? 'Esta acción es irreversible y permanente.' : 'This action is irreversible and permanent.'}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 py-2 px-3 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {isEs ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteClient?.(selectedClient.id);
                        setSelectedClient(null);
                        setShowDeleteConfirm(false);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      {isEs ? 'Sí, Eliminar Definitivamente' : 'Yes, Delete Case'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal for Table Quick Actions */}
      {clientToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 print:hidden">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-rose-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-serif font-bold text-lg text-[#0F2747]">
                {isEs ? '¿Eliminar este Expediente?' : 'Delete this Case File?'}
              </h4>
              <p className="text-xs text-[#887D6B] leading-relaxed">
                {isEs 
                  ? `Se eliminará permanentemente el expediente ${clientToDelete.caseNumber} de ${clientToDelete.firstName} ${clientToDelete.lastName}.`
                  : `Case ${clientToDelete.caseNumber} for ${clientToDelete.firstName} ${clientToDelete.lastName} will be permanently removed.`
                }
              </p>
              <p className="text-[11px] font-semibold text-rose-600 pt-1">
                {isEs ? 'Esta acción es irreversible y permanente.' : 'This action is irreversible and permanent.'}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="flex-1 py-2 px-3 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {isEs ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteClient?.(clientToDelete.id);
                  if (selectedClient?.id === clientToDelete.id) {
                    setSelectedClient(null);
                  }
                  setClientToDelete(null);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                {isEs ? 'Sí, Eliminar' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW CLIENT MODAL FOR STAFF INTAKE */}
      {isNewClientModalOpen && (
        <NewClientModal
          language={language}
          onClose={() => setIsNewClientModalOpen(false)}
          onCreate={(newClient) => {
            onCreateClient(newClient);
            setIsNewClientModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Modal for manual staff case creation
const NewClientModal: React.FC<{
  language: Language;
  onClose: () => void;
  onCreate: (client: ClientRecord) => void;
}> = ({ language, onClose, onCreate }) => {
  const isEs = language === 'es';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState<ServiceDivisionId>('apostille');
  const [priority, setPriority] = useState<PriorityLevel>('normal');
  const [notes, setNotes] = useState('');

  const currentDiv = SERVICE_DIVISIONS.find((d) => d.id === division) || SERVICE_DIVISIONS[0];
  const [serviceId, setServiceId] = useState(currentDiv.services[0]?.id || '');

  const handleCreate = () => {
    if (!firstName.trim() || !phone.trim()) return;

    const newCaseId = `LUM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: ClientRecord = {
      id: `cli-${Date.now()}`,
      caseNumber: newCaseId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'cliente@lumiel.com',
      preferredLanguage: language,
      preferredContactMethod: 'whatsapp',
      division: division,
      serviceId: serviceId,
      serviceName: currentDiv.services.find((s) => s.id === serviceId)?.name[language] || currentDiv.title[language],
      status: 'NEW',
      priority: priority,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: notes.trim(),
      assignedTo: 'Agente Ventanilla Houston',
      documents: [],
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          author: 'Mesa de Entrada Lumiel',
          action: 'Expediente creado manualmente por agente',
        }
      ]
    };

    onCreate(newRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#DCC9A7] overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-serif text-lg font-bold text-[#0F2747]">
            {isEs ? 'Crear Nuevo Expediente de Cliente' : 'Create New Client Case'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'Nombre(s) *' : 'First Name *'}</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'Apellido(s) *' : 'Last Name *'}</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
                placeholder="Apellido"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'Teléfono *' : 'Phone *'}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
                placeholder="+1 (832) 000-0000"
              />
            </div>
            <div>
              <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'Correo Electrónico' : 'Email'}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'División de Servicio' : 'Division'}</label>
              <select
                value={division}
                onChange={(e) => {
                  const newD = e.target.value as ServiceDivisionId;
                  setDivision(newD);
                  const divO = SERVICE_DIVISIONS.find((d) => d.id === newD);
                  if (divO && divO.services.length > 0) setServiceId(divO.services[0].id);
                }}
                className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
              >
                {SERVICE_DIVISIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title[language]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'Prioridad' : 'Priority'}</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
              >
                <option value="normal">Normal</option>
                <option value="alta">{isEs ? 'Alta' : 'High'}</option>
                <option value="urgente">{isEs ? 'Urgente' : 'Urgent'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'Trámite Específico' : 'Service'}</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
            >
              {currentDiv.services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name[language]} ({s.estimatedDays})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#0F2747] block mb-1">{isEs ? 'Observaciones Iniciales' : 'Notes'}</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7]"
              placeholder="Detalles sobre documentos entregados o requerimientos..."
            />
          </div>
        </div>

        <div className="pt-3 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
          >
            {isEs ? 'Cancelar' : 'Cancel'}
          </button>
          <button
            onClick={handleCreate}
            disabled={!firstName.trim() || !phone.trim()}
            className="px-5 py-2 text-xs font-bold text-[#0F2747] bg-[#C9A96B] hover:bg-[#b89552] rounded-xl shadow-xs disabled:opacity-50"
          >
            {isEs ? 'Guardar Expediente' : 'Save Record'}
          </button>
        </div>
      </div>
    </div>
  );
};
