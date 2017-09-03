import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animate, GalleryPreview } from '../../';
import { classNames, noop } from '../../../utils';
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
    showVersions: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.images !== nextProps.images) {
      const maxHeight = this.gallery.getBoundingClientRect().height || document.body.getBoundingClientRect().height;
      const maxItems = Math.floor(maxHeight / this.props.maxImageHeight);

      this.setState({
        items: nextProps.images.slice(this.state.currentIndex, maxItems + 1),
        currentIndex: this.state.currentIndex,
        maxHeight,
        maxItems,
        animation: this.getAnimationValues(this.state.items.length, this.onFinalAnimation)
      });
    }
  }

  onFinalAnimation = () => {
    this.setState({
      showVersions: true,
    });
  }

  getAnimationValues = (sequenceLength, onSequenceEnd = noop, reverse) => i => {
    let delay = 0.6;
    let staggerTime = 0.09;
    let initialPosition = reverse ? 75 : 0
    let restingPosition = reverse ? 0 : 75;

    return {
      frames: [
        { transform: `translate3d(-${initialPosition}%, 0, 0)`, offset: 0 },
        { transform: `translate3d(-${initialPosition}%, 0, 0)`, offset: i * staggerTime },
        { transform: `translate3d(-${restingPosition}%, 0, 0)`, offset: (i * staggerTime + delay) },
        { transform: `translate3d(-${restingPosition}%, 0, 0)`, offset: 1 }
      ],
      options: { duration: 900 },
      onFinish: (function(i) {
        return function(instance) {
          // if we are calling the final animation sequence then fire any cb provided
          i === sequenceLength - 1 && onSequenceEnd();
          // since we need to establish the resting state of the items we animated, set
          // the resting position once the animation is complete
          instance.setAttribute("style", `transform: translate3d(-${restingPosition}%, 0, 0);`);
        }
      })(i)
    }
  }

  render() {
    return (
      <div
        className="gallery"
        ref={el => this.gallery = el}
      >
        <section
          className={classNames({
            gallerySidebar: true,
            collapsed: this.props.selectedTitle
          })}
          style={{ maxHeight: `${this.state.maxHeight}px` }}
        >
          {
            this.state.items.map((item, i) =>
              <Animate
                play={ !this.props.gallery.gallerySidebar }
                key={ item.id }
                { ...this.state.animation(i) }
              >
                <div className={
                  classNames({
                    item: true,
                    inactive: this.props.selectedTitle && !item.selected,
                  })}
                >
                  {
                    React.cloneElement(this.props.children, { ...item })
                  }
                </div>
              </Animate>
            )
          }
        </section>
        <GalleryPreview
          images={ this.props.versions }
          showGalleryImages={ this.state.showVersions && this.props.gallery.galleryPreview }
          onClose={ this.props.closeGallery }
        />
      </div>
    );
  }
}

export default Gallery;


