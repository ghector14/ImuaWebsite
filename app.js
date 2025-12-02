const wrapper = document.querySelector('.sliderWrapper')
const menuItems = document.querySelectorAll(".menuItem")

const products = [
    {
        id: 1, 
        title: "Hats",
        price: 20,
        colors: [
            {
                code: "black",
                img: "./img/black_hat-removebg-preview.png",
            },
        ],
    },
    {
        id: 2, 
        title: "Beanies",
        price: 20,
        colors: [
            {
                code: "black",
                img: "./img/black_beanie-removebg-preview.png",
            },
        ],
    },
    {
        id: 3, 
        title: "Shirts",
        price: 25,
        colors: [
            {
                code: "black",
                img: "./img/black_hat-removebg-preview.png",
            },
            {
                code: "white",
                img: "./img/whiteshirt-removebg-preview.png",
            },
            {
                code: "red",
                img: "./img/darkred-removebg-preview.png",
            },
        ],
    },
    {
        id: 4, 
        title: "Hoodies",
        price: 35,
        colors: [
            {
                code: "black",
                img: "./img/black_hat-removebg-preview.png",
            },
        ],
    },
    {
        id: 5, 
        title: "Pants",
        price: 30,
        colors: [
            {
                code: "black",
                img: "./img/black_hat-removebg-preview.png",
            },
        ],
    },
];

let choosenProduct = products[0]
   
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");



menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        //change the current slide
        wrapper.style.transform = `translateX(${ -100 * index}vw)`;

        //change the choosen product
        choosenProduct = products[index]

        //change text of currentProduct
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        
    });
});