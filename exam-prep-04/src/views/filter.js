import { html } from '../lib.js';
import { search } from "../api/data.js";


const searchTemplate = (cars, onSearch, year) => html `       
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value="${year||''}">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
        ${cars.length==0 ? html`<p class="no-cars"> No results.</p>` : cars.map(carCard) }
        
    </div>
</section>`;



const carCard = ({ imageUrl, brand, model, year, price, _id }) => html `
<div class="listing">
    <div class="preview">
        <img src="${imageUrl}">
    </div>
    <h2>${brand} ${model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${year}</h3>
            <h3>Price: ${price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="${'/details'+_id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`



export async function searchPage(ctx) {
    const year = Number(ctx.querystring.split('=')[1]);
    const cars = Number.isNaN(year) ? [] : await search(year);
    ctx.render(searchTemplate(cars, onSearch, year));

    function onSearch() {
        const query = document.getElementById('search-input').value;

        if(Number.isNaN(query)==false){
            ctx.page.redirect('/search?query=' + query)
        } else {
            return alert('Year must be positive number!')
        }
    }
}