import { Router } from 'express';
import { findOne, findAll, create, update, deleteOne } from '../controllers/pets';

const router: Router = Router();

router.get('/pets/:id', findOne)

router.get('/pets', findAll);

router.post('/pets/:id', create);

router.put('/pets/:id', update);

router.delete('/pets/:id', deleteOne);

export default router;
