import { axios } from '../axios/axios';

export async function loginAuth(data) {
  const req = await axios('api/auth/login', {
    method: 'POST',
    // withCredentials: true,
    params: data
  }).then(res => {
    return res.data
  });

  return req;
}

export async function logoutAuth() {
  const req = await axios('api/auth/logout', {
    method: 'POST',
  }).then(res => {
    return res
  });

  return req;
}