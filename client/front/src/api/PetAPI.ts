import axios, { AxiosResponse } from 'axios';
import IFilter from '../interfaces/IFilter';
import ISorter from '../interfaces/ISorter';

require('dotenv').config();

const baseUrl: string | undefined = 'http://localhost:4000/pets';

export const getPets = async (
  searchInput: string,
  activeSorter: ISorter<IPet> | null,
  activeFilters: IFilter<IPet>[]
): Promise<AxiosResponse<PetApiDataType>> => {
  try {
    const response: AxiosResponse<PetApiDataType> = await axios.get(`${baseUrl}`, {
      params: { searchInput: searchInput, sorter: activeSorter, filters: JSON.stringify(activeFilters) },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPet = async (petId: string): Promise<AxiosResponse<PetApiDataType>> => {
  try {
    const requestedPet: AxiosResponse<PetApiDataType> = await axios.get(`${baseUrl}/${petId}`);
    return requestedPet;
  } catch (error) {
    throw new Error(error);
  }
};

export const addPet = async (formData: IPet): Promise<AxiosResponse<PetApiDataType>> => {
  try {
    //console.log(formData);

    const pet: Omit<IPet, '_id'> = {
      name: formData.name,
      gender: formData.gender,
      breed: formData.breed,
      animalType: formData.animalType,
      age: formData.age,
      isAdopted: false,
    };
   // console.log(`pet: ${Object.keys(pet)}\n ${Object.values(pet)}`);

    const savePet: AxiosResponse<PetApiDataType> = await axios.post(`${baseUrl}/${pet}`, pet);
    return savePet;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePet = async (pet: IPet): Promise<AxiosResponse<PetApiDataType>> => {
  try {
    const updatedPet: AxiosResponse<PetApiDataType> = await axios.put(`${baseUrl}/${pet._id}`, pet);
    return updatedPet;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePet = async (_id: string): Promise<AxiosResponse<PetApiDataType>> => {
  try {
    const deletedPet: AxiosResponse<PetApiDataType> = await axios.delete(`${baseUrl}/${_id}`);
    return deletedPet;
  } catch (error) {
    throw new Error(error);
  }
};
