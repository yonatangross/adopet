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
        const pets: IPet[] = await Pet.find();
        return pets;
    }

    public async create(req: any) {
        const body = req.body as Pick<
            IPet,
            'name' | 'breed' | 'animalType' | 'age' | 'isAdopted'
        >;

        const pet = new Pet({
            name: body.name,
            breed: body.breed,
            animalType: body.animalType,
            age: body.age,
            isAdopted: body.isAdopted,
        });

        const createdPet: IPet = await pet.save();
        return { pet: createdPet };
    }

    public async update(petId: string, req: any) {
        const updatedPet: IPet | null = await Pet.findByIdAndUpdate(
            { _id: petId },
            req.body
        );
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
