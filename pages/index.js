import Layout from "../components/layout/layout.component"
import { Container, Col, Row, Table, Form, Button } from "react-bootstrap"
// import { axios } from "../lib/axios/axios";
import { useEffect, useState } from 'react'
import { getPagePassenger, getPassengers } from '../lib/services/passenger'
import Link from "next/link";
import { connect } from "react-redux";
import { getPassengersDispatch, getAllPagesDispatch, getPassengerIdDispatch } from '../lib/redux/dispatch'


function Home({ passengers, getPassengersDispatch, getAllPagesDispatch, getPassengerIdDispatch, setTotalPages }) {
  const [pagination, setPanigation] = useState({
    page: 0,
    size: 10
  });

  useEffect(() => {
    getPassengers()
      .then((res) => {
        getPassengersDispatch(res.data);
        getAllPagesDispatch(res.totalPassengers, res.totalPages);
      });
  }, [passengers])

  // console.log(totalPage.totalPages);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value < 0) {
      return;
    } else {
      setPanigation((pagination) => ({
        ...pagination,
        [name]: Number(value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPagePassenger(pagination.page, pagination.size)
      .then((res) => {
        getPassengersDispatch(res.data);
      });
  };

  return (
    <>
      <Layout title="HOME">
        <Container className="my-5">
          <Row className="mb-5">
            <Col md={2}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Page : {setTotalPages.totalPages - 1}</Form.Label>
                  <Form.Control name="page" type="number" onChange={handleChange} value={pagination.page} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Size : {setTotalPages.totalPassengers}</Form.Label>
                  <Form.Control name="size" type="number" onChange={handleChange} value={pagination.size} />
                </Form.Group>
                <Button type="sumbit" variant="success">Select</Button>
              </Form>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Trips</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.trips}</td>
                    <td>
                      <Link href="/passenger/details">
                        <a className="btn btn-primary btn-sm" onClick={(e) => getPassengerIdDispatch(item._id)}>Details</a>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </Layout>
    </>
  )
}

// export async function getServerSideProps() {
//   const data = await axios.get('api/passengers')
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return err.response.data
//     })
//   return { props: { data } }
// }

// Home.getInitialProps = async (ctx) => {
//   const data = await axios.get('api/passengers')
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return err.response.data
//     })
//   return { data: data }
// };

const mapStateToProps = (state) => {
  return {
    passengers: state.passengers,
    setTotalPages: state.setTotalPages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPassengersDispatch: (passengers) => dispatch(getPassengersDispatch(passengers)),
    getAllPagesDispatch: (totalPassengers, totalPages) => dispatch(getAllPagesDispatch(totalPassengers, totalPages)),
    getPassengerIdDispatch: (id) => dispatch(getPassengerIdDispatch(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);