import { Container } from 'typedi';
import { Response, Request } from 'express';
import { IPet } from '../../types/IPet';
import Pet from '../../models/pet';

import PetService from '../../services/petService';

const PetServiceInstance = Container.get(PetService);

const findOne = async (req: Request, res: Response): Promise<void> => {
  PetServiceInstance.getById(req.params.id).then((pet: IPet | null) => {
    res.status(200).json({ pet });
  }).catch((err: Error) => {
    throw err;
  });
};

const findAll = async (req: Request, res: Response): Promise<void> => {
  PetServiceInstance.getAll().then((pets: IPet[]) => {
    res.status(200).json({ pets });
  }).catch((err: Error) => {
    throw err;
  });
};

const create = async (req: Request, res: Response): Promise<void> => {
  PetServiceInstance.create(req.body).then((value: { newPet: IPet, allPets: IPet[] }) => {
    res.status(201).json({ message: 'Pet added', pet: value.newPet, pets: value.allPets })
  }).catch((err: Error) => { throw err; })
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
