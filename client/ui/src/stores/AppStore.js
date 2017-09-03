import app from '../reducers';

export default (state = {}, action) => {
  return {
    appState: app(state.appState, action),
  };
};