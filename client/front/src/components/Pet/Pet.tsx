import React from 'react';
import './Pet.css';
import img from '../../assets/images/img_avatar2.png';
type Props = PetProps & {};

const Pet: React.FC<Props> = ({ pet }) => {
  return (
      <div className="pet_item">
        <div className="pet_image ">
          <img src={img} alt="Pet" />
        </div>
        <div className="pet_content">
          <div className="pet_name">{pet.name}</div>
          <div className="pet_name">{pet.age}</div>
          <div className="pet_name">{pet.animalType}</div>
          <div className="pet_name">{pet.breed}</div>
        </div>
      </div>
  );
};

export default Pet;
