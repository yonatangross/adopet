import 'reflect-metadata';
import express from 'express';
import { mongooseLoader, initDb } from './data/mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { loggerMiddleware } from './middleware/logger';
import errorMiddleware from './middleware/error';
import IController from './interfaces/IController';
import validateEnv from './utils/validateEnv';
import UserController from './controllers/users';
import AuthenticationController from './controllers/authentication';
import PetController from './controllers/pets';
import AdoptionRequestController from './controllers/adoptionRequests';
import AdoptionInfoController from './controllers/adoptionsInfo';
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
class App {
  public app: express.Application;
  public server: any;
  public io: any;
  public usersCount: number = 0;
  private PORT: string | number = process.env.PORT || 4000;
  constructor(controllers: IController[]) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeDatabase();
    this.initSocketIO();
  }

  public listen() {
    this.app.listen(this.PORT, () => {
      console.log(`
      ################################################
        Server listening on port: ${this.PORT} 
      ################################################`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(loggerMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: (_origin, callback) => {
          return callback(null, true);
        },
        credentials: true,
      })
    );
    //console.log('finished initializeMiddlewares function.');
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
    // console.log('finished initializeErrorHandling function.');
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  private connectToTheDatabase() {
    mongooseLoader();
  }
  private initializeDatabase() {
    //todo: check in here instead of getting to func
    initDb();
  }
  public initSocketIO() {
    // set up socket.io and bind it to our
    // http server.
    this.io = socketIo(this.server, {
      cors: {
        origins: ['http://localhost:4200', 'http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: false,
      },
    });
    this.io.on('connection', (socket: any) => {
      if (socket.handshake.headers.origin === 'http://localhost:4200') {
        this.usersCount++;
        socket.broadcast.emit('count', this.usersCount);
        socket.on('disconnect', () => {
          this.usersCount--;
          socket.broadcast.emit('count', this.usersCount);
        });
      }
      socket.on('message', function (data: any) {
        console.log(data);
      });
    });
  }
}

validateEnv();

const app = new App([new PetController(), new AdoptionRequestController(), new AdoptionInfoController(), new UserController(), new AuthenticationController()]);

app.listen();
