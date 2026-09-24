import React from 'react';
import { COMPANY_INFO } from '../data/servicesData.ts';
import { Language } from '../types/index.ts';
import { Phone, MessageCircle, FileCheck } from 'lucide-react';

interface MobileActionFooterProps {
  language: Language;
  onOpenIntake: () => void;
}

export const MobileActionFooter: React.FC<MobileActionFooterProps> = ({
  language,
  onOpenIntake,
}) => {
  const isEs = language === 'es';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0F2747]/95 backdrop-blur-lg border-t border-[#C9A96B]/30 shadow-2xl px-3 py-2">
      <div className="grid grid-cols-3 gap-2 items-center text-center">
        {/* CALL */}
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#DCC9A7] text-[#0F2747] font-semibold text-[11px] shadow-sm active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 mb-0.5 text-[#0F2747]" />
          <span>{isEs ? 'Llamar' : 'Call'}</span>
        </a>

        {/* WHATSAPP */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#F8F6F1] font-semibold text-[11px] border border-[#C9A96B]/40 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 text-[#8A9A7B]" />
          <span>WhatsApp</span>
        </a>

        {/* REQUEST SERVICE */}
        <button
          onClick={onOpenIntake}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#C9A96B] hover:bg-[#b89552] text-[#0F2747] font-bold text-[11px] shadow-sm active:scale-95 transition-transform"
        >
          <FileCheck className="w-4 h-4 mb-0.5 text-[#0F2747]" />
          <span>{isEs ? 'Solicitar' : 'Request'}</span>
        </button>
      </div>
    </div>
  );
};
