"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getAll = exports.getById = void 0;
const typedi_1 = require("typedi");
const petService_1 = __importDefault(require("../../services/petService"));
const PetServiceInstance = typedi_1.Container.get(petService_1.default);
const getById = async (req, res) => {
    await PetServiceInstance.getById(req.params.id).then((pet) => {
        res.status(200).json({ pet });
    }).catch((err) => {
        throw err;
    });
};
exports.getById = getById;
const getAll = async (req, res) => {
    await PetServiceInstance.getAll(req.query).then((pets) => {
        res.status(200).json({ pets });
    }).catch((err) => {
        throw err;
    });
};
exports.getAll = getAll;
const create = async (req, res) => {
    await PetServiceInstance.create(req.body).then((value) => {
        res.status(201).json({ message: 'Pet added', pet: value.pet });
    }).catch((err) => { throw err; });
};
exports.create = create;
const updateById = async (req, res) => {
    await PetServiceInstance.update(req.params.id, req.body).then((value) => {
        res.status(200).json({
            message: value.message,
            pet: value.pet,
        });
    }).catch((err) => { throw err; });
};
exports.updateById = updateById;
const deleteById = async (req, res) => {
    await PetServiceInstance.delete(req.params.id).then((value) => {
        res.status(200).json({
            message: value.message,
            pet: value.pet,
        });
    }).catch((err) => { throw err; });
};
exports.deleteById = deleteById;
//# sourceMappingURL=index.js.map