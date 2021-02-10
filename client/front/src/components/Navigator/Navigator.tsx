import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Pet from '../Pet/Pet';

const Navigator: React.FC = () => {
  return (
    <div>
      <div>
        <Navbar bg="light" expand="md">
          <Navbar.Brand as={Link} to="/">
            Adop(e)t
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path={`/pets/:petId`} exact component={Pet} />
      </Switch>
      <div><Footer/></div>
    </div>
  );
};

export default Navigator;
