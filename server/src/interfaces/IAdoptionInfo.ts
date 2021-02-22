import { IAdoptionRequest } from './IAdoptionRequest';
import { IPet } from './IPet';
import { Document } from 'mongoose';

export interface IAdoptionInfo extends Document {
  pet: IPet['_id'];
  adoptionRequest: IAdoptionRequest['_id'];
  adoptionDate: Date;
}
