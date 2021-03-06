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

export const setConditionStaticDispatch = (bolean) => {
  return {
    type: actionType.SET_CONDITION_STATIC,
    payload: bolean
  }
}

export const filterPassengersDispatch = (name, bolean) => {
  return {
    type: actionType.GET_FILTERS,
    payload: {
      name,
      boleanFilter: bolean
    }
  }
}

export const statusLoginDispatch = (bolean) => {
  return {
    type: actionType.STATUS_LOGIN,
    payload: bolean
  }
}

export const showModalDispatch = (bolean) => {
  return {
    type: actionType.SHOW_MODAL,
    payload: bolean
  }
}

export const deletePassengerIdDispatch = (id) => {
  return {
    type: actionType.DELETE_PASSENGER,
    payload: id
  }
}

export const submitUpdateDispatch = (bolean) => {
  return {
    type: actionType.SUBMIT_UPDATE,
    payload: bolean
  }
}

export const getAirLineDispatch = (airline) => {
  return {
    type: actionType.GET_AIRLINES,
    payload: airline
  }
}