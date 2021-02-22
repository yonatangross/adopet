"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getAll = exports.getById = void 0;
const adoptionRequestService_1 = __importDefault(require("../../services/adoptionRequestService"));
const typedi_1 = __importDefault(require("typedi"));
const petService_1 = __importDefault(require("../../services/petService"));
const adoptionRequest_1 = __importDefault(require("../../models/adoptionRequest"));
const AdoptionRequestServiceInstance = typedi_1.default.get(adoptionRequestService_1.default);
const PetServiceInstance = typedi_1.default.get(petService_1.default);
const getById = async (req, res) => {
    await AdoptionRequestServiceInstance.getById(req.params.id).then((adoptionRequest) => {
        res.status(200).json({ adoptionRequest });
    }).catch((err) => {
        throw err;
    });
};
exports.getById = getById;
const getAll = async (req, res) => {
    await AdoptionRequestServiceInstance.getAll().then((adoptionRequests) => {
        res.status(200).json({ adoptionRequests });
    }).catch((err) => {
        throw err;
    });
};
exports.getAll = getAll;
const create = async (req, res) => {
    await PetServiceInstance.getById(req.body.petId).then(async (pet) => {
        if (pet != null) {
            await AdoptionRequestServiceInstance.create(req.body, pet).then((value) => {
                res.status(201).json({ message: 'Adoption request added', adoptionRequest: value.adoptionRequest });
            }).catch((err) => { throw err; });
        }
    }).catch((err) => { throw err; });
};
exports.create = create;
const updateById = async (req, res) => {
    await AdoptionRequestServiceInstance.updateById(req.params.id, req.body).then((value) => {
        res.status(200).json({
            message: `adoption Request updated ${adoptionRequest_1.default}`,
            adoptionRequest: value.adoptionRequest,
        });
    }).catch((err) => { throw err; });
};
exports.updateById = updateById;
const deleteById = async (req, res) => {
    await AdoptionRequestServiceInstance.deleteById(req.params.id).then((value) => {
        res.status(200).json({
            message: `Adoption request deleted`,
            adoptionRequest: value.adoptionRequest,
        });
    }).catch((err) => { throw err; });
};
exports.deleteById = deleteById;
//# sourceMappingURL=index.js.map