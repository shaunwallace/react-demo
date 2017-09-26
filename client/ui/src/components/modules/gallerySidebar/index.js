import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollableSection } from '../../';
import { classNames } from '../../../utils';
import './gallerySidebar.css';

class GallerySidebar extends Component {
  static propTypes = {
    images: PropTypes.array,
    children: PropTypes.element.isRequired,
    sidebar: PropTypes.bool
  };

  static defaultProps = {
    images: [],
    children: null,
    sidebar: true
  };

  render() {
    const {
      sidebar,
      images,
      children,
    } = this.props;

    return (
      <ScrollableSection
        classes={classNames({
          gallerySidebar: true,
          collapsed: !sidebar
        })}
      >
        {images.map(item => (
          <div
            key={ item.movieId }
            className={classNames({
              item: true,
              inactive: !sidebar && !item.selected
            })}
          >
            { React.cloneElement(children, { ...item }) }
          </div>
        ))}
      </ScrollableSection>
    );
  }
}

export default GallerySidebar;
