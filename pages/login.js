import Layout from "../components/layout/layout.component"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { loginAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { statusLoginDispatch } from '../lib/redux/dispatch';

function Login({ statusLoginDispatch }) {
  const route = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSumbitLogin = (e) => {
    e.preventDefault();
    loginAuth(formData).then((res) => {
      document.cookie = `${res.token_type}=${res.access_token}; path=/; expires=${res.expires_in}`;
      route.push('/dashboard');
      statusLoginDispatch(true);
    });
  };

  return (
    <Layout title="LOGIN">
      <Container>
        <Row className="justify-content-center my-5">
          <Col md={5}>
            <h3 className="mb-2 text-center">Login</h3>
            <hr />
            <Form onSubmit={handleSumbitLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control name="username" type="text" placeholder="User Name" onChange={handleChangeLogin} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" onChange={handleChangeLogin} />
              </Form.Group>
              <Button variant="success" type="submit">
                Login
              </Button>
            </Form>
            <hr />
            <Link href="/">
              <a>Back</a>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    statusLoginDispatch: (bolean) => dispatch(statusLoginDispatch(bolean)),
  }
}

export default connect(null, mapDispatchToProps)(Login);