// Load Categories

const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await res.json()
        displayCategories(data.data.news_category)
    }
    catch (error) {
        console.log(error);
    }
        
}

const displayCategories = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const {category_name, category_id} = category;
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button onclick="loadCards('${category_id}')" class="border rounded my-1 border-primary btn btn-outline-primary">${category_name}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}

// News Card

const loadCards = async (categoryId) => {
// spinner
    const spinnerContainer = document.getElementById('spinner-container')
    spinnerContainer.classList.remove('d-none');

    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
        const data = await res.json()
        displayCards(data.data)
    }
    catch (error) {
        console.log(error);
    }
}


const displayCards = (newsCards) => {

    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    const newsItems = document.getElementById('news-items-number')
    newsItems.classList.remove('d-none');

    const showItems = document.getElementById('show-items-numbers')
    showItems.innerText = newsCards.length;

    if(newsCards.length === 0){
        const spinnerContainer = document.getElementById('spinner-container')
        spinnerContainer.classList.add('d-none');
    }


// news card sort

    newsCards.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    newsCards.forEach(card => {

        const {thumbnail_url, title, details, author, total_view} = card;
        const { name, published_date, img } = author; 

        const newsCardDiv = document.createElement('div');

// spinner
        const spinnerContainer = document.getElementById('spinner-container')
        spinnerContainer.classList.add('d-none');

        newsCardDiv.innerHTML = `
        
            <div class="card mb-3" style="max-width: full;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${thumbnail_url}" class="rounded-start" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title fs-4 fw-bold">${title}</h5>
                            <p class="card-text">${details.length > 400 ? details.slice(0, 400) + "..." : details}</p>
                        </div>
                        <div class="d-lg-flex flex-lg-row flex-sm-column ms-3 mt-2 justify-content-lg-between">
                            <div class="d-flex">
                                <div>
                                    <img class="rounded-circle" width="40px" height="40px" src="${img ? img : "img not found"}" alt="">
                                </div>
                                <div class="ms-2">
                                    <h6 class="mb-0">${name ? name : "name not found"}</h6>
                                    <p>${published_date ? published_date.slice(0, 10) : "published date not found"}</p>
                                </div>
                            </div>
                            <div class="d-flex py-2">
                                <p class="fs-5"><i class="fa-solid fs-5 fa-eye"></i> ${total_view || total_view === 0 ? total_view : "view not found"}</p>
                            </div>
                            <div>
                                <button onclick="modal('${card._id}')" href="#" class="my-2 me-2 p-1 text-light border rounded border-primary bg-primary bg-gradient" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        `
        cardContainer.appendChild(newsCardDiv);

    });

}

const modal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    let data = {};
    try {
        const res = await fetch(url)
        data = await res.json()
    }
    catch (error) {
        console.log(error);
    }

    const {author, title, details, image_url, total_view} = data.data[0];

    const newsModalBody = document.getElementById('news-modal');
    newsModalBody.textContent = '';
    newsModalBody.innerHTML = `
    <img class="img-fluid" src="${image_url}" alt="">
    <h2 class="mb-3 mt-3 fs-5 fw-bold">${title ? title : "title not found"}</h2>
    <p class="mb-3">${details ? details : 'details not found'}</p>
    <div class="">                   
    <div class="d-flex flex-row">
        <div>
                <img class="rounded-circle" width="40px" height="40px" src="${author.img ? author.img : "img not found"}" alt="">
            </div>
            <div class="ms-2">
                <h6 class="mb-0">${author.name ? author.name : "name not found"}</h6>
                <p>${author.published_date ? author.published_date.slice(0, 10) : "published date not found"}</p>
            </div>
        </div>
        <div class="d-flex py-2">
            <p class="fs-5 ms-1"><i class="fa-solid fs-5 fa-eye"></i> ${total_view || total_view === 0 ? total_view : "view not found"}</p>
        </div>
    </div>

    `
}


loadCards('01');


loadCategories();