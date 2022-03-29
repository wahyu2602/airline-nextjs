import { getPassengerId } from '../../lib/services/passenger';
import Layout from '../../components/layout/layout.component';
import { Container, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';

function Details({ passenger }) {
  return (
    <Layout>
      <Container>
        <Link href="/">
          <a>Back</a>
        </Link>
        <Card className="my-5">
          <Card.Body>
            <Card.Text>{passenger.name}</Card.Text>
            <Card.Text>{passenger.trips}</Card.Text>
          </Card.Body>
          <Row>
            {passenger.airline.map(people =>
              <Col lg={4}>
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

const mapStateToProps = (state) => {
  return {
    passenger: state.passenger
  }
}

export default connect(mapStateToProps)(Details);
