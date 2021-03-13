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
const logger_1 = require("./middleware/logger");
const error_1 = __importDefault(require("./middleware/error"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const users_1 = __importDefault(require("./controllers/users"));
const authentication_1 = __importDefault(require("./controllers/authentication"));
const pets_1 = __importDefault(require("./controllers/pets"));
const adoptionRequests_1 = __importDefault(require("./controllers/adoptionRequests"));
const adoptionsInfo_1 = __importDefault(require("./controllers/adoptionsInfo"));
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
class App {
    constructor(controllers) {
        this.usersCount = 0;
        this.PORT = process.env.PORT || 4000;
        this.app = express_1.default();
        this.server = http.createServer(this.app);
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeDatabase();
        this.initSocketIO();
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
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_parser_1.default());
        this.app.use(cors_1.default({
            origin: (_origin, callback) => {
                return callback(null, true);
            },
            credentials: true,
        }));
        //console.log('finished initializeMiddlewares function.');
    }
    initializeErrorHandling() {
        this.app.use(error_1.default);
        // console.log('finished initializeErrorHandling function.');
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }
    connectToTheDatabase() {
        mongoose_1.mongooseLoader();
    }
    initializeDatabase() {
        //todo: check in here instead of getting to func
        mongoose_1.initDb();
    }
    initSocketIO() {
        // set up socket.io and bind it to our
        // http server.
        // this.io = socketIo(this.server, {
        //   cors: {
        //     origins: ['http://localhost:4200', 'http://localhost:3000'],
        //     methods: ['GET', 'POST'],
        //     credentials: false,
        //   },
        // });
        // this.io.on('connection', (socket: any) => {
        //   if (socket.handshake.headers.origin === 'http://localhost:4200') {
        //     this.usersCount++;
        //     socket.broadcast.emit('count', this.usersCount);
        //     socket.on('disconnect', () => {
        //       this.usersCount--;
        //       socket.broadcast.emit('count', this.usersCount);
        //     });
        //   }
        //   socket.on('message', function (data: any) {
        //     console.log(data);
        //   });
        // });
    }
}
validateEnv_1.default();
const app = new App([new pets_1.default(), new adoptionRequests_1.default(), new adoptionsInfo_1.default(), new users_1.default(), new authentication_1.default()]);
app.listen();
//# sourceMappingURL=app.js.map