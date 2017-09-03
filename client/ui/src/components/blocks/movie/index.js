import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from '../../../components';
import { classNames } from '../../../utils';
import './movie.css';

class Movie extends Component {
  static propTypes = {
    movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    movieName: PropTypes.string,
    imageType: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    fullSizeImageUrl: PropTypes.string,
    languageCode: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.bool
  }

  static defaultProps = {
    movieId: '',
    movieName: '',
    imageType: '',
    thumbnailUrl: '',
    fullSizeImageUrl: '',
    languageCode: '',
    type: 'thumbnail',
    selected: false
  }

  handleClick = ({ movieId, selected }) => () => {
    if (!selected) {
      this.props.onClick(movieId);
    }
  }

  render() {
    const { movieName, type, thumbnailUrl, fullSizeImageUrl, movieId } = this.props;
    const classes = classNames({
      movieTile: true,
      thumbnail: type === 'thumbnail',
      selected: this.props.selected
    });

    return (
      <div
        className={ classes }
        onClick={ this.handleClick(this.props) }
      >
        <Image
          type={type}
          showIcon={this.props.showIcon}
          active={ this.props.selected }
          src={ type === 'thumbnail' ? thumbnailUrl : fullSizeImageUrl }
        />
      </div>
    );
  }
}

export default Movie;
