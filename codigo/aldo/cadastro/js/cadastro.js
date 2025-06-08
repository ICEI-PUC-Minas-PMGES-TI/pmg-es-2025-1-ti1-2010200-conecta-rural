document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', function () {
        const loginModal = document.getElementById('login');
        const cadastroModal = document.getElementById('cadastro');

        if (window.location.hash === '#login') {
        loginModal.style.display = 'flex';
        cadastroModal.style.display = 'none';
        } else if (window.location.hash === '#cadastro') {
        cadastroModal.style.display = 'flex';
        loginModal.style.display = 'none';
        showStep(1); 
        } else {
        loginModal.style.display = 'none';
        cadastroModal.style.display = 'none';
        }

    });

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

    // Submit com salvamento em JSON
    document.getElementById('cadastroForm').addEventListener('submit', function (e) {
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


        alert('Cadastro realizado com sucesso!');
        this.reset();
        window.location.hash = '#';
        showStep(1);
    });
});

function showStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.style.display = 'none';
    });
    document.getElementById(`step${stepNumber}`).style.display = 'flex';
}

function nextStep(current) {
    showStep(current + 1);
}

function prevStep(current) {
    showStep(current - 1);
}

document.querySelector('.cadastrar').addEventListener('click', function () {
    showStep(1);
});
// Função para aplicar máscara no CPF
function mascaraCPF(campo) {
    campo.addEventListener('input', function () {
        let valor = campo.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);
        campo.value = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function (_, p1, p2, p3, p4) {
            return `${p1}.${p2}.${p3}${p4 ? '-' + p4 : ''}`;
        });
    });
}

// Máscara para CEP
function mascaraCEP(campo) {
    campo.addEventListener('input', function () {
        let valor = campo.value.replace(/\D/g, '');
        if (valor.length > 8) valor = valor.slice(0, 8);
        campo.value = valor.replace(/(\d{5})(\d{0,3})/, function (_, p1, p2) {
            return `${p1}${p2 ? '-' + p2 : ''}`;
        });
    });
}

// Máscara para Data de Nascimento (DD/MM/AAAA)
function mascaraData(campo) {
    campo.addEventListener('input', function () {
        let valor = campo.value.replace(/\D/g, '');
        if (valor.length > 8) valor = valor.slice(0, 8);
        campo.value = valor.replace(/(\d{2})(\d{2})(\d{0,4})/, function (_, p1, p2, p3) {
            return `${p1}/${p2}${p3 ? '/' + p3 : ''}`;
        });
    });
}

// Permitir apenas números no campo número
function mascaraNumero(campo) {
    campo.addEventListener('input', function () {
        campo.value = campo.value.replace(/\D/g, '');
    });
}
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona os campos pelos placeholders
    const cpf = document.querySelector('input[placeholder="CPF"]');
    const cep = document.querySelector('input[placeholder="CEP"]');
    const data = document.querySelector('input[placeholder="Data de nascimento (DD/MM/AAAA)"]');
    const numero = document.querySelector('input[placeholder="Número"]');

    // Aplica as máscaras
    mascaraCPF(cpf);
    mascaraCEP(cep);
    mascaraData(data);
    mascaraNumero(numero);
});
// Controle de Login/Logout
document.addEventListener('DOMContentLoaded', function () {
    checarUsuarioLogado();

    const loginForm = document.querySelector('#login form');
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const senha = this.querySelector('input[type="password"]').value;

        const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        const usuario = cadastros.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert(`Bem-vindo(a), ${usuario.nome}!`);
            window.location.hash = '#';
            checarUsuarioLogado();
            this.reset();
        } else {
            alert('Email ou senha incorretos!');
        }
    });

    document.body.addEventListener('click', function (e) {
        if (e.target.id === 'btnSair') {
            localStorage.removeItem('usuarioLogado');
            checarUsuarioLogado();
        }
    });
});

// Verifica se há usuário logado e atualiza o cabeçalho
function checarUsuarioLogado() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const botoesLogin = document.querySelector('.botoes-login');

    if (usuarioLogado) {
        botoesLogin.innerHTML = `<button id="btnSair" class="cadastrar">Sair</button>`;
    } else {
        botoesLogin.innerHTML = `
            <a href="#login" class="entrar">Entrar</a>
            <a href="#cadastro" class="cadastrar">Cadastrar</a>
        `;
    }
}
