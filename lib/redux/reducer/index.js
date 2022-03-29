import { actionType } from "../constanta";

const initialState = {
  passengers: [],
  passenger: null,
  setTotalPages: {
    totalPages: null,
    totalPassengers: null
  },
  setPageSize: {
    page: null,
    size: null
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PASSENGERS:
      return {
        ...state,
        passengers: action.payload
      }
    case actionType.GET_TOTAL_ALL_PAGES:
      return {
        ...state,
        setTotalPages: {
          totalPages: action.payload.totalPages,
          totalPassengers: action.payload.totalPassengers
        }
      }
    case actionType.GET_PASSENGER_ID:
      const passenger = state.passengers.find(passenger => passenger._id == action.payload)
      return {
        ...state,
        passenger: passenger
      }
    case actionType.GET_PAGE_SIZE:
      return {
        ...state,
        setPageSize: {
          page: action.payload.page,
          size: action.payload.size
        }
      }
    default:
      return state;
  }
}

export default rootReducer;