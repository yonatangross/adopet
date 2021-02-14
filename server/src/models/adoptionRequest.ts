import { IAdoptionRequest } from '../types/IAdoptionRequest';
import { model, Schema } from 'mongoose';

const adoptionRequestSchema: Schema = new Schema(
  {
    petId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<IAdoptionRequest>('AdoptionRequest', adoptionRequestSchema);
