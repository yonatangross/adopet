import { Container } from 'typedi';
import { Response, Request } from 'express';
import { IPet } from '../../types/IPet';
import PetService from '../../services/petService';

const PetServiceInstance = Container.get(PetService);

const getById = async (req: Request, res: Response): Promise<void> => {
  await PetServiceInstance.getById(req.params.id).then((pet: IPet | null) => {
    res.status(200).json({ pet });
  }).catch((err: Error) => {
    throw err;
  });
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  await PetServiceInstance.getAll(req.query).then((pets: IPet[]) => {
    res.status(200).json({ pets });
  }).catch((err: Error) => {
    throw err;
  });
};

const create = async (req: Request, res: Response): Promise<void> => {
  await PetServiceInstance.create(req.body).then((value: { pet: IPet }) => {
    res.status(201).json({ message: 'Pet added', pet: value.pet })
  }).catch((err: Error) => { throw err; })
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  await PetServiceInstance.update(req.params.id, req.body).then((value: { message: string, pet: IPet | null }) => {
    res.status(200).json({
      message: value.message,
      pet: value.pet,
    })
  }).catch((err: Error) => { throw err; })
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  await PetServiceInstance.delete(req.params.id).then((value: { message: string, pet: IPet | null }) => {
    res.status(200).json({
      message: value.message,
      pet: value.pet,
    })
  }).catch((err: Error) => { throw err; })
};

export { getById , getAll, create, updateById , deleteById  };
