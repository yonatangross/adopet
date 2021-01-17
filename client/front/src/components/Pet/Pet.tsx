import React, { useEffect, useState } from 'react';
import './Pet.css';
import img from '../../assets/images/img_avatar2.png';
import { RouteComponentProps } from 'react-router-dom';
import { getPet } from '../../api/PetAPI';
interface Props extends RouteComponentProps<{ petId: string }>, PetProps {}

const Pet: React.FC<Props> = ({ match }) => {
  const [pet, setPet] = useState<IPet>();

  console.log(match.params.petId);

  useEffect(() => {
    fetchPet(match.params.petId);
  }, [match.params.petId]);

  const fetchPet = (petId: string): void => {
    getPet(petId)
      .then(({ data: { pet } }: IPet[] | any) => setPet(pet))
      .catch(() => console.log(`err on fetchPet`));
  };

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

export default Pet;
