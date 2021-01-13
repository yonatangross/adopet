import React from 'react';
import { Route } from 'react-router-dom';
import Pet from '../Pet/Pet';
import './PetGrid.css';

type PetGridProps = {
  pets: IPet[];
};

const PetGrid: React.FC<PetGridProps> = ({ pets }) => {
  pets=[];
  pets.push({ _id: '1', age: 25, animalType: 'aa', breed: '3', name: 'yoni' });
  pets.push({ _id: '2', age: 25, animalType: 'aa', breed: '3', name: 'matan' });
  pets.push({ _id: '3', age: 25, animalType: 'aa', breed: '3', name: 'aviv' });
  pets.push({ _id: '4', age: 25, animalType: 'aa', breed: '3', name: 'diana' });

  return (
    <div className="pet_grid">
      {pets.map((pet: IPet) => (
        <Route path={`${}`}>
        <Pet key={pet._id} pet={pet} />
        </Route>
      ))}
    </div>
  );
};

export default PetGrid;
