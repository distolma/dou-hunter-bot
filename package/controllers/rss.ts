import { getVacantions } from '../utils/api';
import { getAllUsers } from './user';
import { bot } from '../bot';

let LAST_UPDATE: Date;

export const getVar = async () => {
  const allUsers = await getAllUsers();

  const vac = await getVacantions('Киев', 'Front End');

  allUsers.forEach(user => {
    bot.sendMessage(user.tel_id, vac[0].description, {
      // parse_mode: 'HTML',
    })
  })
}