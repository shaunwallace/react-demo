import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize, getSelectedTitles, closeGallery, updateExpandedView } from '../actions';
import { Gallery, Movie } from '../components';
import './appContainer.css';

class AppContainer extends Component {

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <main>
        <Gallery
          {...this.props}
          maxImageHeight={120}
        >
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
  updateExpandedView: (version) => dispatch(updateExpandedView(version))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
