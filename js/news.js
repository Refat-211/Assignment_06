const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category));
}

const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button onclick="newsCategory(${category.category_id})" class="text-light border rounded my-1 border-primary bg-primary bg-gradient" href="">${category.category_name}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
}

loadCategories();