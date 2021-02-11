import { Response, Request } from 'express';
import { IAdoptRequest } from './../../types/adoptRequest';
import AdoptRequest from '../../models/adoptRequest';

const findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const adoptRequest: IAdoptRequest | null = await AdoptRequest.findById(req.params.id);
      res.status(200).json({ adoptRequest });
    } catch (error) {
      throw error;
    }
  };

  const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const pets: IAdoptRequest[] = await AdoptRequest.find();
      res.status(200).json({ AdoptRequest });
    } catch (error) {
      throw error;
    }
  };
  

  const create = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<
      IAdoptRequest,
        'name' | 'email' | 'phoneNumber' | 'address' 
      >;
  
      const adoptionRequest: IAdoptRequest = new AdoptRequest({
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        address: body.address,
      });
  
      const newAdoptionRequest: IAdoptRequest = await adoptionRequest.save();
      const allAdoptionRequests: IAdoptRequest[] = await AdoptRequest.find();
  
      res.status(201).json({ message: 'Pet added', pet: newAdoptionRequest, pets: allAdoptionRequests });
    } catch (error) {
      throw error;
    }
  };

  const update = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req;
      const updateAdoptRequest: IAdoptRequest | null = await AdoptRequest.findByIdAndUpdate(
        { _id: id },
        body
      );
      const allAdoptRequests: IAdoptRequest[] = await AdoptRequest.find();
      res.status(200).json({
        message: 'AdoptRequest updated',
        allAdoptRequest: updateAdoptRequest,
        allAdoptRequests: allAdoptRequests,
      });
    } catch (error) {
      throw error;
    }
  };


  const deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedAdoptRequest: IAdoptRequest | null = await AdoptRequest.findByIdAndRemove(req.params.id);
      const allAdoptRequests: IAdoptRequest[] = await AdoptRequest.find();
      res.status(200).json({
        message: 'AdoptRequest deleted',
        adoptionRequest: deletedAdoptRequest,
        adoptionRequests: allAdoptRequests,
      });
    } catch (error) {
      throw error;
    }
  };
  
  export { findOne, findAll, create, update, deleteOne };
  
