import { axios } from '../axios/axios';

export async function getAirLines() {
  const req = axios('/api/airlines')
    .then(res => {
      return res
    })

  return req;
}