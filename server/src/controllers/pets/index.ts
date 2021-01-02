import { Response, Request } from 'express';
import { IPet } from './../../types/pet';
import Pet from '../../models/pet';

const getPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const pets: IPet[] = await Pet.find();
    res.status(200).json({ pets });
  } catch (error) {
    throw error;
  }
};

const addPet = async (req: Request, res: Response): Promise<void> => {
  try {
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

    res.status(201).json({ message: 'Pet added', pet: newPet, pets: allPets });
  } catch (error) {
    throw error;
  }
};

const updatePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatePet: IPet | null = await Pet.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allPets: IPet[] = await Pet.find();
    res.status(200).json({
      message: 'Pet updated',
      pet: updatePet,
      pets: allPets,
    });
  } catch (error) {
    throw error;
  }
};

const deletePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPet: IPet | null = await Pet.findByIdAndRemove(req.params.id);
    const allPets: IPet[] = await Pet.find();
    res.status(200).json({
      message: 'Pet deleted',
      pet: deletedPet,
      pets: allPets,
    });
  } catch (error) {
    throw error;
  }
};

export { getPets, addPet, updatePet, deletePet };
