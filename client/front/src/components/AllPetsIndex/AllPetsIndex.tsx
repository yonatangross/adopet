import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';
import { MDBRow, MDBCol, MDBIcon, MDBContainer } from "mdbreact";
import './AllPetsIndex.css';


import PetGrid from '../PetGrid/PetGrid';
interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const AllPetsIndex: React.FC<Props> = () => {
    const [pets, setPets] = useState<IPet[]>([]);
  
    useEffect(() => {
      fetchPets();
    }, [pets]);
  
    const fetchPets = (): void => {
      getPets()
        .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
        .catch(() => console.log(`err on fetchPets`));
    };
  
    //function filter(){}

    return (
      <div>
        <MDBContainer>
        <MDBRow>
         <MDBCol md="8"><div className="allPetsGrid">
           <div className="petgrid">
           <h2>{pets.length} Pets Found</h2>
           </div>
          </div></MDBCol>
          <MDBCol md="4"><div>
          <h2>filter options:</h2>
          </div></MDBCol>
         </MDBRow>
         <MDBRow>
         <MDBCol md="8"><div className="allPetsGrid">
           <div className="petgrid">
           <PetGrid pets={pets} />
           </div>
          </div></MDBCol>
          <MDBCol md="4"><div>
          <select className="browser-default custom-select">
          <option>Choose your option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          </select>
          </div></MDBCol>
         </MDBRow>
        </MDBContainer>
      </div>
    );
}