import { useState } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showModalDispatch } from '../../lib/redux/dispatch';
import { updatePassengerId } from '../../lib/services/passenger';

function ModalForm({ showModalDispatch, show, passenger, data }) {
  const [formData, setFormData] = useState({
    name: passenger.name,
    trips: passenger.trips,
    airline: passenger.airline[0].id
  });
  const [processSubmit, setProcessSubmit] = useState(false);

  const hendleOnChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessSubmit(true);
    updatePassengerId(passenger._id, formData)
      .then(res => {
        console.log(res);
        showModalDispatch(false);
        setProcessSubmit(false);
      })

    // console.log(formData);
  }

  return (
    <>
      <Modal show={show} onHide={() => showModalDispatch(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                autoFocus
                defaultValue={passenger.name}
                onChange={hendleOnChangeValue}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Trips</Form.Label>
              <Form.Control
                name="trips"
                type="number"
                defaultValue={passenger.trips}
                onChange={hendleOnChangeValue}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>AirLines</Form.Label>
              {data === null &&
                <Spinner animation="border" variant="warning" size="sm" />
              }
              <Form.Select name="airline" aria-label="Default select example" onChange={hendleOnChangeValue}>
                {data !== null &&
                  data.map(airline =>
                    <option key={airline.id} value={airline.id}>{airline.name}</option>
                  )
                }
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => showModalDispatch(false)}>
                Close
              </Button>
              {processSubmit ?
                <Button variant="primary" disabled>
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
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              }
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    show: state.showModal,
    passenger: state.passenger
  }
}

const mapDispatchToProps = (Dispatch) => {
  return {
    showModalDispatch: (bolean) => Dispatch(showModalDispatch(bolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
