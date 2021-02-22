import { IPet } from '../../interfaces/IPet';
import { Response, Request } from 'express';
import { IAdoptionRequest } from '../../interfaces/IAdoptionRequest';
import AdoptionRequestService from '../../services/adoptionRequestService';
import Container from 'typedi';
import PetService from '../../services/petService';
import adoptionRequest from '../../models/adoptionRequest';

const AdoptionRequestServiceInstance = Container.get(AdoptionRequestService);
const PetServiceInstance = Container.get(PetService);

const getById = async (req: Request, res: Response): Promise<void> => {
  await AdoptionRequestServiceInstance.getById(req.params.id).then((adoptionRequest: IAdoptionRequest | null) => {
    res.status(200).json({ adoptionRequest });
  }).catch((err: Error) => {
    throw err;
  });
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  await AdoptionRequestServiceInstance.getAll().then((adoptionRequests: IAdoptionRequest[]) => {
    res.status(200).json({ adoptionRequests });
  }).catch((err: Error) => {
    throw err;
  });
};


const create = async (req: Request, res: Response): Promise<void> => {
  await PetServiceInstance.getById(req.body.petId).then(async (pet: IPet | null) => {
    if (pet != null) {
      await AdoptionRequestServiceInstance.create(req.body, pet).then((value: { adoptionRequest: IAdoptionRequest }) => {
        res.status(201).json({ message: 'Adoption request added', adoptionRequest: value.adoptionRequest });
      }).catch((err: Error) => { throw err; })
    }
  }).catch((err: Error) => { throw err; });
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  await AdoptionRequestServiceInstance.updateById(req.params.id, req.body).then((value: { message: string, adoptionRequest: IAdoptionRequest | null }) => {
    res.status(200).json({
      message: `adoption Request updated ${adoptionRequest}`,
      adoptionRequest: value.adoptionRequest,
    })
  }).catch((err: Error) => { throw err; })
};


const deleteById = async (req: Request, res: Response): Promise<void> => {
  await AdoptionRequestServiceInstance.deleteById(req.params.id).then((value: { message: string, adoptionRequest: IAdoptionRequest | null }) => {
    res.status(200).json({
      message: `Adoption request deleted`,
      adoptionRequest: value.adoptionRequest,
    })
  }).catch((err: Error) => { throw err; })
};

export { getById, getAll, create, updateById, deleteById };

