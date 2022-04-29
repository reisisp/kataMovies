import React from 'react';

import { MovieServiceComsumer } from '../../../context/MovieServiceContext';

import './GenreList.css';

export const GenreList = ({ genres }) => {
  return (
    <MovieServiceComsumer>
      {(genresArr) => {
        return (
          <div className="genreList">
            {genres.map((genre) => (
              <div key={genre} className="genreList__item">
                <span className="genreList__text">{genresArr.find((obj) => obj.id === genre).name}</span>
              </div>
            ))}
          </div>
        );
      }}
    </MovieServiceComsumer>
  );
};
