import { ActionTypes } from "./actions";

const initialState = {
  countries: {
    data: [],
    loading: false,
    error: "",
  },
  countryDetails: {
    data: {},
    loading: false,
    error: "",
  },
  search: "",
  filter: "All",
  theme: "light",
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_COUNTRIES:
      return {
        ...state,
        countries: {
          ...state.countries,
          loading: true,
          error: "",
        },
      };
    case ActionTypes.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: {
          ...state.countries,
          data: action.payload,
          loading: false,
          error: "",
        },
      };
    case ActionTypes.GET_COUNTRIES_FAILED:
      return {
        ...state,
        countries: {
          ...state.countries,
          loading: false,
          error: action.payload,
        },
      };
    case ActionTypes.GET_COUNTRY_DETAILS:
      return {
        ...state,
        countryDetails: {
          ...state.countryDetails,
          loading: true,
          error: "",
        },
      };
    case ActionTypes.GET_COUNTRY_DETAILS_SUCCESS:
      return {
        ...state,
        countryDetails: {
          ...state.countryDetails,
          loading: false,
          data: action.payload[0],
          error: "",
        },
      };
    case ActionTypes.GET_COUNTRY_DETAILS_FAILED:
      return {
        ...state,
        countryDetails: {
          ...state.countryDetails,
          loading: false,
          error: action.payload,
        },
      };
    case ActionTypes.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
        countries: {
          ...state.countries,
          data:
            action.payload !== "All"
              ? [...state.countries.data].filter(
                  (e) => e.region === action.payload
                )
              : state.countries.data,
        },
      };
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}
