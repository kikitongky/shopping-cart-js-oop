export class ShoppingCart {
  constructor() {
    this.cart = [];
    this.cartElement = document.querySelector(".cart");
    this.currencyFormater = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
  }

  init() {
    this.renderCart();
  }

  addToCart(product) {
    const cartItem = this.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.renderCart();
  }

  renderCart() {
    this.cartElement.innerHTML = `
    <h2 class="cart-title">Cart</h2>
    <ul class="cart-list">
        ${this.cart.map(item => `
            <li class="cart-item">
                <h3>${item.title}</h3>
                <div class="cart-item-info">
                    <p><span>${this.formatPrice(item.price)}</span> x <span>${item.quantity} qty</span><p>
                    <button class="cart-btn-remove" data-product-id="${item.id}">x</button>
                </div>
            </li>
        `).join("")}
    </ul>
    <div class="cart-total">
        <h3>Total: ${this.formatPrice(this.getTotal())}</h3>
        <button>Checkout</button>
    </div>
    `;


    this.cartElement.querySelectorAll(".cart-btn-remove[data-product-id]").forEach(btn => {
        btn.addEventListener('click', () => this.removeFromCart(Number(btn.dataset.productId)));
    })
  }

  removeFromCart(productId) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index !== -1){
        if (this.cart[index].quantity > 1 ) {
            this.cart[index].quantity--;
        } else {
            this.cart.splice(index, 1);
        }
        this.renderCart();
    }
  }

  getTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity, 0);
  }

  formatPrice(price){
    return this.currencyFormater.format(price);
  }
 
}

