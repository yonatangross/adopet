import React from 'react';
import './PetCard.css';
import img from '../../assets/images/img_avatar2.png';
interface Props extends PetProps {
  pet: IPet;
}

const PetCard: React.FC<Props> = ({ pet }) => {
  if (!pet) {
    return null;
  }
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

export default PetCard;
