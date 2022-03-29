import { actionType } from "../constanta";

const initialState = {
  passengers: [],
  passenger: null,
  totalPassengers: null,
  totalPages: null,
  setTotalPages: {
    totalPages: null,
    totalPassengers: null
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
    default:
      return state;
  }
}

export default rootReducer;