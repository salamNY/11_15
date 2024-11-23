// movies array
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

// dark mode
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
}

// Search functionality
function initializeSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="movieSearch" placeholder="Search movies...">
    `;
    document.querySelector('.hero').appendChild(searchContainer);

    document.getElementById('movieSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const movieCards = document.querySelectorAll('.movie-card');
        
        movieCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// rating funtion
function initializeRating() {
    document.querySelectorAll('.movie-card').forEach(card => {
        const ratingContainer = createRatingContainer();
        card.querySelector('.movie-info').appendChild(ratingContainer);
    });
         document.addEventListener('click', handleStarClick);
}

function createRatingContainer() {
    const container = document.createElement('div');
    container.className = 'rating-container';
    const starsHtml = '⭐'.repeat(5);
    
    container.innerHTML = `
        <div class="stars">
            <span class="star" data-rating="1">${starsHtml[0]}</span>
            <span class="star" data-rating="2">${starsHtml[1]}</span>
            <span class="star" data-rating="3">${starsHtml[2]}</span>
            <span class="star" data-rating="4">${starsHtml[3]}</span>
            <span class="star" data-rating="5">${starsHtml[4]}</span>
        </div>
        <span class="rating-count">0 ratings</span>
    `;
    
    return container;
}

function handleStarClick(event) {
    if (!event.target.classList.contains('star')) return;
    
    const container = event.target.closest('.rating-container');
    const rating = parseInt(event.target.dataset.rating);

    container.querySelectorAll('.star').forEach((star, index) => {
        star.style.opacity = index < rating ? '1' : '0.3';
    });
    
    const countSpan = container.querySelector('.rating-count');
    const currentCount = parseInt(countSpan.textContent);
    countSpan.textContent = `${currentCount + 1} ratings`;
}

// Movie details modal
function initializeModals() {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal';
    modalContainer.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2></h2>
            <img src="" alt="Movie Poster">
            <p class="movie-details"></p>
        </div>
    `;
    document.body.appendChild(modalContainer);

    document.querySelectorAll('.movie-card').forEach(card => {
        const viewButton = document.createElement('button');
        viewButton.className = 'btn view-details';
        viewButton.textContent = 'Quick View';
        card.querySelector('.movie-info').appendChild(viewButton);
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const card = e.target.closest('.movie-card');
            const title = card.querySelector('h3').textContent;
            const movie = movies.find(m => m.title === title);
            
            const modal = document.querySelector('.modal');
            modal.querySelector('h2').textContent = movie.title;
            modal.querySelector('img').src = movie.poster;
            modal.querySelector('.movie-details').textContent = 
                `Genre: ${movie.genre}\nRating: ${movie.rating}/10`;
            
            modal.style.display = 'block';
        }
        
        if (e.target.classList.contains('close-modal')) {
            document.querySelector('.modal').style.display = 'none';
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeSearch();
    initializeRating();
    initializeModals();
});
