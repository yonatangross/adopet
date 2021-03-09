import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import IDataStoredInToken from '../interfaces/IDataStoredInToken';
import ITokenData from '../interfaces/ITokenData';
import CreateUserDto from '../models/Dtos/createUserDto';
import IUser from '../interfaces/IUser';

import userModel from '../models/user';
import { Service } from 'typedi';

@Service()
export default class AuthenticationService {
  public user = userModel;

  public async register(userData: CreateUserDto) {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create({
      ...userData,
      password: hashedPassword,
    });
    const { accessToken } = this.createToken(user);

    return {
      accessToken,
      user,
    };
  }

  public createToken(user: IUser): ITokenData {
    const expiresIn = 60 * 60; // an hour
    const dataStoredInToken: IDataStoredInToken = {
      _id: user._id,
    };
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret)
      return {
        expiresIn,
        accessToken: jwt.sign(dataStoredInToken, jwtSecret, { expiresIn }),
      };
    else throw new Error('invalid jwtSecret from env');
  }
}
