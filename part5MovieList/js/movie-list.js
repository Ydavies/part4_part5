// Movie list class
class MovieList {
  constructor(rootId, movies) {
    this.rootId = rootId; //  html id of where the movie list is show
    this.movieList = movies; // array of movie ti be displayed
    this.refresh();
  }

  // Methods
  // Generate one row of the movieList
  movieRow(movie) {
    // get the parent element
    const rootElement = document.getElementById(this.rootId);
    // Creating a list item
    const row = document.createElement("li");
    // Creating the text and add the class to the new list item
    row.classList.add("row");
    row.textContent = `ID: ${movie.movieId} - ${movie.title} (${movie.year}) - Rating: ${movie.rating}`;
    // Add the new element to DOM.
    rootElement.appendChild(row);
  }
  // Generate All rows of the movieList
  genMovieList() {
    // Loop through the movieList.
    for (let i = 0; i < this.movieList.length; i++) {
      let movie = this.movieList[i];
      // Call the movieRow function to generate the row.
      this.movieRow(movie);
    }
  }

  // Generate a movieList based on a search term
  genMovieSearchList(list) {
    // Loop through the list
    for (let i = 0; i < list.length; i++) {
      let movie = list[i];
      // Call the movieRow function to generate a row.
      this.movieRow(movie);
    }
  }

  // Remove all list elements from the DOM
  removeElements() {
    console.log("removeElements() called");
    // Get the parent element
    const rootElement = document.getElementById(this.rootId);
    // Get all elements with the class name of row.
    const childNodes = rootElement.getElementsByClassName("row");
        console.log("Number of child nodes to remove:", childNodes.length);

    // How many children do we have
    const len = childNodes.length - 1;
    for (let i = len; i >= 0; i--) {
      // Get the last element in the array
      const child = childNodes[i];
      // Remove that element from the DOM
      rootElement.removeChild(child);
    }
  }

  // Refresh function
  refresh() {
        console.log("refresh() random called");

    // Remove elements
    this.removeElements();
    // Generate the movie list
    this.genMovieList();
  }

  // Add function - add a new movie
  add(movieId, title, year, rating) {
    console.log("add() method called with:", movieId, title, year, rating);
    // Add a new movie to the end of the list.
    this.movieList.push({ movieId, title, year, rating });
        console.log("this.movieList after push in add():", this.movieList); // Check the array here
        this.refresh();
  }

  // Update function - update a movie
  update(index, movieId, title, year, rating) {
    if (index >= 0 && index < this.movieList.length) {
      // Update the title
      this.movieList[index].title = title;
      // Update the year
      this.movieList[index].year = year;
      // Update the movieID
      this.movieList[index].movieId = movieId;
      // Update the Rating
      this.movieList[index].rating = rating;
      // Refresh the list.
      this.refresh();
    }
  }

  // Delete function - delete a movie
  delete(index) {
    if (index >= 0 && index < this.movieList.length) {
      // Remove one movie from the array
      // Note: we should really test the index here
      // Test for out of bounds.
      this.movieList.splice(index, 1);
      // Refresh
      this.refresh();
    }
  }
  // sortA2Z - sorting the movieList in ascending order
  sortA2Z() {
    this.movieList.sort((a, b) => a.title.localeCompare(b.title));
    this.refresh();
  }

  // sortZ2a - sorting the movieList in descending order
  sortZ2A() {
    this.movieList.sort((a, b) => b.title.localeCompare(a.title));
    this.refresh();
  }

  // Search - search by partial title or ID
  search(nameString) {
    // Create an array to hold the search results;
    let shortList = [];
    const lowerNameString = nameString.toLowerCase();

    // Use a loop to check if the nameString is in any movie title.
    for (let movie of this.movieList) {
      // Check for nameString in the title
      if (
        movie.title.toLowerCase().includes(lowerNameString) ||
        movie.movieId.toLowerCase().includes(lowerNameString)
      ) {
        // if the nameString is in the movie title, add this to our shortList.
        shortList.push(movie);
      }
    }
    // Generate the list to display
    this.removeElements();
    document.getElementById("search-message").textContent = ""; // Always clear the message first
    this.genMovieSearchList(shortList);
  }

  // Search by ID
  searchById(id) {
    const result = this.movieList.find((movie) => movie.movieId === id);
    this.removeElements();
    if (result) {
      document.getElementById("search-message").textContent = "";
      this.genMovieSearchList([result]);
    } else {
      document.getElementById("search-message").textContent = "0 results";
      this.genMovieList(); // Revert to full list if no match
    }
  }

  // sort by rating (highest to lowest)
  sortByRating() {
    this.movieList.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    this.refresh();
  }
}
