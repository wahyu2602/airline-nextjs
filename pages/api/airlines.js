const baseUrl = process.env.BASE_URL;

export default async function hendler(req, res) {
  if (req.method === 'GET') {
    const fetchData = await fetch('https://api.instantwebtools.net/v1/airlines', {
      headers: {
        'Authorization': req.headers.cookie
      }
    });
    const response = await fetchData.json();
    const data = response;

    res.status(200).json(data);
  }
}