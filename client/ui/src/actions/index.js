import * as constants from '../constants';
import { get } from '../utils';
const {
  APP_INIT,
  TITLE_SELECTED,
  VERSIONS_RECEIVED,
  CLOSE_GALLERY,
  EXPANDED_VIEW,
  GROUP_EXPANDED_VIEW
} = constants.default;

export function initialize() {
  return async dispatch => {
    dispatch({
      type: APP_INIT,
      payload: await get('/api/movies/withthumbnails')
    });
  };
}

export function getVersions(id, limit = 20, skip) {
  return async (dispatch, getState) => {
    dispatch({
      type: TITLE_SELECTED,
      payload: id
    });

    // api/Movies/70140358/versions?filter=%7B%22limit%22%3A5%7D
    // filter[limit]=10&filter[skip]=0
    const versions = await get(`/api/movies/${id}/versions?filter=[limit]=${limit}`);

    setTimeout(() => {
      dispatch({
        type: VERSIONS_RECEIVED,
        payload: {
          id,
          versions:
            getState().appState.versions[id] || versions
        }
      });
    }, 700)
  };
}

export function closeGallery() {
  return dispatch => {
    dispatch({
      type: CLOSE_GALLERY
    });
  };
}

export function updateExpandedView(selectedVersion) {
  return dispatch => {
    dispatch({
      type: EXPANDED_VIEW,
      payload: selectedVersion
    });
  };
}

export function groupExpandedView(groupBy) {
  return dispatch => {
    dispatch({
      type: GROUP_EXPANDED_VIEW,
      payload: groupBy
    });
  };
}
