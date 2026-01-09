
export enum Company {
  PENTEC = 'Pentec',
  SAMOO = 'Samoo'
}

export interface SignatureData {
  company: Company;
  photoUrl: string;
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  areaText: string;
}

export interface CanvasConfig {
  width: number;
  height: number;
}
