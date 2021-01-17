import React from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { pets } from '../../data';

import PetGrid from '../PetGrid/PetGrid';
interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const Home: React.FC<Props> = () => {
  return (
    <div>
      <h1>My Pets</h1>
      <PetGrid pets={pets} />
    </div>
  );
};

export default Home;
