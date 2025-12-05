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

let choosenProduct = products[0]
   
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
const currentProductDescription = document.querySelector(".productDescription");



menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        //change the current slide
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        //change the choosen product
        choosenProduct = products[index]

        //change text of currentProduct
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        currentProductDescription.textContent = choosenProduct.description;

        //handle colors
        currentProductColors.forEach((color,colorIndex) => {
            if (choosenProduct.colors[colorIndex]) {
                color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
                color.style.display = "block"; //show color 
            } else {
                color.style.display = "none"; //hidden extra colors
            }
        });
        //handle sizes
        currentProductSizes.forEach((size, sizeIndex) => {
            if (choosenProduct.sizes[sizeIndex]) {
                size.textContent= choosenProduct.sizes[sizeIndex];
                size.style.display = "block";
            }
            else {
                size.style.display = "none";
            }
        });
    });
});
    
currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        if (choosenProduct.colors[index]) {
            currentProductImg.src = choosenProduct.colors[index].img;
         }
    });
});
