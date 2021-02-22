import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import { Model, model, Schema } from 'mongoose';

const adoptionRequestSchema: Schema = new Schema(
  {
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
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

const AdoptionRequest: Model<IAdoptionRequest> = model<IAdoptionRequest>("AdoptionRequest", adoptionRequestSchema);
export default AdoptionRequest;
