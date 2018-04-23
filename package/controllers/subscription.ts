import {
  IVacanciesInquiries,
  IDOUResponse,
  IVacancyTree,
  IVacancy,
} from '../interfaces';
import { getTokens, getVacanciesTemplate } from '../utils/api';
import { findActiveUsers } from './user';
import { vacancyMessage } from '../templates';
import { bot } from '../bot';
import { IUserModel } from '../db/models/User';
import { VacancyTree } from '../utils/vacancy-tree';

export const createVacanciesRequests = async (
  inquiries: IVacanciesInquiries,
) => {
  const tokens = await getTokens();
  const requests: Array<Promise<IDOUResponse>> = [];
  const getVacancies = getVacanciesTemplate(tokens);

  for (const category in inquiries) {
    if (inquiries.hasOwnProperty(category)) {
      inquiries[category].forEach(city => {
        requests.push(getVacancies({ category, city }));
      });
    }
  }

  const response = await Promise.all(requests);
  return new VacancyTree(response);
};

export const notifyUsers = async (tree: IVacancyTree) => {
  for (const category in tree) {
    if (tree.hasOwnProperty(category)) {
      const categoryObj = tree[category];

      for (const city in categoryObj) {
        if (categoryObj.hasOwnProperty(city)) {
          const vacancies = categoryObj[city];

          const messages = messageDivisor(vacancies);
          const users = await findActiveUsers({ category, city });

          sendMessages(users, messages);
        }
      }
    }
  }
};

export const sendMessages = (users: IUserModel[], messages: string[]) =>
  messages.reduce(
    (promise, message) => promise.then(() => sendMessage(users, message)),
    Promise.resolve<any>(0),
  );

export const sendMessage = (users: IUserModel[], message: string) =>
  users.reduce(
    (promise, user) =>
      promise.then(() =>
        bot
          .sendMessage(user.tel_id, message, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
          })
          .catch(() => console.log(`chat not found ${user.tel_id}`)),
      ),
    Promise.resolve<any>(0),
  );

export const messageDivisor = (messages: IVacancy[]) => {
  const MAX_CHARACTERS = 4096;
  const dividedMessage: string[] = [];
  let stringAcc: string = '';

  for (const [index, message] of messages.entries()) {
    const newMessage = vacancyMessage(message) + '\n';
    const tempString = stringAcc + newMessage;

    if (Buffer.byteLength(tempString, 'utf8') >= MAX_CHARACTERS) {
      dividedMessage.push(stringAcc);
      stringAcc = newMessage;
    } else {
      stringAcc = tempString;
    }

    if (index + 1 === messages.length) {
      dividedMessage.push(stringAcc);
    }
  }

  return dividedMessage;
};
