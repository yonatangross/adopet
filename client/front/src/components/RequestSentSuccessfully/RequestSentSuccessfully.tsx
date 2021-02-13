import React from "react";
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./RequestSentSuccessfully.css";

const RequestSentSuccessfully: React.FC = () => {
  return (
    <div>
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className="Submitted">
              <h2 className="h1 display-3">Thank You</h2>
              <p className="lead">Your application was successfully sent.</p>
              <hr className="my-2" />
              <p>We'll contact you soon.</p>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default RequestSentSuccessfully;
