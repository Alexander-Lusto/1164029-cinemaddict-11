export default class Movie {
  constructor(movie) {
    this.id = movie[`id`];
    this.comments = movie[`comments`];
    this.name = movie[`film_info`][`title`];
    this.originalName = movie[`film_info`][`alternative_title`];
    this.poster = movie[`film_info`][`poster`];
    this.description = movie[`film_info`][`description`];
    this.rating = movie[`film_info`][`total_rating`];
    this.releaseDate = new Date(movie[`film_info`][`release`][`date`]);
    this.country = movie[`film_info`][`release`][`release_country`];
    this.duration = movie[`film_info`][`runtime`];
    this.genres = movie[`film_info`][`genre`];
    this.age = movie[`film_info`][`age_rating`];
    this.director = movie[`film_info`][`director`];
    this.writers = movie[`film_info`][`writers`];
    this.actors = movie[`film_info`][`actors`];
    this.isInFavorites = movie[`user_details`][`favorite`];
    this.isInWatchlist = movie[`user_details`][`watchlist`];
    this.isInHistory = movie[`user_details`][`already_watched`];
    this.watchingDate = new Date(movie[`user_details`][`watching_date`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.name,
        'alternative_title': this.originalName,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.age,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate.toISOString(),
          'release_country': this.country,
        },
        'runtime': this.duration,
        'description': this.description,
        'genre': this.genres,
      },
      'user_details': {
        'already_watched': this.isInHistory,
        'favorite': this.isInFavorites,
        'watching_date': this.watchingDate.toISOString(),
        'watchlist': this.isInWatchlist,
      },
      'comments': this.comments,
    };
  }

  static parseMovie(movie) {
    return new Movie(movie);
  }

  static parseMovies(movie) {
    return movie.map(Movie.parseMovie);
  }

  static clone(movie) {
    return new Movie(movie.toRAW());
  }
}
