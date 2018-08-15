import $ from 'cheerio';

import { IVacancy } from '../interfaces';

export const getVacancyList = (html: string, category: string) =>
  Array.from($.load(html)('.l-vacancy')).map<IVacancy>(vacancy => {
    const $vacancy = $(vacancy);

    return {
      id: +$vacancy.find('.vacancy').attr('_id'),
      title: $vacancy
        .find('.vt')
        .text()
        .trim(),

      url: $vacancy.find('.vt').attr('href'),
      company: $vacancy
        .find('.company')
        .text()
        .trim(),

      description: $vacancy
        .find('.sh-info')
        .text()
        .trim()
        .replace(/\n+/, '\n'),

      hot: $vacancy.hasClass('__hot'),
      cities: getCities(
        $vacancy
          .find('.cities')
          .text()
          .trim(),
      ),
      category,
    };
  });

export const getCSRFMiddlewareToken = (html: string) =>
  Array.from($.load(html)('script'))
    .filter(script => script.children.length)
    .filter(
      script => script.children[0].data.search('window.CSRF_TOKEN = ') !== -1,
    )
    .reduce(
      (_, script) =>
        script.children[0].data.match(/window.CSRF_TOKEN = "(.+)"/)[1],
      '',
    );

const getCities = (cities: string) => (cities.length ? cities.split(', ') : []);

// export class Parser {
//   private getText() {

//   }

//   public getCities(cities: string) {
//     return cities.length ? cities.split(', ') : [];
//   }

//   public getVacanyList(html: string, category: string) {
//     Array.from($.load(html)('.l-vacancy')).map<IVacancy>(vacancy => {
//       const $vacancy = $(vacancy);

//       return {
//         id: +$vacancy.find('.vacancy').attr('_id'),
//         title: escape(
//           $vacancy
//             .find('.vt')
//             .text()
//             .trim(),
//         ),
//         url: $vacancy.find('.vt').attr('href'),
//         company: escape(
//           $vacancy
//             .find('.company')
//             .text()
//             .trim(),
//         ),
//         description: escape(
//           $vacancy
//             .find('.sh-info')
//             .text()
//             .trim()
//             .replace(/\n+/, '\n'),
//         ),
//         hot: $vacancy.hasClass('__hot'),
//         cities: getCities(
//           $vacancy
//             .find('.cities')
//             .text()
//             .trim(),
//         ),
//         category,
//       };
//     });
//   }
// }
