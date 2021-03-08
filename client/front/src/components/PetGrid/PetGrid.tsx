import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../PetCard/PetCard';
import PetCardTEST from '../testPetCard/PetCard';
import './PetGrid.css';

interface PetGridProps {
  pets: IPet[];
  count:number;
}

const PetGrid: React.FC<PetGridProps> = ({ pets ,count }) => {
  return (
    <div className="pet_grid">
      {pets.slice(0,count).map((pet: IPet) => {
        return (
          <Link key={pet._id} to={`/pets/${pet._id}`}>
            <PetCard key={pet._id} pet={pet} />
          </Link>
        );
      })}
    </div>
  );
};

export default PetGrid;
