import React, { useState } from 'react';
import { Language, CrmUser } from '../types/index.ts';
import { Lock, Eye, EyeOff, ShieldAlert, KeyRound, X } from 'lucide-react';

interface CrmAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (authenticatedUser?: CrmUser) => void;
  language: Language;
  users: CrmUser[];
}

export const CrmAuthModal: React.FC<CrmAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  language,
  users,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isEs = language === 'es';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Check against master password or any active user in CRM
    const trimmed = password.trim();
    const isMasterMatch = trimmed === 'Antunez0105';
    const matchingUser = users.find(
      (u) => u.status === 'active' && u.password === trimmed
    );

    setTimeout(() => {
      if (isMasterMatch || matchingUser) {
        setIsSubmitting(false);
        setPassword('');
        setErrorMsg('');
        onSuccess(matchingUser || users[0]);
      } else {
        setIsSubmitting(false);
        setErrorMsg(
          isEs
            ? 'Contraseña no válida. Acceso restringido a personal autorizado.'
            : 'Invalid credential. Access restricted to authorized personnel.'
        );
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#C9A96B]/50 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F2747] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-[#C9A96B] text-[#0F2747] flex items-center justify-center mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9A96B] font-bold block">
            {isEs ? 'PORTAL ADMINISTRATIVO · ACCESO RESTRINGIDO' : 'STAFF PORTAL · RESTRICTED ACCESS'}
          </span>
          <h3 className="font-serif text-xl font-bold text-[#F8F6F1] mt-1">
            {isEs ? 'Panel de Gestión CRM Lumiel' : 'Lumiel CRM Management Console'}
          </h3>
          <p className="text-xs text-[#DCC9A7] mt-1">
            {isEs
              ? 'Ingrese su clave de seguridad institucional para acceder a la base de expedientes y trámites.'
              : 'Enter institutional security key to manage client dossiers and service workflows.'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-[#F8F6F1]">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F2747] flex items-center justify-between">
              <span>{isEs ? 'Contraseña de Seguridad' : 'Security Password'}</span>
              <span className="text-[10px] text-[#887D6B] font-normal">
                {isEs ? 'Cifrado SSL 256-bit' : '256-bit SSL'}
              </span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#887D6B]">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="••••••••••••"
                required
                autoFocus
                className="w-full pl-10 pr-10 py-3 bg-white border border-[#DCC9A7] rounded-xl text-sm text-[#0F2747] placeholder:text-[#887D6B]/50 focus:outline-hidden focus:ring-2 focus:ring-[#C9A96B] font-mono tracking-widest transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#887D6B] hover:text-[#0F2747] transition-colors cursor-pointer"
                title={showPassword ? (isEs ? 'Ocultar' : 'Hide') : (isEs ? 'Mostrar' : 'Show')}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-[#DCC9A7] text-xs font-bold text-[#887D6B] hover:bg-white transition-colors cursor-pointer"
            >
              {isEs ? 'Cancelar' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#0F2747] hover:bg-[#16355C] disabled:opacity-50 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>{isEs ? 'Verificando...' : 'Verifying...'}</span>
              ) : (
                <span>{isEs ? 'Ingresar al CRM →' : 'Access CRM →'}</span>
              )}
            </button>
          </div>
        </form>

        {/* Confidentiality Footer */}
        <div className="px-6 py-3 bg-white border-t border-[#DCC9A7]/40 text-center">
          <p className="text-[11px] text-[#887D6B]">
            {isEs
              ? 'Área privada protegida. Houston, Texas · Multiservicios Lumiel'
              : 'Protected internal portal. Houston, Texas · Multiservicios Lumiel'}
          </p>
        </div>
      </div>
    </div>
  );
};
