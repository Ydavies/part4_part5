//creating the movie objects

class Movie {
  constructor(movieId, title, year, rating) {
    this.movieId = movieId;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}

const myMovieList = [
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

// Create an instance of the MovieList class
// MovieList takes in the rootId and the movie array
let movieList = new MovieList("list", myMovieList);

// Event functions
// Search Click
function searchClick() {
  // get the text elemetn from the DOM
  let formElements = document.getElementById("form-list-control").elements;
  // Get the text from the input box
  let text = formElements["search-string"].value;
  // Run the search method.
  movieList.search(text);
}

// Search by ID Click
function searchByIdClick() {
  // get the text element from the DOM
  let formElements = document.getElementById("form-list-control").elements;
  // Text from input Box
  let id = formElements["search-string"].value;
  //Run The Search method
  movieList.searchById(id);
}
// Refresh Click
function refreshList() {
  movieList.movieList = [...myMovieList]; // Reset to the initial movie list
  movieList.refresh();
}

// A to Z Click
function a2zClick() {
  movieList.sortA2Z();
  movieList.refresh();
}
// Z to A Click
function z2aClick() {
  movieList.sortZ2A();
  movieList.refresh();
}
// Sort by Rating
function sortByRating() {
  movieList.sortByRating();
  movieList.refresh();
}

// CRUD Function
// C - Create - add new content
// R - Read - read content
// U - Update - update content
// D - Delete - detele Content

// Add a new movie to the list (create)
function addClick() {
  // Get the add form elements from the DOM
  let formElements = document.getElementById("form-add").elements;
  // Get the movie title from the form
  let title = formElements["title"].value;
  // Get the year from the form
  let year = formElements["year"].value;
  // Get the movie ID
  let movieId = formElements["movieId"].value;
  //Get Rating
  let rating = formElements["rating"].value;

  console.log(
    "title:",
    title,
    "year:",
    year,
    "movieId:",
    movieId,
    "rating:",
    rating
  );

  // save the movie to the list
  movieList.add(movieId, title, Number(year), rating);
  console.log("movieList after add:", movieList.movieList);

  // refresh the UI to display the new addition.
  // movieList.refresh();

  // Clear the input fields
  formElements.title.value = "";
  formElements.year.value = "";
  formElements.movieId.value = "";
  formElements.rating.value = "";
}
// Update a movie in the list (update)
function updateClick() {
  // Get the add form elements from the DOM
  let formElements = document.getElementById("form-update").elements;
  // Get the index from the form
  let index = formElements["index"].value - 1;
  // Get the movie title from the form
  let title = formElements["title"].value;
  // Get the year from the form
  let year = formElements["year"].value;
  // Get the movie ID and rating
  let movieId = formElements["movieId"].value;
  // Get the Rating from the form
  let rating = formElements["rating"].value;

  // Save the new movie into the lsit.
  movieList.update(index, movieId, title, Number(year), rating);
  // Clear the input fields
  formElements.index.value = "";
  formElements.title.value = "";
  formElements.year.value = "";
  formElements.movieId.value = "";
  formElements.rating.value = "";
}

// Delete a movie in the list (delete)
function deleteClick() {
  // Get the add form elements from the DOM
  let deleteIdInput = document.getElementById("delIndex");
  let movieIdToDelete = deleteIdInput.value;

  // search the index of the movie with matching MovieID
  const indexToDelete = movieList.movieList.findIndex(
    (movie) => movie.movieId === movieIdToDelete
  );

  // Check if a movie with that ID was found
  if (indexToDelete !== -1) {
    // Delete the movie at the found index
    movieList.delete(indexToDelete);
    // Clear the input field
    deleteIdInput.value = "";
    // Optionally, provide some feedback to the user
    document.getElementById(
      "search-message"
    ).textContent = `Movie with ID ${movieIdToDelete} deleted.`;
  } else {
    // If no movie with that ID was found, inform the user
    document.getElementById(
      "search-message"
    ).textContent = `Movie with ID ${movieIdToDelete} not found.`;
  }
}

function openForm(evt, action) {
  // declare variables
  let i, tabContent, tabLinks;

  // Get all elements that have the classname of tabcontent
  tabContent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabContent.length; i++) {
    // set the display to none for all elements with the class name of tabcontent
    tabContent[i].style.display = "none";
  }

  // Get all the elements that have the class name of tablinks and remove the class of active.
  tabLinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tabLinks.length; i++) {
    // remove the active class
    tabLinks[i].className = tabLinks[i].className.replace("active", "");
  }

  // Show the current tab and add the active class to the button that opened the tab
  document.getElementById(action).style.display = "block";
  evt.currentTarget.className += " active";
}
// End of openForm()

// Open tab by default.
document.getElementById("defaultOpen").click();

// Footer code
// Get the date and inject it into the span located in the footer.
// Get the span
const dateSpan = document.getElementById("date");
// Get the current date
const theDate = new Date();
// Add in the date to the DOM.
dateSpan.textContent = theDate.getFullYear();

// Add Event Listeners
// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("search-button").addEventListener("click", searchClick);
//   console.log("Event listener attached to 'search-button' for searchClick");

//   document
//     .getElementById("search-by-id-button")
//     .addEventListener("click", searchByIdClick);
//   document
//     .getElementById("refresh-button")
//     .addEventListener("click", refreshList);
//   document.getElementById("a2z").addEventListener("click", a2zClick);
//   document.getElementById("z2a").addEventListener("click", z2aClick);
//   document
//     .getElementById("sort-by-rating")
//     .addEventListener("click", sortByRating);
//   document.getElementById("add-button").addEventListener("click", addClick);
//   document
//     .getElementById("update-button")
//     .addEventListener("click", updateClick);
//   document
//     .getElementById("delete-button")
//     .addEventListener("click", deleteClick);
// });
