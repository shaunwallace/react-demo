import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryPreview, MovieMeta, ScrollableSection } from '../../';
import { classNames } from '../../../utils';
import './gallery.css';

class Gallery extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    gallery: PropTypes.shape({
      expanded: PropTypes.bool
    })
  };

  static defaultProps = {
    children: null,
    gallery: {
      expanded: false
    }
  };

  render() {
    const {
      gallery,
      selectedVersion,
      children,
    } = this.props;

    return (
      <div className="gallery">
        <MovieMeta show={ gallery.expanded } { ...selectedVersion } />
        { children }
      </div>
    );
  }
}

export default Gallery;
