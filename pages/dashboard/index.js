import Layout from "../../components/layout/layout.component";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import cookies from "next-cookies";
import { statusLoginDispatch } from '../../lib/redux/dispatch';
import { logoutAuth } from '../../lib/auth';
import { useEffect } from "react";
import { useRouter } from 'next/router';

function DashboarHome({ cookie, statusLoginDispatch }) {

  useEffect(() => {
    if (cookie.Bearer === undefined) {
      statusLoginDispatch(false);
    } else {
      statusLoginDispatch(true);
    }
  }, [cookie, statusLoginDispatch]);

  const route = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutAuth()
      .then((res) => {
        if (!res.error) {
          document.cookie = `Bearer=; path='/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
          route.push('/');
        }
      });
  }

  return (
    <Layout title="DASHBOARD">
      <Container className="my-5">
        <Row>
          <Col>
            <h1>DashBoard</h1>
          </Col>
          <Col>
            <Button className="ms-auto d-block" variant="warning" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let cookie = cookies(context);
  return { props: { cookie } }
}

const mapDispatchToProps = (dispatch) => {
  return {
    statusLoginDispatch: (bolean) => dispatch(statusLoginDispatch(bolean))
  }
}

export default connect(null, mapDispatchToProps)(DashboarHome);