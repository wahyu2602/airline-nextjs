import { getPassengerId } from '../../lib/services/passenger';
import Layout from '../../components/layout/layout.component';
import { Container, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Link from 'next/link';

function Passenger({ passenger }) {
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

// export async function getStaticPaths() {
//   const byId = await axios.get('api/passengers')
//     .then((res) => {
//       return res.data.data;
//     })

//   // const paths = byId.map((passenger) => ({
//   //   params: { id: passenger.id },
//   // }));

//   const p = params

//   console.log(p);

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   // const res = await fetch(`https://.../posts/${params.id}`)
//   // const post = await res.json()
//   console.log(params);
//   const passenger = await getPassengerId(params.id)
//     .then((res) => {
//       return res.data.data
//     })

//   // Pass post data to the page via props
//   return { props: { passenger } }
// }

export async function getServerSideProps({ params }) {
  const passenger = await getPassengerId(params.id)
    .then((res) => {
      return res
    });

  return {
    props: { passenger }
  }
}

export default Passenger;
