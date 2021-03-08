interface IPet {
  _id: string;
  name: string;
  gender: string;
  breed: string;
  animalType: string;
  age: number;
  isAdopted: boolean;
  createdAt?: string;
  updatedAt?: string;
  primaryPicture?: string;
}
interface IAdoptionRequest {
  petId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IPetProps {
  pet: IPet;
}

interface IsAdoptedProps {
  isAdopted: boolean;
}

interface IAdoptionRequestProps {
  adoptionRequest: IAdoptionRequest;
}

type PetApiDataType = {
  message: string; // pet updated
  status: string; //200
  pets: IPet[]; // all pets
  pet?: IPet; // updated pet
  breeds?: string[];
};

type AdoptionRequestApiDataType = {
  message: string; // adoptionRequest created
  status: string; //200
  adoptionRequests: IAdoptionRequest[]; // all adoptionRequests
  adoptionRequest?: IAdoptionRequest; // create adoptionRequest
};
