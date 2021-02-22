import { Service } from 'typedi';
import AdoptionInfo from '../models/adoptionInfo';
import { IAdoptionRequest } from '../interfaces/IAdoptionRequest';
import { IPet } from '../interfaces/IPet';
import { IAdoptionInfo } from '../interfaces/IAdoptionInfo';
@Service()
export default class AdoptionInfoService {
  public async getById(id: string) {
    const adoptionInfo: IAdoptionInfo | null = await AdoptionInfo.findById(id).populate('pet', 'adoptionRequest');
    return adoptionInfo;
  }

  public async getAll() {
    const adoptionsInfo: IAdoptionInfo[] = await AdoptionInfo.find().populate('pet', 'adoptionRequest');
    return adoptionsInfo;
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
    const adoptionInfo: IAdoptionInfo | null = await AdoptionInfo.findByIdAndUpdate({ _id: adoptionInfoId }, req.body);
    return {
      message: 'Adoption info updated',
      adoptionInfo: adoptionInfo,
    };
  }

  public async deleteById(adoptionInfoId: string) {
    const deletedAdoptionInfo: IAdoptionInfo | null = await AdoptionInfo.findByIdAndRemove(adoptionInfoId);
    return {
      message: `Adoption info of ${adoptionInfoId} deleted`,
      adoptionInfo: deletedAdoptionInfo,
    };
  }
}
