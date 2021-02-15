import React from "react";
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './ThankYouForContact.css';

const ThankYouForContact: React.FC = () => {
  return (
    <div>
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className="Submitted">
              <h2 className="h1 display-3">Thank you for contacting us!</h2>
              <p className="lead">We appreciate you'v taken the time to write us.</p>
              <hr className="my-2" />
              <p className="lead">We'll get back to you very soon.</p>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ThankYouForContact;
