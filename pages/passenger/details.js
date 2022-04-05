// import { getPassengerId } from '../../lib/services/passenger';
import Layout from '../../components/layout/layout.component';
import ModalForm from '../../components/modal/modal.component';
import { Container, Card, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
// import { useState } from 'react';
import { deletePassengerId } from '../../lib/services/passenger';
import { showModalDispatch, deletePassengerIdDispatch } from '../../lib/redux/dispatch';
import { useRouter } from 'next/router';

function Details({ passenger, auth, showModalDispatch, deletePassengerIdDispatch }) {
  const route = useRouter();
  const handleDeleteId = () => {
    deletePassengerId(passenger._id)
      .then((res) => {
        deletePassengerIdDispatch(passenger._id);
        route.push('/');
      })
  }
  if (passenger == null) {
    return (
      <Layout>
        <Container>
          <h1 className="text-center mt-5">No Data!</h1>
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
              <Button className="me-3" onClick={() => showModalDispatch(true)}>Update</Button>
              <Button variant="danger" onClick={handleDeleteId}>Delete</Button>
            </div>
          }
        </Container>
        <ModalForm />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    passenger: state.passenger,
    auth: state.auth
  }
}

const mapDispatchToProps = (Dispatch) => {
  return {
    showModalDispatch: (bolean) => Dispatch(showModalDispatch(bolean)),
    deletePassengerIdDispatch: (id) => Dispatch(deletePassengerIdDispatch(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
