import { IPet } from './../types/IPet';
import { Service } from 'typedi'
import { IAdoptionRequest } from './../types/IAdoptionRequest';
import AdoptionRequest from '../models/adoptionRequest';

@Service()
export default class AdoptionRequestService {
    public async getById(id: string) {
        const adoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findById(id).populate('pet');
        return adoptionRequest;
    }

    public async getAll() {
        const adoptionRequests: IAdoptionRequest[] = await AdoptionRequest.find().populate('pet');
        return adoptionRequests;
    }

    public async create(req: any, pet: IPet) {
        const body = req as Pick<
            IAdoptionRequest,
            'fullName' | 'email' | 'phoneNumber' | 'address' | 'message'
        >;

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


    public async update(adoptionRequestId: string, req: any) {
        const adoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findByIdAndUpdate(
            { _id: adoptionRequestId },
            req.body
        );
        return {
            message: 'Adoption request updated',
            adoptionRequest: adoptionRequest,
        };
    }

    public async delete(petId: string) {
        const deletedAdoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findByIdAndRemove(petId);
        return {
            message: `Adoption request of ${petId} deleted`,
            adoptionRequest: deletedAdoptionRequest,
        };
    }
}








