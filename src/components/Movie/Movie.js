import React from 'react';
import { Card, Image, Typography, Rate } from 'antd';

import './Movie.css';

import MovieService from '../../services/service-movie';
import RateRound from '../UI/RateRound';
import GenreList from '../UI/GenreList';
import MovieDate from '../UI/MovieDate';

const { Title, Paragraph } = Typography;

export const Movie = ({ movie, rateVal, sessionId }) => {
  const movieService = new MovieService();

  const img = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;
  const editedText =
    movie.overview.split(' ').length >= 24 ? movie.overview.split(' ').slice(0, 24).join(' ') + ' ...' : movie.overview;

  const rate = (val) => {
    movieService.setRated(movie.id, val, sessionId);
  };
  const rateColor = (rate) => {
    if (rate >= 0 && rate <= 3) return '#E90000';
    if (rate > 3 && rate <= 5) return '#E97E00';
    if (rate > 5 && rate <= 7) return '#E9D100';
    if (rate > 7) return '#66E900';
  };
  return (
    <Card className="customCard" bodyStyle={{ padding: 0 }}>
      <div className="card__content">
        <Image preview={false} src={img} />
        <div className="movie__title">
          <Title level={5} style={{ maxWidth: 190, margin: 0 }}>
            {movie.original_title}
          </Title>
          <RateRound color={rateColor(movie.vote_average)}>{movie.vote_average}</RateRound>
        </div>
        <MovieDate date={movie.release_date} />
        <GenreList genres={movie.genre_ids} />
        <Paragraph className="movie__desc">{editedText}</Paragraph>
        <Rate onChange={rate} defaultValue={rateVal} count={10} />
      </div>
    </Card>
  );
};
