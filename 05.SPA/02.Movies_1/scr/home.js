import { showView, e } from './dom.js';
import { showCreate } from './create.js';
import { showDetails } from './details.js';

let moviesCash = null;
let lastLoaded = null;
const maxAge = 5000;

const section = document.getElementById('home-page');
const addSection = section.querySelector('#add-movie-button');
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center');
section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();
});
catalog.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
});
section.remove();

export function showHome() {
    showView(section);
    getMovies();
}


async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading ...'));
    const now = Date.now();
    if (moviesCash == null || (now - lastLoaded) > maxAge) {
        lastLoaded = now;
        const res = await fetch('http://localhost:3030/data/movies');
        const data = await res.json();
        moviesCash = data;
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData == null) {
        addSection.style.display = 'none';
    } else {
        addSection.style.display = 'block';
    }
    catalog.replaceChildren(...moviesCash.map(createMovieCard));
}

function createMovieCard(movie) {
    const elem = e('div', { className: 'card mb-4' });
    elem.innerHTML = `
<img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
<div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
    <a data-id="${movie._id}" href="#">
        <button type="button" class="btn btn-info">Details</button>
    </a>
</div>`;
    return elem;
}

