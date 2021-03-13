import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import './AllPetsIndex.css';

import PetGrid from '../PetGrid/PetGrid';
import SearchInput from '../SearchInput/SearchInput';
import ISorter from '../../interfaces/ISorter';
import Sorters from '../Sorters/Sorters';
import IFilter from '../../interfaces/IFilter';
import { Filters } from '../Filters/Filters';

interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const AllPetsIndex: React.FC<Props> = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [pets, setPets] = useState<IPet[]>([{ _id: '', gender: '', age: 0, animalType: '', breed: '', name: '', isAdopted: false }]);
  const [activeSorter, setActiveSorter] = useState<ISorter<IPet>>({
    property: 'age',
    isDescending: false,
  });

  const [animalBreeds, setAnimalBreeds] = useState<string[]>([]);

  const [activeFilters, setActiveFilters] = useState<IFilter<IPet>[]>([
    { property: 'animalType', selectedValue: '', values: ['Dog', 'Cat'] },
    { property: 'age', selectedValue: '', values: ['Puppy', 'Young', 'Adult', 'Senior'] },
    { property: 'gender', selectedValue: '', values: ['Male', 'Female'] },
    { property: 'breed', selectedValue: '', values: animalBreeds },
  ]);

  useEffect(() => {
    // console.log(`started useEffect, animalBreeds length: ${animalBreeds.length}`);

    getPets(searchInput, activeSorter, activeFilters)
      .then(({ data: { pets, breeds } }: any) => {
        //console.log(`number of Pets: ${Object.keys(pets).length} number of breeds:${Object.keys(breeds).length}`);
        setPets(pets);
        setAnimalBreeds(breeds);
        //todo: fix initial render of pet breeds.
        setActiveFilters(activeFilters);
      })
      .catch(() => console.log(`err on fetchPets`));
  }, [searchInput, activeSorter, activeFilters]);

  return (
    <div className="allPetsGrid">
      <MDBRow className="main-container">
        <MDBCol md="8">
          <SearchInput onChangeSearchQuery={(query) => setSearchInput(query)} />
        </MDBCol>
        <MDBCol md="4">
          <div className="sort_table">
            <MDBCard>
              <div id="inputsBack" className="header pt-3  pink">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Sort:</h3>
                </MDBRow>
              </div>
              <MDBCardBody>
                <form action="">
                  <MDBRow>
                    <MDBCol md="4">
                      <span>Sort by:</span>
                    </MDBCol>
                    <MDBCol md="8">
                      <Sorters<IPet>
                        object={{ _id: '', gender: '', age: 0, animalType: '', breed: '', name: '', isAdopted: false }}
                        onChangeSorter={(property, isDescending) => {
                          setActiveSorter({
                            property,
                            isDescending,
                          });
                        }}
                      />
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
              <div id="inputsBack" className="header pt-3">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Filter:</h3>
                </MDBRow>
              </div>
              <MDBCardBody>
                <Filters<IPet>
                  filters={activeFilters}
                  onChangeFilter={(changedFilterProperty, selectedValue) => {
                    setActiveFilters([
                      {
                        property: 'animalType',
                        selectedValue: changedFilterProperty === 'animalType' ? selectedValue : activeFilters[0].selectedValue,
                        values: ['Dog', 'Cat'],
                      },
                      {
                        property: 'age',
                        selectedValue: changedFilterProperty === 'age' ? selectedValue : activeFilters[1].selectedValue,
                        values: ['Puppy', 'Young', 'Adult', 'Senior'],
                      },
                      {
                        property: 'gender',
                        selectedValue: changedFilterProperty === 'gender' ? selectedValue : activeFilters[2].selectedValue,
                        values: ['Male', 'Female'],
                      },
                      {
                        property: 'breed',
                        selectedValue: changedFilterProperty === 'breed' ? selectedValue : activeFilters[3].selectedValue,
                        values: animalBreeds,
                      },
                    ]);
                    // console.log(`after onChangeFilter: ${changedFilterProperty} ${selectedValue}`);
                  }}
                />
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
        <MDBCol md="9">
          <div className="petgrid">
            <MDBCard>
              <div id="inputsBack" className="header pt-3">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">{pets.length} Pets Found</h3>
                </MDBRow>
              </div>
              <MDBCardBody>
                <PetGrid pets={pets} count={9999} numOfCols={3} />
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
