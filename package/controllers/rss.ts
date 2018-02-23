import xorBy from 'lodash/xorBy';
import intersectionBy from 'lodash/intersectionBy';

import { getVacantions } from '../utils/api';
import { getAllUsers } from './user';
import { bot } from '../bot';
import { vacancyMessage } from './messages';
import { HtmlData } from '../interfaces';


let ALL_VACANCIES: HtmlData[] = [];

export const initialRequest = async () => {
  ALL_VACANCIES = await getVacantions({
    city: 'Киев',
    category: 'Front End',
  });
}

export const hunt = async () => {
  const allVac = await getVacantions({
    city: 'Киев',
    category: 'Front End',
  });

  const newVac = xorBy<HtmlData>(ALL_VACANCIES, allVac, 'id');
  const vacToRemove = intersectionBy<HtmlData, HtmlData>(ALL_VACANCIES, allVac, 'id');

  ALL_VACANCIES = allVac;

  console.log(newVac);
  console.log(vacToRemove);

  const allUsers = await getAllUsers();
  allUsers.forEach(async user => {
    const text = newVac.map(vacancyMessage).join('\n')

    await bot.sendMessage(user.tel_id, text, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
  });
}