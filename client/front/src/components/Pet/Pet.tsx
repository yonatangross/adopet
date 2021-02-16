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
} from 'mdbreact';

interface Props extends RouteComponentProps<{ petId: string }>, IPetProps {}

const Pet: React.FC<Props> = ({ match }) => {
  const [pet, setPet] = useState<IPet>();

  console.log(match.params.petId);

  useEffect(() => {
    fetchPet(match.params.petId);
  }, [match.params.petId]);

  const fetchPet = (petId: string): void => {
    getPet(petId)
      .then(({ data: { pet } }: IPet | any) => setPet(pet))
      .catch(() => console.log(`err on fetchPet`));
  };

  if (!pet) {
    return null;
  }
  return (
    <div>
      <MDBCard className="my-5 px-5 pb-5">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            {pet.animalType} Page: {pet.name}
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <MDBRow>
            <MDBCol lg="5">
              <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                <img
                  className="img-fluid pet-image"
                  src={pet.primaryPicture}
                  alt=""
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
            </MDBCol>
            <MDBCol lg="6">
              <MDBTable striped>
                <MDBTableBody>
                  <tr>
                    <td>Name:</td>
                    <td>{pet.name}</td>
                  </tr>
                  <tr>
                    <td>Type:</td>
                    <td>{pet.animalType}</td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>{pet.age}</td>
                  </tr>
                  <tr>
                    <td>Breed:</td>
                    <td>{pet.breed}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
              <Fragment>
                <Link key={pet._id} to={`/AdoptionForm/${pet._id}`}>
                  <MDBBtn gradient="peach">Adopt Me!!!</MDBBtn>
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
