import { IPet } from '../types/IPet';
import { model, Schema } from 'mongoose';

const petSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    breed: {
      type: String,
      required: true,
    },
    animalType: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IPet>('Pet', petSchema);
