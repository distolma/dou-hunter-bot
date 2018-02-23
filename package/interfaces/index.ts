export * from './api';

export interface UserVacancies {
  category?: string;
  city?: string;
  relocation?: boolean;
  beginners?: boolean;
  remote?: boolean;
}