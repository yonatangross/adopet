import { PetAge } from './../types/PetAge';
import { Service } from 'typedi';
import * as _ from 'lodash';
import { IPet } from '../interfaces/IPet';
import Pet from '../models/pet';
import { genericSearch } from './Search/genericSearch';
import IFilter from './Filter/IFilter';
import ISorter from './Sorter/ISorter';
import { genericSort } from './Sorter/genericSort';
import IllegalPetAgeException from '../exceptions/IllegalPetAgeException';
import { PetSize } from '../types/PetSize';

@Service()
export default class PetService {
  public async getById(id: string) {
    const pet: IPet | null = await Pet.findById(id);
    return pet;
  }

  public async getAll(query: any) {
    //todo: create interface for query used properties
    const page = <number>(query.page || 1);
    const searchInput = <string>(query.searchInput || '');
    let sorter;
    let activeFilters: IFilter<IPet>[] = [
      { property: 'animalType', selectedValue: '', values: ['Dog', 'Cat'] },
      { property: 'age', selectedValue: '', values: ['Puppy', 'Young', 'Adult', 'Senior'] },
      { property: 'gender', selectedValue: '', values: ['Male', 'Female'] },
      // { property: 'breed', selectedValue: '', values: [] },
    ];
    if (!!query.sorter) {
      // console.log('sorter:');
      // console.log(query.sorter);
      sorter = <ISorter<IPet>>JSON.parse(query.sorter);
    } else sorter = <ISorter<IPet>>{ property: 'name', isDescending: true };

    const activeSorter: ISorter<IPet> = sorter;
    // console.log(`search input: ${searchInput}`);
    let pets: IPet[] = [];

    await Pet.find(
      { $or: [{ name: { $regex: '.*' + searchInput + '.*' } }, { animalType: { $regex: '.*' + searchInput + '.*' } }] },
      function (err, petsResult) {
        if (err) throw err;
        pets = petsResult;
      }
    );

    // let filteredPets: IPet[] = pets.filter((pet) => genericSearch<IPet>(pet, ['name', 'animalType'], searchInput));

    const breeds: string[] = this.getPetsBreedsList(pets);

    if (!!query.filters) {
      activeFilters = <IFilter<IPet>[]>JSON.parse(query.filters);
      activeFilters[3].values = breeds;
    } else {
      activeFilters = <IFilter<IPet>[]>[
        { property: 'animalType', selectedValue: '', values: ['Dog', 'Cat'] },
        { property: 'age', selectedValue: '', values: ['Puppy', 'Young', 'Adult', 'Senior'] },
        { property: 'gender', selectedValue: '', values: ['Male', 'Female'] },
        // { property: 'breed', selectedValue: '', values: breeds },
      ];
    }

    let maxFilteredAge: number = 100;
    if (activeFilters[1].selectedValue !== '') {
      maxFilteredAge = PetAge[activeFilters[1].selectedValue as keyof typeof PetAge];
    }

    let filterQuery: any = { $or: [{ name: { $regex: '.*' + searchInput + '.*' } }, { animalType: { $regex: '.*' + searchInput + '.*' } }] };
    activeFilters.forEach((filter) => {
      if (filter.property !== 'age' && filter.selectedValue !== '') {
        filterQuery[filter.property] = { $eq: filter.selectedValue.toLowerCase() };
      } else if (filter.property === 'age' && filter.selectedValue !== '') {
        const petAge: PetAge = (<any>PetAge)[filter.selectedValue];
        const petMaxAge = this.getPetMaxAge(petAge);
        filterQuery[filter.property] = { $lt: petMaxAge };
      }
    });

    console.log(filterQuery);

    const queryMon = Pet.find(filterQuery);

    let petQueryResult: IPet[] = await queryMon.exec();
    console.log(`petQueryResult: ${petQueryResult.length}`);
    // console.log(petQueryResult);

    // if (activeSorter != null) {
    //   petQueryResult = petQueryResult.sort((petA, petB) => genericSort(petA, petB, activeSorter));
    // }

    return { pets: petQueryResult, breeds: breeds, filters: activeFilters };
  }
  private getPetMaxAge(petAge: PetAge): number {
    const age = petAge as number;
    switch (true) {
      case age <= PetAge.Puppy:
        return PetAge.Puppy;
      case age <= PetAge.Young:
        return PetAge.Young;
      case age <= PetAge.Adult:
        return PetAge.Adult;
      case age <= PetAge.Senior:
        return PetAge.Senior;
      default:
        throw new IllegalPetAgeException(age);
    }
  }

  private getPetAge(age: number): PetAge {
    switch (true) {
      case age <= PetAge.Puppy:
        return PetAge.Puppy;
      case age <= PetAge.Young:
        return PetAge.Young;
      case age <= PetAge.Adult:
        return PetAge.Adult;
      case age > PetAge.Adult:
        return PetAge.Senior;
      default:
        throw new IllegalPetAgeException(age);
    }
  }

  private getPetsBreedsList(filteredPets: IPet[]): string[] {
    return _.map(
      _.uniqBy(filteredPets, (pet) => {
        return pet.breed;
      }),
      (pet) => {
        return pet.breed;
      }
    );
  }

  public async create(req: any) {
    const body = req.body as Pick<IPet, 'name' | 'gender' | 'breed' | 'animalType' | 'age' | 'isAdopted' | 'primaryPicture'>;

    const pet = new Pet({
      name: body.name,
      gender: body.gender,
      breed: body.breed,
      animalType: body.animalType,
      age: body.age,
      isAdopted: body.isAdopted,
      primaryPicture: body.primaryPicture,
    });

    const createdPet: IPet = await pet.save();
    return { pet: createdPet };
  }

  public async update(petId: string, req: any) {
    const updatedPet: IPet | null = await Pet.findByIdAndUpdate({ _id: petId }, req.body);
    return {
      message: 'Pet updated',
      pet: updatedPet,
    };
  }

  public async delete(petId: string) {
    const deletedPet: IPet | null = await Pet.findByIdAndRemove(petId);
    return {
      message: `Pet ${petId} deleted`,
      pet: deletedPet,
    };
  }
}
