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
      // payload: {titles: [...titles.titles, ...titles.titles, ...titles.titles, ...titles.titles]},
      payload: await get('/api/movies/titles')
    });
  };
}

export function getSelectedTitles(id) {
  return async (dispatch, getState) => {
    dispatch({
      type: TITLE_SELECTED,
      payload: id
    });

    dispatch({
      type: VERSIONS_RECEIVED,
      payload: {
        versions:
          getState().appState.versions[id] ||
          (await get(`/api/movies?filter[where][movieId]=${id}`)),
        id
      }
    });
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
