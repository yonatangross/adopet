"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("./data/mongoose"));
const cors_1 = __importDefault(require("cors"));
const pet_1 = __importDefault(require("./routes/pet"));
const adoptionRequest_1 = __importDefault(require("./routes/adoptionRequest"));
require('dotenv').config();
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/pets', pet_1.default);
app.use('/adoptionRequests', adoptionRequest_1.default);
mongoose_1.default();
app.listen(PORT, () => {
    console.log(`
    ################################################
      Server listening on port: ${PORT} 
    ################################################`);
});
