import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_DB: str(),
    JWT_SECRET: str(),
    CAT_API_KEY: str(),
    PORT: port(),
  });
}

export default validateEnv;
