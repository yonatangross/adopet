import React from 'react';
import './PetCard.css';
import img from '../../assets/images/img_avatar2.png';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBView } from 'mdbreact';



const PetCard: React.FC<IPetProps> = ({ pet }) => {
  if (!pet) {
    return null;
  }
  return (
    
    <div>
    <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard wide cascade>
      <MDBView cascade>
      <MDBCardImage
              hover
              overlay='white-slight'
              className='card-img-top'
              src='https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg'
              alt='Card cap'
            />
                      </MDBView>
        <MDBCardBody>
          <MDBCardTitle>{pet.name}</MDBCardTitle>
          <MDBCardText>
              Sed ut perspiciatis unde om₪ iste natus sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </MDBCardText>
          <MDBCardText>Age: {pet.age}</MDBCardText>
          <MDBCardText>Type: {pet.animalType}</MDBCardText>
          <MDBCardText>Breed: {pet.breed}</MDBCardText>
        </MDBCardBody>
        <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
            <ul className='list-unstyled list-inline font-small'>
              <li className='list-inline-item pr-2 white-text'>
                <MDBIcon far icon='clock' /> 05/10/2015
              </li>
              <li className='list-inline-item pr-2'>
                <a href='#!' className='white-text'>
                  <MDBIcon far icon='comments' className='mr-1' />
                  12
                </a>
              </li>
              <li className='list-inline-item pr-2'>
                <a href='#!' className='white-text'>
                  <MDBIcon fab icon='facebook-f' className='mr-1' />
                  21
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#!' className='white-text'>
                  <MDBIcon fab icon='twitter' className='mr-1' />5
                </a>
              </li>
            </ul>
          </div>
      </MDBCard>
    </MDBCol>
      {/* <div className="pet_image ">
        <img src={img} alt="Pet" />
      </div>
      <div className="pet_content">
        <div className="pet_name">{pet.name}</div>
        <div className="pet_name">{pet.age}</div>
        <div className="pet_name">{pet.animalType}</div>
        <div className="pet_name">{pet.breed}</div>
      </div> */}
    </div>
  );
};

export default PetCard;
