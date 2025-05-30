
const produtos = [
    {
        nome: "Tomates Orgânicos",
        local: "Zona Rural de Nova Esperança - MG",
        responsavel: "Guilherme Arealdo",
        contato: "(11) 98765-4321",
        preco: "9,76/KG",
        descricao: "Tomate orgânico, cultivado com todo o cuidado e carinho, direto da Fazenda Nilton Santos. Ideal a qualquer receita, totalmente livre de agrotóxicos.",
    },
    {
        nome: "Couve Manteiga",
        local: "Mercado Verde Vida",
        responsavel: "Lucas Rocha",
        contato: "(11) 99888-1122",
        preco: "35,00",
        descricao: "Folhas verdes e crocantes, ideais para refogados e sucos detox.",
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
        <p><strong>Preço:</strong> ${produto.preco}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
        <a href="#"><h3>Comprar</h3></a>
    </div>
`;
