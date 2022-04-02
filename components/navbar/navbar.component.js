import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { logoutAuth } from '../../lib/auth';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';


function NavBar({ auth }) {
  const route = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutAuth()
      .then((res) => {
        if (!res.error) {
          route.push('/');
        }
      });
  }

  return (
    <Navbar bg="warning" expand="lg" variant="light">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand href="/" className="fw-bold">
            AppAirLine
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref>
              <Nav.Link href="/">Home</Nav.Link>
            </Link>
            {auth ?
              <>
                <Link href="/dashboard" passHref>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Link>
                <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
              </>
              :
              <Link href="/login" passHref>
                <Nav.Link href="/login">Login</Nav.Link>
              </Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(NavBar);