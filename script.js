// List of movies for search simulation
const movies = [
    { title: "Incredibles 2", link: "Incredibles2.html", image: "https://www.bleedingcool.com/wp-content/uploads/2018/10/Incredibles_2_Beauty_Shots_BD_Static_Billboard_US_REVISED-350x350.jpg" },
    { title: "Minions", link: "Minions1.html", image: "https://images-na.ssl-images-amazon.com/images/I/519ah5qcSAL._SL500_AC_SS350_.jpg" },
    { title: "Mulan", link: "Mulan.html", image: "https://tsdfrontcovers.files.wordpress.com/2014/02/mulanv1-fs.jpg" },
    { title: "Finding Dory", link: "Findingdory.html", image: "https://i.pinimg.com/originals/21/67/c8/2167c8b1301370e61ebdc006bced7cb5.jpg" }
  ];
  
  // Search function
  function searchMovie() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const resultContainer = document.getElementById("searchResults");
    resultContainer.innerHTML = ""; // Clear previous results
  
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchInput));
  
    if (filteredMovies.length > 0) {
      filteredMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
  
        const movieImage = document.createElement("img");
        movieImage.src = movie.image;
        movieImage.alt = movie.title;
        movieImage.className = "movie-image";
  
        const availabilityText = document.createElement("p");
        availabilityText.textContent = "Available";
        availabilityText.className = "availability-text";
  
        movieCard.appendChild(movieImage);
        movieCard.appendChild(availabilityText);
        resultContainer.appendChild(movieCard);
      });
    } else {
      resultContainer.innerHTML = "<p>No movies found. Try another search.</p>";
    }
  }
