import { Schema, Model, Document } from 'mongoose';
import { differenceBy, uniqBy } from 'lodash';

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
  const vacanciesIds = vacancies.map(vac => vac.id);
  const existingVacancies = await this.find({
    id: { $in: vacanciesIds },
  }).exec();
  const notExistingVacancies = differenceBy(
    uniqBy(vacancies, 'id'),
    existingVacancies,
    'id',
  );

  return this.insertMany(notExistingVacancies, { ordered: false }).catch(err =>
    console.log(JSON.stringify(err, null, 2)),
  );
});
