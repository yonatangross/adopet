import React from 'react';
import './PetCard.css';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import moment from 'moment';

const PetCard: React.FC<IPetProps> = ({ pet }) => {
  if (!pet) {
    return null;
  }
  let petUpdatedTime = moment(pet.updatedAt).format('MMM Do YY HH:mm');
  return (
    <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard>
        <MDBCardImage className="img-fluid" src={pet.primaryPicture} style={{maxWidth: "100%", height: "250px"}}waves />
        <MDBCardBody>
          <MDBCardTitle>{pet.name}</MDBCardTitle>
          <MDBCardText>Gender: {pet.gender}</MDBCardText>
            <MDBCardText>Age: {pet.age}</MDBCardText>
            <MDBCardText>Type: {pet.animalType}</MDBCardText>
            <MDBCardText>Breed: {pet.breed}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )


};

export default PetCard;
