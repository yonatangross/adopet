import { IAdoptionInfo } from '../interfaces/IAdoptionInfo';
import { IPet } from '../interfaces/IPet';
import { Response, Request, Router } from 'express';
import AdoptionRequestService from '../services/adoptionRequestService';
import Container from 'typedi';
import AdoptionInfoService from '../services/adoptionInfoService';
import adoptionInfo from '../models/adoptionInfo';
import PetService from '../services/petService';
import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import IController from '../interfaces/IController';
import authMiddleware from '../middleware/auth';

class AdoptionInfoController implements IController {
  public path = '/adoptionsInfo';
  public router = Router();

  private PetServiceInstance: PetService;
  private AdoptionRequestServiceInstance: AdoptionRequestService;
  private AdoptionInfoServiceInstance: AdoptionInfoService;

  constructor() {
    this.initializeRoutes();
    this.PetServiceInstance = Container.get(PetService);
    this.AdoptionRequestServiceInstance = Container.get(AdoptionRequestService);
    this.AdoptionInfoServiceInstance = Container.get(AdoptionInfoService);
  }

  private initializeRoutes() {
    this.router
      .all(`/*`, authMiddleware)
      .get(`/:id`, this.getById)
      .get(`/`, this.getAll)
      .put(`/:id`, this.updateById)
      .delete(`/:id`, this.deleteById)
      .post('', this.create);
  }

  private getById = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionInfoServiceInstance.getById(req.params.id)
      .then((adoptionInfo: IAdoptionInfo | null) => {
        res.status(200).json({ adoptionInfo });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private getAll = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionInfoServiceInstance.getAll()
      .then((adoptionsInfo: IAdoptionInfo[]) => {
        res.status(200).json({ adoptionsInfo: adoptionsInfo });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private create = async (req: Request, res: Response): Promise<void> => {
    const petPromise = await this.PetServiceInstance.getById(req.body.petId);
    const adoptionRequestPromise = await this.AdoptionRequestServiceInstance.getById(req.body.adoptionRequestId);

    Promise.all([petPromise, adoptionRequestPromise])
      .then(async (results: any[]) => {
        const pet: IPet = results[0].pet;
        const adoptionRequest: IAdoptionRequest = results[1].adoptionRequest;
        await this.AdoptionInfoServiceInstance.create(req.body, pet, adoptionRequest)
          .then((value: { adoptionInfo: IAdoptionInfo }) => {
            res.status(201).json({
              message: 'Created adoption info',
              adoptionInfo: value.adoptionInfo,
            });
          })
          .catch((err: Error) => {
            throw err;
          });
      })
      .catch((errors: any[]) => {
        errors.forEach((error) => {
          console.log(`error while creating adoptionInfo ${error}`);
        });
      });
  };

  private updateById = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionInfoServiceInstance.updateById(req.params.id, req.body)
      .then((value: { message: string; adoptionInfo: IAdoptionInfo | null }) => {
        res.status(200).json({
          message: `adoption info updated ${adoptionInfo}`,
          adoptionInfo: value.adoptionInfo,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private deleteById = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionInfoServiceInstance.deleteById(req.params.id)
      .then((value: { message: string; adoptionInfo: IAdoptionInfo | null }) => {
        res.status(200).json({
          message: `Adoption info deleted`,
          adoptionInfo: value.adoptionInfo,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  };
}

export default AdoptionInfoController;
