import { IUser } from '../types/IUser';
import { Model, model, Schema } from 'mongoose';

const refreshToken: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true },
  },

  { timestamps: true }
);

refreshToken.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

const User: Model<IUser> = model<IUser>('Account', refreshToken);

export default User;
