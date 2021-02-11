import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Pet from '../Pet/Pet';
import AdoptForm from '../AdoptionRequest/CreateAdoptionRequest/CreateAdoptionRequest';
import { AllPetsIndex } from '../AllPetsIndex/AllPetsIndex';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const Navigator: React.FC = () => {
  return (
    <MDBContainer style={{ maxWidth: "80%" }}>
      <MDBRow>
        <MDBCol ><div>
          <div>
            <Navbar />
          </div>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path={`/pets/:petId`} exact component={Pet} />
            <Route path="/allPets" exact component={AllPetsIndex} />
          </Switch>
          <div>
            <Footer />
          </div>
        </div></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Navigator;
