async function getProdutos() {
    const conexao = await fetch("https://onlysig.github.io/ProjetoFinalSenai/src/data.json")
    const conexaoJson = await conexao.json()
    return conexaoJson
}

export const connectApi = {
    getProdutos
}
