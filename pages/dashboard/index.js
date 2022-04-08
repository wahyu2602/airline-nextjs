import Layout from "../../components/layout/layout.component";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { connect } from 'react-redux';
import cookies from "next-cookies";
import { statusLoginDispatch, getAirLineDispatch, submitUpdateDispatch } from '../../lib/redux/dispatch';
import { logoutAuth } from '../../lib/auth';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { getAirLines } from '../../lib/services/airlines';
import { postPassenger } from '../../lib/services/passenger';

function DashboarHome({ cookie, statusLoginDispatch, getAirLineDispatch, airlines, submitUpdateDispatch }) {
  const [formDataCreate, setFromDataCreate] = useState({
    name: '',
    trips: '',
    airline: ''
  });
  const [btnProcess, setBtnProcess] = useState(false);

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

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFromDataCreate((formDataCreate) => ({
      ...formDataCreate,
      [name]: value
    }));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnProcess(true)
    postPassenger(formDataCreate)
      .then(res => {
        console.log(res);
        submitUpdateDispatch(true);
        setBtnProcess(false);
        route.push('/');
      })
    console.log(formDataCreate);
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Name" onChange={handleChangeForm} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTrips">
              <Form.Label>Trips</Form.Label>
              <Form.Control name="trips" type="number" onChange={handleChangeForm} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAirline">
              <Form.Label>Airline</Form.Label>
              {airlines.length == 0 &&
                <Spinner className="ms-1" animation="border" variant="warning" size="sm" />
              }
              <Form.Select name="airline" aria-label="Default select example" onChange={handleChangeForm} required>
                <option value="">-- SELECT --</option>
                {airlines.map(airline =>
                  <option key={airline.id} value={airline.id}>{airline.name}</option>
                )}
              </Form.Select>
            </Form.Group>
            {btnProcess ?
              <Button variant="success" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
              :
              <Button className="mt-3" variant="success" type="submit">
                Create
              </Button>
            }
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
    getAirLineDispatch: (airline) => dispatch(getAirLineDispatch(airline)),
    submitUpdateDispatch: (bolean) => dispatch(submitUpdateDispatch(bolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboarHome);