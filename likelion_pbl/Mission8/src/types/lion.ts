export type Part = 'Frontend' | 'Backend' | 'Design';

export type FilterValue = Part | 'all';

export type SortValue = 'latest' | 'name';

export type Status = 'idle' | 'loading' | 'error';

export interface Contact {
  email: string;
  phone: string;
  website: string;
}

export interface Lion {
  id: number;
  name: string;
  part: Part;
  org: string;
  summary: string;
  bio: string;
  skills: string[];
  contact: Contact;
  motto: string;
  badge: string;
  isMe: boolean;
  picture?: string;
}

export interface LionFormData {
  name: string;
  part: string;
  skills: string;
  summary: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  motto: string;
}
