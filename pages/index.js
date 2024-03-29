import Layout from "../components/layout/layout.component"
import { Container, Col, Row, Table, Form, Button, Spinner, InputGroup, FormControl } from "react-bootstrap"
// import { axios } from "../lib/axios/axios";
import { useEffect, useState } from 'react'
import { getPagePassenger, getPassengers, deletePassengerId } from '../lib/services/passenger'
import Link from "next/link";
import { connect } from "react-redux";
import { getPassengersDispatch, getAllPagesDispatch, getPageSizeDispatch, setConditionStaticDispatch, filterPassengersDispatch, statusLoginDispatch, submitUpdateDispatch } from '../lib/redux/dispatch'
import cookies from "next-cookies";


function Home({ cookie, passengers, passenger, getPassengersDispatch, getAllPagesDispatch, setTotalPages, getPageSizeDispatch, setPageSize, setConditionStaticDispatch, conditionStatic, filterPassengersDispatch, filterPassengers, statusLoginDispatch, submitUpdate, submitUpdateDispatch, auth }) {
  const [buttonProcess, setButtonProcess] = useState(false);
  const [btnSortNew, setBtnSortNew] = useState(false);
  const [pagination, setPanigation] = useState({
    page: 0,
    size: 10
  });

  useEffect(() => {
    if (!conditionStatic && passengers === null || passengers.length === 0) {
      getPassengers()
        .then((res) => {
          getPassengersDispatch(res.data.sort());
          getAllPagesDispatch(res.totalPassengers, res.totalPages - 1);
        });
    }
    if (setPageSize.page !== null || setPageSize.size !== null) {
      setPanigation({
        page: setPageSize.page,
        size: setPageSize.size
      });
    }
    if (cookie.Bearer === undefined) {
      statusLoginDispatch(false);
    } else {
      statusLoginDispatch(true);
    }

    if (submitUpdate) {
      if (setPageSize.page == null || setPageSize.size == null) {
        getPagePassenger(pagination.page, pagination.size)
          .then(res => {
            getPassengersDispatch(res.data);
            submitUpdateDispatch(false);
          })
      } else {
        getPagePassenger(setPageSize.page, setPageSize.size)
          .then(res => {
            getPassengersDispatch(res.data);
            submitUpdateDispatch(false);
          })
      }
    }
  }, [cookie, statusLoginDispatch, conditionStatic, passenger, setPageSize, getPassengersDispatch, getAllPagesDispatch, submitUpdate, submitUpdateDispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // validation
    if ([name] == 'page' && value !== '' && value < 0) {
      return e.target.value = 0;
    }
    if ([name] == 'size' && value !== '' && value < 1) {
      return e.target.value = 1;
    }
    setPanigation(() => ({
      page: [name] == 'page' ? [value] < 0 && [value] !== '' ? 0 : Number([value]) : pagination.page,
      size: [name] == 'size' ? [value] < 1 && [value] !== '' ? 1 : Number([value]) : pagination.size
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonProcess(true);
    getPagePassenger(pagination.page, pagination.size)
      .then((res) => {
        getPassengersDispatch(res.data);
        setConditionStaticDispatch(true);
        setButtonProcess(false);
        getPageSizeDispatch(pagination.page, pagination.size);
      });
  };

  const handleFilter = (e) => {
    const lengthValue = e.target.value.length
    if (lengthValue <= 1) {
      filterPassengersDispatch(null, false);
    } else {
      filterPassengersDispatch(e.target.value, true);
    }
  }

  const handleDeleteId = (e) => {
    const id = e.target.dataset.id
    deletePassengerId(id)
      .then(res => {
        submitUpdateDispatch(true);
      })
  }

  const handleSortNewData = () => {
    setBtnSortNew(true)
    getPagePassenger(setTotalPages.totalPages, 10)
      .then((res) => {
        getPassengersDispatch(res.data);
        setConditionStaticDispatch(true);
        setBtnSortNew(false);
      });
  }

  return (
    <>
      <Layout title="HOME">
        <Container className="my-5">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Page : {setTotalPages.totalPages}</Form.Label>
                  <Form.Control name="page" type="number" onChange={handleChange} defaultValue={setPageSize.page == null ? pagination.page : setPageSize.page} required />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Show Data : {setTotalPages.totalPassengers}</Form.Label>
                  <Form.Control name="size" type="number" onChange={handleChange} defaultValue={setPageSize.size == null ? pagination.size : setPageSize.size} required />
                </Form.Group>
              </Col>
              {buttonProcess ?
                <Col md={3} className="d-flex align-items-center mt-3">
                  <Button variant="secondary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                </Col>
                :
                <Col md={2} className="d-flex align-items-center mt-3">
                  <Button type="sumbit" variant="success">Select</Button>
                </Col>
              }
            </Row>
          </Form>
          <hr />
          {btnSortNew ?
            <Button variant="secondary" disabled>
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
            <Button onClick={handleSortNewData}>Sort New Data</Button>
          }
          <Col className="mt-3" md={3}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Filter</InputGroup.Text>
              <FormControl
                placeholder="Name"
                aria-describedby="basic-addon1"
                onChange={handleFilter}
                defaultValue={filterPassengers.valueName == null ? '' : filterPassengers.valueName}
              />
            </InputGroup>
          </Col>
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
              {/* this is if/else hell and this not good */}
              {passengers.length == 0 ?
                <tr>
                  <td colSpan={4}>
                    <div className="d-flex justify-content-center">
                      <Spinner animation="border" variant="warning" />
                    </div>
                  </td>
                </tr>
                :
                filterPassengers.conditionFilter ?
                  filterPassengers.data.length == 0 ?
                    <tr>
                      <td colSpan={4}>
                        <div className="d-flex justify-content-center">
                          {filterPassengers.valueName} not found!
                        </div>
                      </td>
                    </tr>
                    :
                    filterPassengers.data.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.trips}</td>
                          <td>
                            <Link href={`/passenger/${item._id}`}>
                              <a className="btn btn-primary btn-sm">Details</a>
                            </Link>
                            {auth &&
                              <Button variant="danger" data-id={item._id} className="btn-sm ms-3" onClick={handleDeleteId}>Delete</Button>
                            }
                          </td>
                        </tr>
                      )
                    })
                  :
                  passengers.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.trips}</td>
                        <td>
                          <Link href={`/passenger/${item._id}`}>
                            <a className="btn btn-primary btn-sm" >Details</a>
                          </Link>
                          {auth &&
                            <Button variant="danger" data-id={item._id} className="btn-sm ms-3" onClick={handleDeleteId}>Delete</Button>
                          }
                        </td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </Table>
        </Container>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  let cookie = cookies(context)
  return { props: { cookie } }
}

const mapStateToProps = (state) => {
  return {
    passengers: state.passengers,
    setTotalPages: state.setTotalPages,
    passenger: state.passenger,
    setPageSize: state.setPageSize,
    conditionStatic: state.conditionStatic,
    filterPassengers: state.filterPassengers,
    submitUpdate: state.submitUpdate,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPassengersDispatch: (passengers) => dispatch(getPassengersDispatch(passengers)),
    getAllPagesDispatch: (totalPassengers, totalPages) => dispatch(getAllPagesDispatch(totalPassengers, totalPages)),
    getPageSizeDispatch: (page, size) => dispatch(getPageSizeDispatch(page, size)),
    setConditionStaticDispatch: (bolean) => dispatch(setConditionStaticDispatch(bolean)),
    filterPassengersDispatch: (name, bolean) => dispatch(filterPassengersDispatch(name, bolean)),
    statusLoginDispatch: (bolean) => dispatch(statusLoginDispatch(bolean)),
    submitUpdateDispatch: (bolean) => dispatch(submitUpdateDispatch(bolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);