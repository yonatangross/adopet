import 'reflect-metadata';
import express, { Express } from 'express';
import mongooseLoader from './data/mongoose';
import cors from 'cors';
import petRoutes from './routes/pet';
import adoptionRequestRoutes from './routes/adoptionRequest'

require('dotenv').config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/pets', petRoutes);
app.use('/adoptionRequests', adoptionRequestRoutes);

mongooseLoader();

app.listen(PORT, () => {
  console.log(`
    ################################################
      Server listening on port: ${PORT} 
    ################################################`);
})

