import Layout from "../components/layout/layout.component"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Link from "next/link";

function Login() {
  return (
    <Layout title="LOGIN">
      <Container>
        <Row className="justify-content-center my-5">
          <Col md={5}>
            <h3 className="mb-2 text-center">Login</h3>
            <hr />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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

export default Login;