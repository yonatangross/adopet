import React, { useEffect, useState } from "react";
import { match, RouteComponentProps } from "react-router-dom";
import { getPets } from "../../api/PetAPI";
import { MDBRow, MDBCol, MDBIcon, MDBContainer, MDBCard, MDBCardBody } from "mdbreact";
import "./AllPetsIndex.css";

import PetGrid from "../PetGrid/PetGrid";
interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const AllPetsIndex: React.FC<Props> = () => {
  const [pets, setPets] = useState<IPet[]>([]);

  useEffect(() => {
    fetchPets();
  }, [pets]);

  const fetchPets = (): void => {
    getPets()
      .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
      .catch(() => console.log(`err on fetchPets`));
  };

  //function filter(){}

  return (
    <div className="allPetsGrid">
      <h2 className="h1-responsive font-weight-bold text-center my-5">Our Pets</h2>
      <MDBRow>
        <MDBCol md="3">
          <div>
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Filter:</h3>
                </MDBRow>
              </div>
              <MDBCardBody>
                <form action="">
                  <MDBRow>
                    <MDBCol md="4">
                      <span>Pet Type:</span>
                    </MDBCol>
                    <MDBCol md="8">
                      <select className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="allPetsGrid">
                    <MDBCol md="4">
                      <span>Age:</span>
                    </MDBCol>
                    <MDBCol md="8">
                      <select className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="allPetsGrid">
                    <MDBCol md="4">
                      <span>Gender:</span>
                    </MDBCol>
                    <MDBCol md="8">
                      <select className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="allPetsGrid">
                    <MDBCol md="4">
                      <span>Size Type:</span>
                    </MDBCol>
                    <MDBCol md="8">
                      <select className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="allPetsGrid">
                    <MDBCol md="4">
                      <span>Breed:</span>
                    </MDBCol>
                    <MDBCol md="8">
                      <select className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
        <MDBCol md="9">
          <div className="petgrid">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">{pets.length} Pets Found</h3>
                </MDBRow>
              </div>
              <MDBCardBody>
                <PetGrid pets={pets} />
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
