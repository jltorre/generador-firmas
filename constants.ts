
import { Company, SignatureData } from './types';

export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 300;

// URLs externas proporcionadas por el usuario
export const BACKGROUNDS = {
  pentec: 'https://i.ibb.co/vxP6mLKv/BG-pentec.png', 
  samoo: 'https://i.ibb.co/cScYJdV2/BG-samoo.png'
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
  photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  name: 'Jane Doe',
  jobTitle: 'Responsable de Proyectos E-learning',
  phone: '+34 963 93 74 33',
  email: 'j.doe@pentec.es',
  website: 'www.pentec.es',
  areaText: 'Área de Innovación Digital'
};
