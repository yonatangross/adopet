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
const adoptRequest_1 = __importDefault(require("../../models/adoptRequest"));
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adoptRequest = yield adoptRequest_1.default.findById(req.params.id);
        res.status(200).json({ adoptRequest });
    }
    catch (error) {
        throw error;
    }
});
exports.findOne = findOne;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield adoptRequest_1.default.find();
        res.status(200).json({ AdoptRequest: adoptRequest_1.default });
    }
    catch (error) {
        throw error;
    }
});
exports.findAll = findAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const adoptionRequest = new adoptRequest_1.default({
            name: body.name,
            email: body.email,
            phoneNumber: body.phoneNumber,
            address: body.address,
        });
        const newAdoptionRequest = yield adoptionRequest.save();
        const allAdoptionRequests = yield adoptRequest_1.default.find();
        res.status(201).json({ message: 'Pet added', pet: newAdoptionRequest, pets: allAdoptionRequests });
    }
    catch (error) {
        throw error;
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateAdoptRequest = yield adoptRequest_1.default.findByIdAndUpdate({ _id: id }, body);
        const allAdoptRequests = yield adoptRequest_1.default.find();
        res.status(200).json({
            message: 'AdoptRequest updated',
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
        const deletedAdoptRequest = yield adoptRequest_1.default.findByIdAndRemove(req.params.id);
        const allAdoptRequests = yield adoptRequest_1.default.find();
        res.status(200).json({
            message: 'AdoptRequest deleted',
            adoptionRequest: deletedAdoptRequest,
            adoptionRequests: allAdoptRequests,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteOne = deleteOne;
