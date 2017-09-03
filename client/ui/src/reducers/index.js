import * as constants from '../constants';
import { updateItem } from '../utils';

const { APP_INIT, TITLE_SELECTED, VERSIONS_RECEIVED, CLOSE_GALLERY } = constants.default;
const defaultState = {
  gallery: {
    galleryPreview: false,
    gallerySidebar: true
  }
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case APP_INIT:
      return { ...state, titles: action.payload.titles };
    case TITLE_SELECTED:
      return {
        ...state,
        ...updateItem(state.titles, action.payload, 'movieId'),
        ...{
          gallery: {
            galleryPreview: true,
            gallerySidebar: false
          }
        }
      }
      case CLOSE_GALLERY:
      return {
        ...state,
        ...{ gallery: defaultState.gallery }
      }
    case VERSIONS_RECEIVED:
      return {
        ...state,
        versions: action.payload
      }
    default:
      return state;
  }
}
