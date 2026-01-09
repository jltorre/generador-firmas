
import React, { useEffect, useRef, useState } from 'react';
import { Company, SignatureData } from '../types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLORS, BACKGROUNDS } from '../constants';

interface SignaturePreviewProps {
  data: SignatureData;
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const drawCountRef = useRef(0);

  const isSamoo = data.company === Company.SAMOO;
  const brandColor = isSamoo ? COLORS.samoo.primary : COLORS.pentec.primary;

  const drawSignature = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Incrementar contador de renderizado para detectar llamadas obsoletas
    const drawId = ++drawCountRef.current;
    setIsRendering(true);

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    const colors = isSamoo ? COLORS.samoo : COLORS.pentec;
    const defaultBgPath = isSamoo ? BACKGROUNDS.samoo : BACKGROUNDS.pentec;
    const currentBgPath = data.customBackgroundUrl || defaultBgPath;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = currentBgPath;
    
    const bgLoaded = await new Promise<boolean>((resolve) => {
      bgImg.onload = () => resolve(true);
      bgImg.onerror = () => resolve(false);
    });

    // Si ha empezado otro renderizado, abortamos este
    if (drawId !== drawCountRef.current) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (bgLoaded) {
      ctx.drawImage(bgImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } else {
      ctx.fillStyle = isSamoo ? '#333333' : '#FFFFFF';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    const contentYCenter = CANVAS_HEIGHT / 2;
    const photoSize = 150; 
    const photoX = 165 - (photoSize / 2);
    const photoY = (contentYCenter + 35) - (photoSize / 2);
    const textStartX = 300;

    const centerX = Math.floor(photoX + photoSize / 2);
    const centerY = Math.floor(photoY + photoSize / 2);
    const radius = photoSize / 2;

    if (data.photoUrl) {
      const userImg = new Image();
      if (data.photoUrl.startsWith('http')) userImg.crossOrigin = "anonymous";
      userImg.src = data.photoUrl;
      
      const userImgLoaded = await new Promise<boolean>((resolve) => {
        userImg.onload = () => resolve(true);
        userImg.onerror = () => resolve(false);
      });

      // Si ha empezado otro renderizado, abortamos este
      if (drawId !== drawCountRef.current) return;

      if (userImgLoaded) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        const aspect = userImg.width / userImg.height;
        let drawW, drawH, drawX, drawY;
        
        if (aspect > 1) {
          drawH = photoSize;
          drawW = photoSize * aspect;
        } else {
          drawW = photoSize;
          drawH = photoSize / aspect;
        }
        
        drawX = centerX - drawW / 2;
        drawY = centerY - drawH / 2;

        ctx.drawImage(userImg, drawX, drawY, drawW, drawH);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.textAlign = 'left';
    const secondaryTextColor = isSamoo ? 'rgba(255, 255, 255, 0.75)' : 'rgba(85, 85, 85, 0.8)';

    // 1. Definir presencia de campos opcionales
    const hasJob = !!data.jobTitle;
    const hasArea = !!data.areaText;

    // 2. Definir gaps y calcular posiciones relativas (baselines)
    const gapNameJob = 37;
    const gapJobArea = 30;
    const gapAreaContact = 28;
    const contactLineHeight = 21;

    let bName = 0;
    let bJob = 0;
    let bArea = 0;
    let bContact1 = 0;

    let currentRelY = 0;
    bName = currentRelY;

    if (hasJob) {
      currentRelY += gapNameJob;
      bJob = currentRelY;
    }

    if (hasArea) {
      currentRelY += (hasJob ? gapJobArea : gapNameJob);
      bArea = currentRelY;
    }

    // 4. Determinar campos de contacto presentes
    const contactFields = [
      { key: 'phone', value: data.phone },
      { key: 'email', value: data.email },
      { key: 'website', value: data.website }
    ].filter(f => !!f.value);

    // 5. Calcular posiciones de contacto y altura total
    // El bloque de contacto siempre empieza después del bloque superior (John Smith / Puesto / Area)
    // Añadimos un margen de seguridad (gapAreaContact)
    const safetyGap = hasArea ? gapAreaContact : (hasJob ? gapAreaContact + 5 : gapAreaContact + 15);
    let currentContactRelY = currentRelY + safetyGap;
    
    const contactPositions: number[] = [];
    contactFields.forEach((_, index) => {
      contactPositions.push(currentContactRelY + (index * contactLineHeight));
    });

    const bLastContact = contactPositions.length > 0 ? contactPositions[contactPositions.length - 1] : currentRelY;

    // 6. Calcular altura total para centrado
    const baselineRange = bLastContact - bName;
    const topPadding = 28; 
    const bottomPadding = 5; 
    const totalBlockHeight = baselineRange + topPadding + bottomPadding;

    const CONTENT_CENTER_Y = 195; 
    const startY = (CONTENT_CENTER_Y - (totalBlockHeight / 2)) + topPadding;

    // 7. Dibujar Bloques Principales
    ctx.fillStyle = colors.textMain;
    ctx.font = '500 36px Poppins';
    ctx.fillText(data.name, textStartX, startY + bName);

    if (hasJob) {
      ctx.font = '500 24px Poppins';
      ctx.fillText(data.jobTitle, textStartX, startY + bJob);
    }

    if (hasArea) {
      ctx.font = '400 17px Poppins';
      ctx.fillStyle = secondaryTextColor;
      ctx.fillText(data.areaText, textStartX, startY + bArea);
    }

    // 8. Dibujar Contacto y Línea Vertical
    if (contactFields.length > 0) {
      const firstY = startY + contactPositions[0];
      const lastY = startY + contactPositions[contactPositions.length - 1];
      
      ctx.strokeStyle = secondaryTextColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      // Pequeño ajuste para que no pegue demasiado arriba si solo hay una línea
      const lineTopOffset = contactFields.length === 1 ? 10 : 14;
      ctx.moveTo(textStartX, firstY - lineTopOffset);
      ctx.lineTo(textStartX, lastY + 4);
      ctx.stroke();

      ctx.font = '400 15px Poppins';
      ctx.fillStyle = secondaryTextColor;
      const indent = 16; 
      
      contactFields.forEach((field, index) => {
        ctx.fillText(field.value, textStartX + indent, startY + contactPositions[index]);
      });
    }
    
    setIsRendering(false);
  };

  useEffect(() => {
    const render = async () => {
      if (document.fonts) await document.fonts.ready;
      drawSignature();
    };
    render();
  }, [data]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `firma-${data.company.toLowerCase()}-${data.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Error al descargar.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full overflow-hidden bg-white p-2 border border-slate-200 shadow-inner">
        <div className="relative"> 
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className={`w-full h-auto transition-opacity duration-300 ${isRendering ? 'opacity-60' : 'opacity-100'}`}
          />
          {isRendering && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
              <div 
                style={{ borderTopColor: 'transparent', borderColor: brandColor }}
                className="w-10 h-10 border-4 rounded-full animate-spin"
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleDownload}
          disabled={isRendering}
          style={{ backgroundColor: brandColor, boxShadow: `0 10px 15px -3px ${brandColor}30` }}
          className="inline-flex items-center justify-center px-10 py-3 font-bold text-white transition-all duration-200 rounded-full hover:brightness-110 active:scale-95 shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Descargar Firma PNG
        </button>
      </div>
    </div>
  );
};

export default SignaturePreview;
