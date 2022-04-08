const baseUrl = process.env.BASE_URL;

export default async function handler(req, res) {
  const header = req.headers;
  const tokenName = header.referer;
  const cookie = header.cookie;
  const { name, trips, airline } = req.query;

  if (req.method === 'GET' && tokenName == baseUrl) {
    const fetchData = await fetch("https://api.instantwebtools.net/v1/passenger?page=0&size=10");
    const response = await fetchData.json();
    const data = response;
    res.status(200).json(data);
    res.end();
  } else if (req.method === 'POST' && cookie !== undefined && tokenName == `${baseUrl}dashboard`) {
    const fetchDataPost = await fetch("https://api.instantwebtools.net/v1/passenger", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        name,
        trips,
        airline
      })
    });
    const responseDataPost = await fetchDataPost.json();
    const dataPost = responseDataPost;
    res.status(201).json(dataPost);
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