"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./data/mongoose");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const pets_1 = __importDefault(require("./routes/pets"));
const adoptionRequests_1 = __importDefault(require("./routes/adoptionRequests"));
const adoptionsInfo_1 = __importDefault(require("./routes/adoptionsInfo"));
const logger_1 = require("./middleware/logger");
const error_1 = __importDefault(require("./middleware/error"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const user_1 = __importDefault(require("./controllers/users/user"));
require('dotenv').config();
class App {
    constructor(controllers) {
        this.PORT = process.env.PORT || 4000;
        this.app = express_1.default();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeDatabase();
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`
      ################################################
        Server listening on port: ${this.PORT} 
      ################################################`);
        });
    }
    initializeMiddlewares() {
        this.app.use(logger_1.loggerMiddleware);
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use(cookie_parser_1.default());
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default({
            origin: (_origin, callback) => {
                return callback(null, true);
            },
            credentials: true,
        }));
    }
    initializeErrorHandling() {
        this.app.use(error_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(`/${controller.path}`, controller.router);
        });
        this.app.use('/pets', pets_1.default);
        this.app.use('/adoptionRequests', adoptionRequests_1.default);
        this.app.use('/adoptionsInfo', adoptionsInfo_1.default);
    }
    connectToTheDatabase() {
        mongoose_1.mongooseLoader();
    }
    initializeDatabase() {
        mongoose_1.initDb();
    }
}
validateEnv_1.default();
const app = new App([new user_1.default()]);
app.listen();
//# sourceMappingURL=app.js.map