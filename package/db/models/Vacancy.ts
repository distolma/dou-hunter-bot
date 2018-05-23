// import { Schema, model, Document } from 'mongoose';

// import { IVacancy } from '../../interfaces';
// import { categories } from '../../data/categories';
// import { cities } from '../../data/cities';

// export interface IVacancyDocument extends IVacancy, Document {
//   created: number;
//   category: string;
// }

// export const vacancySchema = new Schema({
//   $id: {
//     type: Number,
//     unique: true,
//   },
//   category: {
//     type: String,
//     enum: categories.map(category => category.value),
//   },
//   title: {
//     type: String,
//     trim: true,
//   },
//   cities: [
//     {
//       type: String,
//       enum: cities.map(city => city.value),
//     },
//   ],
//   company: {
//     type: String,
//     trim: true,
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   hot: Boolean,
//   url: String,
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default model<IVacancyDocument>('Vacancy', vacancySchema);
