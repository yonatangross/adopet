import { IUser } from './../../types/IUser';
import { Container } from 'typedi';
import { Response, Request, NextFunction } from 'express';
import UserService from '../../services/userService';

const UserServiceInstance = Container.get(UserService);


function authenticate(req:Request, res:Response, next:NextFunction) {
  const { username, password } = req.body;
  const ipAddress = req.ip;
  UserServiceInstance.authenticate({ username, password, ipAddress })
      .then(({ refreshToken, ...user }) => {
          setTokenCookie(res, refreshToken);
          res.json(user);
      })
      .catch(next);
}


const getById = async (req: Request, res: Response): Promise<void> => {
  await UserServiceInstance.getById(req.params.id).then((user: IUser | null) => {
    res.status(200).json({ user: user });
  }).catch((err: Error) => {
    throw err;
  });
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  await UserServiceInstance.getAll(req.query).then((pets: IUser[]) => {
    res.status(200).json({ pets });
  }).catch((err: Error) => {
    throw err;
  });
};

const create = async (req: Request, res: Response): Promise<void> => {
  await UserServiceInstance.create(req.body).then((value: { pet: IUser }) => {
    res.status(201).json({ message: 'Pet added', pet: value.pet })
  }).catch((err: Error) => { throw err; })
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  await UserServiceInstance.update(req.params.id, req.body).then((value: { message: string, pet: IUser | null }) => {
    res.status(200).json({
      message: value.message,
      pet: value.pet,
    })
  }).catch((err: Error) => { throw err; })
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  await UserServiceInstance.delete(req.params.id).then((value: { message: string, pet: IUser | null }) => {
    res.status(200).json({
      message: value.message,
      pet: value.pet,
    })
  }).catch((err: Error) => { throw err; })
};

export {authenticate, getById, getAll, create, updateById, deleteById };
