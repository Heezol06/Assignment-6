const inputField = document.getElementById("input-field");
const searchBtn = document.getElementById("search-btn");
const errorText = document.getElementById("error-handle");
const bookDisplay = document.getElementById('book-display');
const totalResult = document.getElementById("total-result");


// add Event Listener and data load
searchBtn.addEventListener('click', function () {
    bookDisplay.textContent = '';
    errorText.textContent = '';
    totalResult.textContent = '';
    toggleSpinner('show');
    if (inputField.value === '') {
        errorText.innerText = "Search can't bt empty.";
        toggleSpinner('hide');
        return
    }
    const url = `https://openlibrary.org/search.json?q=${inputField.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))

    inputField.value = '';
})
// spinner function
const toggleSpinner = (spin) => {
    const spiner = document.getElementById('spinner');
    if (spin === 'show') {
        spiner.style.display = 'block';
    }
    if (spin === 'hide') {
        spiner.style.display = 'none';
    }
}
// total result 
// const totalResult = (result) =>{
//     const resultContainer = document.getElementById('total-result')
// }
// display search result function 
const displayBooks = (books) => {
    toggleSpinner('hide');
    // console.log(books)
    if (books.docs.length === 0) {
        errorText.innerText = "No Results Found"
    } else {
        errorText.innerText = "";
    }
    books.docs.forEach((book) => {
        console.log(books.docs.length)
        totalResult.innerHTML = `<h3 id="result" class="pb-3">Showing: ${books.numFound} of <span>${books.docs.length}</span></h3>`
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="container h-100 d-flex" >
        <div>
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" 
        </div>
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Author of this book:<br><strong>${book.author_name}</strong></p>
            <p class="card-text">Publisher of this book:<br><strong>${book.publisher}</strong></p>
            <p class="card-text">Publishing date of this book:<br><strong>${book.first_publish_year}</strong></p>
        </div>
    </div>
    `


        bookDisplay.appendChild(div);
    })

}