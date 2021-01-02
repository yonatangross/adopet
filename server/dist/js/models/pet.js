"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    name: {
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
}, { timestamps: true });
exports.default = mongoose_1.model('Pet', petSchema);
