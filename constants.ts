
import { Company, SignatureData } from './types';

export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 300;

// URLs externas proporcionadas por el usuario
export const BACKGROUNDS = {
  pentec: '/BG_pentec.png', 
  samoo: '/BG_samoo.png'
};

export const COLORS = {
  pentec: {
    primary: '#1E64A5',
    textMain: '#1E64A5',
    textSecondary: '#555555',
    accent: '#1E64A5',
  },
  samoo: {
    primary: '#c15384',
    textMain: '#FFFFFF',
    textSecondary: '#E0E0E0',
    accent: '#c15384', 
  }
};

export const DEFAULT_SIGNATURE: SignatureData = {
  company: Company.PENTEC,
  photoUrl: '/avatar.png',
  name: 'Jane Doe',
  jobTitle: 'Responsable de Proyectos E-learning',
  phone: '+34 963 93 74 33',
  email: 'j.doe@pentec.es',
  website: 'www.pentec.es',
  areaText: 'Área de Innovación Digital'
};
