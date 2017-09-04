import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  initialize,
  getSelectedTitles,
  closeGallery,
  updateExpandedView,
  groupExpandedView
} from '../actions';
import { Gallery, Movie } from '../components';
import './appContainer.css';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props.initialize();
  }

  render() {
    return (
      <main>
        <Gallery {...this.props} maxImageHeight={120}>
          <Movie
            type="thumbnail"
            onClick={this.props.getSelectedTitlesVersions}
          />
        </Gallery>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  images: state.appState.titles,
  versions: state.appState.activeVersions,
  selectedTitle: state.appState.selectedTitle,
  selectedVersion: state.appState.selectedVersion,
  gallery: state.appState.gallery
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize()),
  getSelectedTitlesVersions: title => dispatch(getSelectedTitles(title)),
  closeGallery: () => dispatch(closeGallery()),
  updateExpandedView: version => dispatch(updateExpandedView(version)),
  groupExpandedView: groupBy => dispatch(groupExpandedView(groupBy))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
