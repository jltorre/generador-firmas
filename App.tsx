
import React, { useState } from 'react';
import { Company, SignatureData } from './types';
import { DEFAULT_SIGNATURE, COLORS } from './constants';
import SignatureForm from './components/SignatureForm';
import SignaturePreview from './components/SignaturePreview';

const App: React.FC = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>(DEFAULT_SIGNATURE);

  const isSamoo = signatureData.company === Company.SAMOO;
  const brandColor = isSamoo ? COLORS.samoo.primary : COLORS.pentec.primary;

  const handleCompanyChange = (company: Company) => {
    setSignatureData(prev => ({ ...prev, company }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 transition-colors duration-500">
      <header className="mb-8 text-center">
        <div 
          style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-4"
        >
          <span style={{ backgroundColor: brandColor }} className="w-2 h-2 rounded-full animate-pulse"></span>
          HERRAMIENTA CORPORATIVA
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Generador de Firmas <span style={{ color: brandColor }}>{isSamoo ? 'Samoo' : 'Pentec'}</span>
        </h1>
      </header>

      {/* Selector de Empresa Global */}
      <div className="max-w-md mx-auto mb-12">
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex gap-2">
          {Object.values(Company).map((company) => {
            const isSelected = signatureData.company === company;
            const currentBrandColor = company === Company.SAMOO ? COLORS.samoo.primary : COLORS.pentec.primary;
            return (
              <button
                key={company}
                onClick={() => handleCompanyChange(company)}
                style={isSelected ? { 
                  backgroundColor: currentBrandColor,
                  color: '#white',
                  boxShadow: `0 4px 12px ${currentBrandColor}40`
                } : {}}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                  isSelected ? 'text-white scale-[1.02]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {company}
              </button>
            );
          })}
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ backgroundColor: brandColor }} className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold">1</div>
              <h2 className="text-2xl font-bold text-slate-800">Tus Datos</h2>
            </div>
            <SignatureForm data={signatureData} onChange={setSignatureData} />
          </section>
        </div>

        <div className="lg:col-span-7 space-y-8 sticky top-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ backgroundColor: brandColor }} className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold">2</div>
              <h2 className="text-2xl font-bold text-slate-800">Previsualización</h2>
            </div>
            <div className="bg-slate-200/30 p-8 rounded-2xl border-2 border-dashed border-slate-300">
              <SignaturePreview data={signatureData} />
            </div>
            
            <div 
              style={{ backgroundColor: `${brandColor}08`, borderColor: `${brandColor}20` }}
              className="mt-8 p-6 rounded-2xl border transition-colors duration-300"
            >
              <h3 style={{ color: brandColor }} className="font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instrucciones
              </h3>
              <ul style={{ color: `${brandColor}CC` }} className="text-sm space-y-2 list-disc list-inside font-medium">
                <li>Completa el formulario con tus datos reales.</li>
                <li>Sube una foto profesional con fondo neutro si es posible.</li>
                <li>Descarga la firma en formato PNG e insértala en tu correo.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {signatureData.company}. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
