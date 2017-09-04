import React from 'react';
import { classNames } from '../../../utils';
import './movieMeta.css';

export default ({ show, movieName, movieId, imageType, languageCode }) => (
  <div
    className={classNames({
      movieMetaInformation: true,
      show
    })}
  >
    <p>Name: {movieName}</p>
    <p>Movie ID: {movieId}</p>
    <p>Image Type: {imageType}</p>
    <p>Language Code: {languageCode}</p>
  </div>
);
