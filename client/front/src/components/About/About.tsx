import React from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon } from "mdbreact";

const About = () => {
  return (
    <div>
      <MDBCard className="my-5 px-5 pb-5 text-center">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold my-5">
            Our amazing team
          </h2>
          <p className="grey-text w-responsive mx-auto mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis
            totam voluptas nostrum quisquam eum porro a pariatur veniam.
          </p>
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
              <MDBCol xl="5" md="4" className="mb-3 text-center">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg"
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Diana Lanciano</h5>
              <p className="text-uppercase blue-text">Developer</p>
              <p className="grey-text">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci sed quia non numquam modi tempora eius.
              </p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="facebook-f" className="blue-text" />
                </a>
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="twitter" className="blue-text" />
                </a>
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="instagram" className="blue-text" />
                </a>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
              <MDBCol xl="5" md="4" className="mb-3 text-center">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg"
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Yonatan Gross</h5>
              <p className="text-uppercase blue-text">Developer</p>
              <p className="grey-text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                ipsa accusantium doloremque rem laudantium totam aperiam.
              </p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="facebook-f" className="blue-text" />
                </a>
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="instagram" className="blue-text" />
                </a>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
              <MDBCol xl="5" md="4" className="mb-3 text-center">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg"
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Matan Hasin</h5>
              <p className="text-uppercase blue-text">Developer</p>
              <p className="grey-text">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim est fugiat nulla id eu laborum.
              </p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="facebook-f" className="blue-text" />
                </a>
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="instagram" className="blue-text" />
                </a>
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="dribbble" className="blue-text" />
                </a>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
              <MDBCol xl="5" md="4" className="mb-3 text-center">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg"
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Aviv Miranda</h5>
              <p className="text-uppercase blue-text">Developer</p>
              <p className="grey-text">
                Perspiciatis repellendus ad odit consequuntur, eveniet earum
                nisi qui consectetur totam officia voluptates perferendis
                voluptatibus aut.
              </p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="facebook-f" className="blue-text" />
                </a>
                <a href="#!" className="p-2 fa-lg">
                  <MDBIcon fab icon="github" className="blue-text" />
                </a>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <div>
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
          <MDBCol md="4">
            <MDBRow className="mb-3">
              <MDBCol size="2">
                <MDBIcon
                  icon="flag-checkered"
                  size="2x"
                  className="deep-purple-text"
                />
              </MDBCol>
              <MDBCol size="10">
                <h5 className="font-weight-bold mb-3">International</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="2">
                <MDBIcon icon="flask" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol size="10">
                <h5 className="font-weight-bold mb-3">Experimental</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="2">
                <MDBIcon icon="glass-martini" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol size="10">
                <h5 className="font-weight-bold mb-3">Relaxing</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="4" className="text-name">
            <img
              className="img-fluid"
              src="https://www.harmoney.co.nz/assets/Uploads/_resampled/FillWyI3NjkiLCI1MTUiXQ/golden-retriever-looking-out-of-car-window-769x513.jpg"
              alt=""
            />
          </MDBCol>
          <MDBCol md="4">
            <MDBRow className="mb-3">
              <MDBCol size="2">
                <MDBIcon icon="heart" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol size="10">
                <h5 className="font-weight-bold mb-3">Beloved</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="2">
                <MDBIcon icon="bolt" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol size="10">
                <h5 className="font-weight-bold mb-3">Rapid</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="2">
                <MDBIcon icon="magic" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol size="10">
                <h5 className="font-weight-bold mb-3">Magical</h5>
                <p className="grey-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </section>
      </div>
    </div>
  );
}


export default About;
