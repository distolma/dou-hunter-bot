import { getVacantions } from '../utils/api';
import { getAllUsers } from './user';
import { bot } from '../bot';

let LAST_UPDATE: number = Date.now();

export const getVar = async () => {
  const allUsers = await getAllUsers();

  const vac = await getVacantions({
    cities: 'Киев',
    category: 'Front End',
  });

  const aa = vac.filter((data) => {
    const pubDate = (new Date(data.pubDate)).getTime();
    return pubDate > LAST_UPDATE - (30 * 60000)
  })


  // allUsers.forEach(user => {
  //   bot.sendMessage(user.tel_id, vac[0].guid, {
  //     // parse_mode: 'HTML',
  //   })
  // })
}