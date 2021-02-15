"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.update = exports.create = exports.findAll = exports.findOne = void 0;
const adoptionRequestService_1 = __importDefault(require("../../services/adoptionRequestService"));
const typedi_1 = __importDefault(require("typedi"));
const petService_1 = __importDefault(require("../../services/petService"));
const adoptionRequest_1 = __importDefault(require("../../models/adoptionRequest"));
const AdoptionRequestServiceInstance = typedi_1.default.get(adoptionRequestService_1.default);
const PetServiceInstance = typedi_1.default.get(petService_1.default);
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield AdoptionRequestServiceInstance.getById(req.params.id).then((adoptionRequest) => {
        res.status(200).json({ adoptionRequest });
    }).catch((err) => {
        throw err;
    });
});
exports.findOne = findOne;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield AdoptionRequestServiceInstance.getAll().then((adoptionRequests) => {
        res.status(200).json({ adoptionRequests });
    }).catch((err) => {
        throw err;
    });
});
exports.findAll = findAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PetServiceInstance.getById(req.body.petId).then((pet) => __awaiter(void 0, void 0, void 0, function* () {
        if (pet != null) {
            yield AdoptionRequestServiceInstance.create(req.body, pet).then((value) => {
                res.status(201).json({ message: 'Adoption request added', adoptionRequest: value.adoptionRequest });
            }).catch((err) => { throw err; });
        }
    })).catch((err) => { throw err; });
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield AdoptionRequestServiceInstance.update(req.params.id, req.body).then((value) => {
        res.status(200).json({
            message: `adoption Request updated ${adoptionRequest_1.default}`,
            adoptionRequest: value.adoptionRequest,
        });
    }).catch((err) => { throw err; });
});
exports.update = update;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield AdoptionRequestServiceInstance.delete(req.params.id).then((value) => {
        res.status(200).json({
            message: `Adoption request deleted`,
            adoptionRequest: value.adoptionRequest,
        });
    }).catch((err) => { throw err; });
});
exports.deleteOne = deleteOne;
