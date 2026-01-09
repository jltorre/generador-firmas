
import React, { useState } from 'react';
import { Company, SignatureData } from '../types';
import { COLORS } from '../constants';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ data, onChange }) => {
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [isDraggingBg, setIsDraggingBg] = useState(false);
  const brandColor = data.company === Company.SAMOO ? COLORS.samoo.primary : COLORS.pentec.primary;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const processFile = (file: File, type: 'photo' | 'bg') => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'photo') {
          onChange({ ...data, photoUrl: result });
        } else {
          onChange({ ...data, customBackgroundUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, 'photo');
  };

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, 'bg');
  };

  const onDragOver = (e: React.DragEvent, setter: (val: boolean) => void) => {
    e.preventDefault();
    setter(true);
  };

  const onDragLeave = (setter: (val: boolean) => void) => {
    setter(false);
  };

  const onDrop = (e: React.DragEvent, setter: (val: boolean) => void, type: 'photo' | 'bg') => {
    e.preventDefault();
    setter(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file, type);
  };

  return (
    <div className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Foto de Perfil */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center h-6 pt-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Foto del Perfil</label>
          </div>
          <div 
            onDragOver={(e) => onDragOver(e, setIsDraggingPhoto)}
            onDragLeave={() => onDragLeave(setIsDraggingPhoto)}
            onDrop={(e) => onDrop(e, setIsDraggingPhoto, 'photo')}
            style={{ 
              borderColor: isDraggingPhoto ? brandColor : '#e2e8f0',
              backgroundColor: isDraggingPhoto ? `${brandColor}05` : 'transparent',
              borderStyle: isDraggingPhoto ? 'solid' : 'dashed'
            }}
            className="relative group overflow-hidden rounded-2xl border-2 transition-all cursor-pointer flex-1"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex items-center gap-4 p-4">
              <div className="relative flex-shrink-0">
                <img 
                  src={data.photoUrl} 
                  alt="Preview" 
                  className="w-16 h-16 object-cover shadow-sm transition-all duration-300 group-hover:scale-105 rounded-full"
                  style={{ 
                    border: `3px solid ${brandColor}`,
                    outline: isDraggingPhoto ? `2px solid ${brandColor}` : 'none',
                    padding: '0'
                  }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate">
                  {isDraggingPhoto ? '¡Suelta!' : 'Foto'}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">Haz clic o arrastra</p>
              </div>
            </div>
          </div>
        </div>

        {/* 1.5 Fondo de la Firma */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center h-6 pt-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Fondo (Opcional)</label>
            {data.customBackgroundUrl && (
              <button 
                onClick={() => onChange({ ...data, customBackgroundUrl: undefined })}
                title="Restaurar fondo por defecto"
                className="p-1 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all group/btn flex items-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
          </div>
          <div 
            onDragOver={(e) => onDragOver(e, setIsDraggingBg)}
            onDragLeave={() => onDragLeave(setIsDraggingBg)}
            onDrop={(e) => onDrop(e, setIsDraggingBg, 'bg')}
            style={{ 
              borderColor: isDraggingBg ? brandColor : '#e2e8f0',
              backgroundColor: isDraggingBg ? `${brandColor}05` : 'transparent',
              borderStyle: isDraggingBg ? 'solid' : 'dashed'
            }}
            className="relative group overflow-hidden rounded-2xl border-2 transition-all cursor-pointer flex-1"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleBgChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex items-center gap-4 p-4">
              <div className="relative flex-shrink-0">
                <div 
                  className="w-16 h-16 object-cover shadow-sm transition-all duration-300 group-hover:scale-105 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden"
                  style={{ 
                    border: `2px solid ${brandColor}40`,
                    outline: isDraggingBg ? `2px solid ${brandColor}` : 'none',
                  }}
                >
                  {data.customBackgroundUrl ? (
                    <img src={data.customBackgroundUrl} alt="Bg Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate">
                  {isDraggingBg ? '¡Suelta!' : 'Fondo'}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">Haz clic o arrastra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Información Personal */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Identidad</label>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Nombre y Apellidos"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-slate-300 transition-all font-bold text-slate-800"
          />
          <input
            type="text"
            name="jobTitle"
            value={data.jobTitle}
            onChange={handleChange}
            placeholder="Puesto / Cargo"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-slate-300 transition-all font-medium text-slate-700"
          />
        </div>
      </div>

      {/* 3. Contacto y Área */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Contacto y Área</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="areaText"
            value={data.areaText}
            onChange={handleChange}
            placeholder="Área / Departamento"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-slate-300 transition-all font-medium md:col-span-2"
          />
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-slate-300 transition-all"
          />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-slate-300 transition-all"
          />
          <input
            type="text"
            name="website"
            value={data.website}
            onChange={handleChange}
            placeholder="Sitio Web"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-slate-300 transition-all md:col-span-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SignatureForm;
