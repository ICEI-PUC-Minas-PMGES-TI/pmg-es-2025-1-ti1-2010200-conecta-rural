document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const cursoId = parseInt(params.get("id")); 

    const mainContainer = document.querySelector("main");

    if (!cursoId) {
        mainContainer.innerHTML = "<p>Curso não encontrado. ID não especificado na URL.</p>";
        return;
    }

    const todosCursos = JSON.parse(localStorage.getItem('cursos')) || [];
    
    const curso = todosCursos.find(c => c.id === cursoId);

    if (!curso) {
        mainContainer.innerHTML = "<p>Curso não encontrado.</p>";
        return;
    }

    document.getElementById('cursoTitulo').textContent = curso.titulo || 'Título não disponível';
    document.getElementById('cursoDescricao').textContent = curso.descricao || 'Descrição não disponível.';
    document.getElementById('cursoInstrutor').textContent = curso.instrutor || 'Não informado';
    document.getElementById('cursoCategoria').textContent = curso.categoria || 'Não informada';
    document.getElementById('cursoDuracao').textContent = curso.duracao ? `${curso.duracao}` : 'Não informada';
    document.getElementById('cursoDificuldade').textContent = curso.dificuldade ? curso.dificuldade.charAt(0).toUpperCase() + curso.dificuldade.slice(1) : 'Não informado';
    document.getElementById('cursoPublicoAlvo').textContent = curso.publicoAlvo || 'Não informado';
    document.getElementById('cursoFormato').textContent = curso.formato ? curso.formato.charAt(0).toUpperCase() + curso.formato.slice(1) : 'Não informado';
    document.getElementById('cursoData').textContent = curso.data ? new Date(curso.data).toLocaleDateString('pt-BR') : 'Não informada';

    const cursoImagem = document.getElementById('cursoImagem');
    const imageUrl = curso.imagem && !curso.imagem.startsWith('data:') && !curso.imagem.startsWith('http') ? `imagens/${curso.imagem}` : curso.imagem || 'imagens/placeholder.png';
    cursoImagem.src = imageUrl;
    cursoImagem.alt = `Imagem de capa do curso ${curso.titulo}`;

    const cursoPreco = document.getElementById('cursoPreco');
    const cursoMetodosPagamentoDiv = document.getElementById('cursoMetodosPagamento');
    const metodosPagamentoLista = document.getElementById('metodosPagamentoLista');
    const cursoOutrosMetodosDiv = document.getElementById('cursoOutrosMetodos');
    const outrosMetodosTextoSpan = document.getElementById('outrosMetodosTexto');

    if (curso.tipoPreco === 'pago' && curso.preco !== undefined) {
        cursoPreco.innerHTML = `<strong>Preço:</strong> R$ ${curso.preco.toFixed(2).replace('.', ',')}`;
        if (curso.metodosPagamento && curso.metodosPagamento.length > 0) {
            const nomesAmigaveis = curso.metodosPagamento.map(metodo => {
                switch(metodo) {
                    case 'pix': return 'PIX';
                    case 'boleto': return 'Boleto Bancário';
                    case 'cartaoCredito': return 'Cartão de Crédito';
                    case 'transferencia': return 'Transferência Bancária';
                    case 'presencial': return 'Pagamento Presencial';
                    default: return metodo; 
                }
            });
            metodosPagamentoLista.textContent = nomesAmigaveis.join(', ');
            cursoMetodosPagamentoDiv.style.display = 'block';

            if (curso.outrosMetodosTexto) {
                outrosMetodosTextoSpan.textContent = curso.outrosMetodosTexto;
                cursoOutrosMetodosDiv.style.display = 'block';
            } else {
                cursoOutrosMetodosDiv.style.display = 'none';
            }
        } else {
            metodosPagamentoLista.textContent = 'Não especificados';
            cursoMetodosPagamentoDiv.style.display = 'block';
            cursoOutrosMetodosDiv.style.display = 'none';
        }
    } else {
        cursoPreco.innerHTML = '<strong>Preço:</strong> Gratuito';
        cursoMetodosPagamentoDiv.style.display = 'none';
        cursoOutrosMetodosDiv.style.display = 'none';
    }

    
    const modulosLista = document.getElementById('modulosLista');
    modulosLista.innerHTML = ''; 
    if (curso.modulos && curso.modulos.length > 0) {
        curso.modulos.forEach(modulo => {
            const li = document.createElement('li');
            li.textContent = modulo;
            modulosLista.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Módulos não listados.';
        modulosLista.appendChild(li);
    }

    
    const videoContainer = document.getElementById('videoContainer');
    const videoCurso = document.getElementById('videoCurso');         
    if (curso.video) {
        const videoId = extrairVideoId(curso.video);
        if (videoId) {
            
            videoCurso.src = `https://www.youtube.com/embed/${videoId}`; 
            videoContainer.style.display = 'block'; 
        } else {
            videoContainer.style.display = 'none';
        }
    } else {
        videoContainer.style.display = 'none';
    }

    function extrairVideoId(url) {
        if (!url) return null;
        
        const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/embed\/)([^"&?\/\s]{11})/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    }
});