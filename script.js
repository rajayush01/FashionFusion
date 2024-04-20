const sections = document.querySelectorAll('.section');
const productContainer = document.querySelector('.product-container');
let activeSection = document.querySelector('.section.active');

sections.forEach(section => {
  section.addEventListener('click', () => {
    if (activeSection !== section) {
      activeSection.classList.remove('active');
      section.classList.add('active');
      activeSection = section;
      displayProducts(section.dataset.text.toLowerCase());
    }
  });
});

function displayProducts(category) {
  productContainer.innerHTML = '';
  fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
      const categoryProducts = data.categories.find(cat => cat.category_name.toLowerCase() === category).category_products;
      categoryProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        const discount = Math.round(100 - (product.price / product.compare_at_price * 100));
        productCard.innerHTML = `
        <div class="badge">${product.badge_text !== null ? product.badge_text : ''}</div>          
        <img src="${product.image}" alt="Product Image" class="product-image">
          <div class="product-info">
            
            <div class="first">
            <h2 class="product-title">${product.title}</h2>
            <p class="vendor-name"><span class="bullet">&#x2022</span> ${product.vendor}</p>
            </div>
            <div class="second">
            <p class="price">Rs ${product.price}.00</p>
            <p class="compare-at-price">Rs ${product.compare_at_price}.00</p> <span class="discount">${discount}% OFF</span>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
          </div>
        `;
        productContainer.appendChild(productCard);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

displayProducts(activeSection.dataset.text.toLowerCase());
