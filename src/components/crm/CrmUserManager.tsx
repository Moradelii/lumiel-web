import React, { useState } from 'react';
import { Language, CrmUser } from '../../types/index.ts';
import { 
  Users, 
  UserPlus, 
  Key, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  Copy, 
  ShieldCheck, 
  X, 
  AlertCircle,
  Search,
  Lock,
  Mail,
  UserCheck
} from 'lucide-react';

interface CrmUserManagerProps {
  language: Language;
  users: CrmUser[];
  onUsersChange: (updatedUsers: CrmUser[]) => void;
}

export const CrmUserManager: React.FC<CrmUserManagerProps> = ({
  language,
  users,
  onUsersChange,
}) => {
  const isEs = language === 'es';
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePasswordUserId, setVisiblePasswordUserId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<CrmUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<CrmUser | null>(null);

  // Add form fields
  const [addForm, setAddForm] = useState({
    fullName: '',
    username: '',
    email: '',
    role: 'agent' as CrmUser['role'],
    password: '',
    confirmPassword: '',
    status: 'active' as CrmUser['status'],
  });
  const [addError, setAddError] = useState('');

  // Edit form fields
  const [editForm, setEditForm] = useState({
    fullName: '',
    username: '',
    email: '',
    role: 'agent' as CrmUser['role'],
    newPassword: '',
    status: 'active' as CrmUser['status'],
  });
  const [editError, setEditError] = useState('');

  // Filter users
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  const handleCopyPassword = (userId: string, pass: string) => {
    navigator.clipboard.writeText(pass);
    setCopiedId(userId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenEdit = (user: CrmUser) => {
    setEditingUser(user);
    setEditForm({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      newPassword: '',
      status: user.status,
    });
    setEditError('');
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');

    if (addForm.password !== addForm.confirmPassword) {
      setAddError(isEs ? 'Las contraseñas no coinciden.' : 'Passwords do not match.');
      return;
    }

    if (addForm.password.length < 6) {
      setAddError(isEs ? 'La contraseña debe tener al menos 6 caracteres.' : 'Password must be at least 6 characters.');
      return;
    }

    if (users.some((u) => u.username.toLowerCase() === addForm.username.toLowerCase())) {
      setAddError(isEs ? 'El nombre de usuario ya está registrado.' : 'Username already exists.');
      return;
    }

    const newUser: CrmUser = {
      id: `user-${Date.now()}`,
      fullName: addForm.fullName.trim(),
      username: addForm.username.trim().toLowerCase(),
      email: addForm.email.trim().toLowerCase(),
      role: addForm.role,
      password: addForm.password,
      status: addForm.status,
      createdAt: new Date().toISOString(),
    };

    onUsersChange([newUser, ...users]);
    setIsAddModalOpen(false);
    setAddForm({
      fullName: '',
      username: '',
      email: '',
      role: 'agent',
      password: '',
      confirmPassword: '',
      status: 'active',
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditError('');

    // Check duplicate username if changed
    if (
      editForm.username.toLowerCase() !== editingUser.username.toLowerCase() &&
      users.some((u) => u.id !== editingUser.id && u.username.toLowerCase() === editForm.username.toLowerCase())
    ) {
      setEditError(isEs ? 'El nombre de usuario ya está en uso.' : 'Username is already in use.');
      return;
    }

    const updated: CrmUser = {
      ...editingUser,
      fullName: editForm.fullName.trim(),
      username: editForm.username.trim().toLowerCase(),
      email: editForm.email.trim().toLowerCase(),
      role: editForm.role,
      status: editForm.status,
      password: editForm.newPassword.trim() ? editForm.newPassword.trim() : editingUser.password,
    };

    onUsersChange(users.map((u) => (u.id === editingUser.id ? updated : u)));
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingUser) return;
    if (users.length <= 1) {
      alert(isEs ? 'No puedes eliminar al único usuario del sistema.' : 'Cannot delete the only system user.');
      return;
    }
    onUsersChange(users.filter((u) => u.id !== deletingUser.id));
    setDeletingUser(null);
  };

  const getRoleBadge = (role: CrmUser['role']) => {
    switch (role) {
      case 'super_admin':
        return (
          <span className="px-2.5 py-0.5 rounded-md bg-[#0F2747] text-white text-[10px] font-bold uppercase tracking-wider">
            Super Admin
          </span>
        );
      case 'notary':
        return (
          <span className="px-2.5 py-0.5 rounded-md bg-[#C9A96B] text-[#0F2747] text-[10px] font-bold uppercase tracking-wider">
            {isEs ? 'Notario Público' : 'Notary Public'}
          </span>
        );
      case 'translator':
        return (
          <span className="px-2.5 py-0.5 rounded-md bg-[#1A4373] text-[#DCC9A7] text-[10px] font-bold uppercase tracking-wider">
            {isEs ? 'Traductor Certificado' : 'Translator'}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md bg-[#8A9A7B]/20 text-[#2B4B27] text-[10px] font-bold uppercase tracking-wider">
            {isEs ? 'Agente de Trámites' : 'Staff Agent'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 print:hidden">
      {/* Top Banner & Action */}
      <div className="bg-white p-6 rounded-2xl border border-[#DCC9A7]/70 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C9A96B]" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#887D6B]">
              {isEs ? 'ADMINISTRACIÓN DE ACCESOS' : 'ACCESS & CREDENTIALS'}
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2747] mt-1">
            {isEs ? 'Gestión de Usuarios y Contraseñas' : 'User Accounts & Security Credentials'}
          </h2>
          <p className="text-xs text-[#887D6B] mt-0.5">
            {isEs
              ? 'Agregue, edite credenciales o elimine operadores autorizados para ingresar a la plataforma CRM de Multiservicios Lumiel.'
              : 'Create, update passwords, and manage authorized operators for the internal Lumiel CRM console.'}
          </p>
        </div>

        <button
          onClick={() => {
            setAddError('');
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F2747] hover:bg-[#16355C] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex-shrink-0"
        >
          <UserPlus className="w-4 h-4 text-[#C9A96B]" />
          <span>{isEs ? 'Agregar Nuevo Usuario' : 'Add New User'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#DCC9A7]/70 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#887D6B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEs ? 'Buscar usuario por nombre, usuario o email...' : 'Search users by name, handle, or email...'}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F6F1] rounded-xl text-xs border border-[#DCC9A7] text-[#0F2747] placeholder:text-[#887D6B]/50 focus:outline-hidden focus:bg-white"
          />
        </div>
        <div className="text-xs font-semibold text-[#887D6B]">
          {filteredUsers.length} {isEs ? 'usuarios registrados' : 'registered users'}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#DCC9A7]/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F2747] text-[#DCC9A7] uppercase font-mono text-[10px] tracking-wider border-b border-[#C9A96B]/30">
              <tr>
                <th className="py-3 px-4 font-bold">{isEs ? 'Usuario / Nombre' : 'User / Full Name'}</th>
                <th className="py-3 px-4 font-bold">{isEs ? 'Rol' : 'Role'}</th>
                <th className="py-3 px-4 font-bold">{isEs ? 'Email' : 'Email'}</th>
                <th className="py-3 px-4 font-bold">{isEs ? 'Contraseña' : 'Password'}</th>
                <th className="py-3 px-4 font-bold">{isEs ? 'Estado' : 'Status'}</th>
                <th className="py-3 px-4 font-bold text-right">{isEs ? 'Acciones' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F6F1]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[#887D6B]">
                    {isEs ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No users found matching query.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isPassVisible = visiblePasswordUserId === user.id;
                  return (
                    <tr key={user.id} className="hover:bg-[#F8F6F1]/70 transition-colors">
                      {/* Name and Handle */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#F8F6F1] border border-[#DCC9A7] flex items-center justify-center font-bold text-xs text-[#0F2747]">
                            {user.fullName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-[#0F2747] block text-xs">
                              {user.fullName}
                            </span>
                            <span className="font-mono text-[11px] text-[#887D6B] block">
                              @{user.username}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        {getRoleBadge(user.role)}
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#2E2E2E]">
                        {user.email}
                      </td>

                      {/* Password Field (Masked with reveal & copy) */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 bg-[#F8F6F1] px-2.5 py-1 rounded-lg border border-[#DCC9A7]/60">
                          <span className="font-mono text-xs text-[#0F2747] font-semibold">
                            {isPassVisible ? user.password : '••••••••'}
                          </span>
                          <button
                            onClick={() =>
                              setVisiblePasswordUserId(isPassVisible ? null : user.id)
                            }
                            className="text-[#887D6B] hover:text-[#0F2747] transition-colors p-0.5 cursor-pointer"
                            title={isPassVisible ? (isEs ? 'Ocultar' : 'Hide') : (isEs ? 'Mostrar' : 'Show')}
                          >
                            {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleCopyPassword(user.id, user.password)}
                            className="text-[#887D6B] hover:text-[#C9A96B] transition-colors p-0.5 cursor-pointer"
                            title={isEs ? 'Copiar contraseña' : 'Copy password'}
                          >
                            {copiedId === user.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {user.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {isEs ? 'Activo' : 'Active'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-300">
                            {isEs ? 'Inactivo' : 'Inactive'}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 rounded-lg text-[#0F2747] hover:bg-[#DCC9A7]/40 transition-colors inline-block cursor-pointer"
                          title={isEs ? 'Editar usuario o cambiar contraseña' : 'Edit user or change password'}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingUser(user)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors inline-block cursor-pointer"
                          title={isEs ? 'Eliminar usuario' : 'Delete user'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: AGREGAR NUEVO USUARIO */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#C9A96B]/50 overflow-hidden">
            <div className="bg-[#0F2747] text-white p-5 flex items-center justify-between border-b border-[#C9A96B]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C9A96B] text-[#0F2747] flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F8F6F1]">
                    {isEs ? 'Nuevo Usuario del Sistema' : 'Add New System User'}
                  </h3>
                  <span className="text-[10px] font-mono text-[#DCC9A7] uppercase tracking-wider">
                    {isEs ? 'Credenciales de acceso al CRM' : 'CRM Access Credentials'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="p-6 space-y-4 bg-[#F8F6F1]">
              {addError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{addError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Nombre Completo' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={addForm.fullName}
                    onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                    placeholder="Ej. Laura Méndez"
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs text-[#0F2747]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Nombre de Usuario' : 'Username'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={addForm.username}
                    onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
                    placeholder="Ej. laura.notaria"
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs font-mono text-[#0F2747]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Correo Electrónico' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    placeholder="correo@multiservicioslumiel.com"
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs text-[#0F2747]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Rol Asignado' : 'Role'}
                  </label>
                  <select
                    value={addForm.role}
                    onChange={(e) => setAddForm({ ...addForm, role: e.target.value as any })}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs text-[#0F2747]"
                  >
                    <option value="super_admin">Super Administrador</option>
                    <option value="notary">Notario Público</option>
                    <option value="agent">Agente de Trámites</option>
                    <option value="translator">Traductor Jurado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Contraseña' : 'Password'} *
                  </label>
                  <input
                    type="password"
                    required
                    value={addForm.password}
                    onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs font-mono text-[#0F2747]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Confirmar Contraseña' : 'Confirm Password'} *
                  </label>
                  <input
                    type="password"
                    required
                    value={addForm.confirmPassword}
                    onChange={(e) => setAddForm({ ...addForm, confirmPassword: e.target.value })}
                    placeholder="Repita contraseña"
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs font-mono text-[#0F2747]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#DCC9A7]/40">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#DCC9A7] text-xs font-semibold text-[#887D6B] hover:bg-white"
                >
                  {isEs ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F2747] hover:bg-[#16355C] text-white text-xs font-bold shadow-sm"
                >
                  {isEs ? 'Crear Usuario' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR USUARIO & CAMBIAR CONTRASEÑA */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#C9A96B]/50 overflow-hidden">
            <div className="bg-[#0F2747] text-white p-5 flex items-center justify-between border-b border-[#C9A96B]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#C9A96B] text-[#0F2747] flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F8F6F1]">
                    {isEs ? 'Editar Usuario & Credenciales' : 'Edit User & Credentials'}
                  </h3>
                  <span className="font-mono text-[10px] text-[#DCC9A7]">
                    @{editingUser.username}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 bg-[#F8F6F1]">
              {editError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{editError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Nombre Completo' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs text-[#0F2747]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Nombre de Usuario' : 'Username'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs font-mono text-[#0F2747]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Correo Electrónico' : 'Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs text-[#0F2747]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0F2747]">
                    {isEs ? 'Rol Asignado' : 'Role'}
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as any })}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#DCC9A7] text-xs text-[#0F2747]"
                  >
                    <option value="super_admin">Super Administrador</option>
                    <option value="notary">Notario Público</option>
                    <option value="agent">Agente de Trámites</option>
                    <option value="translator">Traductor Jurado</option>
                  </select>
                </div>
              </div>

              {/* Password update section */}
              <div className="p-3 bg-white rounded-xl border border-[#DCC9A7] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F2747]">
                  <Key className="w-3.5 h-3.5 text-[#C9A96B]" />
                  <span>{isEs ? 'Actualizar Contraseña' : 'Update Password'}</span>
                </div>
                <p className="text-[11px] text-[#887D6B]">
                  {isEs
                    ? 'Deje este campo en blanco si desea conservar la contraseña actual.'
                    : 'Leave blank to keep the current password unchanged.'}
                </p>
                <input
                  type="text"
                  value={editForm.newPassword}
                  onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                  placeholder={isEs ? 'Nueva contraseña (ej. Antunez0105)' : 'New password'}
                  className="w-full p-2 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7] text-xs font-mono text-[#0F2747]"
                />
              </div>

              {/* Status toggle */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#DCC9A7]">
                <span className="text-xs font-bold text-[#0F2747]">
                  {isEs ? 'Estado de la Cuenta' : 'Account Status'}
                </span>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                  className="p-1.5 bg-[#F8F6F1] rounded-lg border border-[#DCC9A7] text-xs font-semibold text-[#0F2747]"
                >
                  <option value="active">{isEs ? 'Activo' : 'Active'}</option>
                  <option value="inactive">{isEs ? 'Inactivo' : 'Inactive'}</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#DCC9A7]/40">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-[#DCC9A7] text-xs font-semibold text-[#887D6B] hover:bg-white"
                >
                  {isEs ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F2747] hover:bg-[#16355C] text-white text-xs font-bold shadow-sm"
                >
                  {isEs ? 'Guardar Cambios' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMACIÓN DE BORRADO */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-red-200 overflow-hidden p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-lg font-bold text-[#0F2747]">
              {isEs ? '¿Eliminar este Usuario?' : 'Delete User Account?'}
            </h3>

            <p className="text-xs text-[#887D6B] leading-relaxed">
              {isEs
                ? `¿Está seguro de que desea eliminar a "${deletingUser.fullName}" (@${deletingUser.username})? Esta acción revocará de inmediato sus accesos al CRM.`
                : `Are you sure you want to remove "${deletingUser.fullName}" (@${deletingUser.username})? This will immediately revoke CRM access.`}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingUser(null)}
                className="flex-1 py-2 px-3 rounded-xl border border-[#DCC9A7] text-xs font-semibold text-[#887D6B] hover:bg-[#F8F6F1]"
              >
                {isEs ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm"
              >
                {isEs ? 'Sí, Eliminar' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
