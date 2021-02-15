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
exports.deleteById = exports.updateById = exports.create = exports.getAll = exports.getById = void 0;
const typedi_1 = require("typedi");
const petService_1 = __importDefault(require("../../services/petService"));
const PetServiceInstance = typedi_1.Container.get(petService_1.default);
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PetServiceInstance.getById(req.params.id).then((pet) => {
        res.status(200).json({ pet });
    }).catch((err) => {
        throw err;
    });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PetServiceInstance.getAll(req.query).then((pets) => {
        res.status(200).json({ pets });
    }).catch((err) => {
        throw err;
    });
});
exports.getAll = getAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PetServiceInstance.create(req.body).then((value) => {
        res.status(201).json({ message: 'Pet added', pet: value.pet });
    }).catch((err) => { throw err; });
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PetServiceInstance.update(req.params.id, req.body).then((value) => {
        res.status(200).json({
            message: value.message,
            pet: value.pet,
        });
    }).catch((err) => { throw err; });
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield PetServiceInstance.delete(req.params.id).then((value) => {
        res.status(200).json({
            message: value.message,
            pet: value.pet,
        });
    }).catch((err) => { throw err; });
});
exports.deleteById = deleteById;
