import { Document } from 'mongoose';

export interface IAdoptionRequest extends Document {
    petId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    message?: string;
}


