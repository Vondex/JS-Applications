const tbody = document.querySelector('tbody')
const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm')
document.getElementById('loadBooks').addEventListener('click', loadBooks.bind(null, 1, 2, 3));
createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSubmit);
tbody.addEventListener('click', onTableClick);


loadBooks();

async function onEditSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await updateBook(id, { author, title });

    e.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}

function onTableClick(e){
    if (e.target.className == 'delete'){
        onDelete(e.target);
    } else if(e.target.className == 'edit'){
        onEdit(e.target);
    }
}

async function onEdit(button){
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
    
}

async function onDelete(button){
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}


async function onCreate(e){
    e.preventDefault();
    const formData = new FormData(e.target);

    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBook({ author, title });
    tbody.appendChild(createRow(result._id, result))
    e.target.reset();
}

async function loadBooks(p1, p2, p3, event){

    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

async function loadBookById(id){
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}



function createRow(id, book){
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>`;
    return row;
}


async function createBook(book){
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });
    return result;
}


async function updateBook(id, book){

    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });
    return result;
}



async function deleteBook(id){
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',    
    });
    return result;
}



async function request(url, options){
    if (options && options.body != undefined){
       Object.assign(options, {
        headers: {
            'Content-Type': 'application/json'
        },
       });
    }
    const res = await fetch(url, options)

    if(res.ok != true){
        const error = await res.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await res.json();
    return data;
}