import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../../utils';

const animationOptionDefaults = {
  duration: 1800,
  offset: 0,
  iterations: 1,
  easing: 'ease'
};

class Animate extends Component {
  static propTypes = {
    frames: PropTypes.array,
    options: PropTypes.object,
    onFinish: PropTypes.func,
    children: PropTypes.node,
    playOnInitialization: PropTypes.bool
  };

  static defaultProps = {
    frames: [],
    options: animationOptionDefaults,
    onFinish: noop,
    children: null,
    playOnInitialization: false
  };

  componentDidMount() {
    this.animation = this.instance.animate(
      this.props.frames,
      { ...animationOptionDefaults, ...this.props.options }
    );

    this.props.playOnInitialization || this.animation.pause();

    this.animation.addEventListener('finish', () => {
      this.props.onFinish(this.instance);
    }, { once: true });
  }

  componentWillUnmount() {
    this.animation.removeEventListener('finish', this.props.onFinish);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, this.props);
    // if (nextProps.play !== this.props.play && nextProps.play) {
    //   this.animation.play();
    // }

    if (nextProps.frames !== this.props.frames) {
      console.log('here');
      this.animation.removeEventListener('finish', this.props.onFinish);

      this.animation = this.instance.animate(
        this.props.frames,
        { ...animationOptionDefaults, ...this.props.options }
      );

      this.props.playOnInitialization || this.animation.pause();

      this.animation.addEventListener('finish', () => {
        this.props.onFinish(this.instance);
      }, { once: true });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.frames !== this.props.frames ||
      nextProps.play !== this.props.play;
  }

  play = () => {
    this.animation.play();
  };

  render() {
    return (
      <div
        ref={instance => {
          this.instance = instance;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Animate;
