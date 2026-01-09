
import React, { useState } from 'react';
import { Company, SignatureData } from '../types';
import { COLORS } from '../constants';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ data, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const brandColor = data.company === Company.SAMOO ? COLORS.samoo.primary : COLORS.pentec.primary;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      {/* 1. Foto de Perfil */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Foto del Perfil</label>
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ 
            borderColor: isDragging ? brandColor : '#e2e8f0',
            backgroundColor: isDragging ? `${brandColor}05` : 'transparent',
            borderStyle: isDragging ? 'solid' : 'dashed'
          }}
          className="relative group overflow-hidden rounded-2xl border-2 transition-all cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex items-center gap-6 p-4">
            <div className="relative flex-shrink-0">
              <img 
                src={data.photoUrl} 
                alt="Preview" 
                className="w-20 h-20 object-cover shadow-sm transition-all duration-300 group-hover:scale-105 rounded-full"
                style={{ 
                  border: `3px solid ${brandColor}`,
                  outline: isDragging ? `2px solid ${brandColor}` : 'none',
                  padding: '0' // Aseguramos que no haya padding blanco
                }}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">
                {isDragging ? '¡Suelta la imagen aquí!' : 'Fotografía del empleado'}
              </p>
              <p className="text-xs text-slate-400">Arrastra una imagen o haz clic para cambiar</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Información Personal */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Identidad</label>
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
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Contacto y Área</label>
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
