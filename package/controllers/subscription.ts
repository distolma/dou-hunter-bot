import { IVacanciesInquiries, IVacancy } from '../interfaces';
import { getTokens, getVacanciesTemplate } from '../utils/api';

export const createVacanciesRequests = async (
  inquiries: IVacanciesInquiries,
) => {
  const tokens = await getTokens();
  const requests: Array<Promise<IVacancy[]>> = [];
  const getVacancies = getVacanciesTemplate(tokens);

  for (const category in inquiries) {
    inquiries[category].forEach(city => {
      requests.push(getVacancies({ category, city }));
    });
  }

  return requests;
};
