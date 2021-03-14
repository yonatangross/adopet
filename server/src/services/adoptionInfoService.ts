import { Service } from 'typedi';
import AdoptionInfo from '../models/adoptionInfo';
import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import { IPet } from '../interfaces/IPet';
import { IAdoptionInfo } from '../interfaces/IAdoptionInfo';
import ISorter from './Sorter/ISorter';
import { genericSort } from './Sorter/genericSort';
import * as _ from 'lodash';

@Service()
export default class AdoptionInfoService {
  public async getById(id: string) {
    const adoptionInfo: IAdoptionInfo | null = await AdoptionInfo.findById(id).populate('pet').populate('adoptionRequest');
    return adoptionInfo;
  }

  public async getByPetId(petId: string) {
    const adoptionInfo: IAdoptionInfo | null = await AdoptionInfo.findOne({ pet: petId }).populate('pet').populate('adoptionRequest');
    return adoptionInfo;
  }

  public async getAll(query: any) {
    const page = <number>(query.page || 1);
    let searchInput = <string>(query.searchInput || '');
    let sorter;

    // console.log(query);

    if (!!query.sorter) {
      sorter = <ISorter<IAdoptionInfo>>JSON.parse(query.sorter);
    } else sorter = <ISorter<IAdoptionInfo>>{ property: 'pet', isDescending: true };
    const activeSorter: ISorter<IAdoptionInfo> = sorter;

    let adoptionsInfo: IAdoptionInfo[] = await AdoptionInfo.find().populate('pet').populate('adoptionRequest');

    let filteredAdoptionsInfo = adoptionsInfo.filter((adoption) => {
      let petName = adoption.pet.name;
      let adopterName = adoption.adoptionRequest.fullName;
      petName = petName.toLowerCase();
      adopterName = adopterName.toLowerCase();
      if (
        _.includes(petName, searchInput.toLowerCase()) ||
        _.includes(adopterName, searchInput.toLowerCase()) ||
        adoption.adoptionRequest._id == searchInput ||
        adoption.pet._id == searchInput
      )
        return true;
    });

    // console.log(adoptionsInfo);

    // console.log(adoptionsInfo[0]);

    // let searchQuery: any = {};

    // // search by searchInput in: pet / adoptionRequest
    // let searchQueryResult = await AdoptionInfo.find({ pet: { name: { $eq: 'Jennie' } } });

    // console.log(searchQueryResult);

    if (activeSorter != null) {
      filteredAdoptionsInfo = filteredAdoptionsInfo.sort((infoA, infoB) => genericSort(infoA, infoB, activeSorter));
    }

    return filteredAdoptionsInfo;
  }

  public async create(req: any, pet: IPet, adoptionRequest: IAdoptionRequest) {
    const body = req as Pick<IAdoptionInfo, 'adoptionDate'>;

    const adoptionInfo = new AdoptionInfo({
      pet: pet,
      adoptionRequest: adoptionRequest,
      adoptionDate: body.adoptionDate,
    });

    const createdAdoptionInfo: IAdoptionInfo = await adoptionInfo.save();

    return { adoptionInfo: createdAdoptionInfo };
  }

  public async updateById(adoptionInfoId: string, req: any) {
    const adoptionInfo: IAdoptionInfo | null = await AdoptionInfo.findByIdAndUpdate({ _id: adoptionInfoId }, req, { new: true });
    return {
      message: 'Adoption info updated',
      adoptionInfo: adoptionInfo,
    };
  }

  public async deleteById(adoptionInfoId: string) {
    //console.log('deleteById');
    // console.log(adoptionInfoId);

    const deletedAdoptionInfo: IAdoptionInfo | null = await AdoptionInfo.findByIdAndRemove(adoptionInfoId);
    //console.log(deletedAdoptionInfo);

    return {
      message: `Adoption info of ${adoptionInfoId} deleted`,
      adoptionInfo: deletedAdoptionInfo,
    };
  }
}
