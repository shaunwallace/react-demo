import React from 'react';
import PropTypes from 'prop-types';

const ScrollableSection = ({ style, children, offset, classes }) =>
  <section
    className={ classes }
    style={{
      ...style,
      maxHeight: `calc(100vh - ${ offset }px)`,
      overflow: 'scroll'
    }}
  >
    { children }
  </section>

ScrollableSection.propTypes = {
  style: PropTypes.shape({}),
  children: PropTypes.node,
  offset: PropTypes.number, 
  classes: PropTypes.string
};

ScrollableSection.defaultProps = {
  style: {},
  children: null,
  offset: 20, 
  classes: ''
};

export default ScrollableSection;