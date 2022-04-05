import { Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showModalDispatch } from '../../lib/redux/dispatch';

function ModalForm({ showModalDispatch, show, passenger }) {
  return (
    <>
      <Modal show={show} onHide={() => showModalDispatch(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                defaultValue={passenger.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Trips</Form.Label>
              <Form.Control
                type="number"
                defaultValue={passenger.trips}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>AirLines</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showModalDispatch(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => showModalDispatch(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
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
