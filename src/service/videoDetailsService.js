import {
    VIDEO_DETAILS_REQUEST_LOAD,
    VIDEO_DETAILS_REQUEST_SUCCESS,
    VIDEO_DETAILS_REQUEST_ERROR
} from "constants/video";

const URL_VIDEO = 'http://localhost:3000/video/';

export default class VideoDetailsService {
    fetchVideos(id) {
      const url = URL_VIDEO + id;
      return fetch(url)
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
            type: VIDEO_DETAILS_REQUEST_LOAD,
        };
    }

    requestSuccess(data = []) {
        return {
            type: VIDEO_DETAILS_REQUEST_SUCCESS,
            payload: data
        };
    }

    requestError() {
        return {
            type: VIDEO_DETAILS_REQUEST_ERROR
        };
    }
}
