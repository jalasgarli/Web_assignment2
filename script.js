document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    
    fetch('https://dummyjson.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            fetchProducts(data, productsContainer);
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
        });
});

function fetchProducts(productsData, container) {
    const productsArray = productsData.products;

    productsArray.forEach(product => {
        container.innerHTML += `
            <div class="product">
                <h3 class="product_title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product_discount">${product.discount}</p>
                <p class="product_category">${product.category}</p>
                <p class="product_stock">${product.stock}</p>
                <img class="product_img" src="${product.thumbnail}" alt="${product.title}">
            </div>
        `;
    });
}
