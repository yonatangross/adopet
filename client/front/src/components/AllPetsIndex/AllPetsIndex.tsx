import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';
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
    <div>
      <SearchInput onChangeSearchQuery={(query) => setQuery(query)} />
      <h3>Results:</h3>
      {pets.length > 0 && <PetGrid pets={pets} count={9999} />}
      {pets.length === 0 && <p>No results found!</p>}
    </div>
  );
};
