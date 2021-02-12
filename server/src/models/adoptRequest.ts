import { IAdoptRequest } from './../types/adoptRequest';
import { model, Schema } from 'mongoose';

const adoptionFormSchema: Schema = new Schema(
  {
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

export default model<IAdoptRequest>('AdoptionForm', adoptionFormSchema);
