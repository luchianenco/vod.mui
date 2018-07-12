import qs from 'query-string';
import {
    LAST_VIDEO_REQUEST_LOAD,
    LAST_VIDEO_REQUEST_SUCCESS,
    LAST_VIDEO_REQUEST_ERROR
} from "constants/video";

const URL_LAST_VIDEO = 'http://localhost:3000/page/';

export default class VideoService {
    fetchVideos(id, queryParams = {}) {
      const queryString =  Object.keys(queryParams).length ? '?' + qs.stringify(queryParams) : '';
      const url = URL_LAST_VIDEO + id + queryString;
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
            type: LAST_VIDEO_REQUEST_LOAD,
        };
    }

    requestSuccess(data = []) {
        return {
            type: LAST_VIDEO_REQUEST_SUCCESS,
            payload: data
        };
    }

    requestError() {
        return {
            type: LAST_VIDEO_REQUEST_ERROR
        };
    }
}
