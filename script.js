// Carregar carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
atualizarContadorCarrinho();

// Adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    alert(`${nome} foi adicionado ao carrinho!`);
}

// Remover item do carrinho
function removerDoCarrinho(nome) {
    let index = carrinho.findIndex(item => item.nome === nome);
    if (index !== -1) {
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        alert(`${nome} foi removido do carrinho!`);
    } else {
        alert(`${nome} não está no carrinho.`);
    }
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    document.getElementById("contadorCarrinho").innerText = carrinho.length;
}