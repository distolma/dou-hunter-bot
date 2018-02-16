import axios from 'axios';

import { xmlParser } from './xml-parser';
import { DouRSS, UserVacancies } from '../interfaces';

const { SOURCE_URL } = process.env;

export const getVacantions = (params: UserVacancies) =>
  axios.get<DouRSS>(SOURCE_URL, {
    params,
    transformResponse: [
      data => xmlParser(data),
    ],
  })
    .then(({ data }) => data)
    .then(({ rss }) => rss.channel.item);