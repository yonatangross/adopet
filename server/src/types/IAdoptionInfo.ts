import { Document } from 'mongoose';

export interface IAdoptionInfo extends Document {
    petId: string;
    adoptionId: string;
    adoptionDate: Date;
}


