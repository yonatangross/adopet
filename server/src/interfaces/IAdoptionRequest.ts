import { IPet } from './IPet';
import { Document } from 'mongoose';

export interface IAdoptionRequest extends Document {
    pet: IPet['_id'];
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    message?: string;
}