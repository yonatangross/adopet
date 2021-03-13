import React, { useState } from 'react';
import './PetCard.css';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import moment from 'moment';

const PetCard: React.FC<IPetProps> = ({ pet }) => {

 

  if (!pet) {
    return null;
  }

  let wavesValue:boolean=true;
 if(pet.isAdopted)
 {
    wavesValue=false;
 }
  let petUpdatedTime = moment(pet.updatedAt).format('MMM Do YY HH:mm');
  return (
    <MDBCol className="Col-Card">
      <MDBCard className="Card">  
        <MDBCardImage className="img-fluid" src={pet.primaryPicture} waves={wavesValue}/>
        {pet.isAdopted ? <MDBCardText id="adoptedSticker">Adopted!</MDBCardText> : ""}
        <MDBCardBody>
          <MDBCardTitle className="font-weight-bold">{pet.name}</MDBCardTitle>
          <MDBCardText className="font-weight-bolder">Gender: {pet.gender}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Age: {pet.age<2 ? pet.age : Math.floor(pet.age)}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Type: {pet.animalType}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Breed: {pet.breed}</MDBCardText>
            <MDBCardText className="font-weight-bolder">Updated in: {petUpdatedTime}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )


};

export default PetCard;
