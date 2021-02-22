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
    this.router.post(`/login`, validationMiddleware(LogInDto), this.loggingIn);
    this.router.post(`/logout`, this.loggingOut);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, user } = await this.AuthenticationServiceInstance.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      console.log(`error in returning from authService `);
      console.log(error);

      next(error);
    }
  };

  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.get('password', null, { getters: false }));
      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  };

  private createCookie(tokenData: ITokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: IUser): ITokenData {
    const expiresIn = 60 * 60; // an hour
    const dataStoredInToken: IDataStoredInToken = {
      _id: user._id,
    };
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret)
      return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, jwtSecret, { expiresIn }),
      };
    else throw new Error('invalid jwtSecret in env');
  }
}

export default AuthenticationController;
