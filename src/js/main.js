import { connectApi } from "./conexao.js"
const produtos = await connectApi.getProdutos() 
const containerProdutos = document.querySelector(".produtos__container")
const btnAmburger = document.querySelector("#btnAmburger")
const mobileNav = document.querySelector(".mobile__ancors")
const hamburger = document.querySelector(".hamburger")
const circulos = document.querySelectorAll(".circle__item")
const carrossel = document.querySelector(".banner__carrossel")
const carrinho = document.querySelector(".carrinho")
const btnCarrinho = document.querySelector("#btnCarrinho")

btnAmburger.addEventListener("click", _ => {
    mobileNav.classList.toggle("off")
    mobileNav.classList[1] === "off" ? hamburger.children[0].src = "src/imgs/icon-close.svg" : hamburger.children[0].src = "src/imgs/icon-hamburger.svg"  
})


circulos.forEach(element => {
    element.addEventListener("click", e => {
        carrossel.style.backgroundImage = `url(src/imgs/Photo${e.target.attributes[1].value}.png)`
    })
})

btnCarrinho.addEventListener("click", _ => {
    carrinho.classList.toggle("off")
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
    element.addEventListener("click", _ => {
        carrinho.classList.add("off")
        const prodCarrinho = document.createElement("div")
        const elementoId = element.classList[1]
        const produtoFiltrado = produtos.Produtos.filter(element => element.id == elementoId) 
        salvar(produtoFiltrado[0], prodCarrinho, elementoId)
    })
})

function salvar(elemento, elementoId) {
    const prodCarrinho = document.createElement("div")
    prodCarrinho.classList.add("prod__carrinho")

    const removeElemento = document.createElement("div")
    removeElemento.classList.add("removeElemento")
    removeElemento.innerHTML = "X"

    let arry = []
    if(!localStorage.produto) {
        localStorage.setItem("produto", JSON.stringify(arry))
    }
    arry = JSON.parse(localStorage.produto)
    if(elementoId == elemento.id){
        elemento.quantidade++
    }
    arry.push(elemento)
    localStorage.setItem("produto", JSON.stringify(arry))

    prodCarrinho.innerHTML = ""
        arry.forEach(elementos => {
            prodCarrinho.innerHTML = `
                <img src=${elementos.imageUrl} alt=${elementos.id}>
                <div class="produto__infos">
                    <h3 class="subTitleProdutos">${elementos.name}</h3>
                    <div class="details">
                        <span>${elementos.category}</span>
                        <span>$${elementos.price}</span>
                    </div>
                </div>
        `
        prodCarrinho.appendChild(removeElemento)
        carrinho.appendChild(prodCarrinho)
    })
    removeElementos()
    
}

if(localStorage.produto) {
    
    JSON.parse(localStorage.produto).forEach(elementLocal => {
        const produtoNoCarrinho = document.createElement("div")
        produtoNoCarrinho.classList.add("prod__carrinho")
        carregaElemento(produtoNoCarrinho, elementLocal)
    }) 
}

function carregaElemento(produtoCarrinho, elementoLocal) {

    const removeElemento = document.createElement("div")
    removeElemento.classList.add("removeElemento")
    removeElemento.innerHTML = "X"

    if(localStorage.produto) {
        produtoCarrinho.innerHTML = ''
            produtoCarrinho.innerHTML += `
                <img src=${elementoLocal.imageUrl} alt=${elementoLocal.id}>
                <div class="produto__infos">
                    <h3 class="subTitleProdutos">${elementoLocal.name}</h3>
                    <div class="details">
                        <span>${elementoLocal.category}</span>
                        <span>$${elementoLocal.price}</span>
                    </div>
                </div>
        `
        produtoCarrinho.appendChild(removeElemento)
        carrinho.appendChild(produtoCarrinho)
    removeElementos()
    }
}

function removeElementos() {
    const btnRemove = document.querySelectorAll(".removeElemento")
    btnRemove.forEach(element => {
        element.addEventListener("click", e => {
            e.target.parentNode.remove()
        })
    })
}