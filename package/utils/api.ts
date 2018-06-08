import axios from 'axios';
import cookie from 'cookie';

import { getCSRFMiddlewareToken, getVacancyList } from './parser';
import {
  IDOUTokens,
  IDOUParams,
  IDOUXHRResponse,
  IDOUResponse,
} from '../interfaces';

const { SOURCE_URL, XHR_URL } = process.env;

export const getTokens = () =>
  axios.get<string>(SOURCE_URL).then<IDOUTokens>(response => {
    const { csrftoken } = cookie.parse(response.headers['set-cookie'][0]);
    const csrfmiddlewaretoken = getCSRFMiddlewareToken(response.data);

    return { csrftoken, csrfmiddlewaretoken };
  });

export const getVacanciesTemplate = (tokens: IDOUTokens) => (
  params: IDOUParams,
) =>
  axios
    .post<IDOUXHRResponse>(
      XHR_URL,
      `csrfmiddlewaretoken=${tokens.csrfmiddlewaretoken}`,
      {
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Referer: SOURCE_URL,
          Cookie: [
            cookie.serialize('csrftoken', tokens.csrftoken),
            cookie.serialize('lang', 'en'),
          ].join('; '),
        },
      },
    )
    .then(response => response.data.html)
    .then(getVacancyList)
    .then<IDOUResponse[]>(vacancies =>
      vacancies.map(vacancy => ({ ...vacancy, ...params })),
    )
    .catch(() => {
      console.log('fuck');
      return [];
    });
