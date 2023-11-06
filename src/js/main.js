import { connectApi } from "./conexao.js"
const produtos = await connectApi.getProdutos() 
const containerProdutos = document.querySelector(".produtos__container")
const btnAmburger = document.querySelector("#btnAmburger")
const mobileNav = document.querySelector(".mobile__ancors")
const hamburger = document.querySelector(".hamburger")
const circulos = document.querySelectorAll(".circle__item")
const carrossel = document.querySelector(".banner__carrossel")
const carrinho = document.querySelector(".carrinho")

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
    const produtosItem = document.createElement("div")
    produtosItem.classList.add("produto__item")
    produtosItem.classList.add(`${element.id}`)

    produtosItem.innerHTML = `
            <img src=${element.imageUrl} alt=${element.name} class="imagemProduto">
            <div class="produto__infos">
                <h3 class="subTitleProdutos">${element.name}</h3>
                <div class="details">
                    <span>${element.category}</span>
                    <span>$${element.price}</span>
                </div>
            </div>
    `
    containerProdutos.appendChild(produtosItem)
})

const produtosParaCarrinho = document.querySelectorAll(".produto__item")

produtosParaCarrinho.forEach(element => {
    element.addEventListener("click", e => {
        carrinho.classList.add("off")
        criaProdutoCarrinho(element)
    })
})

function criaProdutoCarrinho(element) {
    const elementoId = element.classList[1]
    const produtoFiltrado = produtos.Produtos.filter(element => element.id == elementoId) 
    salvar(produtoFiltrado[0])
}

function salvar(elemento) {
    const prodCarrinho = document.createElement("div")
    prodCarrinho.classList.add(".prod__carrinho")
    let arry = []
    if(localStorage.produto) {
        arry = JSON.parse(localStorage.produto) 
    }
    arry.push(elemento)

    localStorage.setItem("produto", JSON.stringify(arry))
    prodCarrinho.innerHTML += ""
    arry.forEach(element => {

            prodCarrinho.innerHTML += `
                <div class="prod__carrinho">
                    <img src=${element.imageUrl} alt=${element.id}>
                </div>
            `
            carrinho.appendChild(prodCarrinho)
            
    })
}