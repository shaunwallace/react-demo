import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classNames, noop } from '../../../utils';
import './expandableButton.css';

class ExpandableButton extends Component {
  
  static propTypes = {
    show: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    show: true,
    onClick: noop
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.initialOpenState
    }
  }

  handleOnClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    }, this.props.onClick);
  }

  render() {
    return (
      <button
        style={{ opacity: this.props.show ? 1: 0 }}
        className={
          classNames({
            expandableButton: true,
            open: this.state.isOpen
          })
        }
        onClick={ this.handleOnClick }
      >
        <svg width="25" height="25" viewBox="0 0 25 25">
          <path d="M20 12h-7V5h-1v7H5v1h7v7h1v-7h7" />
        </svg>
      </button>
    );
  }
}

export default ExpandableButton
  
