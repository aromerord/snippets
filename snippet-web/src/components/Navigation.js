import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logoutAction } from '../actions/authAction';


export const Navigation = () => {

  const login = useSelector(state => state.auth.login);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={NavLink} to={'/'} className='title'>
          Snippets
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='menu' />
        <Navbar.Collapse id='menu'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to={'/'}>Home</Nav.Link>
            {login &&
              <Nav.Link as={NavLink} to={'/posts'}>Posts</Nav.Link>
            }
          </Nav>
          <Nav>
            {!login ?
              <>
                <Nav.Link as={NavLink} to={'/registro'}>Crear cuenta</Nav.Link>
                <Nav.Link as={NavLink} to={'/login'}>Iniciar sesión</Nav.Link>
              </>
              :
              <NavDropdown title={user.sub} id='dropdown'>
                <NavDropdown.Item onClick={() => dispatch(logoutAction())}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
