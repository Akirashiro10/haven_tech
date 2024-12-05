// Add event listener for the search input
document.querySelector('.search-bar').addEventListener('input', function (event) {
  const searchTerm = event.target.value.toLowerCase(); // Get search term, convert to lowercase for case-insensitive matching
  const products = document.querySelectorAll('.product'); // Select all product divs

  // Loop through each product
  products.forEach(function (product) {
    const productName = product.getAttribute('data-name').toLowerCase(); // Get product name, also to lowercase
    if (productName.includes(searchTerm)) {
      product.style.display = 'block'; // Show the product if it matches
    } else {
      product.style.display = 'none'; // Hide the product if it doesn't match
    }
  });
});

// Global cart array to hold products added to the cart
let cart = [];

// Function to get the price of a product by name
function getProductPrice(productName) {
  const productElement = [...document.querySelectorAll('.product')].find(
    (product) => product.getAttribute('data-name') === productName
  );
  if (productElement) {
    const priceText = productElement.querySelector('p').textContent;
    return parseFloat(priceText.replace('Price: $', '').trim());
  }
  return 0; // Default to 0 if the product is not found
}

// Function to add products to the cart
function addToCart(productName) {
  // Check if the product is already in the cart
  let existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    // If the product is already in the cart, increase its quantity
    existingProduct.quantity += 1;
  } else {
    // If the product is not in the cart, add it as a new entry
    const price = getProductPrice(productName);
    cart.push({ name: productName, quantity: 1, price });
  }

  // Update the cart button display
  updateCartDisplay();
  // Update the cart sidebar display
  updateCartSidebar();
}

// Function to update the cart button display (e.g., the number of items in the cart)
function updateCartDisplay() {
  const cartBtn = document.getElementById('cartBtn');
  cartBtn.textContent = `🛒 (${cart.length})`; // Update cart icon with number of items
}

// Function to update the cart sidebar with added items
function updateCartSidebar() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');
  cartItemsDiv.innerHTML = ''; // Clear existing cart items

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartSummary.textContent = '';
  } else {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
      const productDiv = document.createElement('div');
      productDiv.classList.add('cart-item');
      productDiv.innerHTML = `
        <p>${item.name} (x${item.quantity})</p>
        <p>Price: $${(item.quantity * item.price).toFixed(2)}</p>
      `;
      cartItemsDiv.appendChild(productDiv);
    });
    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Function to handle checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items to the cart before checking out.');
    return;
  }

  // Generate a checkout summary
  let checkoutSummary = 'Thank you for your purchase!\n\nItems:\n';
  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;
    checkoutSummary += `${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}\n`;
  });
  checkoutSummary += `\nTotal: $${total.toFixed(2)}`;

  // Show the summary in an alert or modal
  alert(checkoutSummary);

  // Clear the cart
  cart = [];
  updateCartDisplay();
  updateCartSidebar();
}

// Attach event listener to the "Checkout" button
document.querySelector('.checkout-btn').addEventListener('click', checkout);
