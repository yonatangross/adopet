import { Service } from 'typedi';
import { IPet } from '../interfaces/IPet';
import Pet from '../models/pet';
import { genericSearch } from './Search/genericSearch';
import { genericFilter } from './Filter/genericFilter';
import IFilter from './Filter/IFilter';
import ISorter from './Sorter/ISorter';
import { genericSort } from './Sorter/genericSort';

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
    if (!!query.sorter) {
      sorter = <ISorter<IPet>>JSON.parse(query.sorter);
    } else sorter = <ISorter<IPet>>{ property: 'name', isDescending: true };
    // const activeFilters = <IFilter<IPet>[]>(query.filters);
    const activeSorter: ISorter<IPet> = sorter;
    const pets: IPet[] = await Pet.find();

    let filteredPets: IPet[] = pets.filter((pet) => genericSearch<IPet>(pet, ['name', 'animalType'], searchInput));
    // .filter((pet) => genericFilter<IPet>(pet, activeFilters))
    if (activeSorter != null) {
      filteredPets = filteredPets.sort((petA, petB) => genericSort(petA, petB, activeSorter));
    }

    return filteredPets;
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
