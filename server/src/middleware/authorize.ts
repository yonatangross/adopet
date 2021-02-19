import { Request, Response, NextFunction } from 'express';

const jwt = require('express-jwt');
const db = require('_helpers/db');

const authorize = (roles: any[]): Promise<any>[] => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }),

    // authorize based on user role
    async (req: any, res: Response, next: NextFunction) => {
      const user = await db.User.findById(req.user.id);

      if (!user || (roles.length && !roles.includes(user.role))) {
        // user no longer exists or role not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // authentication and authorization successful
      req.user.role = user.role;
      const refreshTokens = await db.RefreshToken.find({ user: user.id });
      req.user.ownsToken = (token) => !!refreshTokens.find((x) => x.token === token);
      next();
    },
  ];
};

export { authorize };
