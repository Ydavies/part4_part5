//setting the movie class
class Movie {
  constructor(movieId, title, year, rating) {
    this.movieID = movieId;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}

const movieList = [
  new Movie("6", "Pulp Fiction", "1994", "8.9"),
  new Movie("2", "Django Unchained", "2012", "7.8"),
  new Movie("4", "Back to the Future", "1985", "8.5"),
  new Movie("7", "Aliens", "1986", "8.4"),
  new Movie("5", "Inception", "2010", "8.8"),
  new Movie("9", "Fight Club", "1999", "8.8"),
  new Movie("3", "The Departed", "2006", "8.5"),
  new Movie("10", "The Hateful Eight", "2015", "7.8"),
  new Movie("1", "The Matrix", "1999", "8.7"),
  new Movie("8", "Interstellar", "2014", "8.7"),
];

console.log(movieList);

// const movieSorted = movieList.sort((a, b) => a.movieID - b.movieID);
// console.log(movieSorted);

// After not being able to get the array to sort i found that it was sorting it by a string and not a number, so i changed it to parseInt which converts the string to a number.

movieList.sort((a, b) => parseInt(a.movieID) - parseInt(b.movieID));
console.log(movieList);