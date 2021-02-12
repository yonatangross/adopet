"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adoptionFormSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.model('AdoptionForm', adoptionFormSchema);
