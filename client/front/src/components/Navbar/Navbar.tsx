import React from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBMask,
  MDBView,
} from 'mdbreact';
import './Navbar.css';

interface NavbarProps {}

interface IState {
  collapse?: boolean;
  isWideEnough?: boolean;
}

class Navbar extends React.Component<NavbarProps, IState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <header>
          <MDBNavbar color="indigo" dark expand="md" fixed="top">
            <MDBNavbarBrand href="/">
              <strong>Adop(e)t</strong>
            </MDBNavbarBrand>
            {!this.state.isWideEnough && (
              <MDBNavbarToggler onClick={this.onClick} />
            )}
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/about">About</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#">Profile</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>

          <MDBView
            className="view-background"
            src="https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg"
          >
            <MDBMask
              overlay="black-light"
              className="flex-center flex-column text-white text-center"
            >
              <h2>Adop(e)t</h2>
              <h5>Come and adopt a pet from us.</h5>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

export default Navbar;
