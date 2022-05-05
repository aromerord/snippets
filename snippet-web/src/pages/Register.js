import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { loginAction, registerAction } from '../actions/authAction';

export const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

    if (validator.isEmpty(firstName)) {
      errors.firstName = "El nombre no puede estar vacío.";
    }
    if (validator.isEmpty(lastName)) {
      errors.lastName = "Los apellidos no pueden estar vacios.";
    }
    if (!validator.isEmail(email)) {
      errors.email = "El email no es válido.";
    }
    if (validator.isEmpty(password)) {
      errors.password = "La contraseña no puede estar vacía.";
    }
    if (!validator.isLength(password, {min: 8, max: 30})) {
      errors.password = "La contraseña debe tener entre 8 y 30 caracteres.";
    }

    if (isObjectEmpty(errors)) {

      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }

      dispatch(registerAction(user)).then(response => {

        // Se hace login del usuario registrado
        const user = {
          email: email,
          password: password
        }
        
        dispatch(loginAction(user))

      }).catch(error => {
        errors.register = error.response.data.message;
        setErrors(errors);
      });

    } else {
      setErrors(errors);
    }

  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            {errors.register && <Alert variant="danger">{errors.register}</Alert>}

            <h3>Crear cuenta</h3>

            <Form onSubmit={handleSubmit}>

              <Form.Group control="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nombre'
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  isInvalid={errors?.firstName} />
                <Form.Control.Feedback type="invalid">
                  {errors?.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group control="surname" className='mt-3'>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Apellidos'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  isInvalid={errors?.lastName} />
                <Form.Control.Feedback type="invalid">
                  {errors?.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group control="email" className='mt-3'>
                <Form.Label>Email</Form.Label>
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
                <Form.Label>Contraseña</Form.Label>
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

              <div className='mt-3 text-end'>
                <Button variant="primary" type="submit" className="mt-1">Crear cuenta</Button>
              </div>

              <div className='mt-3'>
                <Link to={"/login"}>¿Ya te has registrado? Inicia sesión aquí.</Link>
              </div>

            </Form>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}
