import * as constants from 'constants/video';

const initState = {
  list: [],
  details: {
    title: '',
    description: '',
    tags: []
  }
};

const videoReducer = (state = initState, action) => {
    switch (action.type) {
        case constants.LAST_VIDEO_REQUEST_SUCCESS:
            return {
                ...state,
                list: action.payload
            };

        case constants.VIDEO_DETAILS_REQUEST_SUCCESS:
            return {
            ...state,
            details: action.payload
        };

        default:
            return state;
    }
};

export default videoReducer