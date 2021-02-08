import React from 'react';
import{Navbar,Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const Header = () => {
    return <header> 
  <Navbar className="navClass" variant="dark" collapseOnSelect>
    <LinkContainer to="/">
    <Navbar.Brand>Shopline</Navbar.Brand>
    </LinkContainer>
    <Container>
    <Nav className="ml-auto">
    <LinkContainer to="/cart">
      <Nav.Link style={{color:'white'}} ><i style={{margin:'10px'}} className='fas fa-shopping-cart'></i>Cart</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/login">
      <Nav.Link style={{color:'white'}} ><i style={{margin:'10px'}} className='fas fa-user'></i>Sign in</Nav.Link>
    </LinkContainer>
    </Nav> 
  </Container>
  </Navbar>
    </header>;
}


export default Header;

