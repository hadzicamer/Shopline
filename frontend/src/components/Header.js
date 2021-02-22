import React from 'react';
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown, NavLink, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Search from './Search'
import { logout } from '../actions/userActions';
import logoImage from '../shoplineLogo.png'

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar className='navClass' variant='dark' collapseOnSelect>
        <LinkContainer to='/'> 
        <Image id='logo' src={logoImage} />
        </LinkContainer>
        <Container>
          <Route render={({history})=><Search history={history}></Search>}></Route>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <NavLink>
                <i className='fas fa-shopping-cart'></i> Cart
              </NavLink>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <NavLink>
                  <i className='fas fa-user'></i> Sign in
                </NavLink>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminMenu'>
                <LinkContainer to='/admin/userList'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productList'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderList'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
