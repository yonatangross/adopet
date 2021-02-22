import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import IDataStoredInToken from '../interfaces/IDataStoredInToken';
import ITokenData from '../interfaces/ITokenData';
import CreateUserDto from '../models/Dtos/createUserDto';
import IUser from '../interfaces/IUser';

import userModel from '../models/user';
import config from '../config';

class AuthenticationService {
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
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      user,
    };
  }
  public createCookie(tokenData: ITokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: IUser): ITokenData {
    const expiresIn = 60 * 60; // an hour
    const dataStoredInToken: IDataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, config.jwtSecret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
