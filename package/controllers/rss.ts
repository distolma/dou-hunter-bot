import xorBy from 'lodash/xorBy';
import unionBy from 'lodash/unionBy';

import { getVacantions } from '../utils/api';
// import { getAllUsers } from './user';
import { bot } from '../bot';
import { vacancyMessage } from '../templates';
import { HtmlData } from '../interfaces';
import User from '../db/models/User';

let ALL_VACANCIES: HtmlData[] = [];

export const initialRequest = async () => {
  ALL_VACANCIES = await getVacantions({
    city: 'Киев',
    category: 'Front End',
  });
};

export const hunt = async () => {
  const allVac = await getVacantions({
    city: 'Киев',
    category: 'Front End',
  });

  const newVac = xorBy<HtmlData>(ALL_VACANCIES, allVac.splice(0, 15), 'id');

  ALL_VACANCIES = unionBy(ALL_VACANCIES, 'id');

  const allUsers = await User.find();
  allUsers
    .filter(user => user.status === 'active')
    .forEach(async user => {
      const text = newVac.map(vacancyMessage).join('\n');

      if (text) {
        await bot.sendMessage(user.tel_id, text, {
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        });
      }
    });
};
