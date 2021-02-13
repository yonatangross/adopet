import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from 'mdbreact';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { getPet } from '../../../api/PetAPI';
import { addAdoptionRequest } from '../../../api/AdoptionRequestAPI';
import ReactDOM from 'react-dom';
import RequestSentSuccessfully from '../../RequestSentSuccessfully/RequestSentSuccessfully';




interface Props extends RouteComponentProps<{ petId: string }>, IPetProps {}

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
    addAdoptionRequest(formData,pet?._id)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! AdoptionRequest was not saved');
        }
       /////
       <Redirect to='/requestSent'/>
    
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
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={(e) => handleSaveAdoptionRequest(e, formData)}>
            <p className="h5 text-center mb-4">Write to us</p>
            <div className="grey-text">
              <MDBInput
                id="fullName"
                label="Your full name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={handleForm}
              />
              <MDBInput
                id="email"
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                onChange={handleForm}
              />
              <MDBInput
                value={pet._id}
                icon="tag"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={handleForm}
              />
              <MDBInput
                id="phoneNumber"
                label="Phone Number"
                icon="phone"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={handleForm}
              />
              <MDBInput
                id="address"
                label="Address"
                icon="home"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={handleForm}
              />
              <MDBInput
                id="message"
                type="textarea"
                rows="2"
                label="Your message"
                icon="pencil-alt"
                onChange={handleForm}
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" outline color="secondary">
                Send
                <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AdoptionRequestForm;
