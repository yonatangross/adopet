import { Container } from 'typedi';
import { Response, Request, Router } from 'express';
import { IPet } from '../interfaces/IPet';
import PetService from '../services/petService';
import IController from '../interfaces/IController';
import authMiddleware from '../middleware/auth';
import { values } from 'lodash';
import IFilter from '../services/Filter/IFilter';

class PetController implements IController {
  public path = '/pets';
  public router = Router();
  private PetServiceInstance: PetService;

  constructor() {
    this.initializeRoutes();
    this.PetServiceInstance = Container.get(PetService);
  }

  private initializeRoutes() {
    this.router.get(`/:id`, this.getById);
    this.router.get(`/`, this.getAll);
    this.router.all(`/*`, authMiddleware).put(`/:id`, this.updateById).delete(`/:id`, this.deleteById).post('', this.create);
  }

  private getById = async (req: Request, res: Response): Promise<void> => {
    await this.PetServiceInstance.getById(req.params.id)
      .then((pet: IPet | null) => {
        res.status(200).json({ pet });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private getAll = async (req: Request, res: Response): Promise<void> => {
    await this.PetServiceInstance.getAll(req.query)
      .then((value: { pets: IPet[]; breeds: string[] }) => {
        res.status(200).json({ pets: value.pets, breeds: value.breeds });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private create = async (req: Request, res: Response): Promise<void> => {
    await this.PetServiceInstance.create(req.body)
      .then((value: { pet: IPet }) => {
        res.status(201).json({ message: 'Pet added', pet: value.pet });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private updateById = async (req: Request, res: Response): Promise<void> => {
    await this.PetServiceInstance.update(req.params.id, req.body)
      .then((value: { message: string; pet: IPet | null }) => {
        res.status(200).json({
          message: value.message,
          pet: value.pet,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private deleteById = async (req: Request, res: Response): Promise<void> => {
    await this.PetServiceInstance.delete(req.params.id)
      .then((value: { message: string; pet: IPet | null }) => {
        res.status(200).json({
          message: value.message,
          pet: value.pet,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  };
}

export default PetController;
