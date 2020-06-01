export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.name = data[`film_info`][`title`];
    this.originalName = data[`film_info`][`alternative_title`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.rating = data[`film_info`][`total_rating`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.age = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.isInFavorites = data[`user_details`][`favorite`];
    this.isInWatchlist = data[`user_details`][`watchlist`];
    this.isInHistory = data[`user_details`][`already_watched`];
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
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

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
