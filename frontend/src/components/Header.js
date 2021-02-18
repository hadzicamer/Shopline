import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

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
          <Navbar.Brand>Shopline</Navbar.Brand>
        </LinkContainer>
        <Container>
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
                <LinkContainer to='admin/userList'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='admin/productList'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/orderList'>
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
