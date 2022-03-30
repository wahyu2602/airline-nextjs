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
  },
  conditionStatic: false,
  filterPassengers: {
    valueName: '',
    data: [],
    conditionFilter: false
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
    case actionType.SET_CONDITION_STATIC:
      return {
        ...state,
        conditionStatic: action.payload
      }
    case actionType.GET_FILTERS:
      const filterData = action.payload.name == null ? state.filterPassengers.data = [] : state.passengers.filter(data => data.name.toLowerCase().includes(action.payload.name.toLowerCase()));
      return {
        ...state,
        filterPassengers: {
          valueName: action.payload.name,
          data: filterData,
          conditionFilter: action.payload.boleanFilter
        }
      }
    default:
      return state;
  }
}

export default rootReducer;