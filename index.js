const PORT = 8000;
const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");

const app = express();

const categoryData = [
    {
        "name" : "Bathroom",
        "url" : "https://www.ferguson.com/category/bathroom-plumbing/"
    },
    {
        "name" : "Water Heaters",
        "url" : "https://www.ferguson.com/category/water-heaters/"
    },
    {
        "name" : "Heating & Cooling",
        "url" : "https://www.ferguson.com/category/heating-cooling/"
    },
    {
        "name" : "Plumbing Parts & Supplies",
        "url" : "https://www.ferguson.com/category/plumbing-parts-supplies/"
    },
    {
        "name" : "Pipe Fittings",
        "url" : "https://www.ferguson.com/category/pipe-fittings/"
    },
    {
        "name" : "Pipe & Tubing",
        "url" : "https://www.ferguson.com/category/pipe-tubing/"
    },
    {
        "name" : "Valves",
        "url" : "https://www.ferguson.com/category/valves/"
    },
    {
        "name" : "Kitchen",
        "url" : "https://www.ferguson.com/category/kitchen-plumbing/"
    },
    {
        "name" : "Lighting & Fans",
        "url" : "https://www.ferguson.com/category/lighting-fans/"
    },
    {
        "name" : "Appliances",
        "url" : "https://www.ferguson.com/category/appliances/"
    },
    {
        "name" : "Tools",
        "url" : "https://www.ferguson.com/category/tools/"
    },
    {
        "name" : "Hangers, Strut & Fasteners",
        "url" : "https://www.ferguson.com/category/hangers%2C-strut-fasteners/"
    },
    {
        "name" : "Pumps",
        "url" : "https://www.ferguson.com/category/pumps/"
    }
]

let url = "";
let currentCategory = "Plumbing Parts & Supplies";

if(currentCategory){
    let selectedCategory = categoryData.find(category => category.name === currentCategory);
    if(selectedCategory){
        url = selectedCategory.url;
    }
    else{
        url = "https://www.ferguson.com/category/plumbing-parts-supplies/"
    }
}

axios(url)
.then(res => {
    const products = [];
    const html = res.data;
    const $ = cheerio.load(html);

    $('.c-product-tile__inner', html).each(function () {
        const image = $(this).find('img').attr('data-src');
        const url = $(this).find('a').attr('href');
        const title = $(this).find('.c-product-tile__name-text').text().replace(/\s+/g, ' ').trim();
        const price = $(this).find('.c-product-tile__price__value').text().trim();

        products.push({
            image,
            url,
            title,
            price
        })
    })

    console.log(products);
    
}).catch((err) => console.log(err))

app.listen(PORT, () => { console.log(`server is running on port : ${PORT}`) })