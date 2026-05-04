let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-container");

//Product data
const products = [
  { name: "Casual Shirt", price: 499, image: "images/shirt.jpg" },
  { name: "Shoes", price: 999, image: "images/shoes.jpg" },
  { name: "Watch", price: 799, image: "images/watch.jpg" },
  { name: "skirt", price: 799, image: "images/skirt.jpg" },
  { name: "Western", price: 799, image: "images/western.jpg" }
 ];

// Show products
function showProducts(list) {
  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

// Add to cart (with quantity)
function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Display cart
function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "Cart is empty";
    document.getElementById("total-price").innerText = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    total += item.price * item.quantity;

    div.innerHTML = `
      ${item.name} - ₹${item.price} x ${item.quantity}
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  document.getElementById("total-price").innerText = "Total: ₹" + total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Search
document.getElementById("search").addEventListener("input", function(e) {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  showProducts(filtered);
});

// Price filter
document.getElementById("priceFilter").addEventListener("change", function(e) {
  let value = e.target.value;

  let filtered = value === "all"
    ? products
    : products.filter(p => p.price <= value);

  showProducts(filtered);
});

// Initial load
showProducts(products);
displayCart();