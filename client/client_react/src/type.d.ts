interface IPet {
  _id: string;
  name: string;
  breed: string;
  animalType: string;
  age: number;
  createdAt?: string;
  updatedAt?: string;
}

interface PetProps {
  pet: IPet;
}

type ApiDataType = {
  message: string; // pet updated
  status: string; //200
  pets: IPet[]; // all pets
  pet?: IPet; // updated pet
};
