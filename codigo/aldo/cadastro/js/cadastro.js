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
