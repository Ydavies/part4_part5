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

  const searchMessageDiv = document.getElementById("search-message");
    searchMessageDiv.textContent = ""; // Clear previous messages
    searchMessageDiv.style.color = ""; // Reset color

    if (text === '') {
        searchMessageDiv.textContent = "Error: Please enter a valid Movie Title.";
        searchMessageDiv.style.color = "red";
        return;
    }
  movieList.search(text);
}

// Search by ID Click
function searchByIdClick() {
  // get the text element from the DOM
  let formElements = document.getElementById("form-list-control").elements;
  // Text from input Box
  let id = formElements["search-string"].value;
const searchMessageDiv = document.getElementById("search-message");
    searchMessageDiv.textContent = ""; // Clear previous messages
    searchMessageDiv.style.color = ""; // Reset color

    if (id === '') {
        searchMessageDiv.textContent = "Error: Please enter a valid Movie ID to search.";
        searchMessageDiv.style.color = "red";
        return;
    }
    if (isNaN(+id)) { // Validate if ID is numeric
        searchMessageDiv.textContent = "Error: Search ID must be a number.";
        searchMessageDiv.style.color = "red";
        return;
    }

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
    let movieId = formElements["movieId"].value.trim(); // Keep as string
  // Get the year from the form
    let title = formElements["title"].value.trim();
  // Get the movie ID
    let yearString = formElements["year"].value.trim();
  //Get Rating
    let ratingString = formElements["rating"].value.trim();


    // Error message
    const searchMessageDiv = document.getElementById("crud-message");
    searchMessageDiv.textContent = ""; // Clear previous messages at the start
    searchMessageDiv.style.color = ""; // Reset color

    // 1. Validate Movie ID (as a STRING, assuming it should be unique)
    if (movieId === '') {
        searchMessageDiv.textContent = "Error: Movie ID cannot be empty.";
        searchMessageDiv.style.color = "red";
        return;
    }
  
    if (isNaN(+movieId)) {
        searchMessageDiv.textContent = "Error: Movie ID must be a number.";
        searchMessageDiv.style.color = "red";
        return;
    }

    if (movieList.movieList.some(movie => movie.movieId === movieId)) {
        searchMessageDiv.textContent = `Error: Movie ID '${movieId}' already exists. Please choose a different ID.`;
        searchMessageDiv.style.color = "red";
        return;
    }

    // 2. Validate Title
    if (title === '') {
        searchMessageDiv.textContent = "Error: Title cannot be empty.";
        searchMessageDiv.style.color = "red";
        return;
    }

    // 3. Validate Year
    if (yearString === '') {
        searchMessageDiv.textContent = "Error: Year cannot be empty.";
        searchMessageDiv.style.color = "red";
        return;
    }
    const year = +yearString; 
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1800 || year > currentYear + 5) {
        searchMessageDiv.textContent = `Error: Year must be a number between 1945 and ${currentYear + 2}.`;
        searchMessageDiv.style.color = "red";
        return;
    }

    // 4. Validate Rating
    if (ratingString === '') {
        searchMessageDiv.textContent = "Error: Rating cannot be empty.";
        searchMessageDiv.style.color = "red";
        return;
    }
    const rating = +ratingString;
    if (isNaN(rating) || rating < 0 || rating > 10) {
        searchMessageDiv.textContent = "Error: Rating must be a number between 0.0 and 10.0.";
        searchMessageDiv.style.color = "red";
        return;
    }

     // save the movie to the list
   movieList.add(movieId, title, year, rating);
    searchMessageDiv.textContent = `'${title}' added successfully!`;
    searchMessageDiv.style.color = "green";

    // Clear the input fields
    formElements.title.value = "";
    formElements.year.value = "";
    formElements.movieId.value = "";
    formElements.rating.value = "";
}


function updateClick() {
  // Get the add form elements from the DOM
    let formElements = document.getElementById("form-update").elements;
  // Get the movie ID from the form
    let targetMovieId = document.getElementById("updateMovieIdInput").value.trim();
  // Get the movie title from the form
    let title = formElements["title"].value.trim();
  // Get the year from the form
    let yearString = formElements["year"].value.trim();
  // Get the Rating from the form
    let ratingString = formElements["rating"].value.trim();

    const crudMessageDiv = document.getElementById("crud-message"); // TARGET NEW DIV
    crudMessageDiv.textContent = ""; // Clear previous messages at the start
    crudMessageDiv.style.color = ""; // Reset color

    // 1. Validate Target Movie ID
    if (targetMovieId === '') {
        crudMessageDiv.textContent = "Error: Please enter a Movie ID to update.";
        crudMessageDiv.style.color = "red";
        return;
    }
    if (isNaN(+targetMovieId)) {
        crudMessageDiv.textContent = "Error: Movie ID to update must be a number.";
        crudMessageDiv.style.color = "red";
        return;
    }

    // 2. Validate New Title
    if (title === '') {
        crudMessageDiv.textContent = "Error: New Title cannot be empty.";
        crudMessageDiv.style.color = "red";
        return;
    }

    // 3. Validate New Year
    if (yearString === '') {
        crudMessageDiv.textContent = "Error: New Year cannot be empty.";
        crudMessageDiv.style.color = "red";
        return;
    }
    const year = +yearString;
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1800 || year > currentYear + 5) {
        crudMessageDiv.textContent = `Error: New Year must be a number between 1945 and ${currentYear + 5}.`;
        crudMessageDiv.style.color = "red";
        return;
    }

    // 4. Validate New Rating
    if (ratingString === '') {
        crudMessageDiv.textContent = "Error: New Rating cannot be empty.";
        crudMessageDiv.style.color = "red";
        return;
    }
    const rating = +ratingString;
    if (isNaN(rating) || rating < 0 || rating > 10) {
        crudMessageDiv.textContent = "Error: Rating must be a number between 0.0 and 10.0.";
        crudMessageDiv.style.color = "red";
        return;
    }

    // Check if the movie to update actually exists
    const movieExists = movieList.movieList.some(movie => movie.movieId === targetMovieId);
    if (!movieExists) {
        crudMessageDiv.textContent = `Error: Movie with ID '${targetMovieId}' not found for update.`;
        crudMessageDiv.style.color = "red";
        return;
    }

    // If all validations pass
    movieList.update(targetMovieId, title, year, rating);
    crudMessageDiv.textContent = `Movie with ID '${targetMovieId}' updated successfully!`;
    crudMessageDiv.style.color = "green";

    // Clear the input fields
    document.getElementById("updateMovieIdInput").value = "";
    formElements.title.value = "";
    formElements.year.value = "";
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
    document.getElementById("crud-message").textContent = `Movie with ID ${movieIdToDelete} deleted.`;
    
  } else {
    // If no movie with that ID was found, inform the user
    document.getElementById("crud-message").textContent = `Movie with ID ${movieIdToDelete} not found.`;
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
