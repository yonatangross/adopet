"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    animalType: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    isAdopted: {
        type: Boolean,
        required: true
    },
    primaryPicture: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Pet = mongoose_1.model("Pet", petSchema);
exports.default = Pet;
//# sourceMappingURL=pet.js.map