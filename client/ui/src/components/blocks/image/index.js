import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ExpandableButton, Loader } from '../../../components';
import { classNames, noop } from '../../../utils';
import './image.css';

class Image extends Component {
  static propTypes = {
    src: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    showIcon: PropTypes.bool
  }

  static defaultProps = {
    src: PropTypes.string,
    onClick: noop,
    active: false,
    showIcon: false
  }

  state = {
    loaded: false
  }

  handleOnLoad = () => {
    this.setState({
      loaded: true
    });
  }

  handleClick = () => {
    if (!this.props.active) {
      this.props.onClick();
    }
  }

  handleMouseEnter = () => {
    this.setState({
      hovered: true
    });
  }

  handleMouseLeave = () => {
    this.setState({
      hovered: false
    });
  }

  render() {
    const { src, showIcon, active, movieId } = this.props;

    const classes = classNames({
      imageContainer: true,
      thumbnail: this.props.type === 'thumbnail',
      loaded: this.state.loaded,
      active: this.props.active,
    });

    return (
      <div
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        className={ classes }
        onClick={ this.handleClick(movieId) }
      >
        <Loader isLoading={ !this.state.loaded } />
        <img
          onLoad={ this.handleOnLoad } 
          src={ src }
        />
        {
          showIcon ? (
            <ExpandableButton
              show={ this.state.hovered }
              isOpen={ active }
            />
          ) : null
        }
        
      </div>
    );
  }
}

export default Image;