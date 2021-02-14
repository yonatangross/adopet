import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import About from "../About/About";

const FooterPage = () => {
  return (
    <MDBFooter color="blue-gradient" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
              <Link to={'/about'} >About</Link>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.wwe.com/f/2019/01/tlc_12132009rf_1089--5ed6a6b8f3616585fd6c87730d18b4dc.jpg"> Matan Hassin </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;

