import { emoji } from 'node-emoji';

import { IUser } from '../db/models/User';
import { IVacancy } from '../interfaces';

export const welcomeMessage = (user: IUser) => `
Hi, ${user.first_name}!
`;

export const welcomeMessageToNew = (user: IUser) => `
Welcome to DOU Hunter, ${user.first_name}!
`;

export const vacancyMessage = (vacancy: IVacancy) => `
${vacancy.hot ? emoji.fire + ' ' : ''}<a href="${vacancy.url}">${
  vacancy.title
}</a> at <b>${vacancy.company}</b>
${vacancy.description}
`;

export const setConfigList = (emun: Object) =>
  Object.keys(emun)
    .map((item, index) => `/${index + 1} - ${item}`)
    .join('\n');
