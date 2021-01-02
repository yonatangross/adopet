import React, { useState } from 'react';

type Props = {
  savePet: (e: React.FormEvent, formData: IPet | any) => void;
};

const AddPet: React.FC<Props> = ({ savePet }) => {
  const [formData, setFormData] = useState<IPet | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(e) => savePet(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="breed">Breed</label>
          <input onChange={handleForm} type="text" id="breed" />
        </div>
        <div>
          <label htmlFor="animalType">Animal Type</label>
          <input onChange={handleForm} type="text" id="animalType" />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input onChange={handleForm} type="number" id="age" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Pet</button>
    </form>
  );
};

export default AddPet;
