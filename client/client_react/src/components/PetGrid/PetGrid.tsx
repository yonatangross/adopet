import React from 'react';
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
  pets.push({ _id: '5', age: 25, animalType: 'aa', breed: '3', name: 'yoni' });
  pets.push({ _id: '6', age: 25, animalType: 'aa', breed: '3', name: 'matan' });
  pets.push({ _id: '7', age: 25, animalType: 'aa', breed: '3', name: 'aviv' });
  pets.push({ _id: '8', age: 25, animalType: 'aa', breed: '3', name: 'diana' });

  return (
    <div className="pet_grid">
      {pets.map((pet: IPet) => (
        <Pet key={pet._id} pet={pet} />
      ))}
    </div>
  );
};

export default PetGrid;
