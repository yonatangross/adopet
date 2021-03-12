import React from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import WonderWoman from '../../images/WonderWoman.jpg'
import Flash from '../../images/Flash.jpg'
import SuperMan from '../../images/SuperMan.jpg'
import Monkey from '../../images/Monkey.jpg'


const About = () => {
  return (
    <div>
      <MDBCard className="my-5 px-5 pb-5 text-center">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold my-5">
            Our amazing team
          </h2>
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
              <MDBCol className="Hero_Image">
                <img
                  src={WonderWoman}
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Diana Lanciano</h5>
              <p className="text-uppercase blue-text">FullStack Developer</p>
              <ul className="list-unstyled mb-0">
                <a href="https://www.linkedin.com/in/diana-lanciano-91590a176/" className="p-2 fa-lg">
                  <MDBIcon fab icon="linkedin" className="blue-text" />
                </a>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
            <MDBCol className="Hero_Image">
                <img
                  src={Flash}
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Yonatan Gross</h5>
              <p className="text-uppercase blue-text">FullStack Developer</p>
              <ul className="list-unstyled mb-0">
                <a href="https://www.linkedin.com/in/yonatangross/" className="p-2 fa-lg">
                  <MDBIcon fab icon="linkedin" className="blue-text" />
                </a>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
            <MDBCol className="Hero_Image">
                <img
                  src={SuperMan}
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Matan Hasin</h5>
              <p className="text-uppercase blue-text">FullStack Developer</p>
              <ul className="list-unstyled mb-0">
                <a href="https://www.linkedin.com/in/matan-hassin" className="p-2 fa-lg">
                  <MDBIcon fab icon="linkedin" className="blue-text" />
                </a>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
            <MDBCol className="Hero_Image">
                <img
                  src={Monkey}
                  className="img-fluid z-depth-1 rounded-circle"
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </MDBCol>
              <h5 className="font-weight-bold mt-4 mb-3">Aviv Miranda</h5>
              <p className="text-uppercase blue-text">FullStack Developer</p>
              <ul className="list-unstyled mb-0">
                <a href="https://www.linkedin.com/in/aviv-miranda/" className="p-2 fa-lg">
                  <MDBIcon fab icon="linkedin" className="blue-text" />
                </a>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      </div>

  );
}


export default About;
