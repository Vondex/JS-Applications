import { html } from '../lib.js';
import { search } from "../api/data.js";
import { getUserData } from '../util.js';


const searchTemplate = (albums, onSearch, name) => html `       
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${name || ''}>
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <div class="search-result">
         
                ${albums.length == 0 ? 
                    html`<p class="no-result">No result.</p>` 
                    : albums.map(albumCard) }
                
            </div>
        </section>
`;



const albumCard = (album) => html `
<div class="card-box">
            <img src=${album.imgUrl}>
            <div>
                <div class="text-center">
                    <p class="name">Name: ${album.name}</p>
                    <p class="artist">Artist: ${album.artist}</p>
                    <p class="genre">Genre: ${album.genre}</p>
                    <p class="price">Price: $${album.price}</p>
                    <p class="date">Release Date: ${album.releaseDate}</p>
                </div>

                ${getUserData() ? 
                html` <div class="btn-group">
                    <a href="/details/${album._id}" id="details">Details</a>
                </div>`
                : null}
    
               
            </div>
        </div>`



export async function searchPage(ctx) {
    const name = ctx.querystring.split('=')[1];
    const albums = (name == '') ? [] : await search(name);
    
    ctx.render(searchTemplate(albums, onSearch, name));

    function onSearch() {
        
        const query = document.getElementById('search-input').value;

        if(query == ''){
            return alert('Field is required!')
        } else {
            ctx.page.redirect('/search?query=' + query)
        }
    }

}
