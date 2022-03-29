const baseUrl = process.env.BASE_URL;

export default async function handler(req, res) {
  const { id } = req.query;
  const header = req.headers;
  const tokenName = header.referer;

  if (tokenName == baseUrl && req.method == 'GET') {
    const fetchData = await fetch(`https://api.instantwebtools.net/v1/passenger/${id}`);
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