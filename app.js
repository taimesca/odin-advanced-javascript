class Book {
    constructor(title, author, pageCount, read) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
        this.info = function () {
            return `
                <td>${this.title}</td>
                <td>${this.author}</td>
                <td>${pageCount}</td>
                <td>${this.read ? 'Yes' : 'No'}</td>
                <td>
                    <button class="outline secondary" onclick="deleteBook(this)">Delete</button>
                    <button class="outline secondary" onclick="readBook(this)">Mark Read</button>
                </td>
            `;
        };
    }
}

let library = [];

function addBook(title, author, pageCount, read) {
    let newBook = new Book(title, author, pageCount, read);
    return library.push(newBook);
}

function updateTable() {
    for (let i = 0; i < library.length; i++) {
        if (library[i] === undefined) {
            const tableRow = document.querySelector(`tr[data-index="${i}"]`);
            if (tableRow !== null) {
                tableRow.parentElement.removeChild(tableRow);
            }
            continue;
        }

        const existingRow = document.querySelector(`tr[data-index="${i}"]`);
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-index', i);
        newRow.innerHTML = library[i].info();
        
        if(existingRow === null) {
            document.querySelector('table').appendChild(newRow);
        } else {
            existingRow.replaceWith(newRow);
        }
    }
}

const deleteBook = (el) => {
    let index = el.closest('tr').dataset.index;
    library[index] = undefined;
    updateTable();
};

const readBook = (el) => {
    let index = el.closest('tr').dataset.index;
    library[index].read = true;
    updateTable();
}

const addBookBtn = document.getElementById('add-book-button');
const addBookDlg = document.getElementById('add-book-dialog');
const addBookSubmit = document.getElementById('add-book-submit');
const addBookClose = document.getElementById('add-book-close');

addBookBtn.addEventListener('click', (ev) => {
    addBookDlg.showModal();
});

addBookClose.addEventListener('click', (ev) => {
    addBookDlg.close();
});

addBookSubmit.addEventListener('click', (ev) => {
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pageCount = document.getElementById('page-count');
    let read = document.getElementById('read');

    addBook(title.value, author.value, pageCount.value, read.checked);
    updateTable();

    title.value = '';
    author.value = '';
    pageCount.value = '';
    read.checked = false;
});

addBook("The Hobbit", "J.R.R. Tolkien", 295, false);
updateTable();

