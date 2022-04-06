const baseUrl = process.env.BASE_URL;
import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;
  const header = req.headers;
  const tokenName = header.referer;
  const cookie = header.cookie;
  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);

  if (tokenName == baseUrl && req.method == 'GET') {
    const fetchData = await fetch(`https://api.instantwebtools.net/v1/passenger/${id}`);
    const response = await fetchData.json();
    const data = response;
    res.status(200).json(data);
  } else if (tokenName == `${baseUrl}passenger/details` && cookie !== undefined && req.method == 'DELETE') {
    const fetchData = await fetch(`https://api.instantwebtools.net/v1/passenger/${id}`, {
      method: req.method
    });
    const response = await fetchData.json();
    const data = response;
    res.status(200).json(data);
  } else {
    const error = [{
      error: true,
      message: 'No Data!'
    }]
    res.status(500).json(error);
  }
}