const pageSize = 10;
let currentPage = 1;
let productsContainer; // Declare productsContainer in the global scope

document.addEventListener('DOMContentLoaded', function () {
    productsContainer = document.getElementById('products');
    const searchInput = document.getElementById('search_keyword');
    const filterInput = document.querySelectorAll('.categoryCheckbox');

    fetch(`https://dummyjson.com/products/?limit=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            productsData = data.products;
            fetchProducts(productsData, productsContainer, currentPage, pageSize);

            searchInput.addEventListener('input', function () {
                const searchKeyword = searchInput.value.toLowerCase();
                const filteredProduct = filterProducts(productsData, searchKeyword);
                displayProducts(filteredProduct, productsContainer);
            });

            filterInput.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const selectedCategories = categoryProducts();
                    const filteredProduct = filterProductsByCategory(productsData, selectedCategories);
                    displayProducts(filteredProduct, productsContainer);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
        });
});


function fetchProducts(productsArray, container, currentPage, pageSize) {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = productsArray.slice(start, end);

    container.innerHTML = '';
    paginatedItems.forEach(product => {
        container.innerHTML += `
            <div class="product" id="${product.id}">
                <img class="product_img" src="${product.thumbnail}" alt="${product.title}">
                <div class="product_data">
                    <h4 class="product_title">${product.title}</h4>
                    <p class="product_price">Price: ${product.price}</p>
                    <p class="product_discount">Discount: ${product.discountPercentage}</p>
                    <p class="product_category">Category: ${product.category}</p>
                    <p class="product_stock">Stock: ${product.stock}</p>
                    <div class = "button"> 
                        <button class="view-details" onclick="openProductPage('${product.id}')">View Details</button>
                    </div> 
                </div>
            </div>
        `;
    });

    updatePaginationControls(productsArray.length, currentPage, pageSize);
}

function openProductPage(productId) {
    console.log(productId);
    window.location.href = `details.html?id=${productId}`;  
}


function filterProducts(productArray, keyword) {
    return productArray.filter(product => {
        const title = product.title.toLowerCase().includes(keyword);
        const category = product.category.toLowerCase().includes(keyword);
        return title || category;
    });
}

function filterProductsByCategory(productArray, selectedCategory) {
    return productArray.filter(product => {
        const categoryMatch = selectedCategory.includes('all') || selectedCategory.includes(product.category.toLowerCase());
        return categoryMatch;
    });
}

function displayProducts(productArray, container) {
    fetchProducts(productArray, container, currentPage, pageSize);
    updatePaginationControls(productArray.length, currentPage, pageSize);
}



function categoryProducts() {
    const selectedElements = [];
    const categoryElements = document.querySelectorAll('.categoryCheckbox:checked');

    categoryElements.forEach(checkbox => {
        selectedElements.push(checkbox.value);
    });
    return selectedElements.length > 0 ? selectedElements : ['all'];
}

function updatePaginationControls(totalItems, currentPage, pageSize) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for(let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `<button onclick="changePage(${i})">${i}</button>`;
    }
}

function changePage(page) {
    currentPage = page;
    displayProducts(productsData, productsContainer);
}
