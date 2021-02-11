import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import { RouteComponentProps } from "react-router-dom";
import { getPet } from "../../../api/PetAPI";


interface Props extends RouteComponentProps<{ petId: string }>, PetProps {}



function insertFormToDB(formFromOuser: AdoptionDataTypeApi) {
  
  return formFromOuser.name;
}


const AdoptionRequestForm: React.FC<Props> = ({ match }) => {
  const [pet, setPet] = useState<IPet>();

  console.log(match.params.petId);

  useEffect(() => {
    fetchPet(match.params.petId);
  }, [match.params.petId]);

  const fetchPet = (petId: string): void => {
    getPet(petId)
      .then(({ data: { pet } }: IPet | any) => setPet(pet))
      .catch(() => console.log(`err on fetchPet`));
  };

  const onSubmit = (data: AdoptionDataTypeApi) =>{

  }

  if (!pet) {
    return null;
  }
  return (
    
    <MDBContainer>
<MDBRow>
  <MDBCol md="6">
  <form>
  <p className="h5 text-center mb-4">Write to us</p>
  <div className="grey-text">
    <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
      success="right" />
    <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
      success="right" />
    <MDBInput value={pet._id} icon="tag" group type="text" validate error="wrong" success="right" />
    <MDBInput label="Phone NUmber" icon="phone" group type="text" validate error="wrong" success="right" />
    <MDBInput label="Address" icon="home" group type="text" validate error="wrong" success="right" />
    <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
  </div>
  <div className="text-center">
    <MDBBtn outline color="secondary">
      Send
      <MDBIcon far icon="paper-plane" className="ml-1" />
    </MDBBtn>
  </div>
</form>
  </MDBCol>
</MDBRow>
</MDBContainer>
    );
}


export default AdoptionRequestForm;




















// import React from "react";
// import { useForm } from "react-hook-form";

// interface IFormInput {
//   firstName: string;
//   lastName: string;
//   age: number;
// }

// export default function AdoptForm() {
//   const { register, handleSubmit } = useForm<IFormInput>();
//   const onSubmit = (data: IFormInput) => console.log(data);
   
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input name="firstName" ref={register({ required: true, maxLength: 20 })} />
//       <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
//       <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
//       <input type="submit" />
//     </form>
//   );
// }