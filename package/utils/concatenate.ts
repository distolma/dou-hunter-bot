import { IVacancy, IUserWithVacs } from '../interfaces';
import { IUser, IUserDocument } from '../db/models/User';
import { messageDivisor } from './messages-divisor';

export function concatenate(users: IUserDocument[], vacs: IVacancy[]): any[] {
  return users.map(u => {
    const user = u.toObject();
    const vacanciesArray = vacs.filter(
      v => v.category === user.category && v.cities.includes(user.city),
    );
    const vacancies = messageDivisor(vacanciesArray);

    return { ...user, vacancies };
  });
}
