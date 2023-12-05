document.addEventListener("DOMContentLoaded", function () {
    const url = new URLSearchParams(window.location.search);
    const Id = url.get("id");
    
    if (Id) {
        fetchProductInfo(Id);
    } else {
        console.error("ID is not found");
    }
});

async function fetchProductInfo(Id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${Id}`);
        const product = await response.json();
        ProductDetails(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

function ProductDetails(product) {
    const container = document.getElementById("gallery");
    container.innerHTML = '';
    product.images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        container.appendChild(img);
    });

    const detailContainer = document.getElementById("details");
    
    const productDetails = `<div class="product_info">
            <div class="product_data">
                <h4 class="product_title">${product.title}</h4>
                <p>Description: ${product.description}</>
                <p class="product_price">Price: ${product.price}$</p>
                <p class="product_discount">Discount: ${product.discountPercentage}</p>
                <p class="product_category">Category: ${product.category}</p>
                <p class="product_stock">Stock: ${product.stock}</p>
            </div>
            <button onclick="Back()">Go Back</button>
        </div>
    `;
    detailContainer.innerHTML = productDetails;
}

function Back() {
    window.history.back();
}
