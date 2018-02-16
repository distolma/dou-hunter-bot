export * from './api';

export interface UserVacancies {
  category?: string;
  cities?: string;
  relocation?: boolean;
  beginners?: boolean;
  remote?: boolean;
}