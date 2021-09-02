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

// display search result function 
const displayBooks = (books) => {
    toggleSpinner('hide');
    console.log(books)
    if (books.docs.length === 0) {
        errorText.innerText = "No Results Found"
    } else {
        errorText.innerText = "";
    }
    books.docs.forEach((book) => {
        const authorName = book?.author_name ? book.author_name.join(' , ') : 'unknown';
        const publishedIn = book?.first_publish_year
            ? book.first_publish_year
            : 'unknown';
        const publisher = book?.publisher ? book.publisher.join(' , ') : 'unknown';

        const imgUrl = book?.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : './images/NoImageFoun.png';
        // console.log(books.docs.length)
        totalResult.innerHTML = `<h3 id="result" class="pb-3">Showing: ${books.docs.length} of <span>${books.numFound}</span></h3>`
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100"  >
          <img src="${imgUrl}" class="card-img-top" height="400px" alt="...">
         <div class="card-body">
         <h5 class="card-title">${book.title}</h5>
         <p class="car d-text">Autor: <span class="text-small">${authorName}</span></p>
         <p>Published in <span>${publishedIn}</span></p>
         <p class="fw-bold>Publisher: <span>${publisher}</span></p>
         </div>
        </div>
          `;


        bookDisplay.appendChild(div);
    })

}