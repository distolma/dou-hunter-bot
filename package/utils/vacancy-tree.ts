// import { transform, differenceBy, isArray, isEmpty } from 'lodash';

// import { IDOUResponse, IVacancyTree } from '../interfaces';

// export class VacancyTree {
//   private _vacancyTree: IVacancyTree;

//   constructor(vacancies: Array<IDOUResponse>) {
//     this._vacancyTree = this.parseToTree(vacancies);
//   }

//   public get value(): IVacancyTree {
//     return this._vacancyTree;
//   }

//   public returnNew(tree: IVacancyTree): IVacancyTree {
//     return this.difference(tree, this.value);
//   }

//   private parseToTree(vacancies: Array<IDOUResponse>): IVacancyTree {
//     return vacancies.reduce<IVacancyTree>((tree, { params, vacancies }) => {
//       const { category, city } = params;

//       if (!tree[category]) tree[category] = {};
//       if (!tree[category][city]) tree[category][city] = [];
//       tree[category][city] = vacancies;

//       return tree;
//     }, {});
//   }

//   private difference(object, base): any {
//     return transform(object, (result, value, key) => {
//       if (!base[key]) return (result[key] = value);

//       if (isArray(value) && isArray(base[key])) {
//         const arrDiff = differenceBy(value, base[key], 'id');
//         if (!isEmpty(arrDiff)) result[key] = arrDiff;
//       } else {
//         const diff = this.difference(value as any, base[key]);
//         if (!isEmpty(diff)) result[key] = diff;
//       }
//     });
//   }
// }
