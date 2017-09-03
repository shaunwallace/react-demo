import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animate, Movie, PageTitle, ExpandableButton } from '../../';
import { classNames, noop } from '../../../utils';
import './galleryPreview.css';

class GalleryPreview extends Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    showGalleryImages: PropTypes.bool
  }

  static defaultProps = {
    images: [],
    showGalleryImages: false
  }

  getAnimationValues = (sequenceLength, onSequenceEnd = noop) => i => {
    let delay = 0.6;
    let staggerTime = 0.09;
    let restingPosition = 75;

    return {
      frames: [
        { transform: 'translate3d(0, 0, 0)', offset: 0 },
        { transform: 'translate3d(0, 0, 0)', offset: i * staggerTime },
        { transform: `translate3d(-${restingPosition}%, 0, 0)`, offset: (i * staggerTime + delay) },
        { transform: `translate3d(-${restingPosition}%, 0, 0)`, offset: 1 }
      ],
      options: { duration: 1400 },
      onFinish: (function() {
        return function() {
          // if we are calling the final animation sequence then fire any cb provided
          i === sequenceLength - 1 && onSequenceEnd();
          // since we need to establish the resting state of the items we animated, set
          // the resting position once the animation is complete
          this.setAttribute("style", `transform: translate3d(-${restingPosition}%, 0, 0);`);
        }
      })(i)
    }
  }

  render() {
    return ( 
      <section className="galleryPreview">
        {
          this.props.showGalleryImages && (
            <div
              className="galleryPreviewContainer"
              style={{ maxHeight: `${document.body.getBoundingClientRect().height}px` }}
            >
              <PageTitle>
                <ExpandableButton
                  show
                  initialOpenState
                  onClick={this.props.onClose}
                />
              </PageTitle>
              <div
                className="galleryPreviewImages"
                style={{ opacity: this.props.showGalleryImages ? 1 : 0 }}
              >
                {
                  this.props.images.map((item, i) =>
                    <Movie
                      key={i}
                      type="galleryThumbnail"
                      { ...item }
                    />
                  )
                }
              </div>
            </div>
          )
        }
        <h1 style={{ opacity: this.props.showGalleryImages ? 0 : 1 }}>Choose a title to preview artwork</h1>
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