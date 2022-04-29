import { Alert, Spin, Input } from 'antd';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';

import MovieService from '../../services/service-movie';
import { MovieServiceProvider } from '../../context/MovieServiceContext';

import { ContentView } from './ContentView';
import './MovieList.css';

export default class MovieList extends Component {
  movieService = new MovieService();

  state = {
    sessionId: this.props.session,
    movieList: [],
    ratedArr: [],
    genresArr: [],
    serchStr: '',
    currPage: 1,
    totalPages: 1,
    isLoading: true,
    rateLoading: true,
    hasErrors: false,
    errMessage: '',
  };

  componentDidMount() {
    this.getGenres();
    this.getAllRated();
    this.getMoviesList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { serchStr, currPage } = this.state;
    if (prevProps.isRated !== this.props.isRated) {
      this.setState({ rateLoading: true });
      this.getAllRated();
      this.setState({ currPage: 1, isLoading: true });
      !prevProps.isRated ? this.getRatedMovies() : this.getMoviesList();
    }
    if (serchStr !== prevState.serchStr) {
      this.setState({ rateLoading: true });
      this.getAllRated();
      this.updateSearch();
    }
    if (currPage !== prevState.currPage) {
      this.setState({ rateLoading: true });
      this.getAllRated();
      this.updatePage();
    }
  }

  onError = (err) => {
    this.setState({
      hasErrors: true,
      errMessage: err.message,
      isLoading: false,
    });
  };

  getGenres() {
    this.movieService.getGenre().then(this.updateGenres).catch(this.onError);
  }

  getSearch = (e) => {
    this.setState({
      serchStr: e.target.value,
    });
  };

  getPage = (page) => {
    this.setState({
      currPage: page,
    });
  };

  getMoviesList(page = 1) {
    this.movieService.getMoviesByPage(page).then(this.updateMovies).catch(this.onError);
  }

  getMoviesBySearch = (text, page = 1) => {
    this.movieService.getMoviesBySearch(text, page).then(this.updateMovies).catch(this.onError);
  };

  getRatedMovies(page = 1) {
    this.movieService.getRated(page, this.state.sessionId).then(this.updateMovies).catch(this.onError);
  }

  getAllRated() {
    this.movieService.getAllRated(this.state.sessionId).then(this.updateRated).catch(this.onError);
  }

  updateMovies = (movies) => {
    this.setState({
      movieList: movies.results,
      totalPages: movies.total_pages,
      isLoading: false,
    });
  };

  updateRated = (rated) => {
    this.setState({
      ratedArr: rated,
      rateLoading: false,
    });
  };

  updateGenres = (genres) => {
    this.setState({
      genresArr: genres.genres,
    });
  };

  updatePage() {
    const { serchStr, currPage } = this.state;
    this.setState({ isLoading: true });
    if (this.props.isRated) {
      this.getRatedMovies(currPage);
    } else {
      !serchStr ? this.getMoviesList(currPage) : this.getMoviesBySearch(serchStr, currPage);
    }
  }

  updateSearch() {
    this.setState({ currPage: 1, isLoading: true });
    !this.state.serchStr ? this.getMoviesList() : this.getMoviesBySearch(this.state.serchStr);
  }

  render() {
    const {
      sessionId,
      movieList,
      currPage,
      ratedArr,
      totalPages,
      genresArr,
      isLoading,
      rateLoading,
      hasErrors,
      errMessage,
    } = this.state;
    const { isRated } = this.props;
    const hasData = !(isLoading || rateLoading || hasErrors);

    const debouncedSearch = debounce(this.getSearch, 1000);

    const err = hasErrors ? <Alert message={errMessage} type="warning" /> : null;
    const spinner = isLoading || rateLoading ? <Spin size="large" /> : null;
    const content = hasData ? (
      <ContentView
        sessionId={sessionId}
        ratedArr={ratedArr}
        movieList={movieList}
        currPage={currPage}
        totalPages={totalPages}
        changePage={this.getPage}
      />
    ) : null;
    const search = !isRated ? (
      <Input onChange={debouncedSearch} placeholder="Type to search..." style={{ marginBottom: 32 }} />
    ) : null;
    return (
      <MovieServiceProvider value={genresArr}>
        <div className="moviesList">
          {search}
          {err}
          {spinner}
          {content}
        </div>
      </MovieServiceProvider>
    );
  }
}
