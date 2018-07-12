import {
  FILTER_REQUEST_LOAD,
  FILTER_REQUEST_SUCCESS,
  FILTER_REQUEST_ERROR
} from "constants/filter";

const URL = 'http://localhost:3000/filters';

export default class FilterService {
  fetchFilters() {
    return fetch(URL)
    .then(res => {
      if (! res.ok) {
        return null;
      }
      return res.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => {
      console.log(err);
    })
  }

  requestLoad() {
    return {
      type: FILTER_REQUEST_LOAD,
    };
  }

  requestSuccess(data = []) {
    return {
      type: FILTER_REQUEST_SUCCESS,
      payload: data
    };
  }

  requestError() {
    return {
      type: FILTER_REQUEST_ERROR
    };
  }
}
