const pesquisa = document.querySelector('input#pesquisa-texto');
const botaoPesquisa = document.querySelector('button#botao-pesquisa');
let listaDeProdutos = [];
const filtroOpcao = document.querySelector('select#filtroSelect');

function carregarProdutos(){
  fetch('js/produtos.json')
  .then(res => res.json())      
  .then(dados => {              
    listaDeProdutos = dados;
    aplicarFiltro();
    exibirProdutos(listaDeProdutos.filter(p => p.disponivel));       
  })
}

function aplicarFiltro(){
  let tipoFiltro = filtroOpcao.value;
  const textoBusca = pesquisa.value.toLowerCase();
  let produtosFiltrados = listaDeProdutos.filter(p => p.disponivel);

  if (textoBusca) {
    produtosFiltrados = produtosFiltrados.filter(p =>
      p.nome.toLowerCase().includes(textoBusca) ||
      p.descricao.toLowerCase().includes(textoBusca) ||
      p.produtor.nome.toLowerCase().includes(textoBusca)
    );
  }
  
  if(tipoFiltro === 'preco'){
    produtosFiltrados.sort((prodA, prodB) => prodA.preco - prodB.preco);
  }else if(tipoFiltro === 'categoria'){
    produtosFiltrados.sort((prodA, prodB) => prodA.categoria.localeCompare(prodB.categoria));
  }else if(tipoFiltro === 'localizacao'){
    produtosFiltrados.sort((prodA, prodB) => prodA.produtor.localizacao.localeCompare(prodB.produtor.localizacao));
  }
  exibirProdutos(produtosFiltrados);
};

function exibirProdutos(produtos){
  const tela = document.getElementById('produtos');
  tela.innerHTML = '';  

  if (produtos.length > 0) {
    produtos.forEach(produto => {
      tela.innerHTML += `
        <div class="caixa-produto">
          <p><img src="assets/img/${produto.imagens[0]}" width="150" /></p>
          <p><strong>Produto:</strong> ${produto.nome} <br>
          <strong>Descrição:</strong> ${produto.descricao} <br>
          <strong>Vendedor:</strong> ${produto.produtor.nome} <br>
          <strong>Preço:</strong> R$${produto.preco}/${produto.unidade} <br>
          <strong>Localização:</strong> ${produto.produtor.localizacao} <br>
          <strong>Categoria:</strong> ${produto.categoria}</p>
          <button class="mais-detalhes"> Mais detalhes </button>
        </div>
      `;
    });
  } else {
    tela.innerHTML = "<p>Nenhum produto disponível.</p>";
  }
  }

window.addEventListener('load', carregarProdutos);
botaoPesquisa.addEventListener('click', aplicarFiltro);
pesquisa.addEventListener('keyup', aplicarFiltro);
filtroOpcao.addEventListener('change', aplicarFiltro);

