import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  initialize,
  getVersions,
  closeGallery,
  updateExpandedView,
  groupExpandedView
} from '../actions';
import { Gallery, GallerySidebar, GalleryPreview, Movie } from '../components';
import './appContainer.css';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props.initialize();
  }

  render() {
    const { 
      images,
      gallery, 
      versions, 
      getVersions, 
      closeGallery,
      groupExpandedView,
      updateExpandedView
    } = this.props;

    return (
      <main>
        <Gallery { ...this.props }>
          <GallerySidebar
            images={ images }
            sidebar={ gallery.sidebar }
          >
            <Movie
              type="thumbnail"
              onClick={ getVersions }
            />
          </GallerySidebar>
          <GalleryPreview
            images={ versions }
            showGalleryImages={ gallery.preview }
            galleryOrder={ gallery.order }
            onClose={ closeGallery }
            onModalStateChange={ updateExpandedView }
            onGroupSelection={ groupExpandedView }
          />
        </Gallery>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  images: state.appState.movies,
  versions: state.appState.activeVersions,
  selectedTitle: state.appState.selectedTitle,
  selectedVersion: state.appState.selectedVersion,
  gallery: state.appState.gallery
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize()),
  getVersions: title => dispatch(getVersions(title)),
  closeGallery: () => dispatch(closeGallery()),
  updateExpandedView: version => dispatch(updateExpandedView(version)),
  groupExpandedView: groupBy => dispatch(groupExpandedView(groupBy))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
