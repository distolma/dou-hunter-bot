import { parseString, OptionsV2 } from 'xml2js';
import $ from 'cheerio';

import { HtmlData } from '../interfaces';

const conf: OptionsV2 = {
  explicitArray: false,
  trim: true,
};

export const xmlParser = (xml: string) => new Promise((resolve, reject) =>
  parseString(xml, conf, (err, result) => {
    if (err) reject(err);
    resolve(result);
  }));

export const htmlParser = (html: string): HtmlData[] =>
  $.load(html)('li.l-vacancy', 'ul.lt').map((_, vacancy) => {
    const $vacancy = $(vacancy);

    return {
      id: +$vacancy.find('.vacancy').attr('_id'),
      title: $vacancy.find('.vt').text().trim() || '',
      company: $vacancy.find('.company').text().trim() || '',
      cities: $vacancy.find('.cities').text().split(', ') || [],
      description: $vacancy.find('.sh-info').text().trim() || '',
      hot: $vacancy.hasClass('__hot'),
      url: $vacancy.find('.vt').attr('href') || '',
    }
  }).toArray() as any;