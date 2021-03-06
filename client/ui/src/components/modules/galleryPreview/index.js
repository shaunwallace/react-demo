import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Movie, Header, ExpandableButton, Modal, SortOptions } from '../../';
import { noop } from '../../../utils';
import './galleryPreview.css';

class GalleryPreview extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    showGalleryImages: PropTypes.bool,
    onModalStateChange: PropTypes.func,
    galleryOrder: PropTypes.string,
    onGroupSelection: PropTypes.func
  };

  static defaultProps = {
    images: [],
    showGalleryImages: true,
    onModalStateChange: noop,
    galleryOrder: null,
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
    if (groupBy !== this.props.galleryOrder) {
      this.props.onGroupSelection(groupBy);
    }
  };

  render() {
    const length = this.props.images.length;
    return (
      <section className="galleryPreview">
        {length ? (
          <div
            className="galleryPreviewContainer"
            style={{
              maxHeight: `${document.body.getBoundingClientRect().height}px`
            }}
          >
            <Header>
              <SortOptions
                orderOptions={['movieId', 'languageCode']}
                activeOption={this.props.galleryOrder}
                setOption={this.setOrderPriority}
              />
              <ExpandableButton
                show
                initialOpenState
                onClick={this.props.onClose}
              />
            </Header>
            <div className="galleryPreviewImages">
              {this.props.images.map((item, i) => (
                <Movie
                  key={i}
                  type="galleryThumbnail"
                  onClick={this.onSelectedImage(item)}
                  {...item}
                />
              ))}
            </div>
          </div>
        ) : null}
        <h1 style={{ opacity: length !== 0 ? 0 : 1 }}>
          Choose a title to preview artwork
        </h1>
        <Modal
          open={this.state.selectedTitle !== null}
          onClose={this.closeModal}
          {...this.state.selectedTitle}
        />
      </section>
    );
  }
}

export default GalleryPreview;

// {
//   reveal ? (
//     this.props.images.map((item, i) =>
//       <Movie
//         key={i}
//         type="galleryThumbnail"
//         { ...item }
//       />
//     )
//   ) :
//     <Animate
//       playOnInitialization
//       { ...{
//         frames: [
//           { opacity: 0 },
//           { opacity: 1 }
//         ],
//         onFinish: function() {
//           this.setAttribute("style", `opacity: 1`);
//         }
//       }
//     }
//     >
//       <h1>Choose a title</h1>
//     </Animate>
// }
