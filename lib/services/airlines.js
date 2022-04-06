import { axios } from '../axios/axios';

export async function getAitLines() {
  const req = axios('/api/airlines')
    .then(res => {
      return res
    })

  return req;
}