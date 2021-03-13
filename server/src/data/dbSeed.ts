import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import { IPet } from '../interfaces/IPet';
import AdoptionRequest from '../models/adoptionRequest';
import AdoptionInfo from '../models/adoptionInfo';

import Pet from '../models/pet';
import axios from 'axios';
import { IAdoptionInfo } from '../interfaces/IAdoptionInfo';

interface ICatBreed {
  name: string;
  imageUrl: string;
}

export default class dataSeeder {
  readonly SEED_INIT_NUMBER: number = 100;
  readonly MAX_PET_AGE: number = 15;
  readonly MIN_IMAGE_HEIGHT: number = 200;
  readonly MIN_IMAGE_WIDTH: number = 320;
  readonly MAX_SEED_ADOPTION_REQUESTS: number = 5;
  private DOG_BREEDS: string[] = [];
  private CAT_BREEDS: ICatBreed[] = [];
  constructor() {
    //console.log('entered dbSeed');
    this.initialize();
  }

  private async initialize() {
    if (this.DOG_BREEDS.length == 0 || this.CAT_BREEDS.length == 0) await this.getPetBreeds();

    while ((await Pet.collection.countDocuments()) <= this.SEED_INIT_NUMBER) {
      await this.SeedPetsAsync();
    }

    while ((await AdoptionRequest.collection.countDocuments()) <= this.SEED_INIT_NUMBER) {
      await this.SeedAdoptionRequestsAsync();
    }

    if ((await AdoptionInfo.collection.countDocuments()) <= this.SEED_INIT_NUMBER / 5) {
      await this.SeedAdoptionsInfoAsync();
    }
  }

  private async getPetBreeds() {
    let catApiConfig = {
      headers: {
        'x-api-key': process.env.CAT_API_KEY,
      },
    };
    let catBreedsRequest = axios.get('https://api.thecatapi.com/v1/breeds/?limit=25', catApiConfig);
    let dogBreedsRequest = axios.get('https://dog.ceo/api/breeds/list/all');

    await axios
      .all([catBreedsRequest, dogBreedsRequest])
      .then(
        axios.spread((...responses) => {
          responses[0].data.map((element: any) => {
            let catBreed: ICatBreed = { name: element.name, imageUrl: element.image.url };

            if (catBreed != undefined) {
              this.CAT_BREEDS.push(catBreed);
            }
          });
          this.DOG_BREEDS = Object.keys(responses[1].data.message);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }

  private async SeedPetsAsync() {
    //console.log('entered seedPetsAsync function');

    for (let petIndex = 0; petIndex < this.SEED_INIT_NUMBER; petIndex++) {
      const randomPetTypeValue = this.getRandomInt(2);
      let animalType = '';
      if (randomPetTypeValue == 1) {
        animalType = 'dog';
      } else animalType = 'cat';
      try {
        const pet: IPet = await this.createPet(animalType);
        try {
          await pet.save();
        } catch (err: any) {
          console.log(`error creating ${animalType}[${petIndex + 1}] ${err}`);
        }
      } catch (err: any) {
        console.log(`error saving pet to db ${animalType}[${petIndex + 1}],${err}`);
      }
    }
    //console.log('finished creating pets.');
  }
  private async createPet(animalType: string): Promise<IPet> {
    let pet: IPet;

    const petName = await axios
      .get(`https://randomuser.me/api/?inc=name&noinfo&nat=us`)
      .then((res) => {
        return res.data.results[0].name.first;
      })
      .catch((err: Error) => {
        console.log(`error fetching fake name ${err}`);
        throw err;
      });
    if (animalType === 'dog') {
      const randomDogBreed = this.getRandomInt(this.DOG_BREEDS.length);
      const dogBreed = this.DOG_BREEDS[randomDogBreed];

      const dogPic = await axios
        .get(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
        .then((res) => {
          return res.data.message;
        })
        .catch((err: Error) => {
          console.log(`error fetching dog image of ${dogBreed}, ${err}`);
          throw err;
        });

      pet = new Pet({
        name: petName,
        gender: this.randomGender(),
        breed: dogBreed.toLowerCase(),
        animalType: 'dog',
        age: this.getRandomPetAge(this.MAX_PET_AGE),
        isAdopted: false,
        primaryPicture: dogPic,
      });
    } else {
      const randomCatTypeIndex = this.getRandomInt(this.CAT_BREEDS.length);
      const catBreed: ICatBreed = { name: this.CAT_BREEDS[randomCatTypeIndex].name, imageUrl: this.CAT_BREEDS[randomCatTypeIndex].imageUrl };
      pet = new Pet({
        name: petName,
        gender: this.randomGender(),
        breed: catBreed.name,
        animalType: 'cat',
        age: this.getRandomPetAge(this.MAX_PET_AGE),
        isAdopted: false,
        primaryPicture: catBreed.imageUrl,
        createdAt: this.randomDate(new Date(2020, 0, 1), new Date(2021, 0, 1), 0, 24),
      });
    }

    return pet;
  }

  private async SeedAdoptionRequestsAsync() {
    const petsCollection: IPet[] = await Pet.find();
    for (let petIndex = 0; petIndex < petsCollection.length; petIndex++) {
      for (let adoptionRequestForPetIndex = 0; adoptionRequestForPetIndex < this.MAX_SEED_ADOPTION_REQUESTS; adoptionRequestForPetIndex++) {
        const createAdoptionRequestFlag = this.getRandomInt(2);
        if (createAdoptionRequestFlag == 1) {
          try {
            const adoptionRequest: IAdoptionRequest = await this.createAdoptionRequest(petsCollection[petIndex]);
            await adoptionRequest.save();
          } catch (err: any) {
            console.log(`error creating adoption request for ${petsCollection[petIndex].name} the ${petsCollection[petIndex].animalType}`);
          }
        }
      }
    }
    //console.log('finished creating adoption requests.');
  }

  private async createAdoptionRequest(pet: IPet): Promise<IAdoptionRequest> {
    const { fullName, email, phoneNumber, address } = await axios
      .get(`https://randomuser.me/api/`)
      .then((res) => {
        return {
          fullName: res.data.results[0].name.first + ' ' + res.data.results[0].name.last,
          email: res.data.results[0].email,
          phoneNumber: res.data.results[0].phone,
          address:
            res.data.results[0].location.street.number +
            ' ' +
            res.data.results[0].location.street.name +
            ', ' +
            res.data.results[0].location.city +
            ', ' +
            res.data.results[0].location.country,
        };
      })
      .catch((err: Error) => {
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
      createdAt: this.randomDate(new Date(2020, 0, 1), new Date(2021, 0, 1), 0, 24),
    });
    return adoptionRequest;
  }

  private async SeedAdoptionsInfoAsync() {
    const adoptionRequestsGroupByPetQuery: any = [{ $group: { _id: '$pet', data: { $push: '$$ROOT' } } }];
    const adoptionRequestsGroupByPet: { _id: string; data: IAdoptionRequest[] }[] = await AdoptionRequest.aggregate(adoptionRequestsGroupByPetQuery);

    adoptionRequestsGroupByPet.forEach(async (adoptionRequestsGroup) => {
      const randomIndex: number = this.getRandomInt(adoptionRequestsGroup.data.length);

      const randomAdoptionRequestForPet: IAdoptionRequest = adoptionRequestsGroup.data[randomIndex];
      const adoptionFlag: boolean = this.getRandomInt(5) === 1;

      if (adoptionFlag) {
        const adoptionInfo: IAdoptionInfo = await this.createAdoptionInfo(adoptionRequestsGroup._id, randomAdoptionRequestForPet);
        try {
          await adoptionInfo.save();
          try {
            await Pet.findByIdAndUpdate({ _id: adoptionRequestsGroup._id }, { isAdopted: true });
          } catch (error: any) {
            console.log(`error updating pet, error: ${error}`);
          }
        } catch (err: any) {
          console.log(`error saving adoptionInfo ${adoptionInfo._id}`);
        }
      }
    });
  }
  private randomDate(start: Date, end: Date, startHour: number, endHour: number) {
    var date = new Date(+start + Math.random() * (end.getTime() - start.getTime()));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date;
  }
  private async createAdoptionInfo(petId: string, adoptionRequest: IAdoptionRequest): Promise<IAdoptionInfo> {
    const adoptionInfo: IAdoptionInfo = new AdoptionInfo({
      pet: petId,
      adoptionRequest: adoptionRequest,
      adoptionDate: this.randomDate(new Date(2021, 0, 1), new Date(), 0, 24),
    });

    return adoptionInfo;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private getRandomPetAge(max: number): number {
    let precision: number = 10;
    let randomAge: number;
    let checkRandom: number;
    checkRandom = (Math.random() * (max * precision) + 1 * precision) / (1 * precision);
    randomAge = checkRandom - 1 >= 1 ? Math.floor(checkRandom) : Math.round((checkRandom - 1) * 10) / 10;
    return randomAge;
  }

  private randomGender(): string {
    const randValue = Math.floor(Math.random() * Math.floor(2));
    if (randValue === 1) return 'male';
    return 'female';
  }
}
