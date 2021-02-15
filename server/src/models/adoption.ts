import { IAdoption } from './../types/IAdoption';
import { model, Schema } from 'mongoose';

const adoptionSchema: Schema = new Schema(
  {
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    adoptionRequest: {
      type: Schema.Types.ObjectId,
      ref: 'AdoptionRequest',
      required: true,
    },
    adoptionDate: {
      time: { type: Date, default: Date.now },
      required: true
    }
  },
  { timestamps: true }
);

export default model<IAdoption>('Adoption', adoptionSchema);
