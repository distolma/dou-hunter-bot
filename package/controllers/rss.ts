import xorBy from 'lodash/xorBy';
import intersectionBy from 'lodash/intersectionBy';

import { getVacantions } from '../utils/api';
import { getAllUsers } from './user';
import { bot } from '../bot';
import { HtmlData } from '../interfaces';


let ALL_VACANCIES: HtmlData[] = [];

// export const getVar = async () => {
//   const allUsers = await getAllUsers();

//   const vac = await getVacantions({
//     cities: 'Киев',
//     category: 'Front End',
//   });

//   // const aa = vac.filter((data) => {
//   //   const pubDate = (new Date(data.pubDate)).getTime();
//   //   return pubDate > LAST_UPDATE - (30 * 60000)
//   // })
// }

export const initialRequest = async () => {
  ALL_VACANCIES = await getVacantions({
    cities: 'Киев',
    category: 'Front End',
  });
}

export const hunt = async () => {
  const allVac = await getVacantions({
    cities: 'Киев',
    category: 'Front End',
  });

  const newVac = xorBy<HtmlData>(ALL_VACANCIES, allVac, 'id');
  const vacToRemove = intersectionBy<HtmlData, HtmlData>(ALL_VACANCIES, allVac, 'id');

  ALL_VACANCIES = allVac;

  console.log(newVac);
  console.log(vacToRemove);

  const allUsers = await getAllUsers();
  allUsers.forEach(user => {
    newVac.forEach(vacItem => {
      bot.sendMessage(user.tel_id, vacItem.title, {
        // parse_mode: 'HTML',
      })
    })
  })
}