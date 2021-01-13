import React from 'react';

import PetGrid from '../PetGrid/PetGrid';

const Home: React.FC = () => {
  return (
    <main className="App">
      <h1>My Pets</h1>
      <PetGrid pets={[]} />
    </main>
  );
};

export default Home;
