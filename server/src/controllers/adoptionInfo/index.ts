import { IPet } from "./../../types/IPet";
import { Response, Request } from "express";
import { IAdoptionInfo } from "../../types/IAdoptionInfo";
import AdoptionRequestService from "../../services/adoptionRequestService";
import Container from "typedi";
import AdoptionInfoService from "../../services/adoptionInfoService";
import adoptionInfo from "../../models/adoptionInfo";
import adoptionRequest from "../../models/adoptionRequest";
import PetService from "../../services/petService";
import { IAdoptionRequest } from "../../types/IAdoptionRequest";
import { error } from "console";

const AdoptionRequestServiceInstance = Container.get(AdoptionRequestService);
const PetServiceInstance = Container.get(PetService);
const AdoptionInfoServiceInstance = Container.get(AdoptionInfoService);

const getById = async (req: Request, res: Response): Promise<void> => {
  await AdoptionInfoServiceInstance.getById(req.params.id)
    .then((adoptionInfo: IAdoptionInfo | null) => {
      res.status(200).json({ adoptionInfo });
    })
    .catch((err: Error) => {
      throw err;
    });
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  await AdoptionInfoServiceInstance.getAll()
    .then((adoptionsInfo: IAdoptionInfo[]) => {
      res.status(200).json({ adoptionRequests: adoptionsInfo });
    })
    .catch((err: Error) => {
      throw err;
    });
};

const create = async (req: Request, res: Response): Promise<void> => {
  const petPromise = await PetServiceInstance.getById(req.body.petId);
  const adoptionRequestPromise = await AdoptionRequestServiceInstance.getById(
    req.body.adoptionRequestId
  );

  Promise.all([petPromise, adoptionRequestPromise])
    .then(async (results: any[]) => {
      const pet: IPet = results[0].pet;
      const adoptionRequest: IAdoptionRequest = results[1].adoptionRequest;
      await AdoptionInfoServiceInstance.create(req.body, pet, adoptionRequest)
        .then((value: { adoptionInfo: IAdoptionInfo }) => {
          res.status(201).json({
            message: "created adoption info ",
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
    })
};

const updateById = async (req: Request, res: Response): Promise<void> => {
  await AdoptionInfoServiceInstance.updateById(req.params.id, req.body)
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

const deleteById = async (req: Request, res: Response): Promise<void> => {
  await AdoptionInfoServiceInstance.deleteById(req.params.id)
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

export { getById, getAll, create, updateById, deleteById };
