const baseUrl = process.env.BASE_URL;
// import { serialize } from 'cookie'

export default async function handler(req, res) {
  const header = req.headers
  const tokenName = header.origin

  console.log(req);

  if (req.method == 'POST' && `${tokenName}/` == baseUrl) {
    const fetchData = await fetch("https://dev-457931.okta.com/oauth2/aushd4c95QtFHsfWt4x6/v1/token", {
      method: req.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        scope: 'offline_access',
        grant_type: 'password',
        username: req.query.username,
        password: req.query.password,
        client_id: '0oahdhjkutaGcIK2M4x6',
      })
    });
    const response = await fetchData.json();
    const data = response;
    res.status(200).json(data);
    res.end();
  } else {
    const error = [{
      error: true,
      message: 'No Data!'
    }]
    res.status(500).json(error);
    res.end();
  }
}