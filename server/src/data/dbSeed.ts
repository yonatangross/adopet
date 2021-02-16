import { IPet } from './../types/IPet';
import Pet from '../models/pet';
import axios from 'axios'
import { mainModule } from 'process';

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



    private async getPetBreeds() {
        this.DOG_BREEDS = await axios.get('https://dog.ceo/api/breeds/list/all').then((res) => { return Object.keys(res.data.message); }).catch((err: Error) => { throw err; })
        let catApiConfig = {
            headers: {
                "x-api-key": "8ec145c3-4e67-49e0-ba6e-6effc9ac5b98"
            },
        }
        await axios.get('https://api.thecatapi.com/v1/breeds/?limit=15', catApiConfig).then((res) => {
            res.data.map((element: any) => {
                let catBreed: ICatBreed = { name: element.name, imageUrl: element.image.url }

                if (catBreed != undefined) {
                    this.CAT_BREEDS.push(catBreed);
                }
            });
        }).catch((err: Error) => {
            throw err;
        })

    }
    private async initialize() {
        if (this.DOG_BREEDS.length == 0 || this.CAT_BREEDS.length == 0)
            await this.getPetBreeds();
        await this.SeedPetsAsync();
    };

    private async SeedPetsAsync() {
        for (let petIndex = 0; petIndex < this.SEED_INIT_NUMBER; petIndex++) {
            const randomPetTypeValue = this.getRandomInt(2);
            let petType = '';
            if (randomPetTypeValue == 1) {
                petType = 'dog'
            } else petType = 'cat'

            const pet: IPet = await this.createPet(petType);
            await pet.save();
        }
    };
    private async createPet(animalType: string): Promise<IPet> {
        let pet = undefined;
        const petName = await axios.get(`https://randomuser.me/api/?inc=name&noinfo&nat=us`).then((res) => {
            return res.data.results[0].name.first;
        }).catch((err: Error) => {
            console.log(`error fetching fake name`);
            throw err;
        });
        if (animalType === 'dog') {
            const dogBreed = this.DOG_BREEDS[this.getRandomInt(this.DOG_BREEDS.length)];
            const petPic = await axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`).then((res) => { return res.data.message }).catch((err: Error) => {
                console.log(`error fetching dog image`);
                throw err;
            });
            pet = new Pet({
                name: petName,
                gender: this.randomGender(),
                breed: dogBreed,
                animalType: 'Dog',
                age: this.getRandomInt(this.MAX_PET_AGE),
                isAdopted: false,
                primaryPicture: petPic,
            });
            return pet;
        }
        else {

            const randomCatType = this.getRandomInt(this.CAT_BREEDS.length);
            const catBreed: ICatBreed = { name: this.CAT_BREEDS[randomCatType].name, imageUrl: this.CAT_BREEDS[randomCatType].imageUrl }

            pet = new Pet({
                name: petName,
                gender:this.randomGender(),
                breed: catBreed.name,
                animalType: 'Cat',
                age: this.getRandomInt(this.MAX_PET_AGE),
                isAdopted: false,
                primaryPicture: catBreed.imageUrl
            });

            return pet;
        }
    }


    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    };

    private randomGender(): string {
        const randValue = Math.floor(Math.random() * Math.floor(2));
        if (randValue === 1)
            return 'male';
        return 'female';
    };
};