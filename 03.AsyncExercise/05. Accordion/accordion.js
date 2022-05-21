window.addEventListener('load', getId);
 
async function getId() {
 
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list'
    const res = await fetch(url);
    const data = await res.json();
 
    data.forEach(v => {
        let id = v._id;
        createArticle(id);
    })
 
    show();

}
async function createArticle(id) {
 
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`
    const res = await fetch(url);
    const data = await res.json();
 
 
    const main = document.getElementById('main')
 
    main.innerHTML = main.innerHTML +
        `   <div class="accordion">
            <div class="head">
                <span>${data.title}</span>
                <button class="button" id=${data._id}>More</button>
            </div>
            <div class="extra">
                <p>${data.content}</p>
            </div>
        </div>`
 
 
}
 
function show() {
    document.getElementById('main').addEventListener('click', onClick);
    
    
    function onClick(e) {
        
    
        const div = e.target.parentNode.parentNode.querySelector('.extra');

        if (div.style.display == 'inline'){
            div.style.display = 'none';
        } else {
            div.style.display = 'inline';
        }
 
        if (e.target.textContent === 'More') {
            
            e.target.textContent = 'Less';
        } else {
            
            e.target.textContent = 'More';
        }
 
    }
}
/*
function solution() {
    
    const mainSection = document.getElementById('main');

    async function displayArticles() {
        const titles = await fetchTitles();

        titles.forEach(async t => {
            const id = t._id; 
            const details = await fetchDetails(id);
            const title = details.title;
            const content = details.content; 
            
            const mainDiv = document.createElement('div');
            mainDiv.classList.add('accordion');
            const headDiv = document.createElement('div');
            headDiv.classList.add('head');
            const extraDiv = document.createElement('div');
            extraDiv.classList.add('extra');

            const span = document.createElement('span');
            span.textContent = title; 
            const button = document.createElement('button');
            button.textContent = 'More';
            button.classList.add('button');
            button.id = id; 
            button.addEventListener('click', showInfo);
            const par = document.createElement('p');
            par.textContent = content; 

            headDiv.appendChild(span);
            headDiv.appendChild(button);
            extraDiv.appendChild(par);
            mainDiv.appendChild(headDiv);
            mainDiv.appendChild(extraDiv);
            mainSection.appendChild(mainDiv);
        })
    }
    displayArticles();

    function showInfo() {
        const hiddenDiv = this.parentElement.parentElement.lastChild;
        
        if (this.textContent == 'More') {
            hiddenDiv.classList.remove('extra');
            this.textContent = 'Less';
        } else {
            hiddenDiv.classList.add('extra');
            this.textContent = 'More';
        }
    }

    async function fetchTitles() {
        const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
        const resp = await fetch(url);
        return resp.json();
    }

    async function fetchDetails(id) {
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const resp = await fetch(url);
        return resp.json();
    }
}
solution();
*/
 

