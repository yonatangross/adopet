import IUser from '../interfaces/IUser';
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import IController from '../interfaces/IController';
import IDataStoredInToken from '../interfaces/IDataStoredInToken';
import ITokenData from '../interfaces/ITokenData';
import validationMiddleware from '../middleware/validation';
import CreateUserDto from '../models/Dtos/createUserDto';
import userModel from '../models/user';
import AuthenticationService from '../services/authenticationService';
import LogInDto from '../models/Dtos/logInDto';
import Container from 'typedi';

class AuthenticationController implements IController {
  public path = '/auth';
  public router = Router();
  private user = userModel;
  private AuthenticationServiceInstance: AuthenticationService;

  constructor() {
    this.initializeRoutes();
    this.AuthenticationServiceInstance = Container.get(AuthenticationService);
  }

  private initializeRoutes() {
    this.router.post(`/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`/login`, validationMiddleware(LogInDto), this.logIn);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const { user, accessToken } = await this.AuthenticationServiceInstance.register(userData);
      response.status(200).send({ user, accessToken });
    } catch (error) {
      //console.log(`error in returning from authService `);
      //console.log(error);

      next(error);
    }
  };

  private logIn = async (request: Request, response: Response, next: NextFunction) => {
    //todo: move to service
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.get('password', null, { getters: false }));
      if (isPasswordMatching) {
        const { accessToken } = this.createToken(user);
        response.send({ user, accessToken });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private createToken(user: IUser): ITokenData {
    const expiresIn = 60 * 60 * 24; // a day
    const dataStoredInToken: IDataStoredInToken = {
      _id: user._id,
    };
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret)
      return {
        expiresIn,
        accessToken: jwt.sign(dataStoredInToken, jwtSecret, { expiresIn }),
      };
    else throw new Error('invalid jwtSecret in env');
  }
}

export default AuthenticationController;
