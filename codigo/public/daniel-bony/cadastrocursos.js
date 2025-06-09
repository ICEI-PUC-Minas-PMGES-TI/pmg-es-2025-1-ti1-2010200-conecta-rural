
document.addEventListener('DOMContentLoaded', () => {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        alert("Você precisa estar logado para cadastrar um curso. Redirecionando...");
        window.location.href = '/codigo/aldo/cadastro/html/cadastro.html'; 
        return; 
    }

    function checarUsuarioLogadoEAtualizarHeader() {
        const botoesLoginContainer = document.querySelector('.botoes-login');
        if (botoesLoginContainer) {
            botoesLoginContainer.innerHTML = `
                <span class="nome-usuario-header">Olá, ${usuarioLogado.nome}</span>
                <a href="/codigo/gabriel-aredes/perfil.html" class="entrar">Meu Perfil</a>
                <button id="btnSair" class="cadastrar">Sair</button>
            `;
        }
    }

    document.body.addEventListener('click', function(event) {
        if (event.target.id === 'btnSair') {
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('cursosInscritos');
            alert("Você saiu da sua conta.");
            window.location.href = '/codigo/aldo/cadastro/html/cadastro.html';
        }
    });

    const campoInstrutor = document.getElementById('instrutor');
    if(campoInstrutor) {
        campoInstrutor.value = `${usuarioLogado.nome} ${usuarioLogado.sobrenome}`;
        campoInstrutor.readOnly = true;
        campoInstrutor.style.backgroundColor = '#e9ecef';
    }

    checarUsuarioLogadoEAtualizarHeader();

    const formularioCurso = document.querySelector('.formulario-curso');

    formularioCurso.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const curso = {
            titulo: document.getElementById('titulo').value,
            categoria: (document.getElementById('categoria').value === 'outros' ? document.getElementById('outrosTexto').value : document.getElementById('categoria').value),
            descricao: document.getElementById('descricao').value,
            imagem: document.getElementById('imagemUrl').value,
            instrutor: document.getElementById('instrutor').value,
        };
        
        let cursos = JSON.parse(localStorage.getItem('cursos')) || []; 
        const maxId = cursos.length > 0 ? Math.max(...cursos.map(c => typeof c.id === 'number' ? c.id : 0)) : 0;
        curso.id = maxId + 1;
        cursos.push(curso);
        localStorage.setItem('cursos', JSON.stringify(cursos));

        let cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos')) || [];

        const cursoParaPerfil = {
            id: curso.id,
            titulo: curso.titulo,
            imagem: curso.imagem,
            instrutor: curso.instrutor,
            categoria: curso.categoria,
            progresso: 0
        };

        cursosInscritos.push(cursoParaPerfil);

        localStorage.setItem('cursosInscritos', JSON.stringify(cursosInscritos));
     
        alert("Curso cadastrado com sucesso e adicionado ao seu perfil! Redirecionando...");
        
        this.reset(); 

       
        window.location.href = '/codigo/gabriel-aredes/perfil.html';
    });

});