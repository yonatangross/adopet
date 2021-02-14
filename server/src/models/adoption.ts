import { IAdoptionRequest } from '../types/IAdoptionRequest';
import { model, Schema } from 'mongoose';
import { timeStamp } from 'console';

const adoptionSchema: Schema = new Schema(
  {
    pet: {
      petInfo: {type: Schema.Types.ObjectId,ref:"petSchema"},
      required: true,
    },
    adoptionRequest: {
      adoptionRequestInfo: {type: Schema.Types.ObjectId,ref:"adoptionRequestSchema"},
      required: true,
    },
    adoptionDate:{
      time : { type : Date, default: Date.now },
      required:true
    }
  },
  { timestamps: true }
);

export default model<IAdoptionRequest>('AdoptionRequest', adoptionSchema);
