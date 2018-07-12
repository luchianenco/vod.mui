import VideoService from 'service/videoService';
import VideoDetailsService from 'service/videoDetailsService';

const videoService = new VideoService();
const videoDetailsService = new VideoDetailsService();

export function getVideos(id, queryParams = {}) {
    return dispatch => {
        dispatch(videoService.requestLoad());
        videoService.fetchVideos(id, queryParams)
            .then(data => {
            dispatch(videoService.requestSuccess(data));
        }).catch(err => {
            console.log(err);
            dispatch(videoService.requestError());
        });
    }
}

export function getVideoInfo(id) {
  return dispatch => {
    dispatch(videoService.requestLoad());
    videoDetailsService.fetchVideos(id)
    .then(data => {
      dispatch(videoDetailsService.requestSuccess(data));
    }).catch(err => {
      console.log(err);
      dispatch(videoDetailsService.requestError());
    });
  }
}