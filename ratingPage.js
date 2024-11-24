const movies = [
    {
        title: "Minions",
        rating: 6.4,
        genre: "Action/Adventure",
        poster: "https://images-na.ssl-images-amazon.com/images/I/519ah5qcSAL._SL500_AC_SS350_.jpg"
    },
    {
        title: "Incredibles 2",
        rating: 7.7,
        genre: "Sci-Fi Action",
        poster: "https://www.bleedingcool.com/wp-content/uploads/2018/10/Incredibles_2_Beauty_Shots_BD_Static_Billboard_US_REVISED-350x350.jpg"
    },
    {
        title: "Mulan",
        rating: 7.7,
        genre: "Drama/Fantasy",
        poster: "https://tsdfrontcovers.files.wordpress.com/2014/02/mulanv1-fs.jpg"
    }
];

// Initialize Movies
function initializeMovies() {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
                <p>⭐ ${movie.rating}</p>
                <button class="btn-modal" data-title="${movie.title}" data-genre="${movie.genre}" data-rating="${movie.rating}">More Info</button>
            </div>
        `;
        movieGrid.appendChild(card);
    });

    initializeModals();
}

// Dark Mode Toggle
const toggleDarkMode = document.getElementById('toggleDarkMode');
toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});

// Load Dark Mode Preference
window.onload = () => {
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    initializeMovies();
};

// Search Functionality
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', () => {
    const searchValue = searchBar.value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.genre.toLowerCase().includes(searchValue) ||
        movie.rating.toString().includes(searchValue)
    );
    displayMovies(filteredMovies);
});

function displayMovies(filteredMovies) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';
    filteredMovies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
                <p>⭐ ${movie.rating}</p>
                <button class="btn-modal" data-title="${movie.title}" data-genre="${movie.genre}" data-rating="${movie.rating}">More Info</button>
            </div>
        `;
        movieGrid.appendChild(card);
    });
    initializeModals();
}

// Modal Handling
function initializeModals() {
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-btn');
    
    document.querySelectorAll('.btn-modal').forEach(button => {
        button.addEventListener('click', (e) => {
            document.getElementById('modalTitle').innerText = e.target.dataset.title;
            document.getElementById('modalGenre').innerText = `Genre: ${e.target.dataset.genre}`;
            document.getElementById('modalRating').innerText = `Rating: ${e.target.dataset.rating}`;
            modal.style.display = 'block';
        });
    });

    closeModalBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
