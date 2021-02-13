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
const typedi_1 = require("typedi");
const pet_1 = __importDefault(require("../../models/pet"));
const petService_1 = __importDefault(require("../../services/petService"));
const PetServiceInstance = typedi_1.Container.get(petService_1.default);
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    PetServiceInstance.getById(req.params.id).then((pet) => {
        res.status(200).json({ pet });
    }).catch((err) => {
        throw err;
    });
});
exports.findOne = findOne;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    PetServiceInstance.getAll().then((pets) => {
        res.status(200).json({ pets });
    }).catch((err) => {
        throw err;
    });
});
exports.findAll = findAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    PetServiceInstance.create(req.body).then((value) => {
        res.status(201).json({ message: 'Pet added', pet: value.newPet, pets: value.allPets });
    }).catch((err) => { throw err; });
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updatePet = yield pet_1.default.findByIdAndUpdate({ _id: id }, body);
        const allPets = yield pet_1.default.find();
        res.status(200).json({
            message: 'Pet updated',
            pet: updatePet,
            pets: allPets,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.update = update;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPet = yield pet_1.default.findByIdAndRemove(req.params.id);
        const allPets = yield pet_1.default.find();
        res.status(200).json({
            message: 'Pet deleted',
            pet: deletedPet,
            pets: allPets,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteOne = deleteOne;
