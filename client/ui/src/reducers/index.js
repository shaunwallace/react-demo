import * as constants from '../constants';
import { updateItem, groupBy } from '../utils';

const {
  APP_INIT,
  TITLE_SELECTED,
  VERSIONS_RECEIVED,
  CLOSE_GALLERY,
  EXPANDED_VIEW,
  GROUP_EXPANDED_VIEW
} = constants.default;

const defaultState = {
  gallery: {
    galleryPreview: false,
    gallerySidebar: true,
    galleryExpanded: false,
    galleryOrder: 'movieId',
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
        ...updateItem(state.titles, action.payload, 'movieId'),
        gallery: { ...state.gallery, ...{
          galleryPreview: true,
          gallerySidebar: false
        }}
      }
    case CLOSE_GALLERY:
      return {
        ...state,
        ...{ gallery: defaultState.gallery },
        selectedTitle: null,
        selectedVersion: null,
        activeVersions: [],
        ...updateItem(state.titles, state.selectedTitle, 'movieId', false),
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
        gallery: { ...state.gallery, ...{
          galleryExpanded: action.payload
        }}
      }
    case GROUP_EXPANDED_VIEW:
      return {
        ...state,
        gallery: { ...state.gallery, ...{
          galleryOrder: action.payload
        }},
        activeVersions: [
          ...(action.payload === 'movieId' ? state.versions[state.selectedTitle] : groupBy(state.activeVersions, action.payload))
        ]
      }
    default:
      return state;
  }
}
