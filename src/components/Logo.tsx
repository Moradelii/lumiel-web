import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-11',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark'; // dark navy text on light backgrounds
  const mainTextColor = isDark ? '#0F2747' : '#F8F6F1';
  const subTextColor = isDark ? '#887D6B' : '#DCC9A7';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Monogram Interlocking Crest */}
      <div className="relative flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-[#0F2747] via-[#16355C] to-[#0A1B33] p-1.5 shadow-md border border-[#C9A96B]/50 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E8D0" />
              <stop offset="40%" stopColor="#DCC9A7" />
              <stop offset="80%" stopColor="#C9A96B" />
              <stop offset="100%" stopColor="#9C7738" />
            </linearGradient>
            <filter id="monogramGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.4"/>
            </filter>
          </defs>
          {/* Subtle shield outline */}
          <path
            d="M50 8 C72 8 88 18 88 38 C88 68 50 92 50 92 C50 92 12 68 12 38 C12 18 28 8 50 8Z"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
            strokeOpacity="0.4"
          />
          {/* Stylized M */}
          <path
            d="M26 74 V30 H30 L50 60 L70 30 H74 V74 H66 V44 L52 64 H48 L34 44 V74 H26Z"
            fill="url(#goldGrad)"
            filter="url(#monogramGlow)"
          />
          {/* Elegant intertwining L flourish with gold accent */}
          <path
            d="M48 42 C56 32 72 32 78 44 C82 52 76 66 64 72 L82 72 C85 72 87 74 87 76 C87 78 85 80 81 80 L52 80 C48 80 46 77 46 73 C46 67 50 61 58 55 Z"
            fill="#F8F6F1"
            fillOpacity="0.92"
          />
          <circle cx="78" cy="40" r="3.5" fill="url(#goldGrad)" />
        </svg>
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col justify-center">
        <span
          className="text-[11px] uppercase tracking-[0.22em] font-semibold leading-tight"
          style={{ color: mainTextColor }}
        >
          Multiservicios
        </span>
        <span
          className="font-serif text-xl sm:text-2xl font-bold tracking-[0.08em] leading-none my-0.5"
          style={{ color: mainTextColor }}
        >
          LUMIEL
        </span>
        {showSubtitle && (
          <span
            className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.14em] font-medium leading-tight hidden xs:block"
            style={{ color: subTextColor }}
          >
            Professional Document &amp; Notary Services
          </span>
        )}
      </div>
    </div>
  );
};
