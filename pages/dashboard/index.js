import Layout from "../../components/layout/layout.component";
import { Container } from "react-bootstrap";
import { connect } from 'react-redux';
import cookies from "next-cookies";
import { statusLoginDispatch } from '../../lib/redux/dispatch';
import { useEffect } from "react";

function DashboarHome({ cookie, statusLoginDispatch }) {

  useEffect(() => {
    if (cookie.Bearer === undefined) {
      statusLoginDispatch(false);
    } else {
      statusLoginDispatch(true);
    }
  }, [cookie, statusLoginDispatch])

  return (
    <Layout title="DASHBOARD">
      <Container className="my-5">
        <h1>DashBoard</h1>
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