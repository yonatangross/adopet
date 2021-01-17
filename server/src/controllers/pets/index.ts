import { Response, Request } from 'express';
import { IPet } from './../../types/pet';
import Pet from '../../models/pet';

const findOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet: IPet | null = await Pet.findById(req.params.id);
    res.status(200).json({ pet });
  } catch (error) {
    throw error;
  }
};

const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const pets: IPet[] = await Pet.find();
    res.status(200).json({ pets });
  } catch (error) {
    throw error;
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
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

const update = async (req: Request, res: Response): Promise<void> => {
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

const deleteOne = async (req: Request, res: Response): Promise<void> => {
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

export { findOne, findAll, create, update, deleteOne };
