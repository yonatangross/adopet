import HttpException from './HttpException';

class IllegalPetAgeException extends HttpException {
  constructor( petAge: number) {
    super(400, `Illegal age ${petAge} `);
  }
}

export default IllegalPetAgeException;
