import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryPreview } from '../../';
import { classNames } from '../../../utils';
import './gallery.css';

class Gallery extends Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
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

  state = {
    numberOfItems: this.props.images.length,
    maxHeight: 'auto',
    currentIndex: 0,
    items: [],
    versions: [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.images !== nextProps.images) {
      const maxHeight = this.gallery.getBoundingClientRect().height || document.body.getBoundingClientRect().height;
      const maxItems = Math.floor(maxHeight / this.props.maxImageHeight);

      this.setState({
        items: nextProps.images.slice(this.state.currentIndex, maxItems + 1),
        currentIndex: this.state.currentIndex,
        maxHeight,
        maxItems
      });
    }
  }

  render() {
    return (
      <div
        className="gallery"
        ref={el => this.gallery = el}
      >
        { this.props.gallery.galleryExpanded &&
          <div
            className={classNames({
              movieMetaInformation: true,
              show: true
            })}
          >
            <p>Name: { this.props.selectedVersion.movieName }</p>
            <p>Movie ID: { this.props.selectedVersion.movieId }</p>
            <p>Image Type: { this.props.selectedVersion.imageType }</p>
            <p>Language Code: { this.props.selectedVersion.languageCode }</p>
          </div>
        }
        
        <section
          className={classNames({
            gallerySidebar: true,
            collapsed: !this.props.gallery.gallerySidebar
          })}
          style={{ maxHeight: `${this.state.maxHeight}px` }}
        >
          {
            this.state.items.map((item, i) =>
              <div
                key={i}
                className={
                classNames({
                  item: true,
                  inactive: !this.props.gallery.gallerySidebar && !item.selected,
                })}
              >
                {
                  React.cloneElement(this.props.children, { ...item })
                }
              </div>
            )
          }
        </section>
        <GalleryPreview
          images={ this.props.versions }
          onClose={ this.props.closeGallery }
          onModalStateChange={ this.props.updateExpandedView }
        />
      </div>
    );
  }
}

export default Gallery;


