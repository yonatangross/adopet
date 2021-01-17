import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';

import PetGrid from '../PetGrid/PetGrid';
interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const Home: React.FC<Props> = () => {
  const [pets, setPets] = useState<IPet[]>([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = (): void => {
    getPets()
      .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
      .catch(() => console.log(`err on fetchPets`));
  };

  return (
    <div>
      <h1>My Pets</h1>
      <PetGrid pets={pets} />
    </div>
  );
};

export default Home;
