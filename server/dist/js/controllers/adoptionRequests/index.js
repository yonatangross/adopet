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
const adoptionRequest_1 = __importDefault(require("../../models/adoptionRequest"));
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adoptRequest = yield adoptionRequest_1.default.findById(req.params.id);
        res.status(200).json({ adoptRequest });
    }
    catch (error) {
        throw error;
    }
});
exports.findOne = findOne;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adoptionRequests = yield adoptionRequest_1.default.find();
        res.status(200).json({ adoptionRequests });
    }
    catch (error) {
        throw error;
    }
});
exports.findAll = findAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const body = req.body;
        const adoptionRequest = new adoptionRequest_1.default({
            petId: body.petId,
            fullName: body.fullName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            address: body.address,
            message: body.message
        });
        const newAdoptionRequest = yield adoptionRequest.save();
        const allAdoptionRequests = yield adoptionRequest_1.default.find();
        res.status(201).json({ message: 'adoption request added', adoptionRequest: newAdoptionRequest, adoptionRequests: allAdoptionRequests });
    }
    catch (error) {
        throw error;
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateAdoptRequest = yield adoptionRequest_1.default.findByIdAndUpdate({ _id: id }, body);
        const allAdoptRequests = yield adoptionRequest_1.default.find();
        res.status(200).json({
            message: 'Adopt request updated',
            allAdoptRequest: updateAdoptRequest,
            allAdoptRequests: allAdoptRequests,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.update = update;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAdoptRequest = yield adoptionRequest_1.default.findByIdAndRemove(req.params.id);
        const allAdoptRequests = yield adoptionRequest_1.default.find();
        res.status(200).json({
            message: 'Adopt request deleted',
            adoptionRequest: deletedAdoptRequest,
            adoptionRequests: allAdoptRequests,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteOne = deleteOne;
