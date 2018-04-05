import { IVacanciesInquiries, IDOUResponse, IVacancyTree } from '../interfaces';
import { getTokens, getVacanciesTemplate } from '../utils/api';
// import { getActiveUsers } from './user';

export const createVacanciesRequests = async (
  inquiries: IVacanciesInquiries,
) => {
  const tokens = await getTokens();
  const requests: Array<Promise<IDOUResponse>> = [];
  const getVacancies = getVacanciesTemplate(tokens);

  for (const category in inquiries) {
    inquiries[category].forEach(city => {
      requests.push(getVacancies({ category, city }));
    });
  }

  return Promise.all(requests);
};

export const mapResposeToTree = (response: Array<IDOUResponse>) => {
  const tree: IVacancyTree = {};

  response.forEach(({ params, vacancies }) => {
    const { category, city } = params;

    if (!tree[category]) tree[category] = {};
    if (!tree[category][city]) tree[category][city] = [];
    tree[category][city] = vacancies;
  });

  return tree;
};

// export const sendMessages = async (tree: IVacancyTree) => {
// const users = await getActiveUsers();
// };
