import { Document } from 'mongoose';

export interface IPet extends Document {
  name: string;
  breed: string;
  animalType: string;
  age: number;
  isAdopted: boolean;
  primaryPicture:string;
}
