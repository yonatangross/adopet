import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCardBody,
  MDBCard,
} from 'mdbreact';
import { Route, RouteComponentProps } from 'react-router-dom';
import { getPet } from '../../../api/PetAPI';
import { addAdoptionRequest } from '../../../api/AdoptionRequestAPI';




interface Props extends RouteComponentProps<{ petId: string }>, IPetProps { }

const AdoptionRequestForm: React.FC<Props> = ({ match }) => {
  const [pet, setPet] = useState<IPet>();
  const [formData, setFormData] = useState<IAdoptionRequest | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveAdoptionRequest = (
    e: React.FormEvent,
    formData: IAdoptionRequest | {} | undefined
  ): void => {
    e.preventDefault();
    addAdoptionRequest(formData, pet?._id)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! AdoptionRequest was not saved');
        }
        /////


      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPet(match.params.petId);
  }, [match.params.petId]);

  const fetchPet = (petId: string): void => {
    getPet(petId)
      .then(({ data: { pet } }: IPet | any) => setPet(pet))
      .catch(() => console.log(`err on fetchPet`));
  };

  if (!pet) {
    return null;
  }
  return (
    <MDBContainer>
      <MDBCard>
        <MDBCardBody>
          <form onSubmit={(e) => handleSaveAdoptionRequest(e, formData)}>
            <p className="h5 text-center mb-4">Write to us</p>
            <MDBRow>
              <MDBCol md="6">
                <div className="grey-text">
                  <MDBInput id="fullName" label="Full Name" icon="user" group type="text" validate error="wrong" success="right" onChange={handleForm} />
                  <MDBInput id="email" label="Email" icon="envelope" group type="email" validate error="wrong" success="right" onChange={handleForm} />
                  <MDBInput id="phoneNumber" label="Phone Number" icon="phone" group type="text" validate error="wrong" success="right" onChange={handleForm} />
                  <MDBInput id="city" label="City" icon="home" group type="text" validate error="wrong" success="right" onChange={handleForm} />
                  <MDBInput id="address" label="Address" icon="home" group type="text" validate error="wrong" success="right" onChange={handleForm} />
                  <MDBInput id="age" label="Age" icon="sort-numeric-down" group type="number" validate error="wrong" success="right" onChange={handleForm} />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div className="grey-text">
                  <select className="browser-default custom-select">
                    <option>Where the dog will live?</option>
                    <option value="1">In Apartemnt</option>
                    <option value="2">In Apartemnt with a garden</option>
                    <option value="3">In my garden</option>
                    <option value="4">Will move around freely</option>
                  </select>
                  <select className="browser-default custom-select">
                    <option>Do you have another pets?</option>
                    <option value="1">I dont have any pet</option>
                    <option value="2">Dog / dogs</option>
                    <option value="3">Cat/ cats</option>
                    <option value="4">Dogs and cats</option>
                    <option value="5">An animal that is neither a cat nor a dog</option>
                    <option value="6">A dog or cat and also another animal</option>
                  </select>
                  <select className="browser-default custom-select">
                    <option>Past dog breeding experience</option>
                    <option value="1">I have never raised a dog</option>
                    <option value="2">I raised a dog but had to hand it over</option>
                    <option value="3">I raised a dog who died in good health / he is still in my possession</option>
                  </select>
                  <select className="browser-default custom-select">
                    <option>Who lives in the house?</option>
                    <option value="1">I live alone</option>
                    <option value="2">I live with my children</option>
                    <option value="3">Partners</option>
                    <option value="3">Partners with children</option>
                  </select>
                  <MDBInput id="comment" label="Additional notes" icon="comment" group type="textarea" validate error="wrong" success="right" onChange={handleForm} />
                </div>
              </MDBCol>
            </MDBRow>
            <div className="text-center">
              <MDBBtn type="submit" outline color="secondary">
                Send
                <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AdoptionRequestForm;
