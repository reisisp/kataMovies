import { Spin } from 'antd';
import React, { Component } from 'react';

import MovieService from '../../services/service-movie';
import MovieList from '../MoviesList';
import Navigation from '../Navigation';
import './App.css';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    currentTab: 'Search',
    sessionId: '',
    isLoading: true,
  };

  componentDidMount() {
    this.movieService.registerGuest().then(this.updateSession);
  }

  updateSession = (sessionId) => {
    this.setState({
      sessionId: sessionId.guest_session_id,
      isLoading: false,
    });
  };

  getTab = (tab) => {
    this.setState({
      currentTab: tab.key,
    });
  };

  render() {
    const content = !this.state.isLoading ? (
      <>
        <div className="app__nav">
          <Navigation getTab={this.getTab} currentTab={this.state.currentTab} />
        </div>
        <MovieList session={this.state.sessionId} isRated={this.state.currentTab === 'Rated' ? true : false} />
      </>
    ) : null;

    const spinner = this.state.isLoading ? <Spin size="large" /> : null;

    return (
      <div className="app">
        {spinner}
        {content}
      </div>
    );
  }
}
