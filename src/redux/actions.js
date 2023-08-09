import Services from "./services";

export const ActionTypes = {
  GET_COUNTRIES: "GET_COUNTRIES",
  GET_COUNTRIES_SUCCESS: "GET_COUNTRIES_SUCCESS",
  GET_COUNTRIES_FAILED: "GET_COUNTRIES_FAILED",
  GET_COUNTRY_DETAILS: "GET_COUNTRY_DETAILS",
  GET_COUNTRY_DETAILS_SUCCESS: "GET_COUNTRY_DETAILS_SUCCESS",
  GET_COUNTRY_DETAILS_FAILED: "GET_COUNTRY_DETAILS_FAILED",
  SET_SEARCH: "SET_SEARCH",
  SET_FILTER: "SET_FILTER",
  SET_THEME: "SET_THEME",
};

class Actions {
  static getCountries(value) {
    return async (dispatch) => {
      try {
        dispatch({ type: ActionTypes.GET_COUNTRIES });
        let response = await Services.getCountries(value);
        dispatch({
          type: ActionTypes.GET_COUNTRIES_SUCCESS,
          payload: response.data,
        });
        return response;
      } catch (error) {
        console.log(error);
        dispatch({
          type: ActionTypes.GET_COUNTRIES_SUCCESS,
          payload: error,
        });
      }
    };
  }

  static getCountryDetails(value) {
    return async (dispatch) => {
      try {
        dispatch({ type: ActionTypes.GET_COUNTRY_DETAILS });
        let response = await Services.getCountryDetails(value);
        dispatch({
          type: ActionTypes.GET_COUNTRY_DETAILS_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: ActionTypes.GET_COUNTRY_DETAILS_FAILED,
          payload: error,
        });
      }
    };
  }

  static setSearch(value) {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.SET_SEARCH, payload: value });
    };
  }

  static setFilter(value) {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.SET_FILTER, payload: value });
    };
  }

  static setTheme(value) {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.SET_THEME, payload: value });
    };
  }
}

export default Actions;
