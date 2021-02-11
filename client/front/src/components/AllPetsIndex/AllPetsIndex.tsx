import React, { useEffect, useState } from "react";
import { match, RouteComponentProps } from "react-router-dom";
import { getPets } from "../../api/PetAPI";
import { MDBRow, MDBCol, MDBIcon, MDBContainer } from "mdbreact";
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
      <MDBRow>
        <MDBCol md="3">
          <div>
            <h2>filter options:</h2>
          </div>
          <div>
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
              <MDBRow>
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
              <MDBRow>
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
              <MDBRow>
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
              <MDBRow>
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
          </div>
        </MDBCol>
        <MDBCol md="9">
          <div className="petgrid">
            <h2>{pets.length} Pets Found</h2>
          </div>
          <div className="allPetsGrid1">
            <div className="petgrid">
              <PetGrid pets={pets} />
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
