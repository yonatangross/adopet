import { AdoptionRequest } from "./adoptionRequest";
import { Pet } from "./pet";
export class AdoptionInfo {
  _id: string;
  pet: Pet;
  adoptionRequest: AdoptionRequest;
  adoptionDate: Date;
}
