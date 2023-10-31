import { connectApi } from "./conexao.js"
const btnAmburger = document.querySelector("#btnAmburger")
const mobileNav = document.querySelector(".mobile__ancors")
const hamburger = document.querySelector(".hamburger")
const circulos = document.querySelectorAll(".circle__item")
const carrossel = document.querySelector(".banner__carrossel")

btnAmburger.addEventListener("click", _ => {
    mobileNav.classList.toggle("off")
    mobileNav.classList[1] === "off" ? hamburger.children[0].src = "/src/imgs/icon-close.svg" : hamburger.children[0].src = "/src/imgs/icon-hamburger.svg"  
})

console.log(connectApi.getProdutos)

circulos.forEach(element => {
    element.addEventListener("click", e => {
        carrossel.style.backgroundImage = `url(/src/imgs/Photo${e.target.attributes[1].value}.png)`
    })
})