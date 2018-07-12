import * as constants from 'constants/filter';

const initState = {
  facet: {},
  selected: []
};

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.FILTER_REQUEST_SUCCESS:
      return {
        ...state,
        facet: action.payload
      };

    default:
      return state;
  }
};

export default filterReducer