import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBContainer,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';
import './AllPetsIndex.css';

import PetGrid from '../PetGrid/PetGrid';
import SearchInput from '../SearchInput/SearchInput';
interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const AllPetsIndex: React.FC<Props> = () => {
  const [query, setQuery] = useState<string>('');
  const [pets, setPets] = useState<IPet[]>([
    { _id: '', age: 0, animalType: '', breed: '', name: '', isAdopted: false },
  ]);

  useEffect(() => {
    console.log(`searching pet with query: ${query}`);

    getPets(query)
      .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
      .catch(() => console.log(`err on fetchPets`));
  }, [query]);

  return (
    <div className="allPetsGrid">
      {/* <h2 className="h1-responsive font-weight-bold text-center my-5">
        Our Pets
      </h2> */}
      <MDBRow className="main-container">
        <MDBCol md="8">
          <SearchInput onChangeSearchQuery={(query) => setQuery(query)} />
        </MDBCol>
        <MDBCol md="4">
        <div className="sort_table">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                    Sort:
                    </h3>
                </MDBRow>
              </div>
              <MDBCardBody>
                <form action="">
                  <MDBRow>
                    <MDBCol md="4">
                      <span>Sort by:</span>
                    </MDBCol>
                    <MDBCol md="8">
                      <select className="browser-default custom-select">
                        <option>Choose your option</option>
                        <option value="1">Matan</option>
                        <option value="2">Aviv and Matan</option>
                        <option value="3">Diana and Matan</option>
                        <option value="3">NO MATAN</option>
                      </select>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="3">
          <div className="Filter_Row_Table">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                    Filter:
                    </h3>
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
                        <option value="1">Dog</option>
                        <option value="2">Cat</option>
                        <option value="3">Wolf</option>
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
                        <option value="1">Puppy</option>
                        <option value="2">Young</option>
                        <option value="3">Adult</option>
                        <option value="3">Senior</option>
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
                        <option value="1">Male</option>
                        <option value="2">Female</option>
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
                        <option value="1">Dwarf</option>
                        <option value="2">Small</option>
                        <option value="2">Medium</option>
                        <option value="2">Big</option>
                        <option value="3">Giant</option>
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
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                    {pets.length} Pets Found
                  </h3>
                </MDBRow>
              </div>
              <MDBCardBody>
                <PetGrid pets={pets} count={9999} />
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};