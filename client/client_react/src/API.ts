import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'http://localhost:4000';

export const getPets = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const pets: AxiosResponse<ApiDataType> = await axios.get(baseUrl + '/pets');
    return pets;
  } catch (error) {
    throw new Error(error);
  }
};

export const addPet = async (
  formData: IPet
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    console.log(formData);

    const pet: Omit<IPet, '_id'> = {
      name: formData.name,
      breed: formData.breed,
      animalType: formData.animalType,
      age: formData.age,
    };
    console.log(`pet: ${Object.keys(pet)}\n ${Object.values(pet)}`);

    const savePet: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-pet',
      pet
    );
    return savePet;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePet = async (
  pet: IPet
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedPet: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-pet/${pet._id}`,
      pet
    );
    return updatedPet;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePet = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedPet: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-pet/${_id}`
    );
    return deletedPet;
  } catch (error) {
    throw new Error(error);
  }
};
