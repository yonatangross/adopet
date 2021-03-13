import { Pet } from "./pet";
export class AdoptionRequest {
  _id: string;
  pet: Pet;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  message?: string;
  createdAt: Date;
}
