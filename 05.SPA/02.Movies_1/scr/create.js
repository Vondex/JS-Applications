import { showView } from './dom.js';
import { showHome } from './home.js';

const section = document.getElementById('add-movie');
const form = section.querySelector('.text-center.border.border-light.p-5');
form.addEventListener('submit', submitMovie);
section.remove();

export function showCreate() {
    showView(section);
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
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
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
        showHome();
    } catch (err) {
        alert(err.message);
    }
}
