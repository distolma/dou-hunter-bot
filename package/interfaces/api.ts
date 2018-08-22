import { ContextMessageUpdate } from 'telegraf';

import { IUserDocument } from '../db/models/User';

export interface IVacancy {
  id: number;
  title: string;
  company: string;
  cities: string[];
  description: string;
  hot: boolean;
  url: string;
  category: string;
}

export interface IUser {
  tel_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  city?: string;
  category?: string;
  status: 'active' | 'pause' | 'pending';
  createdAt: number;
  updatedAt: number;
}

export interface IDOUTokens {
  csrftoken: string;
  csrfmiddlewaretoken: string;
}

export interface IDOUXHRResponse {
  html: string;
  last: boolean;
  num: number;
}

export interface IDOUParams {
  city: string;
  category: string;
  remote?: boolean;
  relocation?: boolean;
  beginners?: boolean;
}

export interface IDOUResponse extends IVacancy, IDOUParams {}

export interface IBotContext extends ContextMessageUpdate {
  state: {
    user: IUserDocument;
  };
}
