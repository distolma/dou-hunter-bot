import { ExtraEditMessage } from 'telegraf/typings/telegram-types';

import { IVacancy, IUser } from '../interfaces';
import { bot } from '../bot';
import { IUserDocument } from '../db/models/User';
import { messageDivisor } from './messages-divisor';

export async function notifyUsers(
  users: IUserDocument[],
  vacs: IVacancy[],
): Promise<void> {
  users.forEach(async u => {
    const user: IUser = u.toObject();
    const vacanciesArray = vacs.filter(
      v => v.category === user.category && v.cities.includes(user.city),
    );

    const vacancies = messageDivisor(vacanciesArray);

    for (const message of vacancies) {
      try {
        await bot.telegram.sendMessage(user.tel_id, message, {
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        } as ExtraEditMessage);
      } catch (error) {
        console.log(error.message, user.tel_id);
        break;
      }
    }
  });
}
