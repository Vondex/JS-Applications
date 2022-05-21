import { logout } from './api/api.js';
import { page, render } from './lib.js'
import { getUserData } from './util.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/filter.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/login', loginPage);
page('/register', registerPage);
page('/', homePage);
page('/cars', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);
page('/my-cars', profilePage);
page('/filter', searchPage)


updateUserNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout(){
    logout();
    updateUserNav();  
    page.redirect('/')  
}

function updateUserNav(){
    const userData = getUserData();
    if (userData){

        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`;
        
    } else {

        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
