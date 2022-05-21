import { showDetails } from './details.js';
import { showView } from './dom.js';

const section = document.getElementById('edit-movie');
const form = section.querySelector('.text-center.border.border-light.p-5');
form.addEventListener('submit', submitMovie);
section.remove();

let movieId;

export function showEdit(movie) {
    showView(section);

    form.querySelector('#title').value = movie.title;
    form.getElementsByTagName('textarea')[0].value = movie.description;
    form.querySelector('#imageUrl').value = movie.img;
    movieId = movie._id;
}

async function submitMovie(event) {
    event.preventDefault();
    const formData = new FormData(form);//event.target
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!title || !description || !imageUrl) {
        alert('All fields required!');
    }
    try {
        const res = await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({ title, description, img })
        });
        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }
        form.reset();
        showDetails(movieId);
    } catch (err) {
        alert(err.message);
    }
}
