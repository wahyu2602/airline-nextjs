import { Navbar, Container, Nav } from "react-bootstrap"
import Link from "next/link"

export default function NavBar() {
  return (
    <Navbar bg="warning" expand="lg" variant="light">
      <Container>
        <Link href="/">
          <Navbar.Brand href="/" className="fw-bold">
            AppAirLine
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/">
              <Nav.Link href="/">Home</Nav.Link>
            </Link>
            <Link href="/login">
              <Nav.Link href="/login">Login</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}