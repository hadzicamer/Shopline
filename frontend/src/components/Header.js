import React from 'react'
import{useDispatch,useSelector} from 'react-redux'
import{Navbar,Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'


const Header = () => {

  const dispatch=useDispatch()

  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  const logoutHandler=()=>{
    dispatch(logout())
  }
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
    {userInfo?(
<NavDropdown title={userInfo.name} id='username'>
<LinkContainer to='/profile'>
<NavDropdown.Item>Profile</NavDropdown.Item>
</LinkContainer>
<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
</NavDropdown>
    ):  <LinkContainer to="/login">
    <Nav.Link style={{color:'white'}} ><i style={{margin:'10px'}} className='fas fa-user'></i>Sign in</Nav.Link>
  </LinkContainer>}
  
    </Nav> 
  </Container>
  </Navbar>
    </header>;
}


export default Header;

