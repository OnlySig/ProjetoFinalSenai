async function getProdutos() {
    const conexao = await fetch("http://localhost:5500/src/data.json")
    const conexaoJson = await conexao.json()
    return conexaoJson
}

export const connectApi = {
    getProdutos
}