import React, { useState } from 'react';
import './PetCard.css';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import moment from 'moment';

const PetCard: React.FC<IPetProps> = ({ pet }) => {

 

  if (!pet) {
    return null;
  }


  let petUpdatedTime = moment(pet.updatedAt).format('MMM Do YY HH:mm');
  return (
    <MDBCol style={{ maxWidth: "22rem"}}>
      <div className={ pet.isAdopted ? " adoptedSticker" : " adoptedSticker" }>
      <MDBCard>  
        <MDBCardImage className="img-fluid" src={pet.primaryPicture} style={{width: "100%", height: "250px"}}waves />
        <Text></Text>
        <MDBCardBody>
          <MDBCardTitle className="font-weight-bold">{pet.name}</MDBCardTitle>
          <MDBCardText className="font-weight-bolder">Gender: {pet.gender}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Age: {Math.floor(pet.age)}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Type: {pet.animalType}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Breed: {pet.breed}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Updated in: {petUpdatedTime}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      </div>
    </MDBCol>
  )


};

export default PetCard;
