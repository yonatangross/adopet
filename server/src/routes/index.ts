import { Router } from 'express';
import { getPets, addPet, updatePet, deletePet } from '../controllers/pets';

const router: Router = Router();

router.get('/pets', getPets);

router.post('/add-pet', addPet);

router.put('/edit-pet/:id', updatePet);

router.delete('/delete-pet/:id', deletePet);

export default router;
