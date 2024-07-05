let items = [
    { name: "Product 1", price: 10.00, quantity: 0, liked: false },
    { name: "Product 2", price: 15.00, quantity: 0, liked: false },
    { name: "Product 3", price: 20.00, quantity: 0, liked: false }
];

function updateCartUI() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '';

    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="product${index + 1}.jpg" alt="${item.name}">
            <div class="item-details">
                <h2>${item.name}</h2>
                <p>$${item.price.toFixed(2)}</p>
                <div class="item-actions">
                    <div class="quantity">
                        <button onclick="decrementQuantity(${index})">-</button>
                        <span id="quantity${index}">${item.quantity}</span>
                        <button onclick="incrementQuantity(${index})">+</button>
                    </div>
                    <div class="like-button" onclick="toggleLike(${index})">
                        <span id="like${index}" class="heart">&hearts;</span>
                    </div>
                    <button onclick="deleteItem(${index})">Delete</button>
                </div>
            </div>
        `;
        cart.appendChild(itemElement);
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function incrementQuantity(index) {
    items[index].quantity++;
    document.getElementById(`quantity${index}`).textContent = items[index].quantity;
    updateTotalPrice();
}

function decrementQuantity(index) {
    if (items[index].quantity > 0) {
        items[index].quantity--;
        document.getElementById(`quantity${index}`).textContent = items[index].quantity;
        updateTotalPrice();
    }
}

function toggleLike(index) {
    items[index].liked = !items[index].liked;
    const likeButton = document.getElementById(`like${index}`);
    likeButton.classList.toggle('active', items[index].liked);
}

function deleteItem(index) {
    items.splice(index, 1);
    updateCartUI();
}

// Initial render
updateCartUI();
