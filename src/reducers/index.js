import { combineReducers } from 'redux'
import video from 'reducers/videoReducer';
import filter from 'reducers/filterReducer';

export default combineReducers({
  video,
  filter
});