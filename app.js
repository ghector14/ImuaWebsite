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
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
   
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
        
        // Instantly hide landing and transition (no animation)
        landingPage.style.display = "none";
        runnerTransition.style.display = "none";
        document.body.classList.add("loaded");
        
        // Set wrapper position instantly (no transition)
        wrapper.style.transition = "none";
        wrapper.style.transform = `translateX(${-100 * productIndex}vw)`;
        
        // Restore transition after positioning
        setTimeout(() => {
            wrapper.style.transition = "all .5s ease-in-out";
        }, 50);
        
        // Change to the selected product
        choosenProduct = products[productIndex];
        
        // Update product details
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        currentProductDescription.textContent = choosenProduct.description;

        // Handle colors
        currentProductColors.forEach((color, colorIndex) => {
            if (choosenProduct.colors[colorIndex]) {
                color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
                color.style.display = "block";
            } else {
                color.style.display = "none";
            }
        });
        
        // Handle sizes
        currentProductSizes.forEach((size, sizeIndex) => {
            if (choosenProduct.sizes[sizeIndex]) {
                size.textContent = choosenProduct.sizes[sizeIndex];
                size.style.display = "block";
            } else {
                size.style.display = "none";
            }
        });
        
        // Scroll to product smoothly
        setTimeout(() => {
            productSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }
});

enterButton.addEventListener("click", () => {
    // Hide landing page
    landingPage.classList.add("hidden");
    
    // Show runner animation
    setTimeout(() => {
        landingPage.style.display = "none";
        runnerTransition.classList.add("active");
    }, 800);
    
    // Hide track transition and show main site
    setTimeout(() => {
        runnerTransition.style.display = "none";
        document.body.classList.add("loaded");
    }, 2500);
});

// When clicking any menu item, show main site
menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        // Show main content
        document.body.classList.add("loaded");
        
        // Change the current slide
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
        
        // Change the chosen product
        choosenProduct = products[index];
        
        // Update product details
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        currentProductDescription.textContent = choosenProduct.description;

        // Handle colors
        currentProductColors.forEach((color, colorIndex) => {
            if (choosenProduct.colors[colorIndex]) {
                color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
                color.style.display = "block";
            } else {
                color.style.display = "none";
            }
        });
        
        // Handle sizes
        currentProductSizes.forEach((size, sizeIndex) => {
            if (choosenProduct.sizes[sizeIndex]) {
                size.textContent = choosenProduct.sizes[sizeIndex];
                size.style.display = "block";
            } else {
                size.style.display = "none";
            }
        });
    });
});

// Logo click to return to landing page
const navLogo = document.querySelector(".navTop .navItem img");

navLogo.addEventListener("click", () => {
    // Hide main content
    document.body.classList.remove("loaded");
    
    // Show landing page again
    landingPage.classList.remove("hidden");
    landingPage.style.display = "flex";
});

// Color dot clicks - changes the product image
currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        if (choosenProduct.colors[index]) {
            currentProductImg.src = choosenProduct.colors[index].img;
        }
    });
});

// Initialize the first product on page load
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

// Shop Now button scroll
const buyButtons = document.querySelectorAll(".buyButton");

buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        productSection.scrollIntoView({ behavior: "smooth" });
    });
});

// Size button toggle
currentProductSizes.forEach((size) => {
    size.addEventListener("click", () => {
        if (size.style.backgroundColor === "white") {
            size.style.backgroundColor = "black";
            size.style.color = "white";
        } else {
            currentProductSizes.forEach((s) => {
                s.style.backgroundColor = "black";
                s.style.color = "white";
            });
            size.style.backgroundColor = "white";
            size.style.color = "black";
        }
    });
});

// Add to Cart functionality with 3D track animation
const addToCartButton = document.querySelector(".addToCartButton");
const cartTrackAnimation = document.querySelector(".cart-track-animation");

addToCartButton.addEventListener("click", () => {
    // Increment cart count
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Save to localStorage
    localStorage.setItem('cartCount', cartCount);
    
    // Add spinning track to cart icon
    cartIconContainer.classList.add("has-items");
    
    // Show 3D track animation
    cartTrackAnimation.classList.add("active");
    
    // Hide animation after 2 seconds
    setTimeout(() => {
        cartTrackAnimation.classList.remove("active");
    }, 2000);
});

// Footer product links
const footerProducts = document.querySelectorAll(".footerLeft .footerMenu:last-child .fList .fListItem");

footerProducts.forEach((link, index) => {
    link.addEventListener("click", () => {
        // Show main content
        document.body.classList.add("loaded");
        
        // Scroll to product section
        productSection.scrollIntoView({ behavior: "smooth" });
        
        // Change the current slide
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
        
        // Change the chosen product
        choosenProduct = products[index];
        
        // Update product details
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        currentProductDescription.textContent = choosenProduct.description;

        // Handle colors
        currentProductColors.forEach((color, colorIndex) => {
            if (choosenProduct.colors[colorIndex]) {
                color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
                color.style.display = "block";
            } else {
                color.style.display = "none";
            }
        });
        
        // Handle sizes
        currentProductSizes.forEach((size, sizeIndex) => {
            if (choosenProduct.sizes[sizeIndex]) {
                size.textContent = choosenProduct.sizes[sizeIndex];
                size.style.display = "block";
            } else {
                size.style.display = "none";
            }
        });
    });
});