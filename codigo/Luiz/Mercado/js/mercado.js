
const produtos = [
    {
        nome: "Cenoura Orgânica",
        local: "Feira do Bairro Centro",
        responsavel: "Joana Almeida",
        contato: "(11) 98765-4321",
        descricao: "Cenouras frescas, cultivadas sem agrotóxicos. Vendidas por quilo."
    },
    {
        nome: "Couve Manteiga",
        local: "Mercado Verde Vida",
        responsavel: "Lucas Rocha",
        contato: "(11) 99888-1122",
        descricao: "Folhas verdes e crocantes, ideais para refogados e sucos detox."
    }
];


const produto = produtos[0];


const descricaoDiv = document.querySelector(".descricao");

descricaoDiv.innerHTML = `
    <h2>Detalhes do Produto</h2>
    <div class="descricao-js">
        <p><strong>Produto:</strong> ${produto.nome}</p>
        <p><strong>Local:</strong> ${produto.local}</p>
        <p><strong>Responsável:</strong> ${produto.responsavel}</p>
        <p><strong>Contato:</strong> ${produto.contato}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
        <a href="#"><h3>Comprar</h3></a>
    </div>
`;
