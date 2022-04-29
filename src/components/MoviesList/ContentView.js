import React, { Fragment } from 'react';
import { Pagination } from 'antd';

import Movie from '../Movie';

export const ContentView = ({ sessionId, movieList, changePage, currPage, totalPages, ratedArr }) => {
  const total = totalPages >= 500 ? 5000 : totalPages * 10;
  const rateVal = (id) => {
    const filtered = ratedArr.filter((el) => el.id === id);
    return filtered.length ? filtered[0].rating : null;
  };
  return (
    <Fragment>
      <div className="movie__content">
        {movieList.map((movie) => (
          <Movie key={movie.id} sessionId={sessionId} movie={movie} rateVal={rateVal(movie.id)} />
        ))}
      </div>
      {total > 10 ? (
        <Pagination
          current={currPage}
          showQuickJumper={false}
          showSizeChanger={false}
          size="small"
          total={total}
          style={{ marginTop: 32 }}
          onChange={(page) => {
            changePage(page);
          }}
        />
      ) : total ? null : (
        <h2>Такого фильма нет в библиотеке, попробуйте другой</h2>
      )}
    </Fragment>
  );
};
