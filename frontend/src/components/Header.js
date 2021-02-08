import React from 'react';
import{Navbar,Nav, Container} from 'react-bootstrap'

const Header = () => {
    return <header>
  <Navbar className="navClass" variant="dark" collapseOnSelect>
    <Navbar.Brand href="/">Shopline</Navbar.Brand>
    <Container>
    <Nav className="ml-auto">
      <Nav.Link style={{color:'white'}} href="/cart"><i style={{margin:'10px'}} className='fas fa-shopping-cart'></i>Cart</Nav.Link>
      <Nav.Link style={{color:'white'}} href="/login"><i style={{margin:'10px'}} className='fas fa-user'></i>Sign in</Nav.Link>
    </Nav> 
  </Container>
  </Navbar>
    </header>;
}


export default Header;

