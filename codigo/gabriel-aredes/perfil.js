// =================================================================================
// JAVASCRIPT COMPLETO PARA A PÁGINA DE PERFIL (gabriel-aredes/perfil.js)
// =================================================================================

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. CHAMADAS INICIAIS ---
    // Funções que são executadas assim que a página termina de carregar
    // -------------------------------------------------------------------
    checarUsuarioLogadoEAtualizarHeader();
    carregarDadosUsuario();
    carregarCursosInscritos();


    // --- 2. DEFINIÇÃO DAS FUNÇÕES PRINCIPAIS ---
    // Todas as funções que fazem o trabalho pesado
    // -------------------------------------------------------------------

    /**
     * Verifica se há um usuário logado no localStorage e atualiza o cabeçalho da página.
     */
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

    /**
     * Carrega os dados do usuário (nome, email, foto, etc.) do localStorage
     * e preenche os elementos correspondentes na página de perfil.
     */
    function carregarDadosUsuario() {
        const usuarioLogadoString = localStorage.getItem('usuarioLogado');

        if (!usuarioLogadoString) {
            alert("Você não está logado! Redirecionando para a página de cadastro.");
            window.location.href = "../aldo/cadastro/html/cadastro.html"; 
            return; 
        }

        const usuario = JSON.parse(usuarioLogadoString);

        // Preenche os dados do perfil dinamicamente
        document.getElementById('foto-perfil').src = usuario.foto || 'imagens/joaooliveira.png'; // Usa a foto salva ou uma padrão
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

    /**
     * Carrega a lista de cursos em que o usuário está inscrito a partir do localStorage
     * e cria os cards dos cursos dinamicamente na tela.
     */
    function carregarCursosInscritos() {
        const cursosGrid = document.getElementById('cursos-grid');
        const cursosInscritosString = localStorage.getItem('cursosInscritos');
        
        if (cursosGrid) {
            cursosGrid.innerHTML = ''; 

            if (cursosInscritosString) {
                const cursosInscritos = JSON.parse(cursosInscritosString);
                if (cursosInscritos.length === 0) {
                    cursosGrid.innerHTML = '<p class="aviso-sem-cursos">Você ainda não se inscreveu em nenhum curso.</p>';
                    return;
                }
                cursosInscritos.forEach(curso => {
                    // ... (lógica para criar e adicionar o card do curso)
                });
            } else {
                cursosGrid.innerHTML = '<p class="aviso-sem-cursos">Você ainda não se inscreveu em nenhum curso.</p>';
            }
        }
    }

    /**
     * Função auxiliar para manter a lista geral de cadastros consistente
     * sempre que o perfil do usuário logado é atualizado.
     * @param {object} usuarioAtualizado - O objeto do usuário com os dados novos.
     */
    function atualizarCadastroGeral(usuarioAtualizado) {
        let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        const index = cadastros.findIndex(user => user.email === usuarioAtualizado.email);
        if (index !== -1) {
            cadastros[index] = usuarioAtualizado;
            localStorage.setItem('cadastros', JSON.stringify(cadastros));
        }
    }


    // --- 3. EVENT LISTENERS ---
    // Código que "ouve" as ações do usuário na página (cliques, envios, etc.)
    // -------------------------------------------------------------------

    // Listener para o botão SAIR (usando delegação de evento)
    document.body.addEventListener('click', function(event) {
        if (event.target.id === 'btnSair') {
            localStorage.removeItem('usuarioLogado');
            alert("Você saiu da sua conta. Redirecionando...");
            window.location.href = '../aldo/cadastro/html/cadastro.html';
        }
    });

    // Listeners para a funcionalidade de ALTERAR FOTO
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

    // Listeners para a funcionalidade de EDITAR PERFIL (modal)
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

       // SUBSTITUA O BLOCO 'formEditar.addEventListener' EXISTENTE POR ESTE

// Quando o formulário de edição for enviado (clicar em "Salvar")...
formEditar.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    if (usuarioLogadoString) {
        let usuario = JSON.parse(usuarioLogadoString);

        // 1. Atualiza o objeto 'usuario' com os novos valores do formulário
        usuario.nome = document.getElementById('edit-nome').value;
        usuario.sobrenome = document.getElementById('edit-sobrenome').value;
        usuario.rua = document.getElementById('edit-rua').value;
        usuario.numero = document.getElementById('edit-numero').value;
        usuario.bairro = document.getElementById('edit-bairro').value;

        // 2. Salva o objeto ATUALIZADO de volta no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        
        // Atualiza na lista geral também para manter a consistência
        atualizarCadastroGeral(usuario);

        // --- MUDANÇA PRINCIPAL AQUI ---
        // 3. Em vez de recarregar tudo, atualizamos apenas o texto na tela.
        //    A foto, que não foi alterada, permanece como está.
        document.getElementById('nome-usuario').textContent = `${usuario.nome} ${usuario.sobrenome}`;
        document.getElementById('local-usuario').textContent = `${usuario.rua}, ${usuario.numero} - ${usuario.bairro}`;

        // 4. Esconde o modal de edição
        modalEditar.style.display = 'none';
        
        alert('Perfil atualizado com sucesso!');
    }
});
    }

}); // Fim do addEventListener de DOMContentLoaded