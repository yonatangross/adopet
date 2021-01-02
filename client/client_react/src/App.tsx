import React, { useEffect, useState } from 'react';
import PetItem from './components/PetItem';
import AddPet from './components/AddPet';
import { getPets, addPet, updatePet, deletePet } from './API';

const App: React.FC = () => {
  const [pets, setPets] = useState<IPet[]>([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = (): void => {
    getPets()
      .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
      .catch((err: Error) => console.log(`err on fetchPets`));
  };

  const handleSavePet = (e: React.FormEvent, formData: IPet): void => {
    console.log("in handleSavePet");
    console.log(formData);
    
    e.preventDefault();
    addPet(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Pet not saved');
        }
        setPets(data.pets);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdatePet = (pet: IPet): void => {
    updatePet(pet)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Pet not updated');
        }
        setPets(data.pets);
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePet = (_id: string): void => {
    deletePet(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Pet not deleted');
        }
        setPets(data.pets);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="App">
      <h1>My Pets</h1>
      <AddPet savePet={handleSavePet} />
      {pets.map((pet: IPet) => (
        <PetItem
          key={pet._id}
          updatePet={handleUpdatePet}
          deletePet={handleDeletePet}
          pet={pet}
        />
      ))}
    </main>
  );
};

export default App;
