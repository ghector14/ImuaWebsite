const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
    {
        id: 1, 
        title: "IMUA Signature Hat",
        price: 20,
        colors: [
            {
                code: "black",
                img: "./images/hat.png",
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
                img: "./images/beanie.png",
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
                img: "./images/shirt.png",
            },
            {
                code: "white",
                img: "./images/whiteshirt.png",
            },
            {
                code: "red",
                img: "./images/redshirt.png",
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
                img: "./images/hoodie.png",
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
                img: "./images/pants.png",
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
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        //change the choosen product
        choosenProduct = products[index]

        //change text of currentProduct
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
    });
});