import axios, { AxiosInstance } from 'axios';
import cookie from 'cookie';

import { getCSRFMiddlewareToken, getVacancyList } from './parser';
import {
  IDOUParams,
  IDOUXHRResponse,
} from '../interfaces';

const { SOURCE_URL, XHR_URL } = process.env;

export class Api {
  private csrftoken: string = null;
  private csrfmiddlewaretoken: string = null;
  private client: AxiosInstance = null;

  constructor() {
    this.client = axios.create();
  }

  public async getTokens() {
    const response = await this.client.get<string>(SOURCE_URL);
    const { csrftoken } = cookie.parse(response.headers['set-cookie'][0]);
    const csrfmiddlewaretoken = getCSRFMiddlewareToken(response.data);

    this.csrftoken = csrftoken;
    this.csrfmiddlewaretoken = csrfmiddlewaretoken;
  }

  public async getVacancies(params: IDOUParams) {
    if (!this.csrfmiddlewaretoken) {
      return [];
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer: SOURCE_URL,
      Cookie: [
        cookie.serialize('csrftoken', this.csrftoken),
        cookie.serialize('lang', 'en'),
      ].join('; '),
    };

    try {
      const { data: { html } } = await this.client.post<IDOUXHRResponse>(
        XHR_URL,
        `csrfmiddlewaretoken=${this.csrfmiddlewaretoken}`,
        { params, headers },
      );

      return getVacancyList(html, params.category);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }
}