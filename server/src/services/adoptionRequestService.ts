import { IPet } from '../interfaces/IPet';
import { Service } from 'typedi';
import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import AdoptionRequest from '../models/adoptionRequest';

@Service()
export default class AdoptionRequestService {
  public async getById(id: string) {
    const adoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findById(id).populate('pet');
    return adoptionRequest;
  }

  public async getAll() {
    const adoptionRequests: IAdoptionRequest[] = await AdoptionRequest.find();
    return adoptionRequests;
  }

  public async getAllGroups() {
    console.log(`in AdoptionRequestService, getAllGroups`);

    const adoptionRequestsGroupByPetQuery: any = [{ $group: { _id: '$pet', data: { $push: '$$ROOT' } } }];
    const adoptionRequestsGroupByPet = await AdoptionRequest.aggregate(adoptionRequestsGroupByPetQuery);

    console.log(adoptionRequestsGroupByPet);

    return adoptionRequestsGroupByPet;
  }

  public async create(req: any, pet: IPet) {
    const body = req as Pick<IAdoptionRequest, 'fullName' | 'email' | 'phoneNumber' | 'address' | 'message'>;

    const adoptionRequest = new AdoptionRequest({
      pet: pet,
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      address: body.address,
      message: body.message,
    });

    const createdAdoptionRequest: IAdoptionRequest = await adoptionRequest.save();

    return { adoptionRequest: createdAdoptionRequest };
  }

  public async updateById(adoptionRequestId: string, req: any) {
    const body = req as Pick<IAdoptionRequest, 'fullName' | 'email' | 'phoneNumber' | 'address' | 'message'>;

    const adoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findByIdAndUpdate({ _id: adoptionRequestId }, body, { new: true });
    console.log(adoptionRequest);

    return {
      message: 'Adoption request updated',
      adoptionRequest: adoptionRequest,
    };
  }

  public async deleteById(adoptionRequestId: string) {
    const deletedAdoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findByIdAndRemove(adoptionRequestId);
    return {
      message: `Adoption request of ${adoptionRequestId} deleted`,
      adoptionRequest: deletedAdoptionRequest,
    };
  }
}
