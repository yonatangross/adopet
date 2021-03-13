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

@Service()
export default class PetService {
  public async getById(id: string) {
    const pet: IPet | null = await Pet.findById(id);
    //todo: if pet not found return 404 error
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
      { property: 'breed', selectedValue: '', values: [] },
    ];

    if (!!query.sorter) {
      sorter = <ISorter<IPet>>JSON.parse(query.sorter);
    } else sorter = <ISorter<IPet>>{ property: 'name', isDescending: true };
    const activeSorter: ISorter<IPet> = sorter;

    let pets: IPet[] = [];

    // search by searchInput in: name / animalType
    await Pet.find(
      { $or: [{ name: { $regex: '.*' + searchInput + '.*' } }, { animalType: { $regex: '.*' + searchInput + '.*' } }] },
      function (err, petsResult) {
        if (err) throw err;
        pets = petsResult;
      }
    );

    const breeds: string[] = this.getPetsBreedsList(pets);
    // console.log(`${breeds.length} breeds for ${pets.length} pets.`);

    if (!!query.filters) {
      activeFilters = <IFilter<IPet>[]>JSON.parse(query.filters);
    } else {
      activeFilters = <IFilter<IPet>[]>[
        { property: 'animalType', selectedValue: '', values: ['Dog', 'Cat'] },
        { property: 'age', selectedValue: '', values: ['Puppy', 'Young', 'Adult', 'Senior'] },
        { property: 'gender', selectedValue: '', values: ['Male', 'Female'] },
        { property: 'breed', selectedValue: '', values: breeds },
      ];
    }

    let filterQuery: any = {
      $or: [{ name: { $regex: new RegExp('.*' + searchInput + '.*', 'i') } }, { animalType: { $regex: new RegExp('.*' + searchInput + '.*', 'i') } }],
    };
    activeFilters.forEach((filter) => {
      if (filter.property !== 'age' && filter.selectedValue !== '') {
        filterQuery[filter.property] = { $eq: filter.selectedValue.toLowerCase() };
      } else if (filter.property === 'age' && filter.selectedValue !== '') {
        const petAge: PetAge = (<any>PetAge)[filter.selectedValue];
        const petAgeRange = this.getPetAgeRange(petAge);
        filterQuery[filter.property] = { $gte: petAgeRange[0], $lte: petAgeRange[1] };
      }
    });

    // console.log(filterQuery);

    let petQueryResult: IPet[] = await Pet.find(filterQuery).exec();

    // console.log(`petQueryResult: ${petQueryResult.length}`);

    if (activeSorter != null) {
      petQueryResult = petQueryResult.sort((petA, petB) => genericSort(petA, petB, activeSorter));
    }

    return { pets: petQueryResult, breeds: breeds };
  }
  private getPetAgeRange(petAge: PetAge): [min: number, max: number] {
    switch (petAge) {
      case PetAge.Puppy:
        return [0, 1];
      case PetAge.Young:
        return [1, 2];
      case PetAge.Adult:
        return [2, 12];
      case PetAge.Senior:
        return [12, 30];
      default:
        throw new IllegalPetAgeException(petAge);
    }
  }

  private getPetsBreedsList(pets: IPet[]): string[] {
    return _.map(
      _.uniqBy(pets, (pet) => {
        return pet.breed;
      }),
      (pet) => {
        return pet.breed;
      }
    );
  }

  public async create(req: any) {
    //console.log(req);
    
    const body = req as Pick<IPet, 'name' | 'gender' | 'breed' | 'animalType' | 'age' | 'isAdopted' | 'primaryPicture'>;

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
    const body = req as Pick<IPet, 'name' | 'gender' | 'breed' | 'animalType' | 'age' | 'isAdopted' | 'primaryPicture'>;
   // console.log('update func');
    
    //console.log(body);
    

    const updatedPet: IPet | null = await Pet.findByIdAndUpdate({ _id: petId }, body, { new: true });
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
