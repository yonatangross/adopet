import { Document } from 'mongoose';

export interface IAdoptRequest extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    message?: string;
}


