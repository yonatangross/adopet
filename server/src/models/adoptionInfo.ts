import { IAdoptionInfo } from '../types/IAdoptionInfo';
import { model, Schema } from 'mongoose';

const adoptionInfoSchema: Schema = new Schema(
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

export default model<IAdoptionInfo>('AdoptionInfo', adoptionInfoSchema);
