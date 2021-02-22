import { IAdoptionInfo } from '../interfaces/IAdoptionInfo';
import { Model, model, Schema } from 'mongoose';

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
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

const AdoptionInfo: Model<IAdoptionInfo> = model<IAdoptionInfo>("AdoptionInfo", adoptionInfoSchema);
export default AdoptionInfo;
