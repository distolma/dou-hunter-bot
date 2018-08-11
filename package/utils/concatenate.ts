import { IVacancy, IUserWithVacs } from '../interfaces';
import { IUser, IUserDocument } from '../db/models/User';
import { messageDivisor } from './messages-divisor';

export function concatenate(users: (IUser | IUserDocument)[], vacs: IVacancy[]): IUserWithVacs[] {
  return users.map(u => {
    const vacanciesArray = vacs.filter(v => v.category === u.category && v.cities.includes(u.city));
    const vacancies = messageDivisor(vacanciesArray);

    return { ...u, vacancies };
  });
};