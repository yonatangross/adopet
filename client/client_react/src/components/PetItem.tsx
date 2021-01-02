import React from 'react';

type Props = PetProps & {
  updatePet: (pet: IPet) => void;
  deletePet: (_id: string) => void;
};

const Pet: React.FC<Props> = ({ pet, updatePet, deletePet }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h1>{pet.name}</h1>
        <span>{pet.breed}</span>
        <span>{pet.animalType}</span>
        <span>{pet.age}</span>
      </div>
      <div className="Card--button">
        <button onClick={() => updatePet(pet)}>Complete</button>
        <button
          onClick={() => deletePet(pet._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Pet;
