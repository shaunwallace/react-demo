import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Movie, Header, ExpandableButton, Modal, SortOptions, Loader, ScrollableSection, Animate } from '../../';
import { noop } from '../../../utils';
import './galleryPreview.css';

const hideAnimation = [{ opacity: 1 }, { opacity: 0 }];
const showAnimation = [{ opacity: 0 }, { opacity: 1 }];

class GalleryPreview extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    showGalleryImages: PropTypes.bool,
    order: PropTypes.string,
    onModalStateChange: PropTypes.func,
    onGroupSelection: PropTypes.func
  };

  static defaultProps = {
    images: [],
    showGalleryImages: false,
    order: null,
    onModalStateChange: noop,
    onGroupSelection: noop
  };

  state = {
    selectedTitle: null
  };

  onSelectedImage = movie => () => {
    this.setState(
      {
        selectedTitle: movie
      },
      () => {
        this.props.onModalStateChange(movie);
      }
    );
  };

  closeModal = () => {
    this.setState(
      {
        selectedTitle: null
      },
      () => {
        this.props.onModalStateChange(null);
      }
    );
  };

  setOrderPriority = groupBy => () => {
    if (groupBy !== this.props.order) {
      this.props.onGroupSelection(groupBy);
    }
  };

  render() {
    const { images = Array.from(Array(15).keys()), showGalleryImages, order, onClose } = this.props;

    return (
      <ScrollableSection
        classes="galleryPreview"
      >
        <div className="galleryContent" style={{ opacity: showGalleryImages ? 0 : 1 }}>
          <h1 className="previewInstructions">
            Choose a title to preview artwork
          </h1>
        </div>
        {
          images.map((item, i) => (
            <Movie
              key={ i }
              type="thumbnail"
              onClick={ this.onSelectedImage(item) }
              { ...item }
            /> 
          ))
        }
      </ScrollableSection>
    );
  }
}

export default GalleryPreview;

// <Header>
// <SortOptions
//   orderOptions={ ['movieId', 'languageCode'] }
//   activeOption={ order }
//   setOption={ this.setOrderPriority }
// />
// <ExpandableButton
//   show
//   initialOpenState
//   onClick={ onClose }
// />
// </Header>
// {
// images.map((item, i) => (
//   images.length ? (
//     <Movie
//       key={ i }
//       type="thumbnail"
//       onClick={ this.onSelectedImage(item) }
//       { ...item }
//     /> 
//   ) : (
//     <div className="loadingPlaceholder" style={{ height: `${351 / (299/168)}px` }}>
//       <Loader isLoading={ showGalleryImages } />
//     </div>
//   )
// ))
// }
// <Modal
// open={this.state.selectedTitle !== null}
// onClose={this.closeModal}
// {...this.state.selectedTitle}
// />
