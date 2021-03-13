import mongoose from 'mongoose';
import PetSchema from '../models/pet';
import UserSchema from '../models/user';

import UserModel from '../models/user';
import dbSeed from './dbSeed';

const mongooseLoader = async (): Promise<void> => {
  const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@adopetcluster.ldypt.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.set('useFindAndModify', false);

  await mongoose
    .connect(uri, options)
    .then(() => {
      console.log(`connected to ${process.env.MONGO_DB}`);
    })
    .catch((error: Error) => {
      console.log(`db entering failed! ${error}`);
      throw error;
    });
};

const initDb = async (): Promise<void> => {
  //console.log('entered initDb');

  new dbSeed();

  // if ((await UserSchema.collection.countDocuments()) != 0) {
  //   await seedTestUser();
  //   usersSchemaExists = true;
  // }
};

const seedTestUser = async (): Promise<void> => {
  try {
    const user = new UserModel({
      email: 'test@test.com',
      firstName: 'first',
      lastName: 'last',
      password: 'test',
    });
    await user.save();
  } catch (err) {
    console.log('error creating user');
  }
};

export { mongooseLoader, initDb };
