// VERSÃO FINAL COMPLETA - SUBSTITUA TODO O ARQUIVO

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. FUNÇÕES AUXILIARES ---
    function showStep(stepNumber) {
        document.querySelectorAll('.step').forEach(step => {
            step.style.display = 'none';
        });
        const nextStepElement = document.getElementById(`step${stepNumber}`);
        if (nextStepElement) {
            nextStepElement.style.display = 'flex';
        }
    }

    window.nextStep = function(current) { showStep(current + 1); }
    window.prevStep = function(current) { showStep(current - 1); }

    function checarUsuarioLogado() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const botoesLogin = document.querySelector('.botoes-login');

        if (botoesLogin) { // Adiciona uma verificação para segurança
            if (usuarioLogado) {
                botoesLogin.innerHTML = `
                    <span class="nome-usuario-header">Olá, ${usuarioLogado.nome}</span>
                    <a href="../../../gabriel-aredes/perfil.html" class="entrar">Meu Perfil</a>
                    <button id="btnSair" class="cadastrar">Sair</button>
                `;
            } else {
                botoesLogin.innerHTML = `
                    <a href="#login" class="entrar">Entrar</a>
                    <a href="#cadastro" class="cadastrar">Cadastrar</a>
                `;
            }
        }
    }

    // --- 2. LÓGICA DOS MODAIS (ABRIR E FECHAR) ---
    function gerenciarModais() {
        const loginModal = document.getElementById('login');
        const cadastroModal = document.getElementById('cadastro');

        if (window.location.hash === '#login') {
            if(loginModal) loginModal.style.display = 'flex';
            if(cadastroModal) cadastroModal.style.display = 'none';
        } else if (window.location.hash === '#cadastro') {
            if(cadastroModal) cadastroModal.style.display = 'flex';
            if(loginModal) loginModal.style.display = 'none';
            showStep(1); 
        } else {
            if(loginModal) loginModal.style.display = 'none';
            if(cadastroModal) cadastroModal.style.display = 'none';
        }
    }

    window.addEventListener('hashchange', gerenciarModais);

    document.querySelectorAll('.fechar').forEach(function (botao) {
        botao.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.hash = '#';
        });
    });

    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            window.location.hash = '#';
        }
    });

    // --- 3. LÓGICA DOS FORMULÁRIOS (CADASTRO E LOGIN) ---
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                nome: this.querySelector('input[placeholder="Nome"]').value,
                sobrenome: this.querySelector('input[placeholder="Sobrenome"]').value,
                nascimento: this.querySelector('input[placeholder="Data de nascimento (DD/MM/AAAA)"]').value,
                cpf: this.querySelector('input[placeholder="CPF"]').value,
                cep: this.querySelector('input[placeholder="CEP"]').value,
                rua: this.querySelector('input[placeholder="Rua"]').value,
                bairro: this.querySelector('input[placeholder="Bairro"]').value,
                numero: this.querySelector('input[placeholder="Número"]').value,
                complemento: this.querySelector('input[placeholder="Complemento"]').value,
                email: this.querySelector('input[placeholder="Email"]').value,
                senha: this.querySelector('input[placeholder="Senha"]').value
            };

            let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
            cadastros.push(formData);
            localStorage.setItem('cadastros', JSON.stringify(cadastros));

            localStorage.setItem('usuarioLogado', JSON.stringify(formData));

            alert('Cadastro realizado com sucesso! Redirecionando para o seu perfil...');

            window.location.href = '../../../gabriel-aredes/perfil.html'; 
        });
    }

    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const senha = this.querySelector('input[type="password"]').value;
            const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
            const usuario = cadastros.find(u => u.email === email && u.senha === senha);

            if (usuario) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                alert(`Bem-vindo(a) de volta, ${usuario.nome}!`);
                
                window.location.href = '../../../gabriel-aredes/perfil.html'; 
                
            } else {
                alert('Email ou senha incorretos!');
            }
        });
    }

    // --- 4. LÓGICA DE LOGOUT ---
    document.body.addEventListener('click', function (e) {
        if (e.target.id === 'btnSair') {
            localStorage.removeItem('usuarioLogado');
            checarUsuarioLogado();
            alert("Você saiu da sua conta.");
        }
    });

    // --- 5. LÓGICA DAS MÁSCARAS ---
    function mascara(campo, mascaraFunc) {
        if(campo) {
            campo.addEventListener('input', () => {
                campo.value = mascaraFunc(campo.value);
            });
        }
    }

    function mascaraCPF(valor) {
        valor = valor.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    // ... (outras funções de máscara aqui se precisar)

    mascara(document.querySelector('input[placeholder="CPF"]'), mascaraCPF);
    // ... (aplicar outras máscaras)

    // --- 6. EXECUÇÃO INICIAL ---
    gerenciarModais();
    checarUsuarioLogado();
});