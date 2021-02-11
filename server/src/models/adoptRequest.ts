import { IAdoptRequest } from './../types/adoptRequest';
import { model, Schema } from 'mongoose';

const formSchema: Schema = new Schema(
  {
    name: {
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
      type: Number,
      required: true,
    },
    message: {
        type: String,
        required: false,
      },
  },
  { timestamps: true }
);

export default model<IAdoptRequest>('Form', formSchema);
