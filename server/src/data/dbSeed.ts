import { IAdoptionRequest } from './../types/IAdoptionRequest';
import { IPet } from './../types/IPet';
import Pet from '../models/pet';
import axios from 'axios'
import AdoptionRequest from '../models/adoptionRequest';

interface ICatBreed {
    name: string;
    imageUrl: string;
}

export default class dataSeeder {
    readonly SEED_INIT_NUMBER: number = 100;
    readonly MAX_PET_AGE: number = 15;
    private DOG_BREEDS: string[] = [];
    private CAT_BREEDS: ICatBreed[] = [];
    constructor() {
        this.getPetBreeds();
        this.initialize();
    };





    private async initialize() {
        if (this.DOG_BREEDS.length == 0 || this.CAT_BREEDS.length == 0)
            await this.getPetBreeds();

        if (await Pet.collection.countDocuments() == 0) {
            await this.SeedPetsAsync();
        }

        if (await Pet.collection.countDocuments() == this.SEED_INIT_NUMBER) {
            this.SeedAdoptionRequestsAsync();
        }
    };

    private async getPetBreeds() {
        this.DOG_BREEDS = await axios.get('https://dog.ceo/api/breeds/list/all').then((res) => { return Object.keys(res.data.message); }).catch((err: Error) => { throw err; })
        let catApiConfig = {
            headers: {
                "x-api-key": process.env.CAT_API_KEY,
            },
        }
        await axios.get('https://api.thecatapi.com/v1/breeds/?limit=25', catApiConfig).then((res) => {
            res.data.map((element: any) => {
                let catBreed: ICatBreed = { name: element.name, imageUrl: element.image.url }

                if (catBreed != undefined) {
                    this.CAT_BREEDS.push(catBreed);
                }
            });
        }).catch((err: Error) => {
            console.log(`Error while retrieving cat breeds, ${err}`);

            throw err;
        })

    }

    private async SeedPetsAsync() {
        for (let petIndex = 0; petIndex < this.SEED_INIT_NUMBER; petIndex++) {
            const randomPetTypeValue = this.getRandomInt(2);
            let animalType = '';
            if (randomPetTypeValue == 1) {
                animalType = 'Dog';
            } else animalType = 'Cat';
            try {
                const pet: IPet = await this.createPet(animalType);
                try {
                    await pet.save();
                }
                catch (err: any) {
                    console.log(`error creating ${animalType}[${petIndex + 1}] ${err}`);
                }
            }
            catch (err: any) {
                console.log(`error saving pet to db ${animalType}[${petIndex + 1}],${err}`);
            }
        }
    };
    private async createPet(animalType: string): Promise<IPet> {
        let pet: IPet;

        const petName = await axios.get(`https://randomuser.me/api/?inc=name&noinfo&nat=us`).then((res) => {
            return res.data.results[0].name.first;
        }).catch((err: Error) => {
            console.log(`error fetching fake name ${err}`);
            throw err;
        });
        if (animalType === 'Dog') {
            const randomDogBreed = this.getRandomInt(this.DOG_BREEDS.length)
            const dogBreed = this.DOG_BREEDS[randomDogBreed];
            const dogPic = await axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`).then((res) => { return res.data.message }).catch((err: Error) => {
                console.log(`error fetching dog image of ${dogBreed}, ${err}`);
                throw err;
            });
            pet = new Pet({
                name: petName,
                gender: this.randomGender(),
                breed: dogBreed.charAt(0).toUpperCase() + dogBreed.slice(1),
                animalType: 'Dog',
                age: this.getRandomPetAge(this.MAX_PET_AGE),
                isAdopted: false,
                primaryPicture: dogPic,
            });
        }
        else {

            const randomCatTypeIndex = this.getRandomInt(this.CAT_BREEDS.length);
            const catBreed: ICatBreed = { name: this.CAT_BREEDS[randomCatTypeIndex].name, imageUrl: this.CAT_BREEDS[randomCatTypeIndex].imageUrl }
            pet = new Pet({
                name: petName,
                gender: this.randomGender(),
                breed: catBreed.name,
                animalType: 'Cat',
                age: this.getRandomPetAge(this.MAX_PET_AGE),
                isAdopted: false,
                primaryPicture: catBreed.imageUrl
            });
        }
        return pet;

    }

    private async SeedAdoptionRequestsAsync() {
        const petsCollection: IPet[] = await Pet.find();
        for (let petIndex = 0; petIndex < petsCollection.length; petIndex++) {
            const createAdoptionRequestFlag = this.getRandomInt(2);
            if (createAdoptionRequestFlag == 1) {
                try {
                    const adoptionRequest: IAdoptionRequest = await this.createAdoptionRequest(petsCollection[petIndex]);
                    await adoptionRequest.save();
                }
                catch (err: any) {
                    console.log(`error creating adoption request for ${petsCollection[petIndex].name} the ${petsCollection[petIndex].animalType}`);
                }
            }
        }
    };

    private async createAdoptionRequest(pet: IPet): Promise<IAdoptionRequest> {
        const { fullName, email, phoneNumber, address } = await axios.get(`https://randomuser.me/api/`)
            .then((res) => {
                return ({
                    fullName:
                        res.data.results[0].name.first + ' ' + res.data.results[0].name.last,
                    email: res.data.results[0].email,
                    phoneNumber: res.data.results[0].phone,
                    address: res.data.results[0].location.street.number
                        + ' ' + res.data.results[0].location.street.name
                        + ', ' + res.data.results[0].location.city
                        + ', ' + res.data.results[0].location.country
                });
            }).catch((err: Error) => {
                console.log(`error fetching adoption requester name of pet ${pet}`);
                throw err;
            });
        const adoptionRequest: IAdoptionRequest = new AdoptionRequest({
            pet: pet,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            message: `I wish to adopt ${pet.name} the ${pet.animalType}! waiting for your review :)`,
        })
        return adoptionRequest;
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    };

    private getRandomPetAge(max: number): number {
        let precision: number = 10;
        let randomAge: number;
        randomAge = Math.floor(Math.random() * (max * precision) + 1 * precision) / (1 * precision);


        return randomAge;
    };

    private randomGender(): string {
        const randValue = Math.floor(Math.random() * Math.floor(2));
        if (randValue === 1)
            return 'male';
        return 'female';
    };
};