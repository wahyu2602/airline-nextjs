import { axios } from '../axios/axios';

export async function loginAuth(data) {
  const req = await axios('api/auth', {
    method: 'POST',
    // withCredentials: true,
    params: data
  }).then(res => {
    return res.data
  })

  return req;
}