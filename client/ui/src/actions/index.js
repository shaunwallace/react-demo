import oboe from 'oboe';
import * as constants from '../constants';
import { get } from '../utils';
const { APP_INIT, TITLE_SELECTED, VERSIONS_RECEIVED, TITLE_AVAILABLE, CLOSE_GALLERY } = constants.default;

export function initialize() {
  return async dispatch => {

    // oboe('/api/movies/titles')
    //   .node('{thumbnailUrl}', title => {
    //     // This callback will be called everytime a new object is
    //     // found in the titles array.
    //     dispatch({
    //       type: TITLE_AVAILABLE,
    //       payload: title,
    //     });
    //   })
    //   .done(titles => {
    //     dispatch({
    //       type: APP_INIT,
    //       payload: titles,// await get('/api/movies/titles'),
    //     });
    //   });

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
      payload: await get(`/api/movies?filter[where][movieId]=${id}`),
    });
  };
}

export function closeGallery() {
  return dispatch => {
    dispatch({
      type: CLOSE_GALLERY
    });
  }
}