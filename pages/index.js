import Layout from "../components/layout/layout.component"
import { Container, Col, Row, Table, Form, Button } from "react-bootstrap"
// import { axios } from "../lib/axios/axios";
import { useEffect, useState } from 'react'
import { getPagePassenger, getPassengers } from '../lib/services/passenger'
import Link from "next/link";
import { connect } from "react-redux";
import { getPassengersDispatch, getAllPagesDispatch, getPassengerIdDispatch, getPageSizeDispatch } from '../lib/redux/dispatch'


function Home({ passengers, passenger, getPassengersDispatch, getAllPagesDispatch, getPassengerIdDispatch, setTotalPages, getPageSizeDispatch, setPageSize }) {
  const [pagination, setPanigation] = useState({
    page: 0,
    size: 10
  });

  useEffect(() => {
    if (passenger == null) {
      getPassengers()
        .then((res) => {
          getPassengersDispatch(res.data);
          getAllPagesDispatch(res.totalPassengers, res.totalPages - 1);
        });
    }
    if (setPageSize.page !== null || setPageSize.size !== null) {
      setPanigation({
        page: setPageSize.page,
        size: setPageSize.size
      });
    }
  }, [getPassengersDispatch, getAllPagesDispatch]);

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
    getPageSizeDispatch(pagination.page, pagination.size);
  };

  return (
    <>
      <Layout title="HOME">
        <Container className="my-5">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-5">
              <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Page : {setTotalPages.totalPages}</Form.Label>
                  <Form.Control name="page" type="number" onChange={handleChange} value={pagination.page} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Size : {setTotalPages.totalPassengers}</Form.Label>
                  <Form.Control name="size" type="number" onChange={handleChange} value={pagination.size} />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-center mt-3">
                <Button type="sumbit" variant="success">Select</Button>
              </Col>
            </Row>
          </Form>
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
    setTotalPages: state.setTotalPages,
    passenger: state.passenger,
    setPageSize: state.setPageSize
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPassengersDispatch: (passengers) => dispatch(getPassengersDispatch(passengers)),
    getAllPagesDispatch: (totalPassengers, totalPages) => dispatch(getAllPagesDispatch(totalPassengers, totalPages)),
    getPassengerIdDispatch: (id) => dispatch(getPassengerIdDispatch(id)),
    getPageSizeDispatch: (page, size) => dispatch(getPageSizeDispatch(page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);