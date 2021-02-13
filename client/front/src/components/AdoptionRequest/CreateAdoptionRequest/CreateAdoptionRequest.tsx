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
  MDBCardImage,
} from 'mdbreact';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { getPet } from '../../../api/PetAPI';
import { addAdoptionRequest } from '../../../api/AdoptionRequestAPI';
import './CreateAdoptionRequest.css';

interface Props extends RouteComponentProps<{ petId: string }>, IPetProps {}

const AdoptionRequestForm: React.FC<Props> = ({ match }) => {
  const [pet, setPet] = useState<IPet>();
  const [formData, setFormData] = useState<IAdoptionRequest | {}>();
  const [formSent, setFormSent] = useState(false);

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
      .then(({ status }) => {
        if (status !== 201) {
          throw new Error('Error! AdoptionRequest was not saved');
        }
        setFormSent(true);
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
  if (formSent) {
    return <Redirect to="/requestSent" />;
  }
  return (
    <div className="margetop">
      <MDBContainer>
        <MDBCard>
          <MDBCardImage
            className="peach-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded"
            tag="div"
          >
            <h2>Have you decided to adopt {pet.name}? Mazel Tov!</h2>
            <p>
              Please fill in as full and accurate details as possible and a
              representative of the association where the dog is currently
              located will get back to you soon
            </p>
          </MDBCardImage>

          <MDBCardBody>
            <form onSubmit={(e) => handleSaveAdoptionRequest(e, formData)}>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard>
                    <div className="header pt-3 grey lighten-2">
                      <MDBRow className="d-flex justify-content-start">
                        <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                          Contact Information
                        </h3>
                      </MDBRow>
                    </div>
                    <MDBCardBody>
                      <div className="grey-text">
                        <MDBInput
                          id="fullName"
                          label="Full Name"
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
                          label="Email"
                          icon="envelope"
                          group
                          type="email"
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
                          id="city"
                          label="City"
                          icon="home"
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
                          id="age"
                          label="Age"
                          icon="sort-numeric-down"
                          group
                          type="number"
                          validate
                          error="wrong"
                          success="right"
                          onChange={handleForm}
                        />
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                  <MDBCard>
                    <div className="header pt-3 grey lighten-2">
                      <MDBRow className="d-flex justify-content-start">
                        <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                          Some general questions
                        </h3>
                      </MDBRow>
                    </div>
                    <MDBCardBody>
                      <div className="grey-text">
                        <select className="browser-default custom-select md-form form-group">
                          <option>Where the {pet.animalType} will live?</option>
                          <option value="1">In Apartemnt</option>
                          <option value="2">In Apartemnt with a garden</option>
                          <option value="3">In my garden</option>
                          <option value="4">Will move around freely</option>
                        </select>
                        <select className="browser-default custom-select md-form form-group">
                          <option>Do you have another pets?</option>
                          <option value="1">I dont have any pet</option>
                          <option value="2">Dog / dogs</option>
                          <option value="3">Cat/ cats</option>
                          <option value="4">Dogs and cats</option>
                          <option value="5">
                            An animal that is neither a cat nor a dog
                          </option>
                          <option value="6">
                            A dog or cat and also another animal
                          </option>
                        </select>
                        <select className="browser-default custom-select md-form form-group">
                          <option>Past dog breeding experience</option>
                          <option value="1">I have never raised a dog</option>
                          <option value="2">
                            I raised a dog but had to hand it over
                          </option>
                          <option value="3">
                            I raised a dog who died in good health / he is still
                            in my possession
                          </option>
                        </select>
                        <select className="browser-default custom-select md-form form-group">
                          <option>Who lives in the house?</option>
                          <option value="1">I live alone</option>
                          <option value="2">I live with my children</option>
                          <option value="3">Partners</option>
                          <option value="3">Partners with children</option>
                        </select>
                        <MDBInput
                          id="comment"
                          label="Additional notes"
                          icon="comment"
                          group
                          type="textarea"
                          validate
                          error="wrong"
                          success="right"
                          onChange={handleForm}
                        />
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                  <div className="margetop">
                    <MDBBtn
                      type="submit"
                      className="btn-block z-depth-1a"
                      gradient="peach"
                      rounded
                    >
                      Send
                      <MDBIcon far icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
              <div className="text-center"></div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default AdoptionRequestForm;
