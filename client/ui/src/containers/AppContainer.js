import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize, getSelectedTitles, closeGallery } from '../actions';
import { Gallery, Movie, PageTitle } from '../components';
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
  versions: state.appState.versions,
  selectedTitle: state.appState.selectedTitle,
  gallery: state.appState.gallery
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize()),
  getSelectedTitlesVersions: title => dispatch(getSelectedTitles(title)),
  closeGallery: () => dispatch(closeGallery())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
