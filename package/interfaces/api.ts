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
}

export interface IDOUResponse extends IVacancy, IDOUParams {}
