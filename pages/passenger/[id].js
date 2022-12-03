// import { getPassengerId } from '../../lib/services/passenger';
import Layout from '../../components/layout/layout.component';
import ModalForm from '../../components/modal/modal.component';
import { Container, Card, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
// import { useState } from 'react';
import { deletePassengerId, getPassengerId } from '../../lib/services/passenger';
import { getAirLines } from '../../lib/services/airlines';
import { showModalDispatch, deletePassengerIdDispatch, submitUpdateDispatch, getAirLineDispatch, statusLoginDispatch, getPassengerIdDispatch } from '../../lib/redux/dispatch';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import cookies from "next-cookies";

function Details({ passenger, auth, showModalDispatch, deletePassengerIdDispatch, submitUpdateDispatch, getAirLineDispatch, airlines, statusLoginDispatch, cookie, getPassengerIdDispatch }) {
  // const [dataAirLines, setDataAirLines] = useState(null);
  const route = useRouter();
  const { id } = route.query;

  const handleDeleteId = () => {
    deletePassengerId(passenger._id)
      .then((res) => {
        // deletePassengerIdDispatch(passenger._id);
        submitUpdateDispatch(true);
        route.push('/');
        console.log(res);
      })
  }

  const handleUpdate = () => {
    showModalDispatch(true)
    if (airlines.length == 0) {
      getAirLines().then(res => {
        const items = res.data.slice(0, 10);
        getAirLineDispatch(items);
      })
    }
  }

  useEffect(() => {
    if (cookie.Bearer === undefined) {
      statusLoginDispatch(false);
    } else {
      statusLoginDispatch(true);
    }

    getPassengerId(id).then(res => {
      getPassengerIdDispatch(res);
    });

  }, [cookie, statusLoginDispatch, getPassengerId, getPassengerIdDispatch])

  if (passenger == null) {
    return (
      <Layout>
        <Container>
          <div className="d-flex justify-content-center align-items-center h-full">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </Layout>
    )
  } else {
    return (
      <Layout title="DETAILS">
        <Container className="my-5">
          <Link href="/">
            <a className="btn btn-sm btn-secondary mt-3">Back</a>
          </Link>
          <Card className="my-4">
            <Card.Body>
              <Card.Text>Name : {passenger.name}</Card.Text>
              <Card.Text>Trips : {passenger.trips}</Card.Text>
              <hr />
              <Card.Text className="fw-bold">AIRLINE</Card.Text>
            </Card.Body>
            <Row>
              {passenger.airline.map(people =>
                <Col key={people._id} md={4}>
                  <Card>
                    <Card.Img variant="top" src={people.logo} alt={people.name} />
                    <Card.Body>
                      <Card.Title>{people.name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>Head Quaters : {people.head_quaters}</ListGroupItem>
                      <ListGroupItem>Country : {people.country}</ListGroupItem>
                      <ListGroupItem>Established : {people.established}</ListGroupItem>
                      <ListGroupItem>Slogan : {people.slogan}</ListGroupItem>
                      <ListGroupItem>Website : <Link href={`https://${people.website}`} passHref><a target="_blank">Link</a></Link></ListGroupItem>
                    </ListGroup>
                  </Card>
                </Col>
              )}
            </Row>
          </Card>
          {auth &&
            <div>
              <Button className="me-3" onClick={handleUpdate}>Update</Button>
              <Button variant="danger" onClick={handleDeleteId}>Delete</Button>
            </div>
          }
        </Container>
        <ModalForm />
      </Layout>
    )
  }
}

export async function getServerSideProps(context) {
  let cookie = cookies(context)
  return { props: { cookie } }
}

const mapStateToProps = (state) => {
  return {
    passenger: state.passenger,
    auth: state.auth,
    airlines: state.airlines
  }
}

const mapDispatchToProps = (Dispatch) => {
  return {
    showModalDispatch: (bolean) => Dispatch(showModalDispatch(bolean)),
    deletePassengerIdDispatch: (id) => Dispatch(deletePassengerIdDispatch(id)),
    submitUpdateDispatch: (bolean) => Dispatch(submitUpdateDispatch(bolean)),
    getAirLineDispatch: (airlines) => Dispatch(getAirLineDispatch(airlines)),
    statusLoginDispatch: (bolean) => Dispatch(statusLoginDispatch(bolean)),
    getPassengerIdDispatch: (id) => Dispatch(getPassengerIdDispatch(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
