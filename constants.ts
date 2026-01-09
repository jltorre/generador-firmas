
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
  phone: 'Telf: 963 93 74 33',
  email: 'j.doe@pentec.es',
  website: 'www.pentec.es',
  areaText: 'Área de Innovación Digital'
};

export const LEGAL_DISCLAIMER_ES = `Este correo electrónico y sus archivos adjuntos son confidenciales y están dirigidos exclusivamente a su destinatario. Si usted ha recibido este mensaje por error, le rogamos que lo elimine inmediatamente y lo comunique al remitente. Queda prohibida la difusión, copia o utilización de la información contenida en este correo por cualquier persona distinta a su destinatario. La divulgación no autorizada de su contenido puede ser sancionada conforme a la normativa vigente, en particular la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGP). No se autoriza el uso de las direcciones del remitente o del destinatario con fines comerciales ni su incorporación a ficheros automatizados sin el consentimiento expreso de los interesados.`;

export const LEGAL_DISCLAIMER_EN = `This email and any attachments are confidential and intended solely for the addressee. If you have received this message in error, please delete it immediately and notify the sender. Any disclosure, copying, distribution, or use of the information contained in this email by anyone other than the intended recipient is strictly prohibited. Unauthorized disclosure of its contents may be subject to penalties in accordance with applicable legislation, in particular Organic Law 3/2018 on the Protection of Personal Data and the guarantee of digital rights (LOPDGP). The use of the sender’s or recipient’s email addresses for commercial purposes or their inclusion in automated data files without the express consent of the data subjects is not authorized.`;
