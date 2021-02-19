import { Router } from 'express';
import { authenticate, getById, getAll } from '../controllers/users';
import { authorize } from '../middleware/authorize';
import { authenticateSchema } from '../middleware/validation/authenticateSchema';

const router: Router = Router();

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.get('/:id/refresh-tokens', authorize(), getRefreshTokens);

export default router;
