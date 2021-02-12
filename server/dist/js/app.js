"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
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
console.log(`matan`);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@adopetcluster.ldypt.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}))
    .catch((error) => {
    console.log("db entering failed!");
    throw error;
});
