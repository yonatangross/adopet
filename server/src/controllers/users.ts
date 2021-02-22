import { Request, Response, NextFunction, Router } from 'express';
import IController from '../interfaces/IController';
import authMiddleware from '../middleware/auth';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserModel from '../models/user';

class UserController implements IController {
  public path = '/users';
  public router = Router();
  private user = UserModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const userQuery = this.user.findById(id);
    const user = await userQuery;
    if (user) {
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  };
}

export default UserController;
