// import './db';
import './routes';
import cron from 'node-cron';
// import { getVacanciesInquiry } from './controllers/user';
import {
  createVacanciesRequests,
  // notifyUsers,
} from './controllers/subscription';
// import { VacancyTree } from './utils/vacancy-tree';
// import { bot } from './bot';
// import { start } from './server';
import { User } from './db';

cron.schedule('*/1 * * * *', () => {
  console.log('running a task every 30 minute');
  console.log(new Date());
});
// console.log(cron());
// start(bot);

// let VACANCIES: VacancyTree;

User.getActives().then(createVacanciesRequests);

// getVacanciesInquiry().then(createVacanciesRequests);
// .then(data => (VACANCIES = data));

// setInterval(() => {
//   getVacanciesInquiry()
//     .then(createVacanciesRequests)
//     .then(data => {
//       const newTree = VACANCIES.returnNew(data.value);
//       VACANCIES = data;
//       return newTree;
//     })
//     .then(notifyUsers);
// }, 30 * 60 * 1000);
