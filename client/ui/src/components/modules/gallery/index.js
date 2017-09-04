import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryPreview, MovieMeta } from '../../';
import { classNames } from '../../../utils';
import './gallery.css';

class Gallery extends Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    versions: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.element.isRequired,
    gallery: PropTypes.shape({
      galleryPreview: false,
      gallerySidebar: true
    })
  }

  static defaultProps = {
    images: [],
    versions: [],
    children: null,
    gallery: {
      galleryPreview: false,
      gallerySidebar: true
    }
  }

  render() {
    const { 
      gallery,
      selectedVersion, 
      images,
      children,
      versions,
      updateExpandedView, 
      closeGallery,
      groupExpandedView
     } = this.props;

    return (
      <div className="gallery">
        <MovieMeta
          show={ gallery.galleryExpanded }
          { ...selectedVersion }
        />
        <section
          className={classNames({
            gallerySidebar: true,
            collapsed: !gallery.gallerySidebar
          })}
          style={{ maxHeight: `${document.body.getBoundingClientRect().height}px` }}
        >
          {
            images.map((item, i) =>
              <div
                key={i}
                className={
                classNames({
                  item: true,
                  inactive: !gallery.gallerySidebar && !item.selected,
                })}
              >
                { React.cloneElement(children, { ...item }) }
              </div>
            )
          }
        </section>
        <GalleryPreview
          images={ versions }
          galleryOrder={ gallery.galleryOrder }
          onClose={ closeGallery }
          onModalStateChange={ updateExpandedView }
          onGroupSelection={ groupExpandedView }
        />
      </div>
    );
  }
}

export default Gallery;
