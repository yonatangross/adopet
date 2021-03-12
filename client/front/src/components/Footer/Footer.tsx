import { Link } from 'react-router-dom';
import './Footer.css';
import { FaHome } from 'react-icons/fa';
import { MdPets, MdPeople, MdPermContactCalendar } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';




import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <div id="divFooter">
      <MDBFooter color="blue-gradient" className="font-small pt-4 mt-4">
        <div id="footerContainer">
          <MDBContainer fluid className="text-center text-md">
            <MDBRow>
              <MDBCol md="6" >
                <h4 className="title">Adop(e)t save life!</h4>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <ul id="footerLinks">
                  <li className="list-unstyled">
                    <Link to={'/'} ><FaHome /> Home Page</Link>
                  </li>
                  <li className="list-unstyled">
                    <Link to={'/allPets'} ><MdPets /> Pets</Link>
                  </li>
                  <li className="list-unstyled">
                    <Link to={'/about'} ><MdPeople /> About</Link>
                  </li>
                  <li className="list-unstyled">
                    <Link to={'/contact'} ><MdPermContactCalendar /> Contact Us</Link>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            <ul id="footerLinks">
              <li>
                <a href="https://www.linkedin.com/in/matan-hassin">
                  Matan Hassin <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/diana-lanciano-91590a176/">
                  Diana Isakov <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/yonatangross/">
                  Yonatan Gross <FaLinkedin />
                </a>
              </li>
              <li >
                <a href="https://www.linkedin.com/in/aviv-miranda/">
                  Aviv Miranda <FaLinkedin />
                </a>
              </li>
            </ul>


          </MDBContainer>
        </div>

      </MDBFooter>
    </div>
  );
}

export default FooterPage;

