import { axios } from "../axios/axios";

export async function getPassengers() {
  const req = await axios('api/passengers')
    .then((res) => {
      return res.data
    })

  return req;
}

export async function getPagePassenger(page, size) {
  const req = await axios(`api/passengers/${page}/${size}`)
    .then((res) => {
      return res.data
    });

  return req;
};

export async function getPassengerId(id) {
  const req = await axios(`api/passenger/${id}`)
    .then((res) => {
      return res.data
    });

  return req;
};