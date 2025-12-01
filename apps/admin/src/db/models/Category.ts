import pkg from 'mongoose';
import type { Model, Document } from 'mongoose';

const { Schema, model, models } = pkg;

export interface ICategory extends Document {
  title: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
  },
  { timestamps: true },
);

const Category: Model<ICategory> = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
