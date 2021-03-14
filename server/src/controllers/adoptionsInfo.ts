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
  public path = '/adoptions-info';
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
      .post('', this.create)
      .get(`/:petId`,this.getByPetId)
      .get(`/`, this.getAll)
      .get(`/:id`, this.getById)
      .put(`/:id`, this.updateById)
      .delete(`/:id`, this.deleteById);
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

  private getByPetId = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionInfoServiceInstance.getByPetId(req.params.petId)
      .then((adoptionInfo: IAdoptionInfo | null) => {
        res.status(200).json({ adoptionInfo });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private getAll = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionInfoServiceInstance.getAll(req.query)
      .then((adoptionsInfo: IAdoptionInfo[]) => {
        res.status(200).json({ adoptionsInfo: adoptionsInfo });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private create = async (req: Request, res: Response): Promise<void> => {
    //console.log(`in create:`);
    //console.log(req.body);

    await this.PetServiceInstance.getById(req.body.petId).then(async (pet) => {
      await this.AdoptionRequestServiceInstance.getById(req.body.adoptionRequestId).then(async (adoptionRequest) => {
        if (pet !== null && adoptionRequest !== null) {
          await this.AdoptionInfoServiceInstance.create(req.body, pet, adoptionRequest)
            .then(async (value: { adoptionInfo: IAdoptionInfo }) => {
              await this.PetServiceInstance.update(pet.id, { isAdopted: true })
                .then(() => {
                  res.status(201).json({
                    message: 'Created adoption info',
                    adoptionInfo: value.adoptionInfo,
                  });
                })
                .catch((err: Error) => {
                  throw err;
                });
            })
            .catch((err: Error) => {
              throw err;
            });
        }
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
