import { emoji } from 'node-emoji';

import { IUser } from '../db/models/User';
import { HtmlData } from '../interfaces';
import { ICategory } from '../data/categories';
import { ICity } from '../data/cities';

export const welcomeMessage = (user: IUser) => `
Hi, ${user.first_name}!
`;

export const welcomeMessageToNew = (user: IUser) => `
Welcome to DOU Hunter, ${user.first_name}!
`;

export const vacancyMessage = (vacancy: HtmlData) => `
${vacancy.hot ? emoji.fire + ' ' : ''}[${vacancy.title}](${vacancy.url}) at *${
  vacancy.company
}*
${vacancy.description}
`;

export const setConfigList = (cities: ICategory[] | ICity[]) =>
  cities.map((city, index) => `/${index + 1} - ${city.title}`).join('\n');
