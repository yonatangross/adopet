import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../PetCard/PetCard';
import './PetGrid.css';

interface PetGridProps {
  pets: IPet[];
  count: number;
  numOfCols: number;
}

const GenerateNumberOfColsStyle = (numOfCols: number): string => {
  let frStyle = ""
  for (let i = 0; i < numOfCols; i++) {
    frStyle = frStyle.concat(" ", "1fr");
  }
  return frStyle;
};

const PetGrid: React.FC<PetGridProps> = ({ pets, count, numOfCols }) => {
  return (
    <div className="pet_grid" style={{ gridTemplateColumns: GenerateNumberOfColsStyle(numOfCols) }}>
      {pets.slice(0, count).map((pet: IPet) => {

        return <div key={pet._id}>
            { pet.isAdopted ? <PetCard key={pet._id} pet={pet} /> 
            : <Link key={pet._id} to={ pet.isAdopted ? '' : `/pets/${pet._id}`}>
              <PetCard key={pet._id} pet={pet} />
             </Link>}
        </div>

      })}
    </div>
  );
};

export default PetGrid;
