import React from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
} from 'mdbreact';
import './Navbar.css';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface NavbarProps extends RouteComponentProps {}

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
      <div className="navBar">
        <header>
          <MDBNavbar id="navigation" color="blue lighten-3" dark expand="md" fixed="top">
            <MDBNavbarBrand href="/">
              <strong>Adop(e)t</strong>
            </MDBNavbarBrand>
            {!this.state.isWideEnough && (
              <MDBNavbarToggler onClick={this.onClick} />
            )}
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem >
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/about">About</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/contact">Contact Us</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/allPets">All Pets</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}

export default withRouter(Navbar);
