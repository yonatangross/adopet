import { IPet } from '../interfaces/IPet';
import { Service } from 'typedi';
import * as _ from 'lodash';

import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import AdoptionRequest from '../models/adoptionRequest';
import Pet from '../models/pet';
import ISorter from './Sorter/ISorter';
import { genericSort } from './Sorter/genericSort';

@Service()
export default class AdoptionRequestService {
  public async getById(id: string) {
    const adoptionRequest: IAdoptionRequest | null = await AdoptionRequest.findById(id).populate('pet');
    return adoptionRequest;
  }

  public async getAll(query: any) {
    const page = <number>(query.page || 1);
    let searchInput = <string>(query.searchInput || '');
    let sorter;

    // console.log(searchInput);

    // console.log(query);

    if (!!query.sorter) {
      sorter = <ISorter<IAdoptionRequest>>JSON.parse(query.sorter);
    } else sorter = <ISorter<IAdoptionRequest>>{ property: 'pet', isDescending: true };
    const activeSorter: ISorter<IAdoptionRequest> = sorter;

    let adoptionRequests: IAdoptionRequest[] = await AdoptionRequest.find().populate('pet');

    let filteredAdoptionRequests = adoptionRequests.filter((adoptionRequest) => {
      let pet = adoptionRequest?.pet;
      let petName = pet?.name;
      let adopterName = adoptionRequest?.fullName;
      try {
        if (!!petName && !!adopterName) {
          // console.log(`inside petname adoptername valid`);

          petName = petName.toLowerCase();
          adopterName = adopterName.toLowerCase();
          // console.log(`adoptionRequest id: ${adoptionRequest._id} and petId: ${adoptionRequest.pet._id} and searchInput:${searchInput}`);

          if (
            _.includes(petName, searchInput.toLowerCase()) ||
            _.includes(adopterName, searchInput.toLowerCase()) ||
            adoptionRequest._id == searchInput ||
            adoptionRequest.pet._id == searchInput
          )
            return true;
        }
      } catch (error) {
        throw new Error('error while searching' + error);
      }
    });

    if (activeSorter != null) {
      filteredAdoptionRequests = filteredAdoptionRequests.sort((infoA, infoB) => genericSort(infoA, infoB, activeSorter));
    }

    return filteredAdoptionRequests;
  }

  public async getAllGroups() {
    const adoptionRequestsGroupByPetQuery: any = [{ $group: { _id: '$pet', data: { $push: '$$ROOT' } } }];
    let adoptionRequestsGroupByPet: { _id: string; data: IAdoptionRequest[] }[] = await AdoptionRequest.aggregate(adoptionRequestsGroupByPetQuery);

    _.filter(adoptionRequestsGroupByPet, async function (element) {
      const pet = await Pet.findOne({ _id: element._id });

      return pet?.isAdopted === false;
    });

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
    // console.log(adoptionRequest);

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
