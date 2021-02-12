import { Response, Request } from 'express';
import { IAdoptionRequest } from '../../types/IAdoptionRequest';
import AdoptionRequest from '../../models/adoptionRequest';

const findOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const adoptRequest: IAdoptionRequest | null = await AdoptionRequest.findById(req.params.id);
    res.status(200).json({ adoptRequest });
  } catch (error) {
    throw error;
  }
};

const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const adoptionRequests: IAdoptionRequest[] = await AdoptionRequest.find();
    res.status(200).json({ adoptionRequests });
  } catch (error) {
    throw error;
  }
};


const create = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log(req.body);

    const body = req.body as Pick<
      IAdoptionRequest, 'petId' | 'fullName' | 'email' | 'phoneNumber' | 'address' | 'message'
    >;

    const adoptionRequest: IAdoptionRequest = new AdoptionRequest({
      petId: body.petId,
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      address: body.address,
      message: body.message
    });

    const newAdoptionRequest: IAdoptionRequest = await adoptionRequest.save();
    const allAdoptionRequests: IAdoptionRequest[] = await AdoptionRequest.find();

    res.status(201).json({ message: 'adoption request added', adoptionRequest: newAdoptionRequest, adoptionRequests: allAdoptionRequests });
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
    const updateAdoptRequest: IAdoptionRequest | null = await AdoptionRequest.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allAdoptRequests: IAdoptionRequest[] = await AdoptionRequest.find();
    res.status(200).json({
      message: 'Adopt request updated',
      allAdoptRequest: updateAdoptRequest,
      allAdoptRequests: allAdoptRequests,
    });
  } catch (error) {
    throw error;
  }
};


const deleteOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedAdoptRequest: IAdoptionRequest | null = await AdoptionRequest.findByIdAndRemove(req.params.id);
    const allAdoptRequests: IAdoptionRequest[] = await AdoptionRequest.find();
    res.status(200).json({
      message: 'Adopt request deleted',
      adoptionRequest: deletedAdoptRequest,
      adoptionRequests: allAdoptRequests,
    });
  } catch (error) {
    throw error;
  }
};

export { findOne, findAll, create, update, deleteOne };

