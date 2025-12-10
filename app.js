const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
    {
        id: 1, 
        title: "IMUA Signature Hat",
        price: 20,
        description: "A sleek black essential built for speed and style. Lightweight, comfortable, and bold, made to move with you, on and off the run.",
        colors: [
            {
                code: "black",
                img: "./images/hat.png",
            },
        ],
        sizes: ["One Size"],
    },
    {
        id: 2, 
        title: "Beanies",
        price: 20,
        description: "Stay warm in style with our cozy IMUA beanie. Perfect for cold weather, training, or casual wear.",
        colors: [
            {
                code: "black",
                img: "./images/beanie.png",
            },
        ],
        sizes: ["One Size"],
    },
    {
        id: 3, 
        title: "Shirts",
        price: 25,
        description: "This lightweight, breathable tee comes in Black, White and Wine Red. Designed to move with you and keep you locked in from training to those pre race nerves. ",
        colors: [
            {
                code: "black",
                img: "./images/shirt.png",
            },
            {
                code: "white",
                img: "./images/whiteshirt.png",
            },
            {
                code: "#8b0000",
                img: "./images/redshirt.png",
            },
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    },
    {
        id: 4, 
        title: "Hoodies",
        price: 35,
        description: "Streetwear attitude meets runner's edge. Soft, durable, and clean in all the right ways. Wear it warm post run, or all day.",
        colors: [
            {
                code: "black",
                img: "./images/hoodie.png",
            },
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    },
    {
        id: 5, 
        title: "Pants",
        price: 30,
        description: "Black pants to match with everything. Train, warm up, or simply stay warm with our Imua signature pants.",
        colors: [
            {
                code: "black",
                img: "./images/pants.png",
            },
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    },
];

let choosenProduct = products[0];
let selectedSize = null;
let selectedColor = null;

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;
   
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
const currentProductDescription = document.querySelector(".productDescription");
const cartCountElement = document.querySelector(".cart-count");
const cartIconContainer = document.querySelector(".cart-icon-container");

// Initialize cart on page load
if (cartCount > 0) {
    cartCountElement.textContent = cartCount;
    cartIconContainer.classList.add("has-items");
}

// Landing page and runner transition
const landingPage = document.querySelector(".landingPage");
const enterButton = document.querySelector(".enterButton");
const runnerTransition = document.querySelector(".runnerTransition");
const productSection = document.querySelector(".product");

// Check if coming from product link
window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
    
    if (hash.startsWith("#product-")) {
        const productIndex = parseInt(hash.replace("#product-", ""));
        
        landingPage.style.display = "none";
        runnerTransition.style.display = "none";
        document.body.classList.add("loaded");
        
        wrapper.style.transition = "none";
        wrapper.style.transform = `translateX(${-100 * productIndex}vw)`;
        
        setTimeout(() => {
            wrapper.style.transition = "all .5s ease-in-out";
        }, 50);
        
        choosenProduct = products[productIndex];
        
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        currentProductDescription.textContent = choosenProduct.description;

        currentProductColors.forEach((color, colorIndex) => {
            if (choosenProduct.colors[colorIndex]) {
                color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
                color.style.display = "block";
            } else {
                color.style.display = "none";
            }
        });
        
        currentProductSizes.forEach((size, sizeIndex) => {
            if (choosenProduct.sizes[sizeIndex]) {
                size.textContent = choosenProduct.sizes[sizeIndex];
                size.style.display = "block";
            } else {
                size.style.display = "none";
            }
        });
        
        setTimeout(() => {
            productSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }
});

enterButton.addEventListener("click", () => {
    landingPage.classList.add("hidden");
    
    setTimeout(() => {
        landingPage.style.display = "none";
        runnerTransition.classList.add("active");
    }, 800);
    
    setTimeout(() => {
        runnerTransition.style.display = "none";
        document.body.classList.add("loaded");
    }, 2500);
});

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        document.body.classList.add("loaded");
        
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
        
        choosenProduct = products[index];
        
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        currentProductDescription.textContent = choosenProduct.description;
        selectedColor = choosenProduct.colors[0].img;

        currentProductColors.forEach((color, colorIndex) => {
            if (choosenProduct.colors[colorIndex]) {
                color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
                color.style.display = "block";
            } else {
                color.style.display = "none";
            }
        });
        
        currentProductSizes.forEach((size, sizeIndex) => {
            if (choosenProduct.sizes[sizeIndex]) {
                size.textContent = choosenProduct.sizes[sizeIndex];
                size.style.display = "block";
            } else {
                size.style.display = "none";
            }
        });
        
        selectedSize = null;
        selectedColor = choosenProduct.colors[0].img;
    });
});

const navLogo = document.querySelector(".navTop .navItem img");

navLogo.addEventListener("click", () => {
    window.location.href = "index.html";
});

currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        if (choosenProduct.colors[index]) {
            currentProductImg.src = choosenProduct.colors[index].img;
            selectedColor = choosenProduct.colors[index].img;
        }
    });
});

currentProductColors.forEach((color, colorIndex) => {
    if (choosenProduct.colors[colorIndex]) {
        color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
        color.style.display = "block";
    } else {
        color.style.display = "none";
    }
});

currentProductSizes.forEach((size, sizeIndex) => {
    if (choosenProduct.sizes[sizeIndex]) {
        size.textContent = choosenProduct.sizes[sizeIndex];
        size.style.display = "block";
    } else {
        size.style.display = "none";
    }
});

const buyButtons = document.querySelectorAll(".buyButton");

buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        productSection.scrollIntoView({ behavior: "smooth" });
    });
});

currentProductSizes.forEach((size) => {
    size.addEventListener("click", () => {
        if (size.style.backgroundColor === "white") {
            size.style.backgroundColor = "black";
            size.style.color = "white";
            selectedSize = null;
        } else {
            currentProductSizes.forEach((s) => {
                s.style.backgroundColor = "black";
                s.style.color = "white";
            });
            size.style.backgroundColor = "white";
            size.style.color = "black";
            selectedSize = size.textContent;
        }
    });
});

const addToCartButton = document.querySelector(".addToCartButton");
const cartTrackAnimation = document.querySelector(".cart-track-animation");

addToCartButton.addEventListener("click", () => {
    if (!selectedSize) {
        alert("Please select a size!");
        return;
    }
    
    const cartItem = {
        id: Date.now(),
        product: choosenProduct.title,
        price: choosenProduct.price,
        size: selectedSize,
        color: selectedColor,
        image: currentProductImg.src
    };
    
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    cartCount = cart.length;
    cartCountElement.textContent = cartCount;
    
    cartIconContainer.classList.add("has-items");
    
    cartTrackAnimation.classList.add("active");
    
    setTimeout(() => {
        cartTrackAnimation.classList.remove("active");
    }, 2000);
});

const footerProducts = document.querySelectorAll(".footerLeft .footerMenu:last-child .fList .fListItem");

footerProducts.forEach((link, index) => {
    link.addEventListener("click", () => {
        window.location.href = `index.html#product-${index}`;
    });
});

// Cart Side Panel
cartIconContainer.addEventListener("click", () => {
    document.getElementById('cartPanel').classList.add('active');
    renderCart();
});

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        total += item.price;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.product}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.product}</h4>
                <p class="cart-item-size">Size: ${item.size}</p>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <button class="cart-item-delete" data-id="${item.id}">✕</button>
        `;
        
        cartItemsContainer.appendChild(cartItemDiv);
    });
    
    cartTotal.textContent = `$${total}`;
    
    document.querySelectorAll('.cart-item-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCount = cart.length;
            cartCountElement.textContent = cartCount;
            
            if (cartCount === 0) {
                cartIconContainer.classList.remove("has-items");
            }
            
            renderCart();
        });
    });
}