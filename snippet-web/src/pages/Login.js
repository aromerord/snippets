import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { loginAction } from '../actions/authAction';

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const login = useSelector(state => state.auth.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      navigate("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {}

    if (!validator.isEmail(email)) {
      errors.email = "El email no es válido.";
    }
    if (validator.isEmpty(password)) {
      errors.password = "La contraseña no puede estar vacía.";
    }

    if (isObjectEmpty(errors)) {

      const user = {
        email: email,
        password: password
      }

      dispatch(loginAction(user)).then(response => {


      }).catch(error => {
        errors.auth = "Los datos del usuario no son correctos.";
        setErrors(errors);
      });

    } else {
      setErrors(errors);
    }

  }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ 'minHeight': '80vh' }}>

      {errors.auth && <Alert variant="danger">{errors.auth}</Alert>}

      <Form onSubmit={handleSubmit} style={{ 'width': '400px' }}>
        <h4 className='text-center mb-3'>Iniciar sesión</h4>
        <Form.Group control="email">
          <Form.Control
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            isInvalid={errors?.email} />
          <Form.Control.Feedback type="invalid">
            {errors?.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group control="password" className='mt-3'>
          <Form.Control
            type="password"
            placeholder='Contraseña'
            value={password}
            onChange={e => setPassword(e.target.value)}
            isInvalid={errors?.password} />
          <Form.Control.Feedback type="invalid">
            {errors?.password}
          </Form.Control.Feedback>
        </Form.Group>

        <div className='mt-3 d-grid gap-2'>
          <Button variant="primary" type="submit" className="mt-1">Iniciar sesión</Button>
        </div>

        <div className='mt-3 text-center'>
          ¿No tienes una cuenta?  <Link to={"/registro"}>Regístrate.</Link>
        </div>

      </Form>

    </Container>

  )
}
