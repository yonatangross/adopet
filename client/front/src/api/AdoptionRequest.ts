import axios, { AxiosResponse } from 'axios';

require('dotenv').config();

const baseUrl: string | undefined = 'http://localhost:4000';

export const getAdoptionRequests = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const pets: AxiosResponse<ApiDataType> = await axios.get(`${baseUrl}/adoptionrequests`);
        console.log(`adoptionrequests: ${JSON.stringify(pets)}`);

        return pets;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAdoptionRequest = async (
    adoptionRequestId: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const requestedAdoptionRequest: AxiosResponse<ApiDataType> = await axios.get(
            `${baseUrl}/adoptionrequests/${adoptionRequestId}`
        );
        return requestedAdoptionRequest;
    } catch (error) {
        throw new Error(error);
    }
};

export const addadoptionRequestId = async (
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
            `${baseUrl}/pets/${pet}`,
            pet
        );
        return savePet;
    } catch (error) {
        throw new Error(error);
    }
};