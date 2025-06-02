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


movieList.sort((a, b) => Number(a.movieID) - Number(b.movieID));
console.log(movieList);


// What are we searching for?
let Result = "21";
// creating a search function
function movieIdsearch(movieList, movieId) {
  // if not found then we set the value to -1
  let found = -1;
  // console.log(`Array: ${movieList}`);
  console.log(`Searching for: Movie ${movieId}`);
  //Search the array by creating a loop
  for (let i = 0; i < movieList.length; i++) {

    // we can uncomment the below code if we want to show a console log of each search process that is completed.
    // console.log(`movieList[${i}]: ${movieList[i].movieId}`);

    if (movieList[i].movieId === movieId) {
      found = i;
      // end the loop
      break;
    }
  }
  return found;
}
// Calling the function
const result = movieIdsearch(movieList, Result);
// Output of result
if (result == -1) {
  console.log(`Result: null`);
} else {
  console.log(`The Movie of ${Result} was found at index ${result}`);
}