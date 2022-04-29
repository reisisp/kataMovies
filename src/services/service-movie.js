export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';
  _apiKey = '0811580dce082814158496cc135043e6';

  async getRes(string) {
    const res = await fetch(`${this._apiBase}${string}`);

    if (!res.ok) {
      throw new Error(`Could not fetch url: ${res.status}`);
    }
    return await res.json();
  }

  getMoviesByPage(page) {
    return this.getRes(`/movie/popular?api_key=${this._apiKey}&page=${page}`);
  }

  getMoviesBySearch(text, page) {
    return this.getRes(`/search/movie?api_key=${this._apiKey}&query=${text}&page=${page}`);
  }

  getGenre() {
    return this.getRes(`/genre/movie/list?api_key=${this._apiKey}`);
  }

  registerGuest() {
    return this.getRes(`/authentication/guest_session/new?api_key=${this._apiKey}`);
  }

  getRated(page, sessionId) {
    return this.getRes(`/guest_session/${sessionId}/rated/movies?api_key=${this._apiKey}&page=${page}`);
  }

  async getAllRated(sessionId) {
    const res = await this.getRated(1, sessionId);
    const totalPages = res.total_pages;
    let arr = res.results.map((el) => {
      return { id: el.id, rating: el.rating };
    });
    if (totalPages !== 1) {
      for (let i = 2; i <= totalPages; i++) {
        const res = await this.getRated(i, sessionId);
        const resArr = res.results.map((el) => {
          return { id: el.id, rating: el.rating };
        });
        arr = [...arr, ...resArr];
      }
      return arr;
    } else {
      return arr;
    }
  }

  async setRated(id, val, sessionId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          value: val,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Could not fetch url: ${res.status}`);
    }
    return await res.json();
  }
}
