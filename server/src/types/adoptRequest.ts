import { Document } from 'mongoose';

export interface IAdoptRequest extends Document {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    message?: string;
}


