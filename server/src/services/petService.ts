import { Service } from 'typedi'
import { IPet } from './../types/IPet';
import Pet from '../models/pet';

@Service()
export default class PetService {
    public async getById(id: string) {
        const pet: IPet | null = await Pet.findById(id);
        return pet;
    }

    public async getAll() {
        const pets: IPet[] | null = await Pet.find();
        return pets;
    }

    public async create(req: any) {
        const body = req.body as Pick<
            IPet,
            'name' | 'breed' | 'animalType' | 'age'
        >;

        const pet: IPet = new Pet({
            name: body.name,
            breed: body.breed,
            animalType: body.animalType,
            age: body.age,
        });

        const newPet: IPet = await pet.save();
        const allPets: IPet[] = await Pet.find();
        return { newPet: newPet, allPets: allPets };
    }

    public async update(petId: string, req: any) {
        const updatePet: IPet | null = await Pet.findByIdAndUpdate(
            { _id: petId },
            req.body
        );
        const allPets: IPet[] = await Pet.find();
        return {
            message: 'Pet updated',
            pet: updatePet,
            pets: allPets,
        };
    }

    public async delete(petId: string) {
        const deletedPet: IPet | null = await Pet.findByIdAndRemove(petId);
        const allPets: IPet[] = await Pet.find();
        return {
            message: `Pet ${petId} deleted`,
            pet: deletedPet,
            pets: allPets,
        };
    }
}
