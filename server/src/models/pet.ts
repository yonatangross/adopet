import { IPet } from '../interfaces/IPet';
import { Model, model, Schema } from 'mongoose';

const petSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
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
    isAdopted: {
      type: Boolean,
      required: true
    },
    primaryPicture: {
      type: String,
      required: true
    }
  },

  { timestamps: true }
);

const Pet: Model<IPet> = model<IPet>("Pet", petSchema);

export default Pet;
