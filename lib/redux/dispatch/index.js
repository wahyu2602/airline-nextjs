import { actionType } from "../constanta";

export const getPassengersDispatch = (pessangers) => {
  return {
    type: actionType.GET_PASSENGERS,
    payload: pessangers
  }
}

export const getAllPagesDispatch = (totalPassengers, totalPages) => {
  return {
    type: actionType.GET_TOTAL_ALL_PAGES,
    payload: {
      totalPassengers,
      totalPages
    }
  }
}

export const getPassengerIdDispatch = (id) => {
  return {
    type: actionType.GET_PASSENGER_ID,
    payload: id
  }
}

export const getPageSizeDispatch = (page, size) => {
  return {
    type: actionType.GET_PAGE_SIZE,
    payload: {
      page,
      size
    }
  }
}