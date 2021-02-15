"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adoptionRequestSchema = new mongoose_1.Schema({
    pet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Pet",
        required: true,
    },
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
const AdoptionRequest = mongoose_1.model("AdoptionRequest", adoptionRequestSchema);
exports.default = AdoptionRequest;
