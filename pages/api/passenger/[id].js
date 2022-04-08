const baseUrl = process.env.BASE_URL;
// import axios from "axios";

export default async function handler(req, res) {
  const { id, name, trips, airline } = req.query;
  const header = req.headers;
  const tokenName = header.referer;
  const cookie = header.cookie;
  // res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);

  // console.log(req.method);

  if (req.method === 'GET' && tokenName == baseUrl) {
    const passengerByID = await fetch(`https://api.instantwebtools.net/v1/passenger/${id}`);
    const resPassengerByID = await passengerByID.json();
    const dataPassengerByID = resPassengerByID;
    res.status(200).json(dataPassengerByID);
  } else if (req.method === 'DELETE' && tokenName == `${baseUrl}passenger/details` || tokenName == baseUrl && cookie !== undefined) {
    const fetchDataDelete = await fetch(`https://api.instantwebtools.net/v1/passenger/${id}`, {
      method: req.method
    });
    const responseDelete = await fetchDataDelete.json();
    const dataDelete = responseDelete;
    res.status(200).json(dataDelete);
    res.end();
  } else if (req.method === 'PUT' && cookie !== undefined && tokenName == `${baseUrl}passenger/details`) {
    const fetchDataPut = await fetch(`https://api.instantwebtools.net/v1/passenger/${id}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        name,
        trips,
        airline
      }),
      redirect: 'follow'
    });
    const responsePut = await fetchDataPut.json();
    const dataPut = responsePut;
    res.status(200).json(dataPut);
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