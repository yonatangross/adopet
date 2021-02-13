import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Pet from '../Pet/Pet';
import { AllPetsIndex } from '../AllPetsIndex/AllPetsIndex';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AdoptionRequestForm from '../AdoptionRequest/CreateAdoptionRequest/CreateAdoptionRequest';
import Contact from '../Contact/Contact';
import RequestSentSuccessfully from '../RequestSentSuccessfully/RequestSentSuccessfully';




const Navigator: React.FC = () => {
  return (
    <div>
         <MDBContainer style={{ maxWidth: "80%"}}>
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
            <Route path={`/adoptionForm/:petId`} exact component={AdoptionRequestForm} />
            <Route path={`/contact`} exact component={Contact} />
            <Route path={`/requestSent`} exact component={RequestSentSuccessfully} />
          </Switch>
        </div></MDBCol>
      </MDBRow>
    </MDBContainer>
    <div>
        <Footer />
    </div>
    </div>
 
  );
};

export default Navigator;
