import { IPet } from '../interfaces/IPet';
import { Response, Request, Router } from 'express';
import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import AdoptionRequestService from '../services/adoptionRequestService';
import Container from 'typedi';
import PetService from '../services/petService';
import adoptionRequest from '../models/adoptionRequest';
import IController from '../interfaces/IController';
import authMiddleware from '../middleware/auth';

class AdoptionRequestController implements IController {
  public path = '/adoption-requests';
  public router = Router();
  private PetServiceInstance: PetService;
  private AdoptionRequestServiceInstance: AdoptionRequestService;
  constructor() {
    this.initializeRoutes();
    this.PetServiceInstance = Container.get(PetService);
    this.AdoptionRequestServiceInstance = Container.get(AdoptionRequestService);
  }

  private initializeRoutes() {
    this.router.post('', this.create);
    this.router
      .all(`/*`, authMiddleware)
      .get(`/groups`, this.getAllGroups)
      .get(`/:id`, this.getById)
      .get(`/`, this.getAll)
      .put(`/:id`, this.updateById)
      .delete(`/:id`, this.deleteById);
  }

  private getById = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionRequestServiceInstance.getById(req.params.id)
      .then((adoptionRequest: IAdoptionRequest | null) => {
        res.status(200).json({ adoptionRequest });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private getAll = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionRequestServiceInstance.getAll(req.query)
      .then((adoptionRequests: IAdoptionRequest[]) => {
        res.status(200).json({ adoptionRequests });
      })
      .catch((err: Error) => {
        throw err;
      });
      
  };

  private getAllGroups = async (req: Request, res: Response): Promise<void> => {
    //console.log('entered getAllGroups');
    await this.AdoptionRequestServiceInstance.getAllGroups()
      .then(
        (
          adoptionRequestsGroups: {
            _id: string;
            data: IAdoptionRequest[];
          }[]
        ) => {
          res.status(200).json({ adoptionRequestsGroups });
        }
      )
      .catch((err: Error) => {
        throw err;
      });
  };

  private create = async (req: Request, res: Response): Promise<void> => {
    
    await this.PetServiceInstance.getById(req.body.petId)
      .then(async (pet: IPet | null) => {
        if (pet != null) {
          await this.AdoptionRequestServiceInstance.create(req.body, pet)
            .then((value: { adoptionRequest: IAdoptionRequest }) => {
              res.status(201).json({ message: 'Adoption request added', adoptionRequest: value.adoptionRequest });
            })
            .catch((err: Error) => {
              throw err;
            });
        }
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private updateById = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionRequestServiceInstance.updateById(req.params.id, req.body)
      .then((value: { message: string; adoptionRequest: IAdoptionRequest | null }) => {
        res.status(200).json({
          message: `adoption Request updated ${adoptionRequest}`,
          adoptionRequest: value.adoptionRequest,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  private deleteById = async (req: Request, res: Response): Promise<void> => {
    await this.AdoptionRequestServiceInstance.deleteById(req.params.id)
      .then((value: { message: string; adoptionRequest: IAdoptionRequest | null }) => {
        res.status(200).json({
          message: `Adoption request deleted`,
          adoptionRequest: value.adoptionRequest,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  };
}

export default AdoptionRequestController;
