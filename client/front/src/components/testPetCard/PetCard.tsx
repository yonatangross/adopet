import React from 'react';
import './PetCard.css';
import { IsAdopted } from '../IsAdopted/IsAdopted';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBView,
} from 'mdbreact';
import moment from 'moment';

const PetCardTEST: React.FC<IPetProps> = ({ pet }) => {
  if (!pet) {
    return null;
  }
  let petUpdatedTime = moment(pet.updatedAt).format('MMM Do YY HH:mm');
  return (
    <div className="containerPetCard" style={{ backgroundImage:`url(${pet.primaryPicture})`}}>
        <div className="overlay">
          <div className="items" />
          <div className="items head">
            <p>{pet.name}</p>
            <hr />
          </div>
          <div className="items price">
            <p className="new">Breed: {pet.breed}</p>
            <p className="new">Age: {pet.age}</p>
            <p className="new">{pet.gender}</p>
          </div>
          <div className="items cart">
            <i className="fa fa-shopping-cart" />
            <span>bolila</span>
          </div>
        </div>
      </div>
  );
};

export default PetCardTEST;
