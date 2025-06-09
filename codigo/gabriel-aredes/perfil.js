
document.addEventListener('DOMContentLoaded', function () {

    checarUsuarioLogadoEAtualizarHeader();
    carregarDadosUsuario();
    carregarCursosInscritos();

    function checarUsuarioLogadoEAtualizarHeader() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const botoesLoginContainer = document.querySelector('.botoes-login');
        if (botoesLoginContainer) {
            if (usuarioLogado) {
                botoesLoginContainer.innerHTML = `
                    <span class="nome-usuario-header">Olá, ${usuarioLogado.nome}</span>
                    <a href="perfil.html" class="entrar">Meu Perfil</a>
                    <button id="btnSair" class="cadastrar">Sair</button>
                `;
            } else {
                botoesLoginContainer.innerHTML = `
                    <a href="../aldo/cadastro/html/cadastro.html#login" class="entrar">Entrar</a>
                    <a href="../aldo/cadastro/html/cadastro.html#cadastro" class="cadastrar">Cadastrar</a>
                `;
            }
        }
    }

    function carregarDadosUsuario() {
        const usuarioLogadoString = localStorage.getItem('usuarioLogado');
        if (!usuarioLogadoString) {
            alert("Você não está logado! Redirecionando...");
            window.location.href = "../aldo/cadastro/html/cadastro.html"; 
            return; 
        }
        const usuario = JSON.parse(usuarioLogadoString);
        document.getElementById('foto-perfil').src = usuario.foto || 'imagens/avatar_padrao.png';
        document.getElementById('nome-usuario').textContent = `${usuario.nome} ${usuario.sobrenome}`;
        document.getElementById('email-usuario').textContent = usuario.email;
        document.getElementById('local-usuario').textContent = `${usuario.rua}, ${usuario.numero} - ${usuario.bairro}`;
        const membroDesdeElemento = document.getElementById('membro-desde');
        if (usuario.dataCadastro) {
            membroDesdeElemento.textContent = `Membro desde: ${usuario.dataCadastro}`;
        } else {
            membroDesdeElemento.style.display = 'none';
        }
    }

    function carregarCursosInscritos() {
        const cursosGrid = document.getElementById('cursos-grid');
        const cursosInscritosString = localStorage.getItem('cursosInscritos');
        if (!cursosGrid) return;
        cursosGrid.innerHTML = ''; 
        if (cursosInscritosString) {
            const cursosInscritos = JSON.parse(cursosInscritosString);
            if (cursosInscritos.length === 0) {
                cursosGrid.innerHTML = '<p class="aviso-sem-cursos">Você ainda não se inscreveu em nenhum curso.</p>';
                return;
            }
            cursosInscritos.forEach(curso => {
                const cardDoCursoHTML = `
                    <div class="curso-item">
                        <div class="curso-imagem">
                            <img src="${curso.imagem || 'imagens/placeholder_curso.png'}" alt="Capa do curso ${curso.titulo}">
                            <span class="tag-categoria">${curso.categoria || 'Geral'}</span>
                        </div>
                        <div class="curso-info">
                            <h3>${curso.titulo}</h3>
                            <p class="instrutor">Por: ${curso.instrutor}</p>
                            <div class="progresso">
                                <p>Progresso: ${curso.progresso}%</p>
                                <div class="barra-progresso">
                                    <div class="progresso-atual" style="width: ${curso.progresso}%;"></div>
                                </div>
                            </div>
                            <a href="#" class="botao-acessar">Continuar Aprendendo</a>
                        </div>
                    </div>
                `;
                cursosGrid.innerHTML += cardDoCursoHTML;
            });
        } else {
            cursosGrid.innerHTML = '<p class="aviso-sem-cursos">Você ainda não se inscreveu em nenhum curso.</p>';
        }
    }

    function atualizarCadastroGeral(usuarioAtualizado) {
        let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        const index = cadastros.findIndex(user => user.email === usuarioAtualizado.email);
        if (index !== -1) {
            cadastros[index] = usuarioAtualizado;
            localStorage.setItem('cadastros', JSON.stringify(cadastros));
        }
    }


    // botão SAIR 
    document.body.addEventListener('click', function(event) {
        const botaoSair = event.target.closest('#btnSair');
        if (botaoSair) {
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('cursosInscritos');
            alert("Você saiu da sua conta. Redirecionando...");
            window.location.href = '../aldo/cadastro/html/cadastro.html';
        }
    });

    //ALTERAR FOTO
    const linkAlterarFoto = document.getElementById('link-alterar-foto');
    const inputFoto = document.getElementById('input-foto');
    if (linkAlterarFoto && inputFoto) {
        linkAlterarFoto.addEventListener('click', function(event) {
            event.preventDefault();
            inputFoto.click();
        });

        inputFoto.addEventListener('change', function() {
            const arquivo = this.files[0];
            if (arquivo) {
                const leitor = new FileReader();
                leitor.onload = function(evento) {
                    const urlDaImagem = evento.target.result;
                    document.getElementById('foto-perfil').src = urlDaImagem;
                    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
                    if (usuario) {
                        usuario.foto = urlDaImagem;
                        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                        atualizarCadastroGeral(usuario);
                    }
                }
                leitor.readAsDataURL(arquivo);
            }
        });
    }

    // EDITAR PERFIL (modal)
    const botaoEditarPerfil = document.querySelector('.botao-editar-perfil');
    const modalEditar = document.getElementById('modal-editar-perfil');
    const formEditar = document.getElementById('form-editar-perfil');
    const botaoCancelarEdicao = document.getElementById('botao-cancelar-edicao');

    if (botaoEditarPerfil && modalEditar && formEditar && botaoCancelarEdicao) {
        botaoEditarPerfil.addEventListener('click', function() {
            const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
            if (usuario) {
                document.getElementById('edit-nome').value = usuario.nome;
                document.getElementById('edit-sobrenome').value = usuario.sobrenome;
                document.getElementById('edit-rua').value = usuario.rua;
                document.getElementById('edit-numero').value = usuario.numero;
                document.getElementById('edit-bairro').value = usuario.bairro;
                modalEditar.style.display = 'flex';
            }
        });

        botaoCancelarEdicao.addEventListener('click', function() {
            modalEditar.style.display = 'none';
        });

        formEditar.addEventListener('submit', function(event) {
            event.preventDefault();
            let usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
            if (usuario) {
                usuario.nome = document.getElementById('edit-nome').value;
                usuario.sobrenome = document.getElementById('edit-sobrenome').value;
                usuario.rua = document.getElementById('edit-rua').value;
                usuario.numero = document.getElementById('edit-numero').value;
                usuario.bairro = document.getElementById('edit-bairro').value;

                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                atualizarCadastroGeral(usuario);
                
                document.getElementById('nome-usuario').textContent = `${usuario.nome} ${usuario.sobrenome}`;
                document.getElementById('local-usuario').textContent = `${usuario.rua}, ${usuario.numero} - ${usuario.bairro}`;

                modalEditar.style.display = 'none';
                alert('Perfil atualizado com sucesso!');
            }
        });
    }

}); 