import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ClientRecord, Language, ServiceDivisionId } from '../../types/index.ts';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Calendar, 
  Award, 
  Activity, 
  Layers, 
  Sparkles 
} from 'lucide-react';

interface CrmMonthlySummaryChartProps {
  clients: ClientRecord[];
  language: Language;
}

// Brand color palette mapped to divisions according to Multiservicios Lumiel corporate identity
export const DIVISION_COLORS: Record<ServiceDivisionId, { color: string; label: { es: string; en: string } }> = {
  apostille: {
    color: '#0F2747', // Deep Navy
    label: { es: 'Apostillas', en: 'Apostille' },
  },
  notary: {
    color: '#C9A96B', // Metallic Gold
    label: { es: 'Notaría', en: 'Notary' },
  },
  translation: {
    color: '#1A4373', // Secondary Navy
    label: { es: 'Traducciones', en: 'Translation' },
  },
  'vital-records': {
    color: '#8A9A7B', // Sage Green
    label: { es: 'Actas & Registros', en: 'Vital Records' },
  },
  passport: {
    color: '#DCC9A7', // Sand Accent
    label: { es: 'Pasaportes', en: 'Passport' },
  },
  vehicles: {
    color: '#B08968', // Warm Taupe
    label: { es: 'Vehículos', en: 'Vehicles' },
  },
  insurance: {
    color: '#537188', // Steel Blue
    label: { es: 'Seguros', en: 'Insurance' },
  },
};

const MONTH_NAMES = {
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const CrmMonthlySummaryChart: React.FC<CrmMonthlySummaryChartProps> = ({
  clients,
  language,
}) => {
  const isEs = language === 'es';
  const [chartType, setChartType] = useState<'stacked' | 'grouped' | 'area' | 'donut'>('stacked');
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState<string>('all');

  // Process clients data by month and division
  const { monthlyData, divisionTotals, totalCount, topDivision, peakMonth } = useMemo(() => {
    // Map to accumulate counts by "YYYY-MM"
    const monthMap: Record<string, { key: string; label: string; [div: string]: any }> = {};

    // Collect all division counts overall
    const divTotals: Record<string, number> = {
      apostille: 0,
      notary: 0,
      translation: 0,
      'vital-records': 0,
      passport: 0,
      vehicles: 0,
      insurance: 0,
    };

    clients.forEach((client) => {
      const date = new Date(client.createdAt);
      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const monthIdx = date.getMonth();
      const key = `${year}-${String(monthIdx + 1).padStart(2, '0')}`;
      const monthLabel = `${MONTH_NAMES[language][monthIdx]} ${year}`;

      if (!monthMap[key]) {
        monthMap[key] = {
          key,
          label: monthLabel,
          year,
          monthIdx,
          total: 0,
          apostille: 0,
          notary: 0,
          translation: 0,
          'vital-records': 0,
          passport: 0,
          vehicles: 0,
          insurance: 0,
        };
      }

      const div = client.division as ServiceDivisionId;
      if (monthMap[key][div] !== undefined) {
        monthMap[key][div] += 1;
        monthMap[key].total += 1;
      }
      if (divTotals[div] !== undefined) {
        divTotals[div] += 1;
      }
    });

    // Sort chronologically
    const sorted = Object.values(monthMap).sort((a, b) => a.key.localeCompare(b.key));

    // Determine top division
    let maxDivName = 'apostille';
    let maxDivCount = 0;
    Object.entries(divTotals).forEach(([div, count]) => {
      if (count > maxDivCount) {
        maxDivCount = count;
        maxDivName = div;
      }
    });

    // Determine peak month
    let topMonthLabel = sorted.length > 0 ? sorted[0].label : 'N/A';
    let topMonthCount = 0;
    sorted.forEach((m) => {
      if (m.total > topMonthCount) {
        topMonthCount = m.total;
        topMonthLabel = m.label;
      }
    });

    // Format donut data
    const pieData = Object.entries(divTotals)
      .filter(([_, count]) => count > 0)
      .map(([div, count]) => ({
        name: DIVISION_COLORS[div as ServiceDivisionId]?.label[language] || div,
        division: div,
        value: count,
        color: DIVISION_COLORS[div as ServiceDivisionId]?.color || '#0F2747',
      }));

    return {
      monthlyData: sorted,
      divisionTotals: pieData,
      totalCount: clients.length,
      topDivision: {
        id: maxDivName as ServiceDivisionId,
        label: DIVISION_COLORS[maxDivName as ServiceDivisionId]?.label[language] || maxDivName,
        count: maxDivCount,
        percent: clients.length > 0 ? Math.round((maxDivCount / clients.length) * 100) : 0,
      },
      peakMonth: {
        label: topMonthLabel,
        count: topMonthCount,
      },
    };
  }, [clients, language]);

  // Divisions to render based on filter
  const activeDivisions = useMemo(() => {
    if (selectedDivisionFilter === 'all') {
      return Object.keys(DIVISION_COLORS) as ServiceDivisionId[];
    }
    return [selectedDivisionFilter as ServiceDivisionId];
  }, [selectedDivisionFilter]);

  // Custom Tooltip component for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const totalInMonth = payload.reduce((sum: number, p: any) => sum + (Number(p.value) || 0), 0);
      return (
        <div className="bg-[#0F2747] text-white p-3.5 rounded-xl shadow-2xl border border-[#C9A96B]/50 text-xs min-w-[200px] backdrop-blur-md">
          <div className="font-serif font-bold text-sm text-[#F8F6F1] border-b border-white/10 pb-1.5 mb-2 flex justify-between items-center">
            <span>{label}</span>
            <span className="font-mono text-[11px] text-[#C9A96B] font-semibold">
              {totalInMonth} {isEs ? 'solicitudes' : 'requests'}
            </span>
          </div>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => {
              const divKey = entry.dataKey as ServiceDivisionId;
              const divInfo = DIVISION_COLORS[divKey];
              if (!entry.value || entry.value === 0) return null;
              return (
                <div key={index} className="flex items-center justify-between gap-3 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-xs flex-shrink-0" 
                      style={{ backgroundColor: entry.color || divInfo?.color }} 
                    />
                    <span className="text-[#EAE3D8]">{divInfo?.label[language] || entry.name}:</span>
                  </div>
                  <span className="font-mono font-bold text-white">{entry.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCC9A7]/70 shadow-sm p-5 sm:p-6 space-y-6">
      {/* Component Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F8F6F1] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A96B] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#887D6B] uppercase">
              {isEs ? 'ANALÍTICA DE FLUJO OPERATIVO' : 'INTAKE OPERATIONS ANALYTICS'}
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2747] mt-0.5">
            {isEs 
              ? 'Resumen Mensual de Solicitudes por División' 
              : 'Monthly Incoming Requests by Service Division'}
          </h2>
          <p className="text-xs text-[#887D6B] mt-0.5">
            {isEs
              ? 'Distribución histórica y en tiempo real de trámites ingresados (Apostillas, Notaría, Traducciones y más).'
              : 'Historical and real-time intake distribution across all specialized legal & document divisions.'}
          </p>
        </div>

        {/* Chart View Switches & Filter */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Division Filter Dropdown */}
          <select
            value={selectedDivisionFilter}
            onChange={(e) => setSelectedDivisionFilter(e.target.value)}
            className="text-xs p-2 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/70 text-[#0F2747] font-semibold cursor-pointer focus:outline-hidden"
          >
            <option value="all">{isEs ? 'Todas las Divisiones' : 'All Divisions'}</option>
            {Object.entries(DIVISION_COLORS).map(([divId, conf]) => (
              <option key={divId} value={divId}>
                {conf.label[language]}
              </option>
            ))}
          </select>

          {/* Chart Type Toggle Buttons */}
          <div className="inline-flex bg-[#F8F6F1] p-1 rounded-xl border border-[#DCC9A7]/60">
            <button
              onClick={() => setChartType('stacked')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                chartType === 'stacked'
                  ? 'bg-[#0F2747] text-white shadow-xs'
                  : 'text-[#887D6B] hover:text-[#0F2747]'
              }`}
              title={isEs ? 'Barras Apiladas' : 'Stacked Bar'}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEs ? 'Apilado' : 'Stacked'}</span>
            </button>

            <button
              onClick={() => setChartType('grouped')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                chartType === 'grouped'
                  ? 'bg-[#0F2747] text-white shadow-xs'
                  : 'text-[#887D6B] hover:text-[#0F2747]'
              }`}
              title={isEs ? 'Barras Agrupadas' : 'Grouped Bar'}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEs ? 'Agrupado' : 'Grouped'}</span>
            </button>

            <button
              onClick={() => setChartType('area')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                chartType === 'area'
                  ? 'bg-[#0F2747] text-white shadow-xs'
                  : 'text-[#887D6B] hover:text-[#0F2747]'
              }`}
              title={isEs ? 'Tendencia Acumulada' : 'Area Trend'}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEs ? 'Tendencia' : 'Trend'}</span>
            </button>

            <button
              onClick={() => setChartType('donut')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                chartType === 'donut'
                  ? 'bg-[#0F2747] text-white shadow-xs'
                  : 'text-[#887D6B] hover:text-[#0F2747]'
              }`}
              title={isEs ? 'Distribución Total' : 'Donut Share'}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEs ? 'Distribución' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row for Quick Insights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Analyzed */}
        <div className="p-3 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0F2747] text-[#C9A96B] flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#887D6B] block">
              {isEs ? 'Total Solicitudes' : 'Total Intake'}
            </span>
            <span className="font-serif font-bold text-lg text-[#0F2747] leading-tight block">
              {totalCount}
            </span>
          </div>
        </div>

        {/* Leading Division */}
        <div className="p-3 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#C9A96B] text-[#0F2747] flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-[10px] uppercase font-bold text-[#887D6B] block">
              {isEs ? 'División Líder' : 'Top Division'}
            </span>
            <span className="font-serif font-bold text-sm text-[#0F2747] leading-tight truncate block" title={topDivision.label}>
              {topDivision.label} ({topDivision.percent}%)
            </span>
          </div>
        </div>

        {/* Peak Month */}
        <div className="p-3 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#8A9A7B] text-white flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#887D6B] block">
              {isEs ? 'Mes con Mayor Flujo' : 'Peak Month'}
            </span>
            <span className="font-serif font-bold text-sm text-[#0F2747] leading-tight block">
              {peakMonth.label} ({peakMonth.count})
            </span>
          </div>
        </div>

        {/* Average Monthly */}
        <div className="p-3 bg-[#F8F6F1] rounded-xl border border-[#DCC9A7]/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1A4373] text-[#DCC9A7] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#887D6B] block">
              {isEs ? 'Promedio Mensual' : 'Monthly Avg'}
            </span>
            <span className="font-serif font-bold text-lg text-[#0F2747] leading-tight block">
              {monthlyData.length > 0 ? (totalCount / monthlyData.length).toFixed(1) : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Main Recharts Container */}
      <div className="h-80 sm:h-96 w-full pt-2">
        {monthlyData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-[#887D6B]">
            {isEs ? 'No hay suficientes datos mensuales registrados' : 'No monthly data available'}
          </div>
        ) : chartType === 'donut' ? (
          /* Donut Share View */
          <div className="h-full flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-full sm:w-1/2 h-64 sm:h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={divisionTotals}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {divisionTotals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value} ${isEs ? 'casos' : 'cases'}`, name]}
                    contentStyle={{
                      backgroundColor: '#0F2747',
                      color: '#F8F6F1',
                      borderRadius: '12px',
                      border: '1px solid #C9A96B',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Donut Legend Listing with percentages */}
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <span className="text-[11px] uppercase font-mono font-bold text-[#887D6B] block mb-2">
                {isEs ? 'Participación por Categoría' : 'Category Share Breakdown'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {divisionTotals.map((item) => {
                  const percent = totalCount > 0 ? Math.round((item.value / totalCount) * 100) : 0;
                  return (
                    <div 
                      key={item.division} 
                      className="p-2 rounded-lg bg-[#F8F6F1] border border-[#DCC9A7]/40 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-3 h-3 rounded-xs flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="truncate font-semibold text-[#0F2747] text-[11px]">{item.name}</span>
                      </div>
                      <div className="font-mono text-[11px] text-[#887D6B]">
                        <span className="font-bold text-[#0F2747]">{item.value}</span> ({percent}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : chartType === 'area' ? (
          /* Area Trend View */
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {activeDivisions.map((div) => (
                  <linearGradient key={div} id={`color-${div}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={DIVISION_COLORS[div].color} stopOpacity={0.7} />
                    <stop offset="95%" stopColor={DIVISION_COLORS[div].color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE3D8" />
              <XAxis 
                dataKey="label" 
                tick={{ fill: '#887D6B', fontSize: 11 }} 
                axisLine={{ stroke: '#DCC9A7' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#887D6B', fontSize: 11 }} 
                axisLine={false} 
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                iconType="circle"
                formatter={(value) => DIVISION_COLORS[value as ServiceDivisionId]?.label[language] || value}
              />
              {activeDivisions.map((div) => (
                <Area
                  key={div}
                  type="monotone"
                  dataKey={div}
                  name={div}
                  stroke={DIVISION_COLORS[div].color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color-${div})`}
                  stackId={selectedDivisionFilter === 'all' ? '1' : undefined}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          /* Bar Chart View (Stacked or Grouped) */
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={monthlyData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE3D8" />
              <XAxis 
                dataKey="label" 
                tick={{ fill: '#887D6B', fontSize: 11 }} 
                axisLine={{ stroke: '#DCC9A7' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#887D6B', fontSize: 11 }} 
                axisLine={false} 
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                iconType="circle"
                formatter={(value) => DIVISION_COLORS[value as ServiceDivisionId]?.label[language] || value}
              />
              {activeDivisions.map((div) => (
                <Bar
                  key={div}
                  dataKey={div}
                  name={div}
                  fill={DIVISION_COLORS[div].color}
                  stackId={chartType === 'stacked' ? 'a' : undefined}
                  radius={chartType === 'stacked' ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                  barSize={chartType === 'stacked' ? 36 : undefined}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer Info & Operational Note */}
      <div className="pt-3 border-t border-[#F8F6F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#887D6B]">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[#0F2747]">
            {isEs ? 'Métrica Operacional:' : 'Operational Metric:'}
          </span>
          <span>
            {isEs 
              ? 'Actualización en tiempo real al registrar solicitudes en ventanilla o portal de autoservicio.'
              : 'Updates live with public web intake submissions and staff case registrations.'}
          </span>
        </div>
        <div className="font-mono text-[10px] text-[#C9A96B] font-semibold">
          MULTISERVICIOS LUMIEL · HOUSTON, TX
        </div>
      </div>
    </div>
  );
};
