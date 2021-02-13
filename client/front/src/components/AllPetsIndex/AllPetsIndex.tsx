import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import './AllPetsIndex.css';

import PetGrid from '../PetGrid/PetGrid';
import IFilter from '../../interfaces/IFilter';
import ISorter from '../../interfaces/ISorter';
import { genericFilter } from '../../utils/genericFilter';
import { genericSearch } from '../../utils/genericSearch';
import { genericSort } from '../../utils/genericSort';
import { Filters } from '../Filters/Filters';
import SearchInput from '../SearchInput/SearchInput';
import Sorters from '../Sorters/Sorters';
interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const AllPetsIndex: React.FC<Props> = () => {
  const [pets, setPets] = useState<IPet[]>([
    { _id: '', age: 0, animalType: '', breed: '', name: '' },
  ]);
  const [query, setQuery] = useState<string>('');
  const [activeSorter, setActiveSorter] = useState<ISorter<IPet>>({
    property: 'name',
    isDescending: true,
  });
  const [activeFilters, setActiveFilters] = useState<Array<IFilter<IPet>>>([]);

  useEffect(() => {
    fetchPets();
  }, []);

  //todo: remove fetching all pets (we need to fetch only pets that passed filtering)
  const fetchPets = (): void => {
    getPets()
      .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
      .catch(() => console.log(`err on fetchPets`));
  };

  const resultPets = pets
    .filter((pet) => genericSearch<IPet>(pet, ['name', 'animalType'], query))
    .filter((pet) => genericFilter<IPet>(pet, activeFilters))
    .sort((petA, petB) => genericSort<IPet>(petA, petB, activeSorter));

  return (
    <div>
      <SearchInput onChangeSearchQuery={(query) => setQuery(query)} />
      <Sorters<IPet>
        object={pets[0]}
        onChangeSorter={(property, isDescending) => {
          setActiveSorter({
            property,
            isDescending,
          });
        }}
      />
      <Filters<IPet>
        object={pets[0]}
        filters={activeFilters}
        onChangeFilter={(changedFilterProperty, checked, isActive) => {
          checked
            ? setActiveFilters([
                ...activeFilters.filter(
                  (filter) => filter.property !== changedFilterProperty
                ),
                { property: changedFilterProperty, isActive },
              ])
            : setActiveFilters(
                activeFilters.filter(
                  (filter) => filter.property !== changedFilterProperty
                )
              );
        }}
      />
      <h3>Results:</h3>
      {resultPets.length > 0 && <PetGrid pets={resultPets} count={9999} />}
      {resultPets.length === 0 && <p>No results found!</p>}
    </div>
  );
};
