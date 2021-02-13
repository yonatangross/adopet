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
  PetServiceInstance.update(req.params.id, req.body).then((value: { message: string, pet: IPet | null, pets: IPet[] }) => {
    res.status(200).json({
      message: value.message,
      pet: value.pet,
      pets: value.pets
    })
  }).catch((err: Error) => { throw err; })
};

const deleteOne = async (req: Request, res: Response): Promise<void> => {
  PetServiceInstance.delete(req.params.id).then((value: { message: string, pet: IPet | null, pets: IPet[] }) => {
    res.status(200).json({
      message: value.message,
      pet: value.pet,
      pets: value.pets
    })
  }).catch((err: Error) => { throw err; })
};

export { findOne, findAll, create, update, deleteOne };
