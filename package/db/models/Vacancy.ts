import { Schema, Model, Document } from 'mongoose';

import { IVacancy, IDOUResponse } from '../../interfaces';
import { Categories } from '../../dictionaries/categories';
import { Cities } from '../../dictionaries/cities';

export interface IVacancyDocument extends IVacancy, Document {
  id: any;
  created: number;
  category: string;
}

export interface IVacancyModel extends Model<IVacancyDocument> {
  insertVacancies: (vacancies: IDOUResponse[]) => Promise<IVacancyDocument[]>;
}

export const VacancySchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      sparse: true,
    },
    category: {
      type: String,
      enum: Object.keys(Categories),
    },
    title: {
      type: String,
      trim: true,
    },
    cities: [
      {
        type: String,
        enum: Object.keys(Cities),
      },
    ],
    company: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    hot: Boolean,
    url: String,
  },
  { timestamps: true },
);

VacancySchema.index({ createdAt: 1 }, { expires: '1w' });

VacancySchema.static('insertVacancies', async function(
  this: IVacancyModel,
  vacancies: IDOUResponse[],
) {
  try {
    return await this.insertMany(vacancies, { ordered: false });
  } catch (error) {
    if (error.code !== 11000) {
      return console.log(JSON.stringify(error, null, 2));
    }
    return error.insertedDocs;
  }
});
