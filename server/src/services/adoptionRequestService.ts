// import { Service } from 'typedi'
// import { IAdoptionRequest } from './../types/IAdoptionRequest';
// import AdoptionRequest from '../models/adoptionRequest';



// @Service()
// export default class AdoptionRequestService {
//     public async getById(id: string) {
//         const adoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findById(id);
//         return adoptionRequest;
//     }

//     public async getAll() {
//         const adoptionRequsts: IAdoptionRequest[] | null = await AdoptionRequest.find();
//         return adoptionRequsts;
//     }

//     public async create(req: any) {
//         const body = req.body as Pick<
//         IAdoptionRequest,
//             'petId' | 'fullName' | 'email' | 'phoneNumber' | 'address' | 'message'
//         >;

//        // need to inset the object pet to schema 

//         const adoptionRequest: IAdoptionRequest = new AdoptionRequest({
//             petId: body.petId,
//             fullName: body.fullName,
//             email: body.email,
//             phoneNumber: body.phoneNumber,
//             address: body.address,
//             message: body.message,
//         });

//         const newAdoptionRequest: IAdoptionRequest = await adoptionRequest.save();
//         const allAdoptionRequests: IAdoptionRequest[] = await AdoptionRequest.find();
//         return { newAdoptionRequest: newAdoptionRequest, allAdoptionRequests: allAdoptionRequests};


//         public async update(adoptionRequestId: string, req: any) {
//             const updateAdoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findByIdAndUpdate(
//                 { _id: adoptionRequestId },
//                 req.body
//             );
//             const allAdoptionRequests: IAdoptionRequest[] = await AdoptionRequest.find();
//             return {
//                 message: 'Pet updated',
//                 adoptionRequest: updateAdoptionRequest,
//                 adoptionRequests: allAdoptionRequests,
//             };
//         }
    
//     public async delete(petId: string) {
//         const deletedPet: IPet | null = await Pet.findByIdAndRemove(petId);
//         const allPets: IPet[] = await Pet.find();
//         return {
//             message: `Pet ${petId} deleted`,
//             pet: deletedPet,
//             pets: allPets,
//         };
//     }
// }








