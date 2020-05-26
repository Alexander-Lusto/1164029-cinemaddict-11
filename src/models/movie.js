export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.name = data[`film_info`][`title`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.rating = data[`film_info`][`total_rating`];
    this.releaseDate = data[`film_info`][`release`][`date`];
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
    this.watchingDate = data[`user_details`][`watching_date`];
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    console.log(data);
    return data.map(Movie.parseMovie);
  }
}
