import { connectApi } from "./conexao.js"
const produtos = await connectApi.getProdutos()
const containerProdutos = document.querySelector(".produtos__container")
const btnAmburger = document.querySelector("#btnAmburger")
const mobileNav = document.querySelector(".mobile__ancors")
const hamburger = document.querySelector(".hamburger")
const circulos = document.querySelectorAll(".circle__item")
const carrossel = document.querySelector(".banner__carrossel")

btnAmburger.addEventListener("click", _ => {
    mobileNav.classList.toggle("off")
    mobileNav.classList[1] === "off" ? hamburger.children[0].src = "/src/imgs/icon-close.svg" : hamburger.children[0].src = "/src/imgs/icon-hamburger.svg"  
})


circulos.forEach(element => {
    element.addEventListener("click", e => {
        carrossel.style.backgroundImage = `url(/src/imgs/Photo${e.target.attributes[1].value}.png)`
    })
})


produtos.Produtos.forEach(element => {
    console.log(element)
    containerProdutos.innerHTML += `
        <div class=${"produto__item "+element.id}>
            <img src=${element.imageUrl} alt=${element.name} class="imagemProduto">
            <div class="produto__infos">
                <h3 class="subTitleProdutos">${element.name}</h3>
                <div class="details">
                    <span>${element.category}</span>
                    <span>$${element.price}</span>
                </div>
            </div>
        </div>
    `
})