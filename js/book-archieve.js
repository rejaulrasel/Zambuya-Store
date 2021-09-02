//load book data from the api
const loadBookData = () => {
    const searchText = document.getElementById('input-field').value;
    document.getElementById('input-field').value = '';
    document.getElementById('spinner').classList.remove('d-none');

    //when user dont give any input
    if (searchText === '') {
        document.getElementById('spinner').classList.add('d-none');
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        searchResult.innerHTML = `
        <h1 class="bg-warning w-75 mx-auto rounded-3 text-center p-2">Please, enter a book name</h1>
        `
    }

    //when user give input
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            // console.log(url)
            .then(res => res.json())
            .then(data => displayBookData(data))
    }

}

const displayBookData = data => {
    const booksInfo = data.docs.slice(0, 40);
    document.getElementById('spinner').classList.add('d-none');
    const searchResult = document.getElementById('search-result');
    document.getElementById('result-found').innerText = `Books Found: ${data.numFound}`;
    searchResult.textContent = '';

    //if there is no book in the search item
    if (booksInfo.length === 0) {
        searchResult.innerHTML = `
        
       <h1 class="bg-warning w-75 mx-auto rounded-3 text-center p-2">Soory, No search results found!!</h1>

        `
    }
    else {

        booksInfo.forEach(bookInfo => {
            // console.log(bookInfo)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card shadow">
                <div class="d-flex justify-content-center mt-3">
                <img src="https://covers.openlibrary.org/b/id/${bookInfo.cover_i}-M.jpg" height=200px class="w-75" alt="Book image">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center mb-3">${bookInfo.title ? bookInfo.title : ''}</h5>
                    <p class="text-center"><b>First Publish Year:</b>${bookInfo.first_publish_year ? bookInfo.first_publish_year : 'Not Found'}</p>
                    <p class="card-text text-center"><b>Author:</b>${bookInfo.author_name[0] ? bookInfo.author_name[0] : 'Not Found'}</p>
                    <p class="card-text text-center"><b>Publisher:</b>${bookInfo.publisher[0] ? bookInfo.publisher[0] : 'Not Found'}</p>
                </div>
            </div>
        `
        searchResult.appendChild(div);


        })
    }
}