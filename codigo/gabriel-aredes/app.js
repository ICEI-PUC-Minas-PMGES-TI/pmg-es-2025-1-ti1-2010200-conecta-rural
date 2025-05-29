document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  const produto = produtos.find(item => item.id === id);
  if (produto) {
    document.getElementById('nome-produto').textContent = produto.nome;
    document.getElementById('descricao-produto').textContent = produto.descricao;

    if (produto.imagens && produto.imagens.length > 0) {
      document.getElementById('imagem-principal').src = produto.imagens[0];
      document.getElementById('imagem-principal').alt = produto.nome;
    }

    document.getElementById('preco-produto').textContent = produto.preco.toFixed(2).replace('.', ',');
    document.getElementById('unidade').textContent = produto.unidade;
    document.getElementById('disponibilidade-produto').textContent = produto.disponivel ? 'Em Estoque' : 'Indisponível';

    document.getElementById('nome-produtor').textContent = produto.produtor.nome;
    document.getElementById('local-produtor').textContent = produto.produtor.localizacao;
    document.getElementById('contato-produtor').textContent = produto.produtor.propriedade;

    document.getElementById('categoria-produto').textContent = produto.categoria;

    if (produto.informacoes_nutricionais) {
      document.getElementById('valor-energetico-produto').textContent = produto.informacoes_nutricionais.calorias;
      document.getElementById('carboidratos-produto').textContent = produto.informacoes_nutricionais.carboidratos;
      document.getElementById('proteinas-produto').textContent = produto.informacoes_nutricionais.proteinas;
      document.getElementById('fibras-produto').textContent = produto.informacoes_nutricionais.fibras || '';
    }

    const listaAvaliacoes = document.getElementById('lista-avaliacoes');
    listaAvaliacoes.innerHTML = '';
    produto.avaliacoes.forEach(avaliacao => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="avaliacao">
          <p class="usuario">${avaliacao.usuario}</p>
          <p class="comentario">${avaliacao.comentario}</p>
          <p class="nota">Nota: ${'⭐'.repeat(Math.round(avaliacao.nota))}</p>
        </div>
      `;
      listaAvaliacoes.appendChild(li);
    });

    const imagensSecundariasDiv = document.querySelector('.imagem-produto .imagens-secundarias');
    imagensSecundariasDiv.innerHTML = '';
    if (produto.imagens && produto.imagens.length > 1) {
      produto.imagens.slice(1).forEach(imagem => {
        const img = document.createElement('img');
        img.src = imagem;
        img.alt = produto.nome;
        img.addEventListener('click', () => {
          document.getElementById('imagem-principal').src = imagem;
        });
        imagensSecundariasDiv.appendChild(img);
      });
    }

  } else {
    console.log('Produto não encontrado com o ID:', id);
  }
});
