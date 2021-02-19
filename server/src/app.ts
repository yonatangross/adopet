import 'reflect-metadata';
import express, { Express } from 'express';
import { mongooseLoader } from './data/mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import usersRoutes from './routes/users';
import petsRoutes from './routes/pets';
import adoptionRequestsRoutes from './routes/adoptionRequests';
import AdoptionsInfoRoutes from './routes/adoptionsInfo';
import { loggerMiddleware } from './middleware/logger';

require('dotenv').config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: (_origin, callback) => {
      return callback(null, true);
    },
    credentials: true,
  })
);

// app.use('/users', usersRoutes);
app.use('/pets', petsRoutes);
app.use('/adoptionRequests', adoptionRequestsRoutes);
app.use('/adoptionsInfo', AdoptionsInfoRoutes);

mongooseLoader();

app.listen(PORT, () => {
  console.log(`
    ################################################
      Server listening on port: ${PORT} 
    ################################################`);
});
