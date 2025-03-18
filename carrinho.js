document.addEventListener("DOMContentLoaded", function () {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let container = document.querySelector(".itens-carrinho");
    let total = 0;

    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            let div = document.createElement("div");
            div.classList.add("item");
            div.innerHTML = `
                <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
                <button onclick="removerItem(${index})">Remover</button>
            `;
            container.appendChild(div);
        });
    }

    document.getElementById("valorTotal").innerText = total.toFixed(2);

    document.getElementById("finalizarCompra").addEventListener("click", function () {
        finalizarCompraWhatsApp();
    });
});

// Função para remover item do carrinho
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload(); // Atualiza a página para refletir a mudança
}

// Função para enviar pedido via WhatsApp
function finalizarCompraWhatsApp() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá, gostaria de finalizar a compra dos seguintes produtos:\n\n";
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
        total += item.preco;
    });

    mensagem += `\nTotal da compra: R$ ${total.toFixed(2)}\n\nAguardo as instruções para pagamento.`;

    let numeroWhatsApp = "5527998094063"; // Altere para o número real
    let urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.location.href = urlWhatsApp;
}