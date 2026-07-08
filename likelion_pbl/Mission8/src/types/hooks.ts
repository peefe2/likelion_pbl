import type { ChangeEvent } from 'react';
import type { Lion, LionFormData, Status } from './lion';

export interface UseLionsReturn {
  lions: Lion[];
  status: Status;
  errorMsg: string;
  fetchUsers: (count: number, isRefresh?: boolean) => Promise<void>;
  addLion: (lion: Lion) => void;
  deleteLast: () => void;
  retry: () => void;
}

export interface UseFormReturn {
  show: boolean;
  form: LionFormData;
  fillLoading: boolean;
  toggle: () => void;
  close: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isValid: () => boolean;
  buildLion: () => Lion;
  randomFill: () => Promise<void>;
}
