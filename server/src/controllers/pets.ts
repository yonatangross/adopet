import AdoptionRequestService from '../services/adoptionRequestService';
import { Container } from 'typedi';
import { Response, Request, Router } from 'express';
import { IPet } from '../interfaces/IPet';
import PetService from '../services/petService';
import IController from '../interfaces/IController';
import authMiddleware from '../middleware/auth';
import { values } from 'lodash';
import IFilter from '../services/Filter/IFilter';
import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';

class PetController implements IController {
  public path = '/pets';
  public router = Router();
  private petServiceInstance: PetService;
  private adoptionRequestServiceInstance: AdoptionRequestService;

  constructor() {
    this.initializeRoutes();
    this.petServiceInstance = Container.get(PetService);
    this.adoptionRequestServiceInstance = Container.get(AdoptionRequestService);
  }

  private initializeRoutes() {
    this.router.get(`/:id`, this.getById);
    this.router.get(`/`, this.getAll);
    this.router.all(`/*`, authMiddleware).put(`/:id`, this.updateById).delete(`/:id`, this.deleteById).post('', this.create);
  }

  private getById = async (req: Request, res: Response): Promise<void> => {
    await this.petServiceInstance
      .getById(req.params.id)
      .then((pet: IPet | null) => {
        res.status(200).json({ pet });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private getAll = async (req: Request, res: Response): Promise<void> => {
    await this.petServiceInstance
      .getAll(req.query)
      .then((value: { pets: IPet[]; breeds: string[] }) => {
        res.status(200).json({ pets: value.pets, breeds: value.breeds });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private create = async (req: Request, res: Response): Promise<void> => {
    await this.petServiceInstance
      .create(req.body)
      .then((value: { pet: IPet }) => {
        res.status(201).json({ message: 'Pet added', pet: value.pet });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private updateById = async (req: Request, res: Response): Promise<void> => {
    //console.log('updateById');

    //console.log(req.body);

    await this.petServiceInstance
      .update(req.params.id, req.body)
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
    //delete all adoption Requests related to pet
    await this.adoptionRequestServiceInstance
      .getAll({ searchInput: req.params.id })
      .then((adoptionRequests) => {
        console.log(`number of adoptionRequests to delete: ${adoptionRequests.length}`);

        adoptionRequests.forEach(async (adoptionRequest) => {
          await this.adoptionRequestServiceInstance
            .deleteById(adoptionRequest._id)
            .then(() => {
              console.log(`removed ${adoptionRequest._id} for pet with id: ${req.params.id}`);
            })
            .catch((err: Error) => {
              throw err;
            });
        });
      })
      .catch((err: Error) => {
        throw err;
      });

    // delete pet
    await this.petServiceInstance
      .delete(req.params.id)
      .then((value: { message: string; pet: IPet | null }) => {
        console.log(`removed pet ${value.pet?._id}`);

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
