document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const searchInput = document.getElementById('search_keyword');
    const filterInput = document.querySelectorAll('.categoryCheckbox');


    fetch('https://dummyjson.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            productsData = data.products;
            fetchProducts(productsData, productsContainer);

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

function fetchProducts(productsArray, container) {
    console.log(productsArray);
    container.innerHTML = '';
    productsArray.forEach(product => {
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
    fetchProducts(productArray, container);
}

function categoryProducts() {
    const selectedElements = [];
    const categoryElements = document.querySelectorAll('.categoryCheckbox:checked');

    categoryElements.forEach(checkbox => {
        selectedElements.push(checkbox.value);
    });
    return selectedElements.length > 0 ? selectedElements : ['all'];
}

