"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const formSchema = new mongoose_1.Schema({
    name: {
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
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Form', formSchema);
