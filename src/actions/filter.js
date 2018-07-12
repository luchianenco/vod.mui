import FilterService from '../service/filterService';

const service = new FilterService();

export function getFilters() {
  return dispatch => {
    dispatch(service.requestLoad());
    service.fetchFilters()
    .then(data => {
      dispatch(service.requestSuccess(data));
    }).catch(err => {
      console.log(err);
      dispatch(service.requestError());
    });
  }
}
