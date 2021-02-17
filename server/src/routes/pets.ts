import { Router } from 'express';
import { getById, getAll, create, updateById, deleteById } from '../controllers/pets';

const router: Router = Router();

router.get('/:id', getById)

router.get('/', getAll);

router.post('/', create);

router.put('/:id', updateById);

router.delete('/:id', deleteById);

export default router;


