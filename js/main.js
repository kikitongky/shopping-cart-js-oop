import { ShoppingCart } from "./shoppingCart.js";

const API_URL = "https://fakestoreapi.com/products";
const productCard = document.querySelector(".product");

const shoppingCart = new ShoppingCart(API_URL);
window.shoppingCart = shoppingCart;

async function getProducts() {
    try {
      const response = await fetch(API_URL);
      return await response.json();
    } catch (error) {
      console.log("Error Fetching Data", error);
      return [];
    }
  }

  function renderProducts(products) {
    productCard.innerHTML = products.map((product) => `
    <div class="product-card" data-product='${JSON.stringify(product)}'>
      <img class="product-img" src="${product.image}" alt="${product.title}" />
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">${shoppingCart.formatPrice(product.price)}</p>
      <button class="product-btn" data-product-id='${product.id}'>Add to cart</button>
    </div>
    `).join("");

    productCard.querySelectorAll('.product-btn[data-product-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = Number(btn.dataset.productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                shoppingCart.addToCart(product);
            }
        })
    })
  }

async function init(){
    const products = await getProducts();
    renderProducts(products);
    shoppingCart.init();
}

init();