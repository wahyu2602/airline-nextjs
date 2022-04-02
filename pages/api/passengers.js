const baseUrl = process.env.BASE_URL;

export default async function handler(req, res) {
  const header = req.headers
  const tokenName = header.referer

  if (tokenName == baseUrl && req.method == 'GET') {
    const fetchData = await fetch("https://api.instantwebtools.net/v1/passenger?page=0&size=10");
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