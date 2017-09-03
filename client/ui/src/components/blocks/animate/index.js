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
  }

  static defaultProps = {
    frames: [],
    options: animationOptionDefaults,
    onFinish: () => {},
    children: null,
    playOnInitialization: false
  }

  componentDidMount() {
    this.animation = this.instance.animate(this.props.frames, Object.assign({}, animationOptionDefaults, this.props.options));
    this.props.playOnInitialization || this.animation.pause();
    this.animation.addEventListener("finish", () => { this.props.onFinish(this.instance) });
  }

  componentWillUnmount() {
    this.animation.removeEventListener("finish", this.props.onFinish);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.play !== this.props.play && nextProps.play) {
      this.animation.play();
    }
  }

  play = () => {
    this.animation.play();
  }

  render() {
    return (
      <div ref={(instance) => { this.instance = instance }}>
        { this.props.children }
      </div>
    );
  }
}

export default Animate;