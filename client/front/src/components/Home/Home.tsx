import React from 'react';

import PetGrid from '../PetGrid/PetGrid';

const Home: React.FC = () => {
  return (
    <div>
      <h1>My Pets</h1>
      <PetGrid pets={[]} />
    </div>
  );
};

export default Home;
