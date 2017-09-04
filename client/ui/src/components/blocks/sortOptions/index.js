import React from 'react';
import { classNames } from '../../../utils';
import './sortOptions.css';

export default ({ orderOptions, activeOption, setOption, delimiter = '|' }) => (
  <h3 className="sortOptions">
    <div>Order By:</div>
    {
      orderOptions.map((option, i) =>
        <div key={i}>
          <span
            className={classNames({
              active: activeOption === option
            })}
            onClick={setOption(option)}
          >
            { option }
          </span>
          { i !== orderOptions.length - 1 ? delimiter : '' }
        </div>
      )
    }
  </h3>
)