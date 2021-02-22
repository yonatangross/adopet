"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: {
        type: String,
        get: () => undefined,
    },
}, { timestamps: true, toJSON: { virtuals: true, getters: true } });
const UserModel = mongoose_1.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map