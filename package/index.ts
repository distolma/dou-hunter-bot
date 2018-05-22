import './db';
import './routes';
import { getVacanciesInquiry } from './controllers/user';
import {
  createVacanciesRequests,
  notifyUsers,
} from './controllers/subscription';
import { VacancyTree } from './utils/vacancy-tree';
import { bot } from './bot';
import { start } from './server';

start(bot);

let VACANCIES: VacancyTree;

getVacanciesInquiry()
  .then(createVacanciesRequests)
  .then(data => (VACANCIES = data));

setInterval(() => {
  getVacanciesInquiry()
    .then(createVacanciesRequests)
    .then(data => {
      const newTree = VACANCIES.returnNew(data.value);
      VACANCIES = data;
      return newTree;
    })
    .then(notifyUsers);
}, 30 * 60 * 1000);
