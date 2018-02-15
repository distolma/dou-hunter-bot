import axios from 'axios';

import { xmlParser } from './xml-parser';

const { SOURCE_URL } = process.env;

export const getVacantions = (cities: string, category: string) =>
  axios.get(SOURCE_URL, {
    params: { cities, category },
    transformResponse: [
      data => xmlParser(data),
    ],
  })
    .then(({ data }) => data)
    .then(({ rss }) => rss.channel.item);