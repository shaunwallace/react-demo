import React from 'react';
import './loader.css';

export default ({ isLoading, size = 60 }) => (
  isLoading ? (
    <div className="loader" style={{
      width: size,
      height: size,
    }}>
      <div 
        className="loader-line-mask"
        style={{
          width: size / 2,
          height: size,
          marginLeft: -(size / 2),
          marginTop: -(size / 2),
          transformOrigin: `${(size / 2)}px ${(size / 2)}px`
        }}
      >
        <div
          style={{
            width: size,
            height: size,
          }}
          className="loader-line" />
      </div>
    </div>
    ) : null
);
