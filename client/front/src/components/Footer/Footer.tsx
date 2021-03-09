import { Link } from 'react-router-dom';
import './Footer.css';
import { FaHome } from 'react-icons/fa';
import { MdPets, MdPeople, MdPermContactCalendar } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';




import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (

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
              Matan Hassin <FaLinkedin />
            </li>
            <li>
             Diana Isakov <FaLinkedin />
            </li>
            <li>
            Yonatan Gross <FaLinkedin />
            </li>
            <li>
             Aviv Miranda <FaLinkedin />
            </li>
          </ul>


        </MDBContainer>
      </div>

    </MDBFooter>

  );
}

export default FooterPage;

