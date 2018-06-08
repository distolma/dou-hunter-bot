import { flatten } from 'lodash';

import {
  IVacanciesInquiries,
  IDOUResponse,
  // IVacancyTree,
  IVacancy,
} from '../interfaces';
import { getTokens, getVacanciesTemplate } from '../utils/api';
// import { findActiveUsers } from './user';
import { vacancyMessage } from '../templates';
import { bot } from '../bot';
import { IUserDocument } from '../db/models/User';
import { Vacancy } from '../db';
import { IVacancyDocument } from '../db/models/Vacancy';
// import { VacancyTree } from '../utils/vacancy-tree';

const mapToInquiry = (acc, { category, city }: IUserDocument) => {
  if (category && city) {
    if (!acc[category]) acc[category] = new Set();
    acc[category].add(city);
  }
  return acc;
};

export const createVacanciesRequests = async (activeUsers: IUserDocument[]) => {
  const inquiries: IVacanciesInquiries = activeUsers.reduce(mapToInquiry, {});
  const tokens = await getTokens();
  const getVacancies = getVacanciesTemplate(tokens);
  const requests: Array<Promise<IDOUResponse[]>> = [];

  for (const category in inquiries) {
    if (inquiries.hasOwnProperty(category)) {
      inquiries[category].forEach(city => {
        requests.push(getVacancies({ category, city }));
      });
    }
  }

  const response = await Promise.all(requests);
  console.log(JSON.stringify(response, null, 2));

  const a = await Vacancy.insertVacancies(flatten(response));

  if (a) {
    activeUsers.forEach(user => {
      const j = a.filter(
        b => b.cities.includes(user.city) && b.category === user.category,
      );
      if (j.length) {
        notUser(user, j);
      }
    });
  }
  // return new VacancyTree(response);
};

const notUser = (user: IUserDocument, vacancies: IVacancyDocument[]) => {
  bot
    .sendMessage(user.tel_id, vacancies[0].title, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    })
    .catch(() => console.log(`chat not found ${user.tel_id}`));
};

// export const notifyUsers = async (tree: IVacancyTree) => {
//   for (const category in tree) {
//     if (tree.hasOwnProperty(category)) {
//       const categoryObj = tree[category];

//       for (const city in categoryObj) {
//         if (categoryObj.hasOwnProperty(city)) {
//           const vacancies = categoryObj[city];

//           const messages = messageDivisor(vacancies);
//           const users = await findActiveUsers({ category, city });

//           sendMessages(users, messages);
//         }
//       }
//     }
//   }
// };

// export const sendMessages = (users: IUserDocument[], messages: string[]) =>
//   messages.reduce(
//     (promise, message) => promise.then(() => sendMessage(users, message)),
//     Promise.resolve<any>(0),
//   );

// export const sendMessage = (users: IUserDocument[], message: string) =>
//   users.reduce(
//     (promise, user) =>
//       promise.then(() =>
//         bot
//           .sendMessage(user.tel_id, message, {
//             parse_mode: 'Markdown',
//             disable_web_page_preview: true,
//           })
//           .catch(() => console.log(`chat not found ${user.tel_id}`)),
//       ),
//     Promise.resolve<any>(0),
//   );

// export const messageDivisor = (messages: IVacancy[]) => {
//   const MAX_CHARACTERS = 4096;
//   const dividedMessage: string[] = [];
//   let stringAcc: string = '';

//   for (const [index, message] of messages.entries()) {
//     const newMessage = vacancyMessage(message) + '\n';
//     const tempString = stringAcc + newMessage;

//     if (Buffer.byteLength(tempString, 'utf8') >= MAX_CHARACTERS) {
//       dividedMessage.push(stringAcc);
//       stringAcc = newMessage;
//     } else {
//       stringAcc = tempString;
//     }

//     if (index + 1 === messages.length) {
//       dividedMessage.push(stringAcc);
//     }
//   }

//   return dividedMessage;
// };

export const messageDivisor2 = (messages: IVacancy[]) => {
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
