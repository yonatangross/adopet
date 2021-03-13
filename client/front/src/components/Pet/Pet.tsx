import React, { Fragment, useEffect, useState } from 'react';
import './Pet.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getPet } from '../../api/PetAPI';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBMask,
  MDBRow,
  MDBView,
  MDBTable,
  MDBTableBody,
  MDBCardImage,
} from 'mdbreact';
import moment from 'moment';

interface Props extends RouteComponentProps<{ petId: string }>, IPetProps { }

const Pet: React.FC<Props> = ({ match }) => {
  const [pet, setPet] = useState<IPet>();

  //console.log(match.params.petId);

  useEffect(() => {
    fetchPet(match.params.petId);
  }, [match.params.petId]);

  const fetchPet = (petId: string): void => {
    getPet(petId)
      .then(({ data: { pet } }: IPet | any) => setPet(pet))
      .catch(() => console.log(`err on fetchPet`));
  };

  let petUpdatedTime = moment(pet?.updatedAt).format('MMM Do YY');
  if (!pet) {
    return null;
  }
  return (
    
    <div>
      <MDBCard className="my-5 px-5 pb-5">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            Meet {pet.animalType} {pet.name}
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Hi my name is {pet.name} I`m {pet.age} years old. I`m waiting here since {petUpdatedTime}, I`m looking 
            for a loving home. Please adopt me.  
          </p>
          <MDBRow>
            <MDBCol lg="5">
            <MDBCardImage id="imgPosition" className="img-fluid" src={pet.primaryPicture} 
            waves />
              {/* <MDBView id="primaryPic" src={pet.primaryPicture}>
                <MDBMask className="flex-center flex-column text-white text-center"></MDBMask>
              </MDBView> */}
            </MDBCol>
            <MDBCol lg="6">
              <MDBTable striped>
                <MDBTableBody>
                  <tr>
                    <td className="font-weight-bold">Name:</td>
                    <td className="font-weight-bolder">{pet.name}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">Type:</td>
                    <td className="font-weight-bolder">{pet.animalType}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">Age:</td>
                    <td className="font-weight-bolder">{pet.age}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">Breed:</td>
                    <td className="font-weight-bolder">{pet.breed}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
              <Fragment>
                <Link key={pet._id} to={`/AdoptionForm/${pet._id}`}>
                  <MDBBtn gradient="peach">Adopt Me!</MDBBtn>
                </Link>
              </Fragment>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default Pet;
