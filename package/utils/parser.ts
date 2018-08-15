import cheerio from 'cheerio';

import { IVacancy } from '../interfaces';

const SELECTORS = {
  VACANCIES_LIST: '.l-vacancy',
  VACANCY: '.vacancy',
  COMPANY: '.company',
  INFO: '.sh-info',
  CITIES: '.cities',
  TITLE: '.vt',
  SCRIPT: 'script',
};

export class Parser {
  private $: CheerioStatic = null;

  public static create(html: string) {
    return new Parser(html);
  }

  public static getCities(cities: string) {
    return cities.length ? cities.split(', ') : [];
  }

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  private getTrimText(context: Cheerio, selector: string) {
    return context
      .find(selector)
      .text()
      .trim();
  }

  public getVacancies(category: string) {
    return this.$(SELECTORS.VACANCIES_LIST)
      .toArray()
      .map<IVacancy>(vacancy => {
        const $vacancy = this.$(vacancy);

        return {
          id: +$vacancy.find(SELECTORS.VACANCY).attr('_id'),
          title: this.getTrimText($vacancy, SELECTORS.TITLE),
          url: $vacancy.find(SELECTORS.TITLE).attr('href'),
          company: this.getTrimText($vacancy, SELECTORS.COMPANY),
          description: this.getTrimText($vacancy, SELECTORS.INFO).replace(
            /\n/g,
            '',
          ),
          hot: $vacancy.hasClass('__hot'),
          cities: Parser.getCities(
            this.getTrimText($vacancy, SELECTORS.CITIES),
          ),
          category,
        };
      });
  }

  public getCSRFMiddlewareToken() {
    return this.$(SELECTORS.SCRIPT)
      .toArray()
      .reduce((acc, scr) => {
        if (
          scr.children.length &&
          scr.children[0].data.search('window.CSRF_TOKEN = ') !== -1
        ) {
          return scr.children[0].data.match(/window.CSRF_TOKEN = "(.+)"/)[1];
        }
        return acc;
      }, '');
  }
}
