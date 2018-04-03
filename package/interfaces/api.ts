export interface IVacancy {
  id: number;
  title: string;
  company: string;
  cities: string[];
  description: string;
  hot: boolean;
  url: string;
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

export type IDOUParams =
  | IDOURelocationParams
  | IDOUBeginnersParams
  | IDOURemoteParams
  | IDOUCityParams;

interface IDOUCityParams {
  city: string;
  category: string;
}

interface IDOURelocationParams {
  relocation: boolean;
  category: string;
}

interface IDOUBeginnersParams {
  beginners: boolean;
  category: string;
}

interface IDOURemoteParams {
  remote: boolean;
  category: string;
}

export interface IVacancyMap {
  [key: string]: {
    [key: string]: IVacancy[];
  };
}

export interface IVacanciesInquiries {
  [key: string]: string[];
}
