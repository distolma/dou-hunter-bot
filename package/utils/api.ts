import axios from 'axios';

import { htmlParser } from './xml-parser';
import { HtmlData, UserVacancies } from '../interfaces';

const { SOURCE_URL } = process.env;

export const getVacantions = (params: UserVacancies) =>
  axios.get<HtmlData[]>(SOURCE_URL, {
    params,
    transformResponse: [
      // data => xmlParser(data),
      data => htmlParser(data),
    ],
  })
    .then(({ data }) => data)
    // .then(({ rss }) => rss.channel.item);