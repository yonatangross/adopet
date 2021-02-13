import React, { ReactElement } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBContainer } from "mdbreact";
import './Contact.css';

const Contact: React.FC = (): ReactElement => {
  return (
    <section className="contact margetop">
      <h2 className="h1-responsive font-weight-bold text-center ">
        Contact us
      </h2>
      <p className="text-center w-responsive mx-auto pb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
        error amet numquam iure provident voluptate esse quasi, veritatis
        totam voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
      <MDBRow>
        <MDBCol lg="5" className="lg-0 mb-4">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Write to us:</h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <div className="form-header blue accent-1">
              </div>
              <p className="dark-grey-text">
                We'll write rarely, but only the best content.
              </p>
              <div className="md-form">
                <MDBInput
                  icon="user"
                  label="Your name"
                  iconClass="grey-text"
                  type="text"
                  id="form-name"
                />
              </div>
              <div className="md-form">
                <MDBInput
                  icon="envelope"
                  label="Your email"
                  iconClass="grey-text"
                  type="text"
                  id="form-email"
                />
              </div>
              <div className="md-form">
                <MDBInput
                  icon="tag"
                  label="Subject"
                  iconClass="grey-text"
                  type="text"
                  id="form-subject"
                />
              </div>
              <div className="md-form">
                <MDBInput
                  icon="pencil-alt"
                  label="Your Message"
                  iconClass="grey-text"
                  type="textarea"
                  id="form-text"
                />
              </div>
              <div className="text-center">
                <MDBBtn color="light-blue">Submit</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="7">
          <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: "400px" }}
          >
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBS8EZj9KdhPM5G07vW1ABQ132YpLiXmVc&q=Elie Wiesel St 2, Rishon LeTsiyon"
              title="Adop(e)t office"
              width="100%"
              height="100%"
              frameBorder="1"
              style={{ border: 1 }}
            />
          </div>
          <br />
          <MDBCard>
            <MDBCardBody>
              <MDBRow className="text-center">
                <MDBCol md="4">
                  <MDBBtn tag="a" floating color="blue" className="accent-1">
                    <MDBIcon icon="map-marker-alt" />
                  </MDBBtn>
                  <p>Elie Wiesel St 2, Rishon LeTsiyon</p>
                  <p className="mb-md-0">Israel</p>
                </MDBCol>
                <MDBCol md="4">
                  <MDBBtn tag="a" floating color="blue" className="accent-1">
                    <MDBIcon icon="phone" />
                  </MDBBtn>
                  <p>+ 01 234 567 89</p>
                  <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
                </MDBCol>
                <MDBCol md="4">
                  <MDBBtn tag="a" floating color="blue" className="accent-1">
                    <MDBIcon icon="envelope" />
                  </MDBBtn>
                  <p className="mb-md-0">adopetwebsite@gmail.com</p>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
    </section>
  );
};

export default Contact;