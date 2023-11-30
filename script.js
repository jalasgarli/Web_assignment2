document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const searchInput = document.getElementById('search_keyword');
    console.log(search);
    fetch('https://dummyjson.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const product_array = data.products;
            fetchProducts(product_array, productsContainer);


            searchInput.addEventListener('input', function () {
                const searchKeword = searchInput.value.toLowerCase();
                const filteredProducts =  filterProducts(product_array, searchKeword);
                displayProducts(filteredProducts, productsContainer);
                console.log(searchKeword);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
    });

    
});

function fetchProducts(productsArray, container) {
    console.log(productsArray);
    container.innerHTML = ``;
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
                </div>
            </div>
  
        `;
    });
}

function filterProducts(productArray, keyword) {
    return productArray.filter(product => {
        const title = product.title.toLowerCase().includes(keyword);
        const category = product.category.toLowerCase().includes(keyword);
        /// about desc;

        return title || category;
    })
}

function displayProducts(productArray, container) {
    fetchProducts(productArray, container)
}