import { Router } from 'express';
import { findOne, findAll, create, update, deleteOne } from '../controllers/adoptionRequests';

const router: Router = Router();

router.get('/:id', findOne)

router.get('/', findAll);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', deleteOne);

export default router;
