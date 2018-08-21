import axios, { AxiosInstance } from 'axios';
import cookie from 'cookie';

import { Parser } from './parser';
import { IDOUParams, IDOUXHRResponse } from '../interfaces';
import { Categories } from '../dictionaries/categories';
import { Cities } from '../dictionaries/cities';

const { SOURCE_URL, XHR_URL } = process.env;

export class Api {
  private csrftoken: string = null;
  private csrfmiddlewaretoken: string = null;
  private client: AxiosInstance = null;

  constructor() {
    this.client = axios.create();
  }

  private mapParams(params: IDOUParams): IDOUParams {
    switch (true) {
      case (params.category === Categories.Beginners):
        delete params.category;
        params.beginners = true;
        return params;

      case (params.city === Cities.Remote):
        delete params.city;
        params.remote = true;
        return params;

      case (params.city === Cities.Relocation):
        delete params.city;
        params.relocation = true;
        return params;

      default:
        return params;
    }
  }

  public async getTokens() {
    const response = await this.client.get<string>(SOURCE_URL);
    const { csrftoken } = cookie.parse(response.headers['set-cookie'][0]);
    const csrfmiddlewaretoken = Parser.create(
      response.data,
    ).getCSRFMiddlewareToken();

    this.csrftoken = csrftoken;
    this.csrfmiddlewaretoken = csrfmiddlewaretoken;
  }

  public async getVacancies(params: IDOUParams) {
    if (!this.csrfmiddlewaretoken) {
      return [];
    }

    params = this.mapParams(params);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer: SOURCE_URL,
      Cookie: [
        cookie.serialize('csrftoken', this.csrftoken),
        cookie.serialize('lang', 'en'),
      ].join('; '),
    };

    try {
      const { data } = await this.client.post<IDOUXHRResponse>(
        XHR_URL,
        `csrfmiddlewaretoken=${this.csrfmiddlewaretoken}`,
        { params, headers },
      );

      return Parser.create(data.html).getVacancies(params.category);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }
}
