import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../PetCard/PetCard';
import './PetGrid.css';

interface PetGridProps {
  pets: IPet[];
}

const PetGrid: React.FC<PetGridProps> = ({ pets }) => {
  return (

    <div className="pet_grid">
      {pets.map((pet: IPet) => {
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
