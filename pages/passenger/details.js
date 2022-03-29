import { getPassengerId } from '../../lib/services/passenger';
import Layout from '../../components/layout/layout.component';
import { Container, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';

function Details({ passenger }) {
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
        <Container>
          <Link href="/">
            <a className="btn btn-secondary mt-3">Back</a>
          </Link>
          <Card className="my-5">
            <Card.Body>
              <Card.Text>Name : {passenger.name}</Card.Text>
              <Card.Text>Trips : {passenger.trips}</Card.Text>
            </Card.Body>
            <Row>
              {passenger.airline.map(people =>
                <Col key={people._id} lg={4}>
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
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    passenger: state.passenger
  }
}

export default connect(mapStateToProps)(Details);
