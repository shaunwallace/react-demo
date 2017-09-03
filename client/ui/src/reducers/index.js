import * as constants from '../constants';
import { updateItem } from '../utils';

const {
  APP_INIT,
  TITLE_AVAILABLE,
  TITLE_SELECTED,
  VERSIONS_RECEIVED,
  CLOSE_GALLERY,
  VERSION_AVAILABLE,
  EXPANDED_VIEW
} = constants.default;

const defaultState = {
  gallery: {
    galleryPreview: false,
    gallerySidebar: true,
    galleryExpanded: false
  },
  selectedTitle: null,
  selectedVersion: null,
  titles: [],
  activeVersions: [],
  versions: {}
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case APP_INIT:
      return { ...state, titles: action.payload.titles };
    case TITLE_SELECTED:
      return {
        ...state,
        activeVersions: state.versions[action.payload],
        selectedTitle: action.payload,
        ...updateItem(state.titles, action.payload, 'movieId', { selected: true }),
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
        ...defaultState,
        ...updateItem(state.titles, state.selectedTitle, 'movieId', { selected: false }),
      }
    case VERSIONS_RECEIVED:
      return {
        ...state,
        versions: { ...state.versions, ...{ [action.payload.id]: action.payload.versions } },
        activeVersions: action.payload.versions
      }
    case EXPANDED_VIEW:
      return {
        ...state,
        selectedVersion: action.payload,
        ...{
          gallery: {
            galleryExpanded: action.payload
          }
        }
      }
    default:
      return state;
  }
}
