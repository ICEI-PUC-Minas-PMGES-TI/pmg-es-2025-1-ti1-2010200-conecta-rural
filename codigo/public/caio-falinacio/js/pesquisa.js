const pesquisa = document.querySelector('input#pesquisa-texto');
const botaoPesquisa = document.querySelector('button#botao-pesquisa');
let listaDeProdutos = [];

function carregarProdutos(){
  fetch('js/produtos.json')
  .then(res => res.json())      
  .then(dados => {              
    listaDeProdutos = dados;
    exibirProdutos(listaDeProdutos.filter(p => p.disponivel));       
  })
}

function filtrarProdutos(){
    const input = document.querySelector('input#pesquisa-texto').value.toLowerCase();
    const caixa = document.querySelectorAll('div.caixa-produto');
    caixa.forEach(card => {
    const textoCard = card.innerText.toLowerCase();
    if (textoCard.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
  return listaDeProdutos.filter(callback) 
}

function exibirProdutos(produtos){
  const produtosDisponiveis = listaDeProdutos.filter(p => p.disponivel);
  const tela = document.getElementById('produtos');
  tela.innerHTML = '';  

  if (produtosDisponiveis.length > 0) {
    produtosDisponiveis.forEach(produto => {
      tela.innerHTML += `
        <div class="caixa-produto">
          <p><img src="assets/img/${produto.imagens[0]}" width="150" /></p>
          <p><strong>Produto:</strong> ${produto.nome} <br>
          <strong>Descrição:</strong> ${produto.descricao} <br>
          <strong>Vendedor:</strong> ${produto.produtor.nome} <br>
          <strong>Preço:</strong> R$${produto.preco}/${produto.unidade} <br>
          <strong>Localização:</strong> ${produto.produtor.localizacao}</p>
          <button class="mais-detalhes"> Mais detalhes </button>
        </div>
      `;
    });
  } else {
    tela.innerHTML = "<p>Nenhum produto disponível.</p>";
  }
  }

window.addEventListener('load', carregarProdutos);
botaoPesquisa.addEventListener('click', filtrarProdutos);
pesquisa.addEventListener('keyup', filtrarProdutos);

