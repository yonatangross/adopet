import React, { useEffect, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { getPets } from '../../api/PetAPI';
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";

import {
  MDBMask,
  MDBView,
} from 'mdbreact';

import PetGrid from '../PetGrid/PetGrid';
interface Props extends RouteComponentProps {
  match: match<{ petId: string }>;
}

export const Home: React.FC<Props> = () => {
  const [pets, setPets] = useState<IPet[]>([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = (): void => {
    getPets()
      .then(({ data: { pets } }: IPet[] | any) => setPets(pets))
      .catch(() => console.log(`err on fetchPets`));
  };

  return (
    <div>
          <MDBView
            className="view-background"
            src="https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg"
          >
            <MDBMask
              overlay="black-light"
              className="flex-center flex-column text-white text-center"
            >
              <h2>Adop(e)t</h2>
              <h5>Come and adopt a pet from us.</h5>
            </MDBMask>
          </MDBView>
      <PetGrid pets={pets} />
      <section className="my-5">
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Why is it so great?
        </h2>
        <p className="lead grey-text w-responsive text-center mx-auto mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam.
        </p>

        <MDBRow>
          <MDBCol lg="5" className="text-center text-lg-left">
            <img
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Others/screens-section.jpg"
              alt=""
            />
          </MDBCol>
          <MDBCol lg="7">
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Safety</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  enim ad minima veniam, quis nostrum exercitationem ullam.
                  Reprehenderit maiores aperiam assumenda deleniti hic.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Technology</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  enim ad minima veniam, quis nostrum exercitationem ullam.
                  Reprehenderit maiores aperiam assumenda deleniti hic.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="share" size="lg" className="indigo-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">Finance</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  enim ad minima veniam, quis nostrum exercitationem ullam.
                  Reprehenderit maiores aperiam assumenda deleniti hic.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </section>
    </div>
  );
};

export default Home;
