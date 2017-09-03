import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Movie, Header, ExpandableButton, Modal } from '../../';
import { noop } from '../../../utils';
import './galleryPreview.css';

class GalleryPreview extends Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    showGalleryImages: PropTypes.bool,
    onModalStateChange: PropTypes.func
  }

  static defaultProps = {
    images: [],
    showGalleryImages: true,
    onModalStateChange: noop
  }

  state = {
    selectedTitle: null
  }

  onSelectedImage = movie => () => {
    this.setState({
      selectedTitle: movie
    }, () => {
      this.props.onModalStateChange(movie)
    });
  }

  closeModal = () => {
    this.setState({
      selectedTitle: null
    }, () => {
      this.props.onModalStateChange(null)
    });
  }

  render() {
    const length = this.props.images.length;
    return ( 
      <section className="galleryPreview">
        {
          length ? (
            <div
              className="galleryPreviewContainer"
              style={{ maxHeight: `${document.body.getBoundingClientRect().height}px` }}
            >
              <Header>
                <ExpandableButton
                  show
                  initialOpenState
                  onClick={ this.props.onClose }
                />
              </Header>
              <div
                className="galleryPreviewImages"
              >
                {
                  this.props.images.map((item, i) =>
                    <Movie
                      key={ i }
                      type="galleryThumbnail"
                      onClick={ this.onSelectedImage(item) }
                      { ...item }
                    />
                  )
                }
              </div>
            </div>
          ) : null
        }
        <h1 style={{ opacity: length !== 0 ? 0 : 1 }}>Choose a title to preview artwork</h1>
        {
          this.state.selectedTitle && <Modal { ...this.state.selectedTitle } onClose={ this.closeModal } />
        }
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