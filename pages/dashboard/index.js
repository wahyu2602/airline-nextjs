import Layout from "../../components/layout/layout.component";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { connect } from 'react-redux';
import cookies from "next-cookies";
import { statusLoginDispatch, getAirLineDispatch } from '../../lib/redux/dispatch';
import { logoutAuth } from '../../lib/auth';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { getAirLines } from '../../lib/services/airlines';

function DashboarHome({ cookie, statusLoginDispatch, getAirLineDispatch, airlines }) {

  useEffect(() => {
    if (cookie.Bearer === undefined) {
      statusLoginDispatch(false);
    } else {
      statusLoginDispatch(true);
      if (airlines.length == 0) {
        getAirLines()
          .then((res) => {
            const items = res.data.slice(0, 10);
            getAirLineDispatch(items);
          })
      }
    }
  }, [cookie, statusLoginDispatch, getAirLineDispatch, airlines]);

  const route = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutAuth()
      .then((res) => {
        if (!res.error) {
          document.cookie = `Bearer=; path='/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
          route.push('/');
        }
      });
  }

  return (
    <Layout title="DASHBOARD">
      <Container className="my-5">
        <Row>
          <Col>
            <h1 className="text-secondary">DashBoard</h1>
          </Col>
          <Col>
            <Button className="ms-auto d-block" variant="warning" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
        <Col md={4} className="mt-5">
          <h5 className="mb-3 text-warning">Form Create Passenger</h5>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTrips">
              <Form.Label>Trips</Form.Label>
              <Form.Control name="trips" type="number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAirline">
              <Form.Label>Airline</Form.Label>
              {airlines.length == 0 &&
                <Spinner className="ms-1" animation="border" variant="warning" size="sm" />
              }
              <Form.Select name="airline" aria-label="Default select example">
                {airlines.map(airline =>
                  <option key={airline.id} value={airline.id}>{airline.name}</option>
                )}
              </Form.Select>
            </Form.Group>

            <Button className="mt-3" variant="success" type="submit">
              Create
            </Button>
          </Form>
        </Col>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let cookie = cookies(context);
  return { props: { cookie } }
}

const mapStateToProps = (state) => {
  return {
    airlines: state.airlines
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    statusLoginDispatch: (bolean) => dispatch(statusLoginDispatch(bolean)),
    getAirLineDispatch: (airline) => dispatch(getAirLineDispatch(airline))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboarHome);