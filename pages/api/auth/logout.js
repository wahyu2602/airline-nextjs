const baseUrl = process.env.BASE_URL;

export default async function handler(req, res) {
  const header = req.headers;
  const url = header.referer;
  const cookie = header.cookie;

  if (url == `${baseUrl}dashboard` && cookie !== undefined && req.method == 'POST') {
    res.setHeader('Set-Cookie', 'Bearer=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    const data = {
      error: false,
      messange: 'Your logout success!'
    };
    res.status(200).json(data);
    res.end();
  } else {
    const error = {
      error: true,
      message: 'No Data!'
    };
    res.status(500).json(error);
    res.end();
  }
}