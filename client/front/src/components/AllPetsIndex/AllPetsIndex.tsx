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
        <MDBCol md="3" >
        <MDBRow >
          <div className="Filter_Row_Table">
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
          </MDBRow>
        
        <MDBRow>
        <div className="sort_table">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Sort:</h3>
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
        </MDBRow>
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
                <PetGrid pets={pets} count={9999}/>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};









// import React, { useEffect, useState } from 'react';
// import { match, RouteComponentProps } from 'react-router-dom';
// import { getPets } from '../../api/PetAPI';
// import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
// import './AllPetsIndex.css';

// import PetGrid from '../PetGrid/PetGrid';
// import IFilter from '../../interfaces/IFilter';
// import ISorter from '../../interfaces/ISorter';
// import { genericFilter } from '../../utils/genericFilter';
// import { genericSearch } from '../../utils/genericSearch';
// import { genericSort } from '../../utils/genericSort';
// import { Filters } from '../Filters/Filters';
// import SearchInput from '../SearchInput/SearchInput';
// import Sorters from '../Sorters/Sorters';
// interface Props extends RouteComponentProps {
//   match: match<{ petId: string }>;
// }

// export const AllPetsIndex: React.FC<Props> = () => {
//   const [pets, setPets] = useState<IPet[]>([
//     { _id: '', age: 0, animalType: '', breed: '', name: '', isAdopted: false},
//   ]);
//   const [query, setQuery] = useState<string>('');
//   const [activeSorter, setActiveSorter] = useState<ISorter<IPet>>({
//     property: 'name',
//     isDescending: true,
//   });
//   const [activeFilters, setActiveFilters] = useState<Array<IFilter<IPet>>>([]);

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   //todo: remove fetching all pets (we need to fetch only pets that passed filtering)
//   const fetchPets = (): void => {
//     getPets()
//       .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
//       .catch(() => console.log(`err on fetchPets`));
//   };

//   const resultPets = pets
//     .filter((pet) => genericSearch<IPet>(pet, ['name', 'animalType'], query))
//     .filter((pet) => genericFilter<IPet>(pet, activeFilters))
//     .sort((petA, petB) => genericSort<IPet>(petA, petB, activeSorter));

//   return (
//     <div>
//       <SearchInput onChangeSearchQuery={(query) => setQuery(query)} />
//       <Sorters<IPet>
//         object={pets[0]}
//         onChangeSorter={(property, isDescending) => {
//           setActiveSorter({
//             property,
//             isDescending,
//           });
//         }}
//       />
//       <Filters<IPet>
//         object={pets[0]}
//         filters={activeFilters}
//         onChangeFilter={(changedFilterProperty, checked, isActive) => {
//           checked
//             ? setActiveFilters([
//                 ...activeFilters.filter(
//                   (filter) => filter.property !== changedFilterProperty
//                 ),
//                 { property: changedFilterProperty, isActive },
//               ])
//             : setActiveFilters(
//                 activeFilters.filter(
//                   (filter) => filter.property !== changedFilterProperty
//                 )
//               );
//         }}
//       />
//       <h3>Results:</h3>
//       {resultPets.length > 0 && <PetGrid pets={resultPets} count={9999} />}
//       {resultPets.length === 0 && <p>No results found!</p>}
//     </div>
//   );
// };
