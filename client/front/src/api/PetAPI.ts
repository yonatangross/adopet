import axios, { AxiosResponse } from 'axios';
import ISorter from '../interfaces/ISorter';

require('dotenv').config();

const baseUrl: string | undefined = 'http://localhost:4000';

export const getPets = async (searchInput: string, activeSorter: ISorter<IPet> | null): Promise<AxiosResponse<PetApiDataType>> => {
    try {
        const pets: AxiosResponse<PetApiDataType> = await axios.get(`${baseUrl}/pets`, { params: { searchInput: searchInput, sorter: activeSorter } });
        return pets;
    } catch (error) {
        throw new Error(error);
    }
};

export const getPet = async (
    petId: string
): Promise<AxiosResponse<PetApiDataType>> => {
    try {
        const requestedPet: AxiosResponse<PetApiDataType> = await axios.get(
            `${baseUrl}/pets/${petId}`
        );
        return requestedPet;
    } catch (error) {
        throw new Error(error);
    }
};

export const addPet = async (
    formData: IPet
): Promise<AxiosResponse<PetApiDataType>> => {
    try {
        console.log(formData);

        const pet: Omit<IPet, '_id'> = {
            name: formData.name,
            breed: formData.breed,
            animalType: formData.animalType,
            age: formData.age,
            isAdopted: false,
        };
        console.log(`pet: ${Object.keys(pet)}\n ${Object.values(pet)}`);

        const savePet: AxiosResponse<PetApiDataType> = await axios.post(
            `${baseUrl}/pets/${pet}`,
            pet
        );
        return savePet;
    } catch (error) {
        throw new Error(error);
    }
};

export const updatePet = async (
    pet: IPet
): Promise<AxiosResponse<PetApiDataType>> => {
    try {
        const updatedPet: AxiosResponse<PetApiDataType> = await axios.put(
            `${baseUrl}/pets/${pet._id}`,
            pet
        );
        return updatedPet;
    } catch (error) {
        throw new Error(error);
    }
};



export const deletePet = async (
    _id: string
): Promise<AxiosResponse<PetApiDataType>> => {
    try {
        const deletedPet: AxiosResponse<PetApiDataType> = await axios.delete(
            `${baseUrl}/pets/${_id}`
        );
        return deletedPet;
    } catch (error) {
        throw new Error(error);
    }
};
