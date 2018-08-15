import { IUserWithVacs } from '../interfaces';
import { bot } from '../bot';

export function notifyUsers(users: IUserWithVacs[]) {
  users.forEach(async user => {
    for (const message of user.vacancies) {
      try {
        await bot.sendMessage(user.tel_id, message, {
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        });
      } catch (error) {
        console.log(error.message);
        break;
      }
    }
  });
}
