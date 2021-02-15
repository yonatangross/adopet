import { Document } from 'mongoose';

export interface IAdoption extends Document {
    petId: string;
    adoptionId: string;
    adoptionDate: Date;
}


