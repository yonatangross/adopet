import 'reflect-metadata';
import express, { Express } from 'express';
import mongooseLoader from './data/mongoose';
import cors from 'cors';
import petsRoutes from './routes/pets';
import adoptionRequestsRoutes from './routes/adoptionRequests'
import AdoptionsInfoRoutes from './routes/adoptionsInfo'


require('dotenv').config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/pets', petsRoutes);
app.use('/adoptionRequests', adoptionRequestsRoutes);
app.use('/adoptionsInfo',AdoptionsInfoRoutes);


mongooseLoader();

app.listen(PORT, () => {
  console.log(`
    ################################################
      Server listening on port: ${PORT} 
    ################################################`);
})

