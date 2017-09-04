import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Movie, ExpandableButton } from '../../';
import { classNames, noop } from '../../../utils';
import './modal.css';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
  };

  static defaultProps = {
    onClose: noop,
    open: false
  };

  render() {
    const classes = classNames({
      modal: true,
      open: this.props.open
    });

    return (
      <div className={classes} onClick={this.props.onClose}>
        <div className="content">
          <div className="body">
            <Movie {...this.props} type="fullsize">
              <ExpandableButton
                show
                initialOpenState
                onClick={this.props.onClose}
              />
            </Movie>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
