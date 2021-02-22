import { model, Schema, Document } from 'mongoose';
import IUser from '../interfaces/IUser';


const userSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: {
      type: String,
      get: (): undefined => undefined,
    },
  },
  { timestamps: true, toJSON: { virtuals: false, getters: true } }
);

const UserModel = model<IUser & Document>('User', userSchema);

export default UserModel;
