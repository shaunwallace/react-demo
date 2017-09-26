import * as constants from '../constants';
import { updateItem, groupBy } from '../utils';

const {
  TITLE_SELECTED,
  CLOSE_GALLERY,
  EXPANDED_VIEW,
  GROUP_EXPANDED_VIEW
} = constants.default;

const defaultState = {
  gallery: {
    preview: false,
    sidebar: true,
    expanded: false,
    order: 'movieId'
  }
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case TITLE_SELECTED:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          ...{
            preview: true,
            sidebar: false
          }
        }
      };
    case CLOSE_GALLERY:
      return {
        ...state,
        gallery: defaultState.gallery
      };
    case EXPANDED_VIEW:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          expanded: action.payload
        }
      };
    case GROUP_EXPANDED_VIEW:
      return {
        ...state,
        gallery: {
          ...state.gallery,
          order: action.payload
        }
      };
    default:
      return state;
  }
};
