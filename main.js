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
    mobileNav.classList[1] === "off" ? hamburger.children[0].src = "/src/imgs/icon-close.svg" : hamburger.children[0].src = "/src/imgs/icon-hamburger.svg"  
})


circulos.forEach(element => {
    element.addEventListener("click", e => {
        carrossel.style.backgroundImage = `url(/src/imgs/Photo${e.target.attributes[1].value}.png)`
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
    const prodCarrinho = document.createElement("div")
    carregaElemento(prodCarrinho)
    element.addEventListener("click", _ => {
        carrinho.classList.add("off")
        const elementoId = element.classList[1]
        const produtoFiltrado = produtos.Produtos.filter(element => element.id == elementoId) 
        salvar(element, produtoFiltrado[0], prodCarrinho)
    })
})


function salvar(element, elemento, prodCarrinho) {
    const elementoId = element.classList[1]
    console.log(elementoId)
    prodCarrinho.classList.add(".prod__carrinho")
    let arry = []
    if(localStorage.produto) {
        console.log("test")
        arry = JSON.parse(localStorage.produto)
        arry.forEach(element => {
            if(arry.filter(element => element.id) == elementoId) {
                elemento.quantidade++
            } else {
                arry.push(elemento)
                prodCarrinho = ""
                localStorage.setItem("produto", JSON.stringify(arry))
                    prodCarrinho += `
                    <div class="prod__carrinho">
                        <img src=${element.imageUrl} alt=${element.id}>
                        <div class="produto__infos">
                            <h3 class="subTitleProdutos">${element.name}</h3>
                            <div class="details">
                                <span>${element.category}</span>
                                <span>$${element.price}</span>
                            </div>
                        </div>
                    </div>
            `
            carrinho.innerHTML=prodCarrinho
        }
        })
    } else {
            arry.push(elemento)
            prodCarrinho = ""
            localStorage.setItem("produto", JSON.stringify(arry))
                prodCarrinho += `
                <div class="prod__carrinho">
                    <img src=${element.imageUrl} alt=${element.id}>
                    <div class="produto__infos">
                        <h3 class="subTitleProdutos">${element.name}</h3>
                        <div class="details">
                            <span>${element.category}</span>
                            <span>$${element.price}</span>
                        </div>
                    </div>
                </div>
        `
        carrinho.innerHTML=prodCarrinho
    }

}

function carregaElemento(prodCarrinho) {
    if(localStorage.produto) {
        let produtosLocal = JSON.parse(localStorage.produto)
        prodCarrinho = ''
        produtosLocal.forEach(element => {
            prodCarrinho += `
                <div class="prod__carrinho">
                    <img src=${element.imageUrl} alt=${element.id}>
                    <div class="produto__infos">
                        <h3 class="subTitleProdutos">${element.name}</h3>
                        <div class="details">
                            <span>${element.category}</span>
                            <span>$${element.price}</span>
                        </div>
                    </div>
                </div>
        `
        // carrinho.appendChild(prodCarrinho)
        carrinho.innerHTML = prodCarrinho
    })
    }
}